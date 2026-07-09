// import { Canvas } from "@react-three/fiber";
// import { Stars, OrbitControls } from "@react-three/drei";
// import { useEffect, useState } from "react";

// export default function StarsBG() {
//   const [isDark, setIsDark] = useState(true);

//   useEffect(() => {
//     // Check initial theme
//     const checkTheme = () => {
//       // Check multiple ways to determine theme
//       const html = document.documentElement;
//       const hasDarkClass = html.classList.contains('dark');
//       const localStorageTheme = localStorage.getItem('theme');
//       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
//       // Priority: localStorage > class > system preference
//       let darkMode = true;
//       if (localStorageTheme) {
//         darkMode = localStorageTheme === 'dark';
//       } else if (hasDarkClass) {
//         darkMode = true;
//       } else if (html.classList.contains('light')) {
//         darkMode = false;
//       } else {
//         darkMode = prefersDark;
//       }
      
//       setIsDark(darkMode);
      
//       // Apply to HTML element
//       if (darkMode) {
//         html.classList.add('dark');
//         html.classList.remove('light');
//       } else {
//         html.classList.add('light');
//         html.classList.remove('dark');
//       }
      
//       // Apply to body for global styling
//       document.body.className = darkMode ? 'dark' : 'light';
      
//       // Apply CSS variables
//       const root = document.documentElement;
//       if (darkMode) {
//         root.style.setProperty('--text-color', '#ffffff');
//         root.style.setProperty('--bg-color', '#000000');
//       } else {
//         root.style.setProperty('--text-color', '#000000');
//         root.style.setProperty('--bg-color', '#ffffff');
//       }
//     };
    
//     checkTheme();
    
//     // Watch for theme changes
//     const observer = new MutationObserver(checkTheme);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ['class']
//     });
    
//     // Watch localStorage
//     const handleStorage = (e) => {
//       if (e.key === 'theme') checkTheme();
//     };
//     window.addEventListener('storage', handleStorage);
    
//     return () => {
//       observer.disconnect();
//       window.removeEventListener('storage', handleStorage);
//     };
//   }, []);

//   return (
//     <>
//       <Canvas
//         camera={{ position: [0, 0, 300], fov: 75, near: 0.1, far: 1000 }}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           zIndex: -1,
//           background: isDark 
//             ? "#000000"  // Pure black for dark
//             : "#ffffff", // Pure white for light
//           opacity: 0,
//           animation: "fadeIn 1s ease-out forwards",
//         }}
//       >
//         <Stars
//           radius={100}
//           depth={50}
//           count={isDark ? 5000 : 3000} // Fewer stars in light mode
//           factor={4}
//           fade
//           speed={0.2}
//           color={isDark ? "#ffffff" : "#000000"} // White stars in dark, black stars in light
//           size={isDark ? 0.5 : 1.0} // Bigger stars in light mode
//         />
//         <OrbitControls 
//           autoRotate 
//           autoRotateSpeed={0.2} 
//           enableZoom={false}
//         />
//       </Canvas>
      
//       {/* Add global styles */}
//       <style jsx global>{`
//         :root {
//           --text-color: #000000;
//           --bg-color: #ffffff;
//         }
        
//         .dark {
//           --text-color: #ffffff;
//           --bg-color: #000000;
//         }
        
//         body {
//           color: var(--text-color) !important;
//           background-color: var(--bg-color) !important;
//           transition: color 0.3s ease, background-color 0.3s ease !important;
//         }
        
//         h1, h2, h3, h4, h5, h6, p, span, div, a, button {
//           color: var(--text-color) !important;
//           transition: color 0.3s ease !important;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         canvas {
//           animation: fadeIn 1s ease-out forwards;
//         }
        
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

import { useEffect, useRef } from "react";

export default function StarsBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let time = 0;

    // Define resize function ONCE
    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      if (!width || !height) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }
      
      // Deep space background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0f0f2a');
      gradient.addColorStop(0.4, '#0a0a20');
      gradient.addColorStop(0.7, '#080818');
      gradient.addColorStop(1, '#050510');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Aurora waves
      const auroraColors = [
        { main: 'rgba(100, 180, 255', glow: 'rgba(130, 210, 255' },
        { main: 'rgba(120, 100, 255', glow: 'rgba(150, 130, 255' },
        { main: 'rgba(80, 200, 220', glow: 'rgba(110, 230, 250' },
        { main: 'rgba(180, 100, 255', glow: 'rgba(210, 130, 255' }
      ];
      
      for (let i = 0; i < 4; i++) {
        const colors = auroraColors[i % auroraColors.length];
        
        ctx.beginPath();
        const yOffset = height * (0.35 + i * 0.12);
        const amplitude = 55 + Math.sin(time * 0.002 + i) * 20;
        const frequency = 0.006 + i * 0.001;
        
        for (let x = 0; x <= width; x += 10) {
          const y = yOffset + Math.sin(x * frequency + time * 0.003 + i * 1.5) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.strokeStyle = `${colors.main}, ${0.15 - i * 0.025})`;
        ctx.lineWidth = 4;
        ctx.stroke();
        
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const y = yOffset + Math.sin(x * frequency + time * 0.003 + i * 1.5) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `${colors.glow}, ${0.08 - i * 0.012})`;
        ctx.lineWidth = 12;
        ctx.stroke();
        
        if (i === 0) {
          ctx.beginPath();
          for (let x = 0; x <= width; x += 10) {
            const y = yOffset + Math.sin(x * frequency + time * 0.003 + i * 1.5) * amplitude;
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.strokeStyle = `rgba(150, 200, 255, 0.05)`;
          ctx.lineWidth = 20;
          ctx.stroke();
        }
      }
      
      // Stars
      for (let i = 0; i < 400; i++) {
        const x = (i * 131) % width;
        const y = (i * 253) % height;
        const size = (i % 3 === 0) ? 1.5 : 1;
        const brightness = 0.4 + Math.sin(time * 0.002 + i) * 0.25;
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fillRect(x, y, size, size);
      }
      
      // Shooting stars
      if (time % 180 === 0 && time < 10000) {
        const startX = Math.random() * width;
        const startY = Math.random() * height * 0.3;
        const endX = startX - 100;
        const endY = startY + 50;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, 0.8)`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(100, 200, 255, 0.5)`;
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      
      time++;
      animationFrame = requestAnimationFrame(draw);
    };

    // Use ResizeObserver for accurate sizing
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    
    // Initial resize
    resize();
    
    // Start observing
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    
    // Start animation
    draw();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}