// src/components/ProjectSlider.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Github,
  Eye,
  Briefcase,
  TrendingUp,
  Users,
  ShoppingBag,
  Brain,
  Database,
  Cloud,
  Rocket,
  Zap
} from 'lucide-react';

// ============================================================================
// PROJECT DATA
// ============================================================================

const PROJECTS = [
  {
    id: 1,
    title: "JobSearch Pro",
    description: "AI-powered job matching platform connecting developers with tech companies",
    category: "Job Search",
    icon: Briefcase,
    problem: "Job seekers waste 40+ hours applying to mismatched positions",
    solution: "ML algorithm matches candidates based on skills, experience, and company culture",
    results: [
      { label: "Match Rate", value: 85, suffix: "%", icon: TrendingUp },
      { label: "Time Saved", value: 30, prefix: "-", suffix: "hrs", icon: Users },
      { label: "Companies", value: 250, suffix: "+", icon: Briefcase }
    ],
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "AWS"],
    links: {
      demo: "https://jobsearchpro.demo",
      github: "https://github.com/yourusername/jobsearchpro",
      caseStudy: "/case-studies/jobsearchpro"
    },
    image: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "AI Content Studio",
    description: "Enterprise-grade AI API for content generation and analysis",
    category: "AI API",
    icon: Brain,
    problem: "Content teams spend 60% time on repetitive writing tasks",
    solution: "REST API with GPT-4 integration for instant content generation",
    results: [
      { label: "Speed", value: 10, prefix: "+", suffix: "x", icon: Zap },
      { label: "Accuracy", value: 94, suffix: "%", icon: Brain },
      { label: "API Calls", value: 500, suffix: "k", icon: Database }
    ],
    technologies: ["Node.js", "OpenAI", "Redis", "MongoDB", "Docker"],
    links: {
      demo: "https://aistudio.demo",
      github: "https://github.com/yourusername/aistudio",
      caseStudy: "/case-studies/aistudio"
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "ShopEase Commerce",
    description: "Full-stack e-commerce platform with real-time inventory",
    category: "E-Commerce",
    icon: ShoppingBag,
    problem: "Small retailers lack affordable, feature-rich online stores",
    solution: "Complete solution with payments, inventory, and analytics",
    results: [
      { label: "Conversion", value: 43, suffix: "%", icon: TrendingUp },
      { label: "Orders", value: 50, suffix: "k", icon: ShoppingBag },
      { label: "Uptime", value: 99.9, suffix: "%", icon: Cloud }
    ],
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind", "Redis"],
    links: {
      demo: "https://shopease.demo",
      github: "https://github.com/yourusername/shopease",
      caseStudy: "/case-studies/shopease"
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80"
  }
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const TechBadge = ({ tech, index }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 + index * 0.05 }}
    className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-md border border-blue-500/30 font-mono"
  >
    {tech}
  </motion.span>
);

const ResultMetric = ({ label, value, prefix = '', suffix = '', icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="text-center"
  >
    <div className="flex items-center justify-center gap-1 mb-1">
      <Icon className="w-3 h-3 text-blue-400" />
      <span className="text-xs text-gray-400">{label}</span>
    </div>
    <p className="text-lg font-bold text-white">
      {prefix}{value}{suffix}
    </p>
  </motion.div>
);

const NavigationButton = ({ direction, onClick, disabled }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`
      absolute top-1/2 -translate-y-1/2 z-10
      w-10 h-10 flex items-center justify-center
      bg-black/80 backdrop-blur-sm rounded-full border border-blue-500/30
      text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-400
      transition-all duration-200
      ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      ${direction === 'left' ? 'left-4' : 'right-4'}
    `}
  >
    {direction === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
  </motion.button>
);

const DotIndicator = ({ active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.2 }}
    className={`
      h-1.5 rounded-full transition-all duration-200
      ${active ? 'w-8 bg-blue-500' : 'w-1.5 bg-gray-600 hover:bg-gray-500'}
    `}
  />
);

// ============================================================================
// MAIN COMPONENT - BLACK & BLUE THEME
// ============================================================================

const ProjectSlider = ({ projects = PROJECTS, autoPlay = true, autoPlayDelay = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying && projects.length > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayDelay);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex, projects.length, autoPlayDelay]);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  if (!projects.length) return null;

  const currentProject = projects[currentIndex];
  const IconComponent = currentProject.icon;

  return (
    <section 
      ref={containerRef}
      className="w-full py-16 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 z-10">
        
        {/* Header with Neon Effect */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/30 mb-4"
          >
            <Rocket className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-400 font-mono">PORTFOLIO</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto rounded-full" />
          
          <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-sm">
            Real problems → Real solutions → Real results
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          
          {/* Navigation Buttons */}
          {projects.length > 1 && (
            <>
              <NavigationButton 
                direction="left" 
                onClick={prevSlide}
                disabled={currentIndex === 0}
              />
              <NavigationButton 
                direction="right" 
                onClick={nextSlide}
                disabled={currentIndex === projects.length - 1}
              />
            </>
          )}

          {/* Slide Content */}
          <div className="overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 shadow-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -300 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col md:flex-row"
              >
                {/* Image Section */}
                <div className="w-full md:w-2/5 h-72 md:h-auto overflow-hidden relative bg-gradient-to-br from-gray-900 to-black">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full text-xs font-medium text-blue-400 border border-blue-500/30">
                      {currentProject.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 p-6">
                  {/* Title & Icon */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {currentProject.title}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {currentProject.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Problem & Solution */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2 mb-4"
                  >
                    <div className="flex items-start gap-2 p-2 bg-red-500/5 rounded-lg border border-red-500/20">
                      <span className="text-red-400 text-sm mt-0.5">⚠️</span>
                      <div>
                        <span className="text-xs font-medium text-red-400">Problem: </span>
                        <span className="text-xs text-gray-400">{currentProject.problem}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-green-500/5 rounded-lg border border-green-500/20">
                      <span className="text-green-400 text-sm mt-0.5">✓</span>
                      <div>
                        <span className="text-xs font-medium text-green-400">Solution: </span>
                        <span className="text-xs text-gray-400">{currentProject.solution}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Results Grid */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-3 gap-3 mb-4 p-3 bg-black/50 rounded-lg border border-blue-500/20"
                  >
                    {currentProject.results.map((result, idx) => (
                      <ResultMetric key={idx} {...result} />
                    ))}
                  </motion.div>

                  {/* Technologies */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {currentProject.technologies.map((tech, idx) => (
                      <TechBadge key={idx} tech={tech} index={idx} />
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3"
                  >
                    <motion.a
                      href={currentProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-600/25 transition-all text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={currentProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all text-sm font-medium"
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                    <motion.a
                      href={currentProject.links.caseStudy}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all text-sm font-medium"
                    >
                      <Eye size={16} />
                      Details
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          {projects.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, idx) => (
                <DotIndicator
                  key={idx}
                  active={idx === currentIndex}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;