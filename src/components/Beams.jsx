// import { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';

// export default function Beams({ 
//   beamWidth = 3, 
//   beamHeight = 30, 
//   beamNumber = 20, 
//   lightColor = "#ffffff", 
//   speed = 2, 
//   noiseIntensity = 1.75, 
//   scale = 0.2, 
//   rotation = 30 
// }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
    
//     const ctx = canvas.getContext('2d');
//     let animationFrame;
//     let time = 0;
    
//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
    
//     const draw = () => {
//       if (!ctx) return;
      
//       const width = canvas.width;
//       const height = canvas.height;
      
//       ctx.clearRect(0, 0, width, height);
//       ctx.save();
      
//       // Center and rotate
//       ctx.translate(width / 2, height / 2);
//       ctx.rotate(rotation * Math.PI / 180);
//       ctx.scale(scale, scale);
      
//       // Draw beams
//       const angleStep = (Math.PI * 2) / beamNumber;
//       const rad = Math.min(width, height) * 0.3;
      
//       for (let i = 0; i < beamNumber; i++) {
//         const angle = i * angleStep + time * speed * 0.01;
//         const x = Math.cos(angle) * rad;
//         const y = Math.sin(angle) * rad;
        
//         ctx.save();
//         ctx.translate(x, y);
//         ctx.rotate(angle);
        
//         // Add noise to beam width
//         const noise = Math.sin(time * 0.01 + i) * noiseIntensity;
//         const currentWidth = Math.max(1, beamWidth + noise);
        
//         ctx.fillStyle = lightColor;
//         ctx.shadowBlur = 10;
//         ctx.shadowColor = lightColor;
//         ctx.fillRect(-currentWidth / 2, -beamHeight / 2, currentWidth, beamHeight);
        
//         ctx.restore();
//       }
      
//       ctx.restore();
      
//       time++;
//       animationFrame = requestAnimationFrame(draw);
//     };
    
//     window.addEventListener('resize', resize);
//     resize();
//     draw();
    
//     return () => {
//       window.removeEventListener('resize', resize);
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [beamWidth, beamHeight, beamNumber, lightColor, speed, noiseIntensity, scale, rotation]);
  
//   return (
//     <canvas
//       ref={canvasRef}
//       style={{
//         position: 'absolute',
//         inset: 0,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//       }}
//     />
//   );
// }

// Beams.propTypes = {
//   beamWidth: PropTypes.number,
//   beamHeight: PropTypes.number,
//   beamNumber: PropTypes.number,
//   lightColor: PropTypes.string,
//   speed: PropTypes.number,
//   noiseIntensity: PropTypes.number,
//   scale: PropTypes.number,
//   rotation: PropTypes.number,
// };