import { useEffect, useState, useCallback } from "react";
import { 
  ArrowUp, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "GitHub", href: "https://github.com", icon: Github },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Web Development",
  "UI/UX Design",
  "SaaS Development",
  "Free Audit",
  "Consultation",
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ 
      top: 0, 
      behavior: prefersReducedMotion ? "auto" : "smooth" 
    });
  }, []);

  return (
    <footer className="relative bg-[#0a0a1a] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Subtle cosmic overlay - matches hero */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-sm"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <nav aria-label="Footer Quick Links" className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="hover:text-purple-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-sm"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: Services */}
        <nav aria-label="Footer Services" className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {services.map((service) => (
              <li key={service}>
                <a 
                  href="#" 
                  className="hover:text-cyan-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 4: Contact */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-gray-400 text-sm mb-6">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Mail className="w-5 h-5 text-purple-400" aria-hidden="true" />
              <a 
                href="mailto:sbend944@email.com" 
                className="hover:text-purple-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-sm"
              >
                sbend944@email.com
              </a>
            </li>
          </ul>
          
          <Button asChild className="w-full md:w-auto rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-purple-900/30">
            <a href="#contact">
              Book Free Audit <span aria-hidden="true" className="ml-2">→</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} skilli. All rights reserved.</p>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl transition-all duration-300 hover:bg-white/20 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
}