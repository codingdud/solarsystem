// Main application entry point

class SolarSystemApp {
    constructor() {
        this.solarSystem = null;
        this.controlPanel = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        const canvas = document.getElementById('solar-system-canvas');
        
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        // Initialize solar system
        this.solarSystem = new SolarSystem(canvas);
        
        // Initialize control panel
        this.controlPanel = new ControlPanel(this.solarSystem);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Optional: Add some demo functionality
        this.setupDemoFeatures();
        
        console.log('3D Solar System initialized successfully');
    }
    
    setupEventListeners() {
        // Handle window resize
        window.addEventListener('resize', () => {
            this.solarSystem.handleResize();
        });
        
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Handle mouse interactions for camera control (basic)
        this.setupMouseControls();
    }
    
    handleKeyboardShortcuts(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.controlPanel.togglePauseResume();
                break;
            case 'KeyR':
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.controlPanel.resetAllSpeeds();
                }
                break;
        }
    }
    
    setupMouseControls() {
        const canvas = document.getElementById('solar-system-canvas');
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        
        canvas.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        canvas.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;
            
            // Simple camera rotation around the solar system
            const camera = this.solarSystem.camera;
            const radius = Math.sqrt(
                camera.position.x * camera.position.x + 
                camera.position.z * camera.position.z
            );
            
            const angle = Math.atan2(camera.position.z, camera.position.x);
            const newAngle = angle - deltaX * 0.01;
            
            camera.position.x = Math.cos(newAngle) * radius;
            camera.position.z = Math.sin(newAngle) * radius;
            camera.position.y += deltaY * 0.1;
            
            camera.lookAt(0, 0, 0);
            
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Mouse wheel for zoom
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const camera = this.solarSystem.camera;
            const zoomSpeed = 0.1;
            const direction = e.deltaY > 0 ? 1 : -1;
            
            camera.position.multiplyScalar(1 + direction * zoomSpeed);
            
            // Limit zoom
            const distance = camera.position.length();
            if (distance < 20) {
                camera.position.normalize().multiplyScalar(20);
            } else if (distance > 200) {
                camera.position.normalize().multiplyScalar(200);
            }
        });
    }
    
    setupDemoFeatures() {
        // Add some demo buttons or features for presentation
        // This could include preset speed configurations, etc.
        
        // Example: Speed up inner planets after 5 seconds (demo)
        setTimeout(() => {
            if (this.controlPanel) {
                // Uncomment for demo effect
                // this.controlPanel.animateSpeedChange('mercury', 2.0, 2000);
                // this.controlPanel.animateSpeedChange('venus', 1.5, 2000);
            }
        }, 5000);
    }
    
    // Public methods for external control
    pauseAnimation() {
        if (this.solarSystem) {
            this.solarSystem.pause();
        }
    }
    
    resumeAnimation() {
        if (this.solarSystem) {
            this.solarSystem.resume();
        }
    }
    
    setPlanetSpeed(planetName, speed) {
        if (this.controlPanel) {
            this.controlPanel.setPlanetSpeed(planetName, speed);
        }
    }
    
    resetSpeeds() {
        if (this.controlPanel) {
            this.controlPanel.resetAllSpeeds();
        }
    }
}

// Initialize the application
const app = new SolarSystemApp();