// src/pages/About.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';
import { 
  Github, Linkedin, Mail, MapPin, Calendar, 
  ArrowRight, Code, Server, Cloud,
  ExternalLink, ChevronDown, Star, Zap, Shield,
  Coffee, Clock, Users, TrendingUp, CheckCircle
} from 'lucide-react';

// ============================================================================
// YOUR REAL DATA — Update this
// ============================================================================

const profileData = {
  name: "skilli",
  title: "Full-Stack Developer",
  tagline: "I build websites and web apps that help businesses run better — faster load times, cleaner code, and no headaches.",
  personality: "I care about how things perform, not just how they look.",
  email: "waheed@example.com",
  location: "Nigeria",
  availability: "Available for freelance projects",
  githubUrl: "https://github.com/waheed",
  linkedinUrl: "https://linkedin.com/in/waheed",
  calendlyUrl: "https://calendly.com/waheed",
  profileImage: null
};

const servicesData = [
  {
    icon: Code,
    title: "Websites & Landing Pages",
    description: "Fast, responsive sites that work on every device. Built to load quickly and rank well on Google.",
    stats: "98+ PageSpeed Score",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Server,
    title: "Web Applications",
    description: "Custom dashboards, tools, and apps that automate tasks and help you serve more customers.",
    stats: "100% Custom Built",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Cloud,
    title: "Backend & APIs",
    description: "Reliable databases and APIs that keep your app running smoothly as you grow.",
    stats: "99.9% Uptime",
    color: "from-orange-500 to-red-500"
  }
];

const projectsData = [
  {
    title: "Restaurant Management System",
    problem: "A local restaurant was losing track of orders and struggling with table reservations. Staff relied on paper notes, which led to mistakes and slow service.",
    solution: "Built a web app for order tracking, table management, and sales reports. Staff could update orders in real time from any device.",
    result: "The restaurant cut order errors and reduced time spent on manual tracking. The owner now has clear daily sales reports.",
    tech: ["React", "Node.js", "PostgreSQL"],
    metrics: [
      { label: "Order errors", value: "↓ 85%" },
      { label: "Service speed", value: "↑ 40%" }
    ]
  }
];
 
const processSteps = [
  {
    step: "01",
    title: "Understand what you need",
    description: "We talk about your goals, your users, and what success looks like. No jargon, just clarity.",
    icon: Coffee
  },
  {
    step: "02",
    title: "Plan the build",
    description: "I map out the features, pick the right tools, and give you a clear timeline before any code is written.",
    icon: Clock
  },
  {
    step: "03",
    title: "Build and test",
    description: "I build in iterations, share progress regularly, and test on real devices to catch issues early.",
    icon: Zap
  },
  {
    step: "04",
    title: "Launch and support",
    description: "Once everything is working, I help you go live and stay available for questions and updates.",
    icon: Shield
  }
];

const values = [
  { icon: Star, text: "Quality over speed — I'd rather be late and right than early and broken" },
  { icon: Users, text: "Your success is my success — I treat your project like it's my own" },
  { icon: TrendingUp, text: "Always learning — the web changes fast, and I keep up" }
];

// ============================================================================
// ENHANCED BACKGROUND
// ============================================================================

const EnhancedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles = [];
      const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.05,
          color: Math.random() > 0.7 ? '139, 92, 246' : '99, 102, 241'
        });
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.04 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Mouse interaction
        if (mouse.x && mouse.y) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            particle.x -= dx * force * 0.02;
            particle.y -= dy * force * 0.02;
          }
        }
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();
      });
      
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

// ============================================================================
// ENHANCED COMPONENTS
// ============================================================================

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionHeading = ({ children, subtitle, badge }) => (
  <div className="mb-12 md:mb-16">
    {badge && (
      <span className="inline-block px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
      {children}
    </h2>
    {subtitle && (
      <p className="text-gray-400 text-lg max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

const TechBadge = ({ tech }) => (
  <span className="group relative px-4 py-2 text-sm text-gray-300 bg-white/[0.03] border border-white/[0.06] rounded-full hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 cursor-default">
    <span className="relative z-10">{tech}</span>
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </span>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AboutMe = () => {
  const [activeProject, setActiveProject] = useState(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative selection:bg-purple-500/30">
      
      <EnhancedBackground />
      
      {/* Decorative gradient orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
      </div>
      
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
          
          {/* ========================================== */}
          {/* 1. HERO */}
          {/* ========================================== */}
          <motion.section
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-32 md:mb-40"
          >
            {/* Availability */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {profileData.availability}
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Hi, I'm{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  {profileData.name}
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {profileData.title}
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-400 leading-relaxed mb-6 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {profileData.tagline}
            </motion.p>

            <motion.p 
              className="text-sm text-gray-500 italic mb-8 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <span className="w-8 h-px bg-gray-700"></span>
              {profileData.personality}
            </motion.p>

            {/* Location */}
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-500 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Based in {profileData.location}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <motion.a
                href={profileData.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full overflow-hidden text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book a call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href={`mailto:${profileData.email}`}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium rounded-full border border-white/[0.08] transition-all duration-200 text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                {profileData.email}
              </motion.a>
            </motion.div>

            {/* Social */}
            <motion.div 
              className="flex gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              {[
                { icon: Github, url: profileData.githubUrl, label: "GitHub" },
                { icon: Linkedin, url: profileData.linkedinUrl, label: "LinkedIn" },
                { icon: Mail, url: `mailto:${profileData.email}`, label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-3 text-gray-400 hover:text-white transition-colors group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </motion.div>
          </motion.section>

          {/* ========================================== */}
          {/* 2. MY STORY */}
          {/* ========================================== */}
          <AnimatedSection className="mb-32 md:mb-40">
            <SectionHeading 
              badge="Background"
              subtitle="How I got started and where I am now"
            >
              My Story
            </SectionHeading>
            
            <div className="max-w-2xl space-y-6">
              {[
                "I started learning web development by building small projects for friends — a restaurant needed a better way to track orders, a colleague needed a portfolio site, a local shop wanted an online presence.",
                "Each project taught me something new. I learned how to structure databases, build clean frontends, and write backend code that doesn't fall apart under real use. Over time, those small projects turned into real applications that people rely on every day.",
                "Today, I focus on building web applications that are fast, reliable, and easy to maintain. I work with clients who need more than just a template — they need something that actually solves a problem."
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-gray-300 leading-relaxed flex gap-4"
                >
                  <span className="flex-shrink-0 w-1 h-full bg-gradient-to-b from-purple-500 to-transparent rounded-full mt-1" />
                  {text}
                </motion.p>
              ))}
            </div>
          </AnimatedSection>

          {/* ========================================== */}
          {/* 3. WHAT I DO */}
          {/* ========================================== */}
          <AnimatedSection className="mb-32 md:mb-40">
            <SectionHeading 
              badge="Services"
              subtitle="Practical services that help your business run better"
            >
              What I Do
            </SectionHeading>
            
            <div className="grid md:grid-cols-3 gap-6">
              {servicesData.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    
                    <div className="relative z-10">
                      <div className={`p-3 bg-gradient-to-br ${service.color} rounded-lg inline-block mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-3">{service.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{service.description}</p>
                      <div className="flex items-center gap-2 text-xs text-purple-400">
                        <CheckCircle className="w-3 h-3" />
                        {service.stats}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* ========================================== */}
          {/* 4. SELECTED WORK */}
          {/* ========================================== */}
          <AnimatedSection className="mb-32 md:mb-40">
            <SectionHeading 
              badge="Portfolio"
              subtitle="Real projects I've built"
            >
              Selected Work
            </SectionHeading>
            
            <div className="space-y-6">
              {projectsData.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-purple-500/20 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-purple-400 uppercase tracking-wider">Problem</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{project.problem}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-purple-400 uppercase tracking-wider">Solution</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-purple-400 uppercase tracking-wider">Result</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{project.result}</p>
                        
                        {project.metrics && (
                          <div className="flex gap-3 mt-3">
                            {project.metrics.map((metric, i) => (
                              <div key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <p className="text-xs text-gray-400">{metric.label}</p>
                                <p className="text-sm font-semibold text-emerald-400">{metric.value}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                      {project.tech.map((tech, i) => (
                        <TechBadge key={i} tech={tech} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="mb-32 md:mb-40">
            <SectionHeading 
              badge="Process"
              subtitle="Clear process, no surprises"
            >
              How I Work
            </SectionHeading>
            
            <div className="space-y-4 max-w-2xl">
              {processSteps.map((item, index) => {
                const Icon = item.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group flex gap-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-purple-400">{item.step}</span>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
          <AnimatedSection className="mb-32 md:mb-40">
            <SectionHeading 
              badge="Philosophy"
              subtitle="What drives my work"
            >
              How I Think
            </SectionHeading>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {values.map((value, index) => {
                const Icon = value.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/[0.02] border border-white/[0 .06] rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-purple-400 mb-4" />
                    <p className="text-gray-300 text-sm leading-relaxed">{value.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl space-y-4"
            >
              {[
                "I believe good software is invisible — it just works. Users shouldn't have to think about loading times, broken buttons, or confusing layouts.",
                "That means I care about the details: page speed, clean code, responsive design, and clear error handling. Not because they sound impressive, but because they make the difference between software people tolerate and software people trust.",
                "When I take on a project, I treat it like it's my own. I ask questions, suggest improvements, and don't disappear after launch."
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-gray-400 leading-relaxed flex gap-4"
                >
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* ========================================== */}
          {/* 7. CTA */}
          {/* ========================================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-center py-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5 rounded-3xl" />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Let's build something useful
              </motion.h2>
              <motion.p 
                className="text-gray-400 mb-10 max-w-md mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                If you need a website or app that actually works — fast, reliable, and built 
                to last — let's talk.
              </motion.p>
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <motion.a
                  href={profileData.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar className="w-4 h-4" />
                  Book a call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium rounded-full border border-white/[0.08] transition-all duration-200 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </motion.a>
              </motion.div>
            </div>
          </motion.section>

        </div>
        
        <Footer />
      </div>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutMe;