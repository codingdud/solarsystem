// Utility functions for the solar system simulation

/**
 * Planet data with realistic relative sizes and orbital distances
 */
const PLANET_DATA = {
    mercury: {
        name: 'Mercury',
        radius: 0.38,
        distance: 8,
        color: 0x8C7853,
        baseSpeed: 0.02
    },
    venus: {
        name: 'Venus',
        radius: 0.95,
        distance: 12,
        color: 0xFFC649,
        baseSpeed: 0.015
    },
    earth: {
        name: 'Earth',
        radius: 1,
        distance: 16,
        color: 0x6B93D6,
        baseSpeed: 0.01
    },
    mars: {
        name: 'Mars',
        radius: 0.53,
        distance: 20,
        color: 0xCD5C5C,
        baseSpeed: 0.008
    },
    jupiter: {
        name: 'Jupiter',
        radius: 2.5,
        distance: 28,
        color: 0xD8CA9D,
        baseSpeed: 0.005
    },
    saturn: {
        name: 'Saturn',
        radius: 2.1,
        distance: 36,
        color: 0xFAD5A5,
        baseSpeed: 0.004
    },
    uranus: {
        name: 'Uranus',
        radius: 1.6,
        distance: 44,
        color: 0x4FD0E7,
        baseSpeed: 0.003
    },
    neptune: {
        name: 'Neptune',
        radius: 1.5,
        distance: 52,
        color: 0x4B70DD,
        baseSpeed: 0.002
    }
};

/**
 * Creates a sphere geometry with given radius and segments
 */
function createSphereGeometry(radius, segments = 32) {
    return new THREE.SphereGeometry(radius, segments, segments);
}

/**
 * Creates a basic material with given color
 */
function createBasicMaterial(color, options = {}) {
    return new THREE.MeshLambertMaterial({
        color: color,
        ...options
    });
}

/**
 * Creates orbit line geometry for visual reference
 */
function createOrbitLine(radius, segments = 64) {
    const geometry = new THREE.RingGeometry(radius - 0.05, radius + 0.05, segments);
    const material = new THREE.MeshBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    return new THREE.Mesh(geometry, material);
}

/**
 * Converts degrees to radians
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Generates random stars for background
 */
function createStarField(count = 1000, spread = 200) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * spread;
        positions[i + 1] = (Math.random() - 0.5) * spread;
        positions[i + 2] = (Math.random() - 0.5) * spread;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });
    
    return new THREE.Points(geometry, material);
}

/**
 * Clamps a value between min and max
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}