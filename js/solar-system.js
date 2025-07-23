// Solar System 3D scene setup and planet management

class SolarSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();
        
        // Solar system objects
        this.sun = null;
        this.planets = {};
        this.orbitLines = [];
        
        // Animation state
        this.isPaused = false;
        this.planetSpeeds = {};
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.createSun();
        this.createPlanets();
        this.createStarField();
        this.setupOrbitLines();
        
        // Initialize planet speeds
        Object.keys(PLANET_DATA).forEach(planetName => {
            this.planetSpeeds[planetName] = 1.0;
        });
        
        this.animate();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);
    }
    
    setupCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.set(0, 30, 60);
        this.camera.lookAt(0, 0, 0);
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    setupLighting() {
        // Ambient light for general illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Point light from the sun
        const sunLight = new THREE.PointLight(0xFFFFAA, 2, 200);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        this.scene.add(sunLight);
    }
    
    createSun() {
        const sunGeometry = createSphereGeometry(3);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFFF00,
            emissive: 0xFFAA00,
            emissiveIntensity: 0.5
        });
        
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.scene.add(this.sun);
    }
    
    createPlanets() {
        Object.entries(PLANET_DATA).forEach(([planetName, data]) => {
            const geometry = createSphereGeometry(data.radius);
            const material = createBasicMaterial(data.color);
            
            const planet = new THREE.Mesh(geometry, material);
            planet.position.x = data.distance;
            planet.castShadow = true;
            planet.receiveShadow = true;
            
            // Create planet container for orbit rotation
            const planetContainer = new THREE.Object3D();
            planetContainer.add(planet);
            
            this.planets[planetName] = {
                container: planetContainer,
                mesh: planet,
                data: data,
                angle: Math.random() * Math.PI * 2 // Random starting position
            };
            
            this.scene.add(planetContainer);
        });
    }
    
    createStarField() {
        const stars = createStarField(2000, 400);
        this.scene.add(stars);
    }
    
    setupOrbitLines() {
        Object.values(PLANET_DATA).forEach(data => {
            const orbitLine = createOrbitLine(data.distance);
            orbitLine.rotation.x = Math.PI / 2;
            this.orbitLines.push(orbitLine);
            this.scene.add(orbitLine);
        });
    }
    
    updatePlanetSpeed(planetName, speed) {
        if (this.planetSpeeds.hasOwnProperty(planetName)) {
            this.planetSpeeds[planetName] = speed;
        }
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    resetSpeeds() {
        Object.keys(this.planetSpeeds).forEach(planetName => {
            this.planetSpeeds[planetName] = 1.0;
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (!this.isPaused) {
            const deltaTime = this.clock.getDelta();
            
            // Rotate sun
            if (this.sun) {
                this.sun.rotation.y += 0.005;
            }
            
            // Update planet positions
            Object.entries(this.planets).forEach(([planetName, planetObj]) => {
                const speed = this.planetSpeeds[planetName] || 1.0;
                const baseSpeed = planetObj.data.baseSpeed;
                
                planetObj.angle += baseSpeed * speed * deltaTime * 10;
                
                // Update container rotation for orbit
                planetObj.container.rotation.y = planetObj.angle;
                
                // Rotate planet on its axis
                planetObj.mesh.rotation.y += 0.01 * speed;
            });
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}