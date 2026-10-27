// src/pages/About.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import Footer from '../../components/Footer';
import {
  Github, Linkedin, Mail, MapPin, Calendar,
  ArrowRight, ArrowUp, Code, Server, Cloud,
  ExternalLink, Star, Zap, Shield,
  Coffee, Clock, Users, TrendingUp, CheckCircle,
  Quote, Rocket, Award, Sparkles,
} from 'lucide-react';

/* ============================================================================
   DATA
============================================================================ */

const profileData = {
  name: 'skilli',
  initials: 'SK',
  title: 'Full-Stack Developer',
  tagline:
    'I build websites and web apps that help businesses run better — faster load times, cleaner code, and no headaches.',
  personality: 'I care about how things perform, not just how they look.',
  email: 'waheed@example.com',
  location: 'Nigeria',
  availability: 'Available for freelance projects',
  currentlyWorkingOn: 'A booking system for a local clinic',
  githubUrl: 'https://github.com/waheed',
  linkedinUrl: 'https://linkedin.com/in/waheed',
  calendlyUrl: 'https://calendly.com/waheed',
  profileImage: null,
};

const statsData = [
  { label: 'Projects shipped', value: 20, suffix: '+', icon: Rocket },
  { label: 'Years coding', value: 4, suffix: '+', icon: Award },
  { label: 'Happy clients', value: 12, suffix: '+', icon: Users },
  { label: 'Uptime', value: 99.9, suffix: '%', icon: Shield, decimals: 1 },
];

const servicesData = [
  {
    icon: Code,
    title: 'Websites & Landing Pages',
    description:
      'Fast, responsive sites that work on every device. Built to load quickly and rank well on Google.',
    stats: '98+ PageSpeed Score',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Server,
    title: 'Web Applications',
    description:
      'Custom dashboards, tools, and apps that automate tasks and help you serve more customers.',
    stats: '100% Custom Built',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Cloud,
    title: 'Backend & APIs',
    description:
      'Reliable databases and APIs that keep your app running smoothly as you grow.',
    stats: '99.9% Uptime',
    color: 'from-orange-500 to-red-500',
  },
];

const projectsData = [
  {
    title: 'Restaurant Management System',
    problem:
      'A local restaurant was losing track of orders and struggling with table reservations. Staff relied on paper notes, which led to mistakes and slow service.',
    solution:
      'Built a web app for order tracking, table management, and sales reports. Staff could update orders in real time from any device.',
    result:
      'The restaurant cut order errors and reduced time spent on manual tracking. The owner now has clear daily sales reports.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    metrics: [
      { label: 'Order errors', value: '↓ 85%' },
      { label: 'Service speed', value: '↑ 40%' },
    ],
  },
];

const storyMilestones = [
  {
    year: '2020',
    title: 'First lines of code',
    description:
      'Started with small projects — a portfolio here, a landing page there. Learned HTML, CSS, and how the web actually works under the hood.',
  },
  {
    year: '2021',
    title: 'Going full-stack',
    description:
      'Moved into React and Node.js. Built my first real application for a local restaurant that needed a better way to track orders.',
  },
  {
    year: '2022',
    title: 'Building for real users',
    description:
      'Discovered that production code is different from tutorials. Focused on performance, testing, and reliability under real load.',
  },
  {
    year: '2024',
    title: 'Focusing on impact',
    description:
      'Now I build web apps that solve real business problems — fast, maintainable, and built to last past the launch date.',
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Understand what you need',
    description:
      'We talk about your goals, your users, and what success looks like. No jargon, just clarity.',
    icon: Coffee,
  },
  {
    step: '02',
    title: 'Plan the build',
    description:
      'I map out the features, pick the right tools, and give you a clear timeline before any code is written.',
    icon: Clock,
  },
  {
    step: '03',
    title: 'Build and test',
    description:
      'I build in iterations, share progress regularly, and test on real devices to catch issues early.',
    icon: Zap,
  },
  {
    step: '04',
    title: 'Launch and support',
    description:
      'Once everything is working, I help you go live and stay available for questions and updates.',
    icon: Shield,
  },
];

const values = [
  {
    icon: Star,
    text: "Quality over speed — I'd rather be late and right than early and broken",
  },
  {
    icon: Users,
    text: "Your success is my success — I treat your project like it's my own",
  },
  {
    icon: TrendingUp,
    text: 'Always learning — the web changes fast, and I keep up',
  },
];

const philosophyParagraphs = [
  "I believe good software is invisible — it just works. Users shouldn't have to think about loading times, broken buttons, or confusing layouts.",
  'That means I care about the details: page speed, clean code, responsive design, and clear error handling. Not because they sound impressive, but because they make the difference between software people tolerate and software people trust.',
  "When I take on a project, I treat it like it's my own. I ask questions, suggest improvements, and don't disappear after launch.",
];

const testimonialsData = [
  {
    quote:
      'Orders used to get lost every shift. Now everything is tracked in one place and the team actually trusts the system.',
    author: 'Adeola O.',
    role: 'Owner, Local Restaurant',
    initials: 'AO',
  },
  {
    quote:
      'Communication was clear from day one. Delivered on time, and the site loads noticeably faster than our old one.',
    author: 'Ibrahim K.',
    role: 'Small Business Owner',
    initials: 'IK',
  },
];

/* ============================================================================
   SCROLL PROGRESS
============================================================================ */

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 z-50"
    />
  );
};

/* ============================================================================
   BACK TO TOP
============================================================================ */

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [prefersReducedMotion]);

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.25 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-gray-300 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  );
};

/* ============================================================================
   ENHANCED BACKGROUND
============================================================================ */

const EnhancedBackground = () => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(
        50,
        Math.floor((window.innerWidth * window.innerHeight) / 18000)
      );
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.05,
          color: Math.random() > 0.7 ? '139, 92, 246' : '99, 102, 241',
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

    const animateLoop = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const particle of particles) {
        if (mouse.x !== null && mouse.y !== null) {
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

        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();
      }

      drawConnections();
      animationFrameId = requestAnimationFrame(animateLoop);
    };

    const start = () => {
      if (animationFrameId === null) animateLoop();
    };
    const stop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    start();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

/* ============================================================================
   SHARED COMPONENTS
============================================================================ */

const AnimatedSection = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const SectionHeading = ({ children, subtitle, badge }) => (
  <div className="mb-12 md:mb-16">
    {badge && (
      <span className="inline-block px-3 py-1 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
        {badge}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{children}</h2>
    {subtitle && <p className="text-gray-400 text-lg max-w-2xl">{subtitle}</p>}
  </div>
);

const TechBadge = ({ tech }) => (
  <span className="group relative px-4 py-2 text-sm text-gray-300 bg-white/[0.03] border border-white/[0.06] rounded-full hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 cursor-default">
    <span className="relative z-10">{tech}</span>
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </span>
);

const ProfileAvatar = () => {
  if (profileData.profileImage) {
    return (
      <img
        src={profileData.profileImage}
        alt={profileData.name}
        className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-500/30"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white ring-2 ring-purple-500/30"
    >
      {profileData.initials}
    </div>
  );
};

/* ============================================================================
   ANIMATED COUNTER (for stats)
============================================================================ */

const Counter = ({ value, suffix = '', decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      count.set(value);
      return;
    }
    const controls = animate(count, value, {
      duration: 1.4,
      ease: 'easeOut',
    });
    return controls.stop;
  }, [isInView, value, count, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

/* ============================================================================
   STATS BAR
============================================================================ */

const StatsBar = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 md:mb-40">
    {statsData.map((stat, i) => {
      const Icon = stat.icon;
      return (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-purple-500/20 transition-colors"
        >
          <Icon className="w-5 h-5 text-purple-400 mb-3" aria-hidden="true" />
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              decimals={stat.decimals || 0}
            />
          </div>
          <div className="text-xs text-gray-500">{stat.label}</div>
        </motion.div>
      );
    })}
  </div>
);

/* ============================================================================
   MAIN COMPONENT
============================================================================ */

const AboutMe = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative selection:bg-purple-500/30">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <BackToTop />
      <EnhancedBackground />

      {/* Decorative gradient orbs */}
      <div
        aria-hidden="true"
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
      </div>

      <main id="main" className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-24 md:py-32">
          {/* ================= HERO ================= */}
          <section aria-labelledby="hero-heading" className="mb-24 md:mb-32">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {profileData.availability}
            </motion.div>

            <div className="flex items-start gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex-shrink-0 hidden sm:block"
              >
                <ProfileAvatar />
              </motion.div>

              <div>
                <motion.h1
                  id="hero-heading"
                  className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Hi, I&apos;m{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                      {profileData.name}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {profileData.title}
                </motion.p>
              </div>
            </div>

            <motion.p
              className="text-lg text-gray-400 leading-relaxed mb-6 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {profileData.tagline}
            </motion.p>

            <motion.p
              className="text-sm text-gray-500 italic mb-4 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <span aria-hidden="true" className="w-8 h-px bg-gray-700" />
              {profileData.personality}
            </motion.p>

            {/* Currently working on */}
            <motion.div
              className="flex items-center gap-2 text-sm text-gray-500 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" aria-hidden="true" />
              <span>
                Currently building:{' '}
                <span className="text-gray-300">
                  {profileData.currentlyWorkingOn}
                </span>
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-sm text-gray-500 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <MapPin className="w-4 h-4 text-purple-400" aria-hidden="true" />
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
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full overflow-hidden text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Book a call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </motion.a>

              <motion.a
                href={`mailto:${profileData.email}`}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium rounded-full border border-white/[0.08] transition-all duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Mail className="w-4 h-4 group-hover:text-purple-400 transition-colors" aria-hidden="true" />
                {profileData.email}
              </motion.a>
            </motion.div>

            {/* Social */}
            <motion.div
              className="flex gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              {[
                { icon: Github, url: profileData.githubUrl, label: 'GitHub' },
                { icon: Linkedin, url: profileData.linkedinUrl, label: 'LinkedIn' },
                { icon: Mail, url: `mailto:${profileData.email}`, label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-3 text-gray-400 hover:text-white transition-colors group rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <social.icon className="w-5 h-5 relative z-10" aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>
          </section>

          {/* ================= STATS ================= */}
          <AnimatedSection aria-label="Key statistics">
            <StatsBar />
          </AnimatedSection>

          {/* ================= STORY (timeline) ================= */}
          <AnimatedSection id="story" className="mb-32 md:mb-40">
            <SectionHeading
              badge="Background"
              subtitle="How I got started and where I am now"
            >
              My Story
            </SectionHeading>

            <ol className="relative max-w-2xl space-y-8 border-l border-white/[0.08] pl-8">
              {storyMilestones.map((item, i) => (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-[#0a0a1a]"
                  />
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-xs font-mono text-purple-400">
                      {item.year}
                    </span>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </AnimatedSection>

          {/* ================= SERVICES ================= */}
          <AnimatedSection id="services" className="mb-32 md:mb-40">
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
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={prefersReducedMotion ? {} : { y: -5 }}
                    className="group relative bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative z-10">
                      <div
                        className={`p-3 bg-gradient-to-br ${service.color} rounded-lg inline-block mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-purple-400">
                        <CheckCircle className="w-3 h-3" aria-hidden="true" />
                        {service.stats}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </AnimatedSection>

          {/* ================= WORK ================= */}
          <AnimatedSection id="work" className="mb-32 md:mb-40">
            <SectionHeading badge="Portfolio" subtitle="Real projects I've built">
              Selected Work
            </SectionHeading>

            <div className="space-y-6">
              {projectsData.map((project) => (
                <motion.article
                  key={project.title}
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
                      <ExternalLink
                        className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {[
                        { label: 'Problem', text: project.problem },
                        { label: 'Solution', text: project.solution },
                        { label: 'Result', text: project.result },
                      ].map((block) => (
                        <div key={block.label} className="space-y-2">
                          <p className="text-xs font-medium text-purple-400 uppercase tracking-wider">
                            {block.label}
                          </p>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {block.text}
                          </p>
                          {block.label === 'Result' && project.metrics && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {project.metrics.map((metric) => (
                                <div
                                  key={metric.label}
                                  className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                                >
                                  <p className="text-xs text-gray-400">
                                    {metric.label}
                                  </p>
                                  <p className="text-sm font-semibold text-emerald-400">
                                    {metric.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                      {project.tech.map((tech) => (
                        <TechBadge key={tech} tech={tech} />
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatedSection>

          {/* ================= PROCESS ================= */}
          <AnimatedSection id="process" className="mb-32 md:mb-40">
            <SectionHeading badge="Process" subtitle="Clear process, no surprises">
              How I Work
            </SectionHeading>

            <div className="space-y-4 max-w-2xl">
              {processSteps.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={prefersReducedMotion ? {} : { x: 10 }}
                    className="group flex gap-6 bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                        <Icon className="w-6 h-6 text-purple-400" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-purple-400">
                          {item.step}
                        </span>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* ================= PHILOSOPHY ================= */}
          <AnimatedSection id="philosophy" className="mb-32 md:mb-40">
            <SectionHeading badge="Philosophy" subtitle="What drives my work">
              How I Think
            </SectionHeading>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.text}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-purple-500/20 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-purple-400 mb-4" aria-hidden="true" />
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {value.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="max-w-2xl space-y-4">
              {philosophyParagraphs.map((text, index) => (
                <motion.p
                  key={text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-gray-400 leading-relaxed flex gap-4"
                >
                  <CheckCircle
                    className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  {text}
                </motion.p>
              ))}
            </div>
          </AnimatedSection>

          {/* ================= TESTIMONIALS ================= */}
          <AnimatedSection id="testimonials" className="mb-32 md:mb-40">
            <SectionHeading badge="Testimonials" subtitle="What clients say">
              Kind Words
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonialsData.map((t, i) => (
                <motion.blockquote
                  key={t.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-purple-500/20 transition-colors"
                >
                  <Quote
                    className="w-6 h-6 text-purple-400/60 mb-3"
                    aria-hidden="true"
                  />
                  <p className="text-gray-300 text-sm leading-relaxed mb-5">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {t.author}
                      </div>
                      <div className="text-xs text-gray-500">{t.role}</div>
                    </div>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </AnimatedSection>

          {/* ================= CTA ================= */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-center py-16"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5 rounded-3xl"
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let&apos;s build something useful
              </h2>
              <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg">
                If you need a website or app that actually works — fast, reliable,
                and built to last — let&apos;s talk.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href={profileData.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Book a call
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </motion.a>
                <motion.a
                  href={`mailto:${profileData.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium rounded-full border border-white/[0.08] transition-all duration-200 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  {profileData.email}
                </motion.a>
              </div>
            </div>
          </motion.section>
        </div>

        <Footer />
      </main>

      {/* Global styles — portable (works in Next.js, Vite, CRA) */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-x { animation: none; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMe;