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



import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function StarsBG() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check current theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Initial check
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
<Canvas
  camera={{ position: [0, 0, 300], fov: 75, near: 0.1, far: 1000 }}
  style={{
    position: "absolute",
    inset: 0,              // ✅ fills parent
    width: "100%",
    height: "100%",
    zIndex: -1,
    background: isDarkMode
      ? "linear-gradient(to bottom, #0a0a2a, #000000)"
      : "linear-gradient(to bottom, #f8fafc, #e2e8f0)",
    opacity: 0,
    animation: "fadeIn 1s ease-out forwards",
  }}
>

        {/* Stars with dynamic color */}
        <Stars
          radius={100}
          depth={50}
          count={isDarkMode ? 7000 : 4000} // Fewer stars in light mode for better visibility
          factor={4}
          fade
          speed={0.2}
          color={isDarkMode ? "#ffffff" : "#1a202c"} // White in dark mode, dark gray in light mode
          size={isDarkMode ? 0.5 : 0.6} // Slightly larger in light mode
        />

        {/* Optional controls */}
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={0.2} 
          enableZoom={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>

      {/* Fallback background for non-WebGL browsers */}
      <div
        className="stars-fallback"
        style={{
          display: "none", 
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: isDarkMode 
            ? "radial-gradient(ellipse at center, #000000 0%, #000000 70%, #1a1a2e 100%)"
            : "radial-gradient(ellipse at center, #f8fafc 0%, #e2e8f0 70%, #cbd5e0 100%)",
        }}
      />

      {/* WebGL detection */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var canvas = document.createElement('canvas');
                var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) {
                  var fallback = document.querySelector('.stars-fallback');
                  if (fallback) fallback.style.display = 'block';
                }
              } catch (e) {
                var fallback = document.querySelector('.stars-fallback');
                if (fallback) fallback.style.display = 'block';
              }
            })();
          `,
        }}
      />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) { 
          canvas {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </>
  );
}