# 3D Solar System Simulation

A mobile-responsive web application that simulates the solar system in 3D using Three.js.

## Features

### Core Features
- Interactive 3D solar system with the Sun at the center
- All 8 planets (Mercury to Neptune) with realistic relative sizes and distances
- Individual planet rotation and orbital animation
- Real-time speed control for each planet
- Realistic lighting and camera positioning
- Mobile-responsive design

### Bonus Features
- Pause/Resume animation button
- Background star field for immersive experience
- Interactive camera controls (drag to rotate, scroll to zoom)
- Keyboard shortcuts (Space = pause/resume, Ctrl+R = reset speeds)
- Orbit visualization lines
- Reset speeds button

## Technology Stack

- **Three.js**: 3D rendering library for creating the solar system
- **Vanilla JavaScript**: Pure JS for DOM manipulation and user interactions
- **HTML5 Canvas**: For rendering the 3D scene
- **CSS3**: Responsive styling for UI elements

## Project Structure

```
/
├── index.html          # Main HTML file with canvas element
├── css/
│   └── styles.css      # Responsive styling
├── js/
│   ├── main.js         # Application entry point
│   ├── solar-system.js # Three.js scene setup and planet creation
│   ├── controls.js     # Speed control panel functionality
│   └── utils.js        # Helper functions and planet data
└── .gitignore          # Git ignore file
```

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/codingdud/solarsystem.git
   cd solarsystem
   ```

2. Open the project:
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended for better performance)
     ```
     # Using Python
     python -m http.server
     
     # Using Node.js (with http-server package)
     npx http-server
     ```

3. Access the application:
   - If using a local server, navigate to `http://localhost:8000` (or the port shown in your terminal)

## User Controls

### Planet Speed Controls
- Each planet has its own slider to adjust orbital speed from 0x to 5x
- Speed changes take effect immediately

### Main Controls
- **Pause/Resume Button**: Stop or start all animations
- **Reset Button**: Return all planet speeds to default (1x)

### Mouse Controls
- **Drag**: Rotate the camera around the solar system
- **Scroll**: Zoom in and out

### Keyboard Shortcuts
- **Space**: Toggle pause/resume
- **Ctrl+R**: Reset all planet speeds

## Browser Compatibility

This application works on all modern browsers with WebGL support:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Notes

- For optimal performance, use a device with dedicated graphics
- On mobile devices, the simulation may run at lower framerates
- Reducing the number of stars or simplifying planet geometries can improve performance on lower-end devices

## Credits

- Planet data based on relative sizes and orbital characteristics
- Three.js library for 3D rendering capabilities
