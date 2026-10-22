// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import LaserFlow from "./LaserFlow";  //


// const BadassLoader = ({ onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [glitchText, setGlitchText] = useState('');
//   const [phase, setPhase] = useState(0);
  
//   const loadingTexts = [
//     "INITIALIZING_SYSTEMS...",
//     "LOADING_MODULES...",
//     "CALIBRATING_LASER...",
//     "RENDERING_EXPERTISE...",
//     "ALMOST_READY..."
//   ];

//   useEffect(() => {
//     // Progress simulation
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         // Fast at start, slower at end
//         const increment = prev < 30 ? 3 : prev < 60 ? 2 : prev < 85 ? 1 : 0.5;
//         return Math.min(prev + increment, 100);
//       });
//     }, 80);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // Glitch text effect
//     const glitchInterval = setInterval(() => {
//       const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
//       const length = Math.floor(Math.random() * 20) + 10;
//       let result = '';
//       for (let i = 0; i < length; i++) {
//         result += chars.charAt(Math.floor(Math.random() * chars.length));
//       }
//       setGlitchText(result);
//     }, 100);

//     return () => clearInterval(glitchInterval);
//   }, []);

//   useEffect(() => {
//     // Phase cycling
//     const phaseInterval = setInterval(() => {
//       setPhase(prev => (prev + 1) % loadingTexts.length);
//     }, 1500);

//     return () => clearInterval(phaseInterval);
//   }, []);

//   useEffect(() => {
//     if (progress >= 100) {
//       setTimeout(() => {
//         onComplete?.();
//       }, 500);
//     }
//   }, [progress, onComplete]);

//   return (
//     <div className="fixed inset-0 z-[9999] bg-[#0a0a0f] flex flex-col items-center justify-center overflow-hidden">
//       {/* LaserFlow Background */}
//       <div className="absolute inset-0">
//         <LaserFlow
//           color="#8B5CF6"
//           flowSpeed={0.5}
//           wispIntensity={8}
//           wispDensity={1.5}
//           fogIntensity={0.6}
//           horizontalBeamOffset={0.15}
//           decay={1.2}
//           falloffStart={1.3}
//         />
//       </div>

//       {/* Content Overlay */}
//       <div className="relative z-10 flex flex-col items-center gap-8">
        
//         {/* Glitch Text */}
//         <div className="relative">
//           <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest font-mono">
//             WAHEED<span className="text-purple-500">.DEV</span>
//           </h1>
          
//           {/* Glitch overlay */}
//           <div 
//             className="absolute inset-0 text-4xl md:text-6xl font-black tracking-widest font-mono text-purple-400/30 select-none"
//             style={{
//               clipPath: `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`,
//               transform: `translate(${(Math.random() - 0.5) * 6}px, ${(Math.random() - 0.5) * 6}px)`
//             }}
//           >
//             WAHEED<span className="text-purple-500">.DEV</span>
//           </div>
//         </div>

//         {/* Loading Text */}
//         <div className="relative">
//           <p className="text-purple-400/80 font-mono text-sm tracking-widest">
//             {loadingTexts[phase]}
//           </p>
          
//           {/* Decode text effect */}
//           <p className="absolute inset-0 text-purple-300/40 font-mono text-sm tracking-widest select-none"
//             style={{
//               clipPath: `inset(0 0 ${Math.random() * 100}% 0)`
//             }}
//           >
//             {glitchText}
//           </p>
//         </div>

//         {/* Progress bar */}
//         <div className="w-64 md:w-80 h-0.5 bg-gray-800 rounded-full overflow-hidden relative">
//           <motion.div
//             className="h-full bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 rounded-full relative"
//             style={{ width: `${progress}%` }}
//           >
//             {/* Glow effect */}
//             <div className="absolute inset-0 bg-purple-400 blur-sm" />
            
//             {/* Leading edge glow */}
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-300 rounded-full blur-md" />
//           </motion.div>
          
//           {/* Scan line */}
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//             animate={{ x: ['-100%', '200%'] }}
//             transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
//           />
//         </div>

//         {/* Progress percentage */}
//         <div className="flex items-center gap-2">
//           <span className="text-2xl md:text-3xl font-bold text-white font-mono">
//             {Math.floor(progress)}
//           </span>
//           <span className="text-lg text-purple-400 font-mono">%</span>
//         </div>

//         {/* Random glitch fragments */}
//         <div className="absolute bottom-10 left-10 opacity-20 font-mono text-xs text-purple-500 select-none">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div key={i} className="mb-1">
//               {Array.from({ length: 30 }).map((_, j) => (
//                 <span key={j}>
//                   {Math.random() > 0.3 ? '0' : '1'}
//                 </span>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================================
// // DATABASE CARDS COMPONENT
// // ============================================================================

// const DatabaseCards = () => {
//   const [loading, setLoading] = useState(true);
//   const [activeCard, setActiveCard] = useState(null);
//   const containerRef = useRef(null);

//   const cards = [
//     {
//       id: 1,
//       title: "Strategy & Planning",
//       description: "Increase ROI by 5%+ with strategic planning and roadmap development that aligns with your business goals",
//       icon: "🎯",
//       tags: ["Market Research", "User Analysis", "Competitive Analysis", "ROI Planning"],
//       color: "from-blue-900/90 to-blue-950/95",
//       accentColor: "#3B82F6",
//       iconBg: "bg-blue-500/20",
//       successRate: 95
//     },
//     {
//       id: 2,
//       title: "UI/UX Design",
//       description: "Boosts conversions by 40% with user-centered design that transforms visitors into customers",
//       icon: "🎨",
//       tags: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
//       color: "from-purple-900/90 to-purple-950/95",
//       accentColor: "#8B5CF6",
//       iconBg: "bg-purple-500/20",
//       successRate: 98
//     },
//     {
//       id: 3,
//       title: "Development",
//       description: "Achieve top SEO/PageSpeed scores with modern techniques and experience optimization",
//       icon: "⚡",
//       tags: ["React/Next.js", "Node.js", "TypeScript", "API Development"],
//       color: "from-emerald-900/90 to-emerald-950/95",
//       accentColor: "#10B981",
//       iconBg: "bg-emerald-500/20",
//       successRate: 97
//     },
//     {
//       id: 4,
//       title: "Database Architecture",
//       description: "Reduce query times by 60% with robust database design and implementation for scalable applications",
//       icon: "🗄️",
//       tags: ["Schema Design", "Data Modeling", "Query Optimization", "Migration Strategy"],
//       color: "from-gray-900/90 to-gray-950/95",
//       accentColor: "#6B7280",
//       iconBg: "bg-gray-500/20",
//       successRate: 96
//     },
//     {
//       id: 5,
//       title: "DevOps & Cloud",
//       description: "Ensure 99.9% uptime with automated CI/CD pipelines and scalable cloud infrastructure",
//       icon: "☁️",
//       tags: ["CI/CD", "Docker", "AWS/GCP", "Monitoring"],
//       color: "from-orange-900/90 to-orange-950/95",
//       accentColor: "#F97316",
//       iconBg: "bg-orange-500/20",
//       successRate: 99
//     },
//     {
//       id: 6,
//       title: "Security",
//       description: "Protect against threats with comprehensive security audits and compliance frameworks",
//       icon: "🛡️",
//       tags: ["Penetration Testing", "Encryption", "Compliance", "Audit Logs"],
//       color: "from-red-900/90 to-red-950/95",
//       accentColor: "#EF4444",
//       iconBg: "bg-red-500/20",
//       successRate: 94
//     }
//   ];

//   return (
//     <>
//       {/* Loader */}
//       <AnimatePresence>
//         {loading && (
//           <BadassLoader onComplete={() => setLoading(false)} />
//         )}
//       </AnimatePresence>

//       {/* Main Content */}
//       <motion.div
//         ref={containerRef}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: loading ? 0 : 1 }}
//         transition={{ duration: 0.8, delay: 0.3 }}
//         className="min-h-screen bg-black py-16 px-4 relative overflow-hidden"
//       >
//         {/* Subtle LaserFlow Background (dimmed) */}
//         <div className="absolute inset-0 opacity-20 pointer-events-none">
//           <LaserFlow
//             color="#8B5CF6"
//             flowSpeed={0.2}
//             wispIntensity={3}
//             wispDensity={0.8}
//             fogIntensity={0.3}
//             horizontalBeamOffset={0.1}
//             decay={1.1}
//             falloffStart={1.2}
//           />
//         </div>
//         <div className="max-w-6xl mx-auto relative z-10">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 mb-4">
//               <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
//               <span className="text-sm font-medium text-gray-300">Expertise</span>
//             </div>
            
//             <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
//               Full-Stack{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                 Solutions
//               </span>
//             </h1>
            
//             <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//               Delivering measurable results through comprehensive technical expertise
//             </p>
//           </motion.div>

//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cards.map((card, index) => (
//               <motion.div
//                 key={card.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
//                 onMouseEnter={() => setActiveCard(card.id)}
//                 onMouseLeave={() => setActiveCard(null)}
//                 className={`
//                   relative w-full rounded-2xl bg-gradient-to-b ${card.color} p-5 
//                   border border-white/10 hover:border-white/20 
//                   transition-all duration-500
//                   ${activeCard === card.id ? 'scale-[1.02] shadow-2xl shadow-purple-500/10' : 'scale-100 shadow-lg'}
//                 `}
//               >
//                 {/* Hover glow effect */}
//                 <div 
//                   className={`
//                     absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500
//                     ${activeCard === card.id ? 'opacity-100' : ''}
//                   `}
//                   style={{
//                     background: `radial-gradient(circle at center, ${card.accentColor}15 0%, transparent 70%)`
//                   }}
//                 />

//                 {/* Icon */}
//                 <div className={`relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} text-lg`}>
//                   {card.icon}
//                 </div>

//                 {/* Title */}
//                 <h3 className="relative mb-2 text-lg font-semibold text-white">
//                   {card.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="relative mb-4 text-sm leading-relaxed text-gray-400">
//                   {card.description}
//                 </p>

//                 {/* Tags */}
//                 <div className="relative flex flex-wrap gap-2 mb-4">
//                   {card.tags.map((tag, tagIndex) => (
//                     <span 
//                       key={tagIndex}
//                       className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-200"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Progress bar */}
//                 <div className="relative pt-4 border-t border-white/10">
//                   <div className="flex items-center justify-between text-xs mb-2">
//                     <span className="text-gray-500">Success Rate</span>
//                     <motion.span 
//                       className="font-bold text-white font-mono"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 1 + index * 0.15 }}
//                     >
//                       {card.successRate}%
//                     </motion.span>
//                   </div>
//                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
//                     <motion.div 
//                       className="h-full rounded-full"
//                       style={{ backgroundColor: card.accentColor }}
//                       initial={{ width: 0 }}
//                       animate={{ width: `${card.successRate}%` }}
//                       transition={{ duration: 1.5, delay: 1 + index * 0.15, ease: 'easeOut' }}
//                     >
//                       {/* Shine effect */}
//                       <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//                     </motion.div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Bottom CTA */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 1.5 }}
//             className="mt-12 text-center"
//           >
//             <button className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
//               <span className="relative z-10 flex items-center gap-2">
//                 <span>Explore All Services</span>
//                 <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                 </svg>
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </button>
//             <p className="mt-4 text-gray-500 text-sm">
//               Get a personalized strategy for your project
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* CSS for shimmer animation */}
//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(200%); }
//         }
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
//       `}</style>
//     </>
//   );
// };

// export default DatabaseCards;