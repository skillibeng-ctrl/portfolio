import { useEffect, useRef, useState } from "react";
import { frontendStack, backendStack, databaseStack } from "./techStackData";

export default function Technologies() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const technologies = [
    ...frontendStack,
    ...backendStack,
    ...databaseStack,
  ];

  const items = [...technologies, ...technologies];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    const speed = isMobile ? 0.4 : 0.8;

    const animate = () => {
      if (!paused) {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
          position += track.scrollWidth / 2;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [paused, isMobile]);

  const getStackColor = (tech) => {
    if (frontendStack.some(t => t.name === tech.name)) {
      return {
        border: "border-blue-500/20",
        shadow: "shadow-blue-500/15",
        glow: "shadow-blue-500/10",
        highlight: "group-hover:shadow-blue-500/30"
      };
    }
    if (backendStack.some(t => t.name === tech.name)) {
      return {
        border: "border-emerald-500/20",
        shadow: "shadow-emerald-500/15",
        glow: "shadow-emerald-500/10",
        highlight: tech.highlight ? "group-hover:shadow-emerald-500/40" : "group-hover:shadow-emerald-500/30"
      };
    }
    if (databaseStack.some(t => t.name === tech.name)) {
      return {
        border: "border-purple-500/20",
        shadow: "shadow-purple-500/15",
        glow: "shadow-purple-500/10",
        highlight: "group-hover:shadow-purple-500/30"
      };
    }
    return {
      border: "border-gray-500/20",
      shadow: "shadow-gray-500/15",
      glow: "shadow-gray-500/10",
      highlight: "group-hover:shadow-gray-500/30"
    };
  };

  const getStackLabel = (tech) => {
    if (frontendStack.some(t => t.name === tech.name)) return "Frontend";
    if (backendStack.some(t => t.name === tech.name)) return "Backend";
    if (databaseStack.some(t => t.name === tech.name)) return "Database";
    return "Tool";
  };

  return (
    <section className="w-full py-12 md:py-20 bg-black relative overflow-hidden">

      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
              Technology Stack
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Full Stack <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Expertise</span>
          </h2>
          
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            End-to-end development toolkit for building modern, scalable applications
          </p>
        </div>

        {/* Stack Categories */}
        {/* <div className="hidden md:flex justify-center gap-8 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/20 border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-blue-300">Frontend</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-900/20 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-emerald-300">Backend</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-500/20">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-sm font-medium text-purple-300">Database</span>
          </div>
        </div> */}

        {/* Marquee Container */}
        <div
          className="relative mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Edge gradients */}
    {/* Left fade overlay */}
<div 
  className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 md:w-48 z-10"
  style={{
    background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 75%, transparent 100%)',
  }}
/>

{/* Right fade overlay */}
<div 
  className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 md:w-48 z-10"
  style={{
    background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 75%, transparent 100%)',
  }}
/>


          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center py-4 md:py-8 w-max will-change-transform"
            >
              {items.map((tech, index) => {
                const colors = getStackColor(tech);
                const isHighlight = backendStack.some(t => t.name === tech.name && t.highlight);
                
                return (
                  <div
                    key={`${tech.name}-${index}`}
                    className={`
                      group relative flex-shrink-0 flex flex-col items-center justify-center
                      w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28
                      mx-2 sm:mx-3 md:mx-4
                      rounded-xl sm:rounded-2xl
                      bg-gradient-to-br from-gray-900/80 to-black/80
                      backdrop-blur-sm
                      border ${colors.border}
                      shadow-lg ${colors.shadow}
                      transform-gpu
                      transition-all duration-500 ease-out
                      hover:-translate-y-1.5 hover:scale-105
                      ${colors.highlight}
                      ${isHighlight ? 'ring-1 ring-emerald-500/30' : ''}
                    `}
                  >
                    {/* Hover glow */}
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                    {/* Tech icon */}
                    <div className="relative mb-2 sm:mb-3">
                      <div className={`absolute inset-0 blur-md opacity-50 ${colors.glow}`} />
                      <div className="relative text-2xl sm:text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110">
                        {tech.icon}
                      </div>
                    </div>

                    {/* Tech name */}
                    <span className="text-xs sm:text-sm font-semibold text-white mb-1">
                      {tech.name}
                    </span>

                    {/* Stack type badge */}
                    <div className={`
                      absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase
                      ${frontendStack.some(t => t.name === tech.name) 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : backendStack.some(t => t.name === tech.name)
                          ? 'bg-emerald-900/50 text-emerald-300'
                          : 'bg-purple-900/50 text-purple-300'
                      }
                    `}>
                      {getStackLabel(tech).charAt(0)}
                    </div>

                    {/* Highlight badge for Spring Boot & Microservices */}
                    {isHighlight && (
                      <div className="absolute -top-2 -right-2">
                        <div className="relative">
                          <div className="absolute inset-0 animate-ping bg-emerald-500/20 rounded-full" />
                          <div className="relative px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 text-[10px] font-bold border border-emerald-700/50">
                            PRO
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 md:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-400">Frontend Technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-gray-400">Backend Technologies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-gray-400">Database & Tools</span>
            </div>
          </div>
          
          {/* <p className="mt-6 text-gray-500 text-sm">
            Hover to pause • Scroll for more • Full-stack development capabilities
          </p> */}
        </div>
      </div>
    </section>
  );
}