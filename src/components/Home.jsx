// src/components/Home.jsx (or Hero.jsx)
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import PropTypes from "prop-types";
import profile from "../components/man.webp";
import StarsBG from "./StarsBG";

// ============== INLINE HOOKS ==============
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event) => setMatches(event.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
};
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  return prefersReducedMotion;
};
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let rafId;
    const updatePosition = (e) => {
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
};

// ============== CONSTANTS ==============
const STATS = [
  { value: 30, suffix: "+", label: "Projects Built", icon: "🚀" },
  { value: 12, suffix: "+", label: "Technologies Used", icon: "🛠️" },
  { value: 100, suffix: "+", label: "GitHub Commits", icon: "💻" },
  { value: 2, suffix: "", label: "Live Deployments", icon: "🌍" },
];

// ============== SUB-COMPONENTS ==============
const AnimatedCounter = ({ from, to, isVisible }) => {
  const [count, setCount] = useState(from);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime;
    let animationFrame;
    const duration = 2000;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(from + (to - from) * eased);
      
      setCount(current);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [from, to, isVisible]);

  return <span>{count}</span>;
};

AnimatedCounter.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired
};

const StatCard = ({ value, suffix, label, icon, isVisible, index }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="relative group cursor-default"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <div className="text-2xl mb-2" aria-hidden="true">{icon}</div>
        <div className="text-3xl md:text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
          <AnimatedCounter from={0} to={value} isVisible={isVisible} />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {suffix}
          </span>
        </div>
        <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
          {label}
        </div>
      </div>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        aria-hidden="true"
      />
    </motion.div>
  );
};

StatCard.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};

const ParticleField = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1
    })), []
  );

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const GradientOrb = ({ className, gradient, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
    style={{ background: gradient }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2],
      x: [0, 30, 0],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    aria-hidden="true"
  />
);

GradientOrb.propTypes = {
  className: PropTypes.string,
  gradient: PropTypes.string.isRequired,
  delay: PropTypes.number
};

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
   const parallaxStyle = useMemo(() => {
    if (prefersReducedMotion || isMobile) return {};
    const moveX = (mousePosition.x - window.innerWidth / 2) / 50;
    const moveY = (mousePosition.y - window.innerHeight / 2) / 50;
    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: 'transform 0.2s ease-out'
    };
  }, [mousePosition, prefersReducedMotion, isMobile]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  return (
    <section
      ref={heroRef}
      className="relative min-h-screen text-white overflow-hidden bg-black"
      role="banner"
      aria-label="Hero section"
    >
      <StarsBG />
      <ParticleField />
      
      <GradientOrb
        className="w-96 h-96 -top-20 -left-20"
        gradient="radial-gradient(circle, rgba(99,102,241,0.3), transparent)"
        delay={0}
      />
      <GradientOrb
        className="w-[30rem] h-[30rem] -bottom-40 -right-20"
        gradient="radial-gradient(circle, rgba(236,72,153,0.2), transparent)"
        delay={2}
      />
      <GradientOrb
        className="w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        gradient="radial-gradient(circle, rgba(139,92,246,0.15), transparent)"
        delay={4}
      />

      {!isMobile && !prefersReducedMotion && (
        <motion.div
          className="fixed pointer-events-none w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent)",
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
          aria-hidden="true"
        />
      )}

      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 md:pt-32 pb-16 md:pb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* LEFT – Content */}
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl text-center lg:text-left">
          
          {/* Availability badge */}
          <motion.div 
            className="inline-flex items-center mb-8 md:mb-10"
            variants={itemVariants}
          >
            <motion.div 
              className="relative mr-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute -inset-1 bg-green-500/40 rounded-full blur-sm animate-ping-slow" aria-hidden="true" />
              <div className="relative w-3 h-3 bg-green-500 rounded-full" role="status" aria-label="Available" />
            </motion.div>
            <span className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm font-medium text-gray-200 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
              Available for select projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
            variants={itemVariants}
          >
           From Idea to Production —
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              I Build Software That Ships
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-gray-300/90 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10"
            variants={itemVariants}
          >
            Full-stack developer & UI/UX specialist crafting high-performance digital products 
            that drive growth and deliver exceptional user experiences.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12"
            variants={itemVariants}
          >
            <motion.button
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-900/30 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>
            <motion.button
              className="group px-8 py-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
               <span className="flex items-center gap-2">
                View Portfolio
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </span> 
            </motion.button>
          </motion.div>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
            variants={itemVariants}
          >
            {STATS.map((stat, index) => (
              <StatCard
                key={stat.label}
                {...stat}
                isVisible={isInView}
                index={index}
              />
            ))}
          </motion.div>
          {/* Social Proof */}
          <motion.div 
            className="flex flex-wrap justify-center lg:justify-start gap-3"
            variants={itemVariants}
          >
            {[
              { name: "LinkedIn", followers: "nano", url: "https://linkedin.com/in/yourprofile" },
              { name: "GitHub", followers: "nano ", url: "https://github.com/skillibeng-ctrl" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.name === "LinkedIn" && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.882v1.509h.041c.401-.757 1.381-1.557 2.837-1.557 3.033 0 3.597 1.997 3.597 4.597v6.451z"/>
                  </svg>
                )}
                {social.name === "GitHub" && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                )}
                <div>
                  <div className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                    {social.name}
                  </div>
                  <div className="text-xs text-gray-400">{social.followers}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
        {/* RIGHT – Profile */}
        <motion.div
          className="relative"
          variants={itemVariants}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={parallaxStyle}
        >
          <div className="relative group max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg mx-auto lg:mx-0">
            <motion.div
              className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/20 rounded-full blur-3xl"
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.5 }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-2xl"
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <motion.div
              className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/50"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              whileHover={{ 
                rotateY: 5,
                rotateX: -5,
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src={profile}
                alt="Professional portrait of full-stack developer and UI/UX specialist"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
                width="400"
                height="500"
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />
              
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-3 gap-4 p-8">
                  {["React", "Node.js", "TypeScript", "Next.js", "GraphQL", "AWS"].map((tech, i) => (
                    <motion.div
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-xs font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute -top-5 -right-5 bg-black/80 backdrop-blur-xl rounded-xl px-4 py-3 shadow-2xl border border-white/20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-white">4.9/5</div>
                  <div className="text-xs text-gray-400">40+ Reviews</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-5 bg-black/80 backdrop-blur-xl rounded-xl px-4 py-3 shadow-2xl border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-green-400 rounded-full"
                    animate={{ scale: [1, 2], opacity: [1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Available Now</div>
                  <div className="text-xs text-gray-400">2 slots left</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-hidden="true"
      >
        <span className="text-xs text-gray-500">Scroll to explore</span>
        <motion.div className="w-5 h-8 rounded-full border-2 border-gray-500 flex items-start p-1">
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
          background-size: 200% auto;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}