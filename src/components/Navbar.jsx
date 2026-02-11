import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Github, Linkedin, Twitter, Mail, ExternalLink, FileText, Moon, Sun } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [isResumeHovered, setIsResumeHovered] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Theme handling
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

  // Scroll handling with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close menu when clicking outside
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { id: 'home', label: 'Home', icon: '' },
    { id: 'about', label: 'About', icon: '' },
    { id: 'projects', label: 'Projects', icon: '' },
    { id: 'skills', label: 'Skills', icon: '' },
    { id: 'contact', label: 'Contact', icon: '' },
  ];

  const socialLinks = [
    { 
      icon: <Github size={20} />, 
      href: 'https://github.com/yourusername', 
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
    },
    { 
      icon: <Linkedin size={20} />, 
      href: 'https://linkedin.com/in/yourusername', 
      label: 'LinkedIn',
      color: 'hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    { 
      icon: <Twitter size={20} />, 
      href: 'https://twitter.com/yourusername', 
      label: 'Twitter',
      color: 'hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/20'
    },
    { 
      icon: <Mail size={20} />, 
      href: 'mailto:hello@example.com', 
      label: 'Email',
      color: 'hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash without jumping
      window.history.pushState(null, null, `#${id}`);
      
      setIsOpen(false);
    }
  };

  const handleResumeClick = () => {
    // Optional: Add analytics tracking here
    console.log('Resume downloaded');
    // You can also use your analytics service like:
    // gtag('event', 'download_resume', { method: 'navbar' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg py-3 border-b border-gray-200 dark:border-gray-800'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with animated gradient */}
            <button
              onClick={() => scrollToSection('home')}
              className="group relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              aria-label="Go to homepage"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-500 group-hover:scale-105" />
              <div className="relative px-4 py-2.5 bg-white dark:bg-gray-900 rounded-lg flex items-center space-x-2 transition-all duration-300 group-hover:scale-[1.02]">
                <span className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">
                  &lt;D<span className="text-blue-600 dark:text-blue-400">rev</span>/&gt;
                </span>
              </div>
            </button>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center space-x px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text- font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-full" />
                  )}
                </button>
              ))}
              <div className="flex items-center space-x-3 border-l border-gray-300 dark:border-gray-700 pl-6 ml-6">
                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    scrolled
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      : 'bg-white/20 dark:bg-gray-800/50 text-white dark:text-gray-300'
                  } hover:scale-105`}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Social Links */}
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`p-2 rounded-lg transition-all duration-300 ${link.color} ${
                      scrolled
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        : 'bg-white/20 dark:bg-gray-800/50 text-white dark:text-gray-400'
                    }`}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}

                {/* Resume Button */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleResumeClick}
                  onMouseEnter={() => setIsResumeHovered(true)}
                  onMouseLeave={() => setIsResumeHovered(false)}
                  className="group relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 flex items-center space-x-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center space-x-2">
                    <FileText size={18} className="transition-transform duration-300 group-hover:rotate-12" />
                    <span>Resume</span>
                    <ExternalLink 
                      size={16} 
                      className={`transition-transform duration-300 ${
                        isResumeHovered ? 'translate-x-1' : ''
                      }`}
                    />
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2.5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                scrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-white/20 dark:bg-gray-800/50 text-white dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50'
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
        style={{ top: scrolled ? '64px' : '80px' }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-[calc(100vh-80px)] overflow-y-auto transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } bg-white dark:bg-gray-900 shadow-2xl`}
        >
          <div className="p-6 space-y-2">
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <span className="ml-auto w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}

            {/* Mobile Theme Toggle */}
            <div className="pt-6">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  {darkMode ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
                  <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <div className="w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative">
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                    darkMode ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </div>
              </button>
            </div>

            {/* Mobile Social Links */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 px-2">
                Connect with me
              </p>
              <div className="grid grid-cols-4 gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${link.color} bg-gray-100 dark:bg-gray-800`}
                    aria-label={link.label}
                  >
                    {link.icon}
                    <span className="text-xs mt-2 font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Resume Button */}
            <div className="pt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                className=" w-full text-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <FileText size={20} />
                <span>Download Resume</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add smooth scrolling to the entire page */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
};

export default NavBar;