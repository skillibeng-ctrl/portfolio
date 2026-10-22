import { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { frontendStack, backendStack, databaseStack } from "./techStackData";

// ============================================================================
// MEMOIZED CARD COMPONENT — Prevents re-renders
// ============================================================================

const TechCard = memo(({ tech, stackType, isHighlight, index, totalLength }) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true });

  const colors = useMemo(() => {
    switch(stackType) {
      case 'frontend':
        return { border: "border-blue-500/30", hoverBorder: "hover:border-blue-500/50", badge: "bg-blue-900/60 text-blue-300" };
      case 'backend':
        return { border: "border-emerald-500/30", hoverBorder: "hover:border-emerald-500/50", badge: "bg-emerald-900/60 text-emerald-300" };
      case 'database':
        return { border: "border-purple-500/30", hoverBorder: "hover:border-purple-500/50", badge: "bg-purple-900/60 text-purple-300" };
      default:
        return { border: "border-gray-500/30", hoverBorder: "hover:border-gray-500/50", badge: "bg-gray-900/60 text-gray-300" };
    }
  }, [stackType]);

  return (
    <div
      ref={inViewRef}
      className={`
        group relative flex-shrink-0 flex flex-col items-center justify-center
        w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28
        mx-2 sm:mx-3 md:mx-4
        rounded-xl sm:rounded-2xl
        bg-gray-900
        border ${colors.border} ${colors.hoverBorder}
        transition-all duration-200
        hover:-translate-y-1
        ${isHighlight ? 'ring-1 ring-emerald-500/40' : ''}
        will-change-transform
      `}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(8px)',
        transition: `opacity 0.3s ease-out ${index * 0.015}s, transform 0.3s ease-out ${index * 0.015}s`
      }}
    >
      {/* Tech icon */}
      <div className="relative mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl transition-transform duration-500 group-hover:scale-110">
        {tech.icon}
      </div>

      {/* Tech name */}
      <span className="text-xs sm:text-sm font-medium text-white mb-1">
        {tech.name}
      </span>

      {/* Stack type badge */}
      <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${colors.badge}`}>
        {stackType.charAt(0).toUpperCase()}
      </div>

      {/* Highlight badge */}
      {isHighlight && (
        <div className="absolute -top-2 -right-2">
          <div className="relative px-2 py-0.5 rounded-full bg-emerald-900/90 text-emerald-300 text-[10px] font-bold border border-emerald-500/50">
            PRO
          </div>
        </div>
      )}
    </div>
  );
});

TechCard.displayName = 'TechCard';
const LegendItem = memo(({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2.5 h-2.5 rounded-full bg-${color}-500`} />
    <span className="text-sm text-gray-400">{label}</span>
  </div>
));

LegendItem.displayName = 'LegendItem';

// ============================================================================
// MAIN COMPONENT — OPTIMIZED
// ============================================================================

export default function Technologies() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const sectionRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px 0px"
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Single array — no duplicates needed with proper looping
  const technologies = useMemo(() => [
    ...frontendStack,
    ...backendStack,
    ...databaseStack,
  ], []);

  
  const items = useMemo(() => [...technologies, ...technologies], [technologies]);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    let lastTime = performance.now();
    const speed = isMobile ? 0.25 : 0.5; // Pixels per frame at 60fps
    let rafId;

    const animate = (currentTime) => {
      if (!paused) {
        const delta = Math.min(currentTime - lastTime, 32); // Cap delta
        const moveAmount = speed * (delta / 16.67); // Normalize to 60fps
        position -= moveAmount;
        
        // Seamless loop
        const halfWidth = track.scrollWidth / 2;
        if (position <= -halfWidth) {
          position += halfWidth;
        }
        
        track.style.transform = `translate3d(${position}px, 0, 0)`;
      }
      
      lastTime = currentTime;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [paused, isMobile]);
  const getStackType = useMemo(() => {
    const map = {};
    frontendStack.forEach(t => map[t.name] = 'frontend');
    backendStack.forEach(t => map[t.name] = 'backend');
    databaseStack.forEach(t => map[t.name] = 'database');
    return map;
  }, []);
  const isHighlight = useMemo(() => {
    const set = new Set();
    backendStack.filter(t => t.highlight).forEach(t => set.add(t.name));
    return set;
  }, []);
  return (
    <section 
      ref={sectionRef}
      className="w-full py-12 md:py-20 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — Simple fade, no spring */}
        <div className="text-center mb-10 md:mb-14">
          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
              Technology Stack
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Technologies{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              I Work With ;
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            End-to-end development toolkit for building modern, scalable applications
          </p>
        </div>
        <div className="hidden md:flex justify-center gap-6 mb-10">
          {[
            { color: "blue", label: "Frontend" },
            { color: "emerald", label: "Backend" },
            { color: "purple", label: "Database" }
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full bg-${item.color}-900/20 border border-${item.color}-500/25`}
            >
              <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
              <span className={`text-sm font-medium text-${item.color}-300`}>{item.label}</span>
            </div>
          ))}
        </div>
        <div
          className="relative mt-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 md:w-56 z-10"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 md:w-56 z-10"
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
            }}
          />
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center py-4 md:py-6 w-max"
              style={{ willChange: 'transform' }}
            >
              {items.map((tech, index) => (
                <TechCard
                  key={`${tech.name}-${index}`}
                  tech={tech}
                  stackType={getStackType[tech.name] || 'other'}
                  isHighlight={isHighlight.has(tech.name)}
                  index={index % technologies.length}
                  totalLength={technologies.length}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              { color: "blue", label: "Frontend Technologies" },
              { color: "emerald", label: "Backend Technologies" },
              { color: "purple", label: "Database & Tools" }
            ].map((item) => (
              <LegendItem key={item.label} color={item.color} label={item.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}