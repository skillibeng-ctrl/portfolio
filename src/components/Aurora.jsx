// import { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';

// export const Aurora = ({ colorStops = ["#5227FF", "#7cff67", "#5227FF"], amplitude = 1, blend = 0.5 }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animationFrame;
    
//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
    
//     const draw = (time) => {
//       if (!ctx) return;
      
//       const width = canvas.width;
//       const height = canvas.height;
      
//       ctx.clearRect(0, 0, width, height);
      
//       // Simple aurora effect
//       const gradient = ctx.createLinearGradient(0, 0, width, height);
//       gradient.addColorStop(0, colorStops[0]);
//       gradient.addColorStop(0.5, colorStops[1]);
//       gradient.addColorStop(1, colorStops[2]);
      
//       ctx.globalAlpha = blend;
//       ctx.fillStyle = gradient;
//       ctx.fillRect(0, 0, width, height);
      
//       animationFrame = requestAnimationFrame(draw);
//     };
    
//     window.addEventListener('resize', resize);
//     resize();
//     animationFrame = requestAnimationFrame(draw);
    
//     return () => {
//       window.removeEventListener('resize', resize);
//       cancelAnimationFrame(animationFrame);
//     };
//   }, [colorStops, amplitude, blend]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full"
//       style={{ mixBlendMode: 'screen' }}
//     />
//   );
// };

// Aurora.propTypes = {
//   colorStops: PropTypes.arrayOf(PropTypes.string),
//   amplitude: PropTypes.number,
//   blend: PropTypes.number
// };