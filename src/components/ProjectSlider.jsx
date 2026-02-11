import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Code, Server, Globe, Database, Cpu, Layers } from "lucide-react";

const projects = [
  {
    title: "Binns Media Platform",
    desc: "Full-stack media CMS with real-time analytics, user subscriptions, and content delivery network.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    frontend: ["HTML5", "CSS3", "JavaScript", "React", "React Native"],
    backend: ["Node.js", "Java", "Spring Boot", "Microservices"],
    database: ["MongoDB", "PostgreSQL", "pgAdmin", "SQL"],
    liveLink: "https://binnsmedia.com",
    caseLink: "/case-study/binns-media",
    github: "https://github.com/yourusername/binns-media"
  },
  {
    title: "Quantum Analytics Dashboard",
    desc: "Real-time data visualization platform with WebSocket streaming and predictive AI models.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    frontend: ["HTML5", "CSS3", "JavaScript", "React", "React Native"],
    backend: ["Node.js", "Java", "Spring Boot", "Microservices"],
    database: ["MongoDB", "PostgreSQL", "pgAdmin", "SQL"],
    liveLink: "https://quantumanalytics.com",
    caseLink: "/case-study/quantum-analytics",
    github: "https://github.com/yourusername/quantum-analytics"
  },
  {
    title: "Nexus Design System",
    desc: "Enterprise design system with component library, documentation, and deployment automation.",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    frontend: ["HTML5", "CSS3", "JavaScript", "React", "React Native"],
    backend: ["Node.js", "Java", "Spring Boot", "Microservices"],
    database: ["MongoDB", "PostgreSQL", "pgAdmin", "SQL"],
    liveLink: "https://nexus-ds.com",
    caseLink: "/case-study/nexus-design-system",
    github: "https://github.com/yourusername/nexus-ds"
  },
];

export default function FullStackProjectSlider() {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => (i - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIndex((i) => (i + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIndex((i) => (i + 1) % projects.length);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
   <div className="relative bg-gradient-to-b from-black via-gray-900 to-black py-12 lg:py-16">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, transparent 90%, #3b82f6 100%), linear-gradient(0deg, transparent 90%, #3b82f6 100%)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Blue Glow Effects */}
      <div className="absolute top-10 left-10 w-48 h-48 md:w-64 md:h-64 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Slider Container - Responsive Height */}
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-sm border border-gray-800/50 shadow-2xl shadow-blue-900/20 min-h-[600px] md:min-h-[500px] lg:h-[500px]">
          
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 md:w-20 md:h-20 border-t border-l border-blue-500/30 rounded-tl-xl md:rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-t border-r border-blue-500/30 rounded-tr-xl md:rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 border-b border-l border-blue-500/30 rounded-bl-xl md:rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 md:w-20 md:h-20 border-b border-r border-blue-500/30 rounded-br-xl md:rounded-br-2xl" />

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            disabled={isAnimating}
            className="absolute left-2 md:left-3 top-1/2 z-20 -translate-y-1/2 p-2 md:p-2.5 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-blue-300 transition-colors" />
          </button>

          <button
            onClick={next}
            disabled={isAnimating}
            className="absolute right-2 md:right-3 top-1/2 z-20 -translate-y-1/2 p-2 md:p-2.5 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300 group"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-blue-300 transition-colors" />
          </button>

          {/* Track */}
          <div
            className="flex h-full transition-transform duration-400 ease-out will-change-transform"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {projects.map((project, i) => (
              <div
                key={i}
                className="min-w-full flex flex-col lg:flex-row h-full"
              >
                {/* Left Column - Mobile & Desktop Layout */}
                {isMobile ? (
                  // Mobile: Stack vertically
                  <div className="flex-1 p-4 md:p-6">
                    {/* Mobile Image */}
                    <div className="relative h-48 md:h-56 rounded-lg overflow-hidden mb-4 group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-blue-900/20 to-transparent z-10" />
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 z-20">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2 py-1.5 bg-gradient-to-r from-blue-900/90 to-cyan-900/90 backdrop-blur-sm rounded-full text-blue-300 text-xs font-medium hover:from-blue-800 hover:to-cyan-800 transition-all duration-300"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Live</span>
                        </a>
                      </div>
                    </div>

                    {/* Mobile Content */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        {project.desc}
                      </p>

                      {/* Tech Stack Pills - Mobile */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Layers className="w-3 h-3 text-blue-400" />
                          <span className="text-xs font-medium text-gray-300">Full Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[...project.frontend, ...project.backend.slice(0, 2)].map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-blue-900/30 text-blue-300 rounded-full border border-blue-700/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons - Mobile */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <a
                          href={project.caseLink}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-xs font-medium text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
                        >
                          <Eye className="w-3 h-3" />
                          Case Study
                        </a>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-blue-800/50 bg-blue-900/20 px-4 py-2 text-xs font-medium text-white hover:bg-blue-800/30 hover:border-blue-500 transition-all duration-300"
                        >
                          <Globe className="w-3 h-3" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Desktop: Split Layout
                  <>
                    {/* Left Column - Image & Tech Stack */}
                    <div className="lg:w-2/5 p-4 lg:p-6 flex flex-col">
                      {/* Image Container */}
                      <div className="relative flex-1 rounded-lg lg:rounded-xl overflow-hidden mb-4 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-blue-900/20 to-transparent z-10" />
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
                        <img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        
                        {/* Live Badge */}
                        <div className="absolute top-3 right-3 z-20">
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-900/90 to-cyan-900/90 backdrop-blur-sm rounded-full text-blue-300 text-xs font-medium hover:from-blue-800 hover:to-cyan-800 transition-all duration-300 shadow-lg shadow-blue-900/30"
                          >
                            <Globe className="w-3 h-3" />
                            Live
                          </a>
                        </div>
                      </div>

                      {/* Tech Stack Pills - Desktop */}
                      <div className="space-y-3">
                        {/* Frontend */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Layers className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-medium text-gray-300">Frontend</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.frontend.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-blue-900/40 text-blue-300 rounded-full border border-blue-700/50 hover:border-blue-500 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Backend */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Cpu className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-medium text-gray-300">Backend</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.backend.map((tech, idx) => (
                              <span
                                key={idx}
                                className={`px-2 py-1 text-xs rounded-full border ${
                                  tech === "Spring Boot" || tech === "Microservices"
                                    ? "bg-emerald-900/40 text-emerald-300 border-emerald-700/50 hover:border-emerald-500"
                                    : "bg-cyan-900/40 text-cyan-300 border-cyan-700/50 hover:border-cyan-500"
                                } transition-colors`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Database */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Database className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-medium text-gray-300">Database</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.database.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-blue-800/40 text-blue-200 rounded-full border border-blue-600/50 hover:border-blue-400 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:w-3/5 p-4 lg:p-6 flex flex-col justify-center">
                      <div className={`transition-all duration-400 ${
                        i === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}>
                        {/* Project Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                              <span className="text-white font-bold text-xs">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold text-white">
                              {project.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
                          {project.desc}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          <a
                            href={project.caseLink}
                            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-medium text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
                          >
                            <Eye className="w-4 h-4" />
                            Case Study
                          </a>
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-800/50 bg-blue-900/20 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800/30 hover:border-blue-500 transition-all duration-300"
                          >
                            <Globe className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 hover:border-gray-600 transition-all duration-300"
                          >
                            <Code className="w-4 h-4" />
                            Code
                          </a>
                        </div>

                        {/* Performance Stats */}
                        <div className="mt-4 pt-4 border-t border-gray-800/50 grid grid-cols-3 gap-3 lg:gap-4">
                          <div className="text-center">
                            <div className="text-base lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">99.9%</div>
                            <div className="text-xs text-gray-400">Uptime</div>
                          </div>
                          <div className="text-center">
                            <div className="text-base lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{"<100ms"}</div>
                            <div className="text-xs text-gray-400">Response</div>
                          </div>
                          <div className="text-center">
                            <div className="text-base lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">10K+</div>
                            <div className="text-xs text-gray-400">Users</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => !isAnimating && setIndex(i)}
                className={`transition-all duration-300 ${
                  i === index
                    ? "w-5 md:w-6 bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/50"
                    : "w-1.5 md:w-1.5 bg-gray-700 hover:bg-gray-500"
                } h-1.5 rounded-full`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}