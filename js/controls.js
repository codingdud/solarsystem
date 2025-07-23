// Control panel functionality for speed adjustment

class ControlPanel {
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.planetControls = {};
        this.pauseResumeBtn = null;
        this.resetBtn = null;
        
        this.init();
    }
    
    init() {
        this.setupPlanetControls();
        this.setupMainControls();
    }
    
    setupPlanetControls() {
        Object.keys(PLANET_DATA).forEach(planetName => {
            const slider = document.getElementById(`${planetName}-speed`);
            const speedValue = slider.parentElement.querySelector('.speed-value');
            
            this.planetControls[planetName] = {
                slider: slider,
                speedValue: speedValue
            };
            
            // Add event listener for real-time speed changes
            slider.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                this.updatePlanetSpeed(planetName, speed);
            });
            
            // Add event listener for smooth value updates
            slider.addEventListener('change', (e) => {
                const speed = parseFloat(e.target.value);
                this.updatePlanetSpeed(planetName, speed);
            });
        });
    }
    
    setupMainControls() {
        this.pauseResumeBtn = document.getElementById('pause-resume-btn');
        this.resetBtn = document.getElementById('reset-btn');
        
        this.pauseResumeBtn.addEventListener('click', () => {
            this.togglePauseResume();
        });
        
        this.resetBtn.addEventListener('click', () => {
            this.resetAllSpeeds();
        });
    }
    
    updatePlanetSpeed(planetName, speed) {
        // Update solar system
        this.solarSystem.updatePlanetSpeed(planetName, speed);
        
        // Update display
        const control = this.planetControls[planetName];
        if (control) {
            control.speedValue.textContent = `${speed.toFixed(1)}x`;
        }
    }
    
    togglePauseResume() {
        if (this.solarSystem.isPaused) {
            this.solarSystem.resume();
            this.pauseResumeBtn.textContent = 'Pause';
        } else {
            this.solarSystem.pause();
            this.pauseResumeBtn.textContent = 'Resume';
        }
    }
    
    resetAllSpeeds() {
        // Reset solar system speeds
        this.solarSystem.resetSpeeds();
        
        // Reset UI controls
        Object.entries(this.planetControls).forEach(([planetName, control]) => {
            control.slider.value = 1.0;
            control.speedValue.textContent = '1.0x';
        });
    }
    
    // Method to programmatically set planet speed (useful for demos)
    setPlanetSpeed(planetName, speed) {
        const control = this.planetControls[planetName];
        if (control) {
            const clampedSpeed = clamp(speed, 0, 5);
            control.slider.value = clampedSpeed;
            this.updatePlanetSpeed(planetName, clampedSpeed);
        }
    }
    
    // Get current speed of a planet
    getPlanetSpeed(planetName) {
        const control = this.planetControls[planetName];
        return control ? parseFloat(control.slider.value) : 1.0;
    }
    
    // Animate speed changes (for smooth transitions)
    animateSpeedChange(planetName, targetSpeed, duration = 1000) {
        const control = this.planetControls[planetName];
        if (!control) return;
        
        const startSpeed = this.getPlanetSpeed(planetName);
        const speedDiff = targetSpeed - startSpeed;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentSpeed = startSpeed + (speedDiff * easedProgress);
            
            control.slider.value = currentSpeed;
            this.updatePlanetSpeed(planetName, currentSpeed);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
}