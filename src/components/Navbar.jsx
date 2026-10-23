import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Menu, X, Github, Linkedin, Twitter, Mail, ExternalLink, FileText, Moon, Sun, Home, User, Briefcase, Code, Mail as MailIcon, ChevronDown } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedTheme === 'dark' || (!savedTheme && prefersDark);
    }
    return false;
  });
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const [showScrollProgress, setShowScrollProgress] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // Professional color scheme
  const colors = {
    primary: {
      from: '#3b82f6',
      to: '#8b5cf6',
      via: '#ec4899'
    },
    dark: {
      bg: '#0f172a',
      card: '#1e293b',
      border: '#334155'
    },
    light: {
      bg: '#ffffff',
      card: '#f8fafc',
      border: '#e2e8f0'
    }
  };

  // Theme handling with system preference sync
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync with system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 20);
          
          // Calculate scroll progress for the progress bar
          const winScroll = document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          setScrollProgress(scrolled);
          setShowScrollProgress(scrolled > 5);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer with better thresholds
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };
    const observer = new IntersectionObserver((entries) => {
      // Get the section with the highest intersection ratio
      const visibleSection = entries
        .filter(entry => entry.isIntersecting)
        .reduce((max, entry) => {
          return entry.intersectionRatio > (max?.intersectionRatio || 0) ? entry : max;
        }, null);

      if (visibleSection) {
        setActiveSection(visibleSection.target.id);
      }
    }, observerOptions);

    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Click outside handler with improved logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) &&
          buttonRef.current && 
          !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Body scroll lock with cleanup
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Memoized navigation items with icons
  const navItems = useMemo(() => [
    { id: 'home', path: '/', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', path: '/about', label: 'About', icon: <User size={18} /> },
    { id: 'projects', path: '/projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { id: 'skills', path: '/skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'contact', path: '/contact', label: 'Contact', icon: <MailIcon size={18} /> },
  ], []);

  // Memoized social links
  const socialLinks = useMemo(() => [
    { 
      icon: <Github size={18} />, 
      href: 'https://github.com/yourusername', 
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
    },
    { 
      icon: <Linkedin size={18} />, 
      href: 'https://linkedin.com/in/yourusername', 
      label: 'LinkedIn',
      color: 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    { 
      icon: <Twitter size={18} />, 
      href: 'https://twitter.com/yourusername', 
      label: 'Twitter',
      color: 'hover:text-sky-500 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20'
    },
    { 
      icon: <Mail size={18} />, 
      href: 'mailto:hello@example.com', 
      label: 'Email',
      color: 'hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
    },
  ], []);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, null, `#${id}`);
      setIsOpen(false);
    }
  }, []);

  const handleResumeClick = useCallback(() => {
    // Track analytics
    if (window.gtag) {
      window.gtag('event', 'download_resume', {
        event_category: 'engagement',
        event_label: 'Navigation Bar'
      });
    }
    console.log('Resume downloaded');
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // Determine if link is active
  const isLinkActive = useCallback((path) => {
    if (path === '/') {
      return location.pathname === path || location.hash === '#home';
    }
    return location.pathname === path || location.hash === path.substring(1);
  }, [location]);

  return (
    <>
      {/* Scroll Progress Bar */}
      {showScrollProgress && (
        <div className="fixed top-0 left-0 w-full h-1 z-[60]">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg py-2 border-b border-gray-200 dark:border-gray-800'
            : 'bg-transparent py-4'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with animation */}
            <button
              onClick={() => scrollToSection('home')}
              className="group relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Go to homepage"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500 group-hover:scale-105" />
              <div className="relative px-4 py-2 bg-white dark:bg-gray-900 rounded-lg flex items-center space-x-2 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg">
                <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">
                  &lt;D<span className="text-blue-600 dark:text-blue-400">rev</span>/&gt;
                </span>
              </div>
            </button>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {/* Navigation Links */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isLinkActive(item.path)
                        ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/50 dark:hover:bg-gray-900/50'
                    }`}
                    aria-current={isLinkActive(item.path) ? "page" : undefined}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                    
                    {/* Active indicator dot */}
                    {isLinkActive(item.path) && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-2 ml-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    scrolled
                      ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                      : 'bg-white/20 dark:bg-gray-800/50 text-white dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50 backdrop-blur-sm'
                  } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Social Links Dropdown */}
                <div className="relative group">
                  <button
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      scrolled
                        ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        : 'bg-white/20 dark:bg-gray-800/50 text-white dark:text-gray-300 backdrop-blur-sm'
                    } hover:scale-105`}
                    aria-label="Social links"
                  >
                    <ChevronDown size={18} className="group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  
                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                      {socialLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className={`flex items-center space-x-3 px-4 py-3 text-sm transition-colors ${link.color}`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Resume Button */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleResumeClick}
                  onMouseEnter={() => setIsResumeHovered(true)}
                  onMouseLeave={() => setIsResumeHovered(false)}
                  className="group relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 flex items-center space-x-2 overflow-hidden hover:shadow-lg hover:shadow-blue-500/25"
                  aria-label="View resume"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center space-x-2">
                    <FileText size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                    <span>Resume</span>
                    <ExternalLink 
                      size={14} 
                      className={`transition-all duration-300 ${
                        isResumeHovered ? 'translate-x-1 -translate-y-1' : ''
                      }`}
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2.5 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                scrolled
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                  : 'bg-white/20 dark:bg-gray-800/50 text-white dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50 backdrop-blur-sm'
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ top: scrolled ? '60px' : '76px' }}
        aria-hidden={!isOpen}
      >
        {/* Backdrop with blur */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        
        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-[calc(100vh-80px)] overflow-y-auto transform transition-all duration-500 ease-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } bg-white dark:bg-gray-900 shadow-2xl`}
        >
          <div className="p-6 space-y-6">
            {/* Profile Summary */}
            <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-800">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">John Doe</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer</p>
            </div>

            {/* Navigation Items */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center w-full px-4 py-3.5 rounded-xl transition-all duration-300 ${
                    isLinkActive(item.path)
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {isLinkActive(item.path) && (
                    <span className="ml-auto w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="pt-4">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  {darkMode ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
                  <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <div className="relative w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors">
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </div>
              </button>
            </div>
            {/* Social Links */}
            <div className="pt-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-2">
                Connect with me
              </p>
              <div className="grid grid-cols-4 gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${link.color} bg-gray-100 dark:bg-gray-800 hover:scale-105`}
                    aria-label={link.label}
                  >
                    {link.icon}
                    <span className="text-xs mt-1 font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className="w-full text-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 group"
              >
                <FileText size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Download Resume</span>
                <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            {/* Footer */}
            <div className="pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              <p>© 2024 John Doe. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Global Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        
        /* Focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        .dark *:focus-visible {
          outline-color: #60a5fa;
        }
      `}</style>
    </>
  );
};

export default NavBar;