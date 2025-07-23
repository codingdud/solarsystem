# Technology Stack

## Core Technologies
- **Three.js**: Primary 3D rendering library for creating scenes, objects, lighting, and animations
- **Vanilla JavaScript**: Pure JavaScript without frameworks for DOM manipulation and user interactions
- **HTML5**: Canvas element for 3D rendering
- **CSS3**: Responsive styling (no CSS animations allowed - use Three.js only)

## Animation Libraries
- **THREE.Clock**: For timing-based animations
- **requestAnimationFrame**: For smooth animation loops
- **GSAP** (optional): Alternative animation library if needed

## Development Guidelines
- Use pure JavaScript - no frameworks like React, Vue, or Angular
- All animations must be handled by Three.js, not CSS
- Ensure cross-browser compatibility with modern browsers
- Optimize for mobile responsiveness

## Common Commands
Since this is a vanilla JavaScript project, typical commands would be:
- Serve locally: Use a simple HTTP server (e.g., `python -m http.server` or Live Server extension)
- No build process required - direct browser execution
- Testing: Manual testing across different browsers and devices

## Performance Considerations
- Optimize 3D models and textures for fast loading
- Use efficient animation loops
- Implement proper cleanup for Three.js objects to prevent memory leaks