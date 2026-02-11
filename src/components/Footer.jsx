// Footer.jsx
import { useEffect, useState } from 'react';
import { 
  ArrowUpIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-950/95 border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle cosmic overlay - matches hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(236,72,153,0.06),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Column 1: Brand + Tagline */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Drevlorn
          </h3>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Full-stack & UI/UX specialist turning entrepreneurial dreams into high-performance digital reality.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex justify-center md:justify-start gap-5">
            {[
              { name: 'LinkedIn', href: '#', icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.882v1.509h.041c.401-.757 1.381-1.557 2.837-1.557 3.033 0 3.597 1.997 3.597 4.597v6.451z"/>
                </svg>
              )},
              { name: 'Twitter/X', href: '#', icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              )},
              { name: 'GitHub', href: '#', icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              )},
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {['Home', 'About', 'Projects', 'Services', 'Contact'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="hover:text-purple-400 transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {['Web Development', 'UI/UX Design', 'SaaS Development', 'Free Audit', 'Consultation'].map((service) => (
              <li key={service}>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <EnvelopeIcon className="w-5 h-5 text-purple-400" />
              <a href="mailto:hello@skilli.dev" className="hover:text-purple-400 transition-colors">
                sbend944@email.com
              </a>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              {/* <MapPinIcon className="w-5 h-5 text-pink-400" /> */}
              {/* <span>Lagos, Nigeria</span> */}
            </li>
          </ul>
          <a
            href="#contact"
            className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-purple-900/30 transition-all"
          >
            Book Free Audit →
          </a>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="relative z-10 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} skilli. All rights reserved.</p>
      </div>
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl transition-all duration-300 hover:bg-white/20 hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>

      {/* Optional: extra subtle style keyframes if needed */}
      <style jsx>{`
        /* You can add more animations here if desired */
      `}</style>
    </footer>
  );
}