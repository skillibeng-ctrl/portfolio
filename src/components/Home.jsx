import profile from "../components/man.webp";
import { useEffect, useState } from "react";
import StarsBG from "./StarsBG";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for entrance animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    
   <section className="relative min-h-[120vh] text-white overflow-hidden">

      <StarsBG/>
      {/* Background layers – more controlled */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.12),transparent_60%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.08),transparent_60%)] animate-pulse-slower" />
        
        {/* Very subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 md:pt-32 pb-16 md:pb-24 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-24">
        
        {/* LEFT – Content */}
        <div className={`max-w-2xl lg:max-w-xl xl:max-w-2xl text-center lg:text-left transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          
          {/* Availability badge */}
          <div className="inline-flex items-center mb-6 md:mb-8 animate-fade-in-up">
            <div className="relative mr-3">
              <div className="absolute -inset-1 bg-green-500/40 rounded-full blur-sm animate-ping-slow" />
              <div className="relative w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <span className="px-5 py-2 rounded-full bg-white/6 backdrop-blur-md border border-white/10 text-sm font-medium text-gray-200 hover:border-white/20 transition-colors">
              Available for select projects
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Helping Entrepreneurs
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Turn Dreams Into Reality
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-300/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Full-stack developer & UI/UX specialist crafting high-performance digital products 
            that drive growth and deliver exceptional user experiences.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-indigo-900/30 hover:shadow-indigo-600/40 hover:scale-[1.02] transition-all duration-300">
              Start Your Project
              <svg className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button className="group px-8 py-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]">
              View Portfolio
              <svg className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-6">
            {[
              { value: "40+", label: "Happy Clients" },
              { value: "50+", label: "Projects Delivered" },
              { value: "3+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Trust / social badges */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
            {[
              { label: "LinkedIn", icon: "linkedin" },
              { label: "Book Free UX Audit", icon: "🎯" },
              { label: "Awwwards", icon: "🏆" },
              // { label: "Google Business", icon: "📈" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
              >
                {item.icon !== "linkedin" ? (
                  <span>{item.icon}</span>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.029-3.058-1.867-3.058-1.867 0-2.152 1.459-2.152 2.966v5.696h-3v-11h2.882v1.509h.041c.401-.757 1.381-1.557 2.837-1.557 3.033 0 3.597 1.997 3.597 4.597v6.451z"/>
                  </svg>
                )}
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT – Profile Image */}
        <div className={`relative transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <div className="relative group max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg mx-auto lg:mx-0">
            {/* Subtle glow */}
            <div className="absolute -inset-6 md:-inset-8 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
            
            {/* Image */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl shadow-black/40">
              <img
                src={profile}
                alt="Profile"
                className="w-full aspect-[4/5] object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              {/* Soft vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Floating badges – more subtle */}
            <div className="absolute -top-5 -right-3 sm:-right-5 bg-black/60 backdrop-blur-lg rounded-xl px-4 py-2.5 text-xs shadow-xl border border-white/10 animate-float">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-200">4.9 • 40+ clients</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-3 bg-black/60 backdrop-blur-lg rounded-xl px-4 py-2 text-xs border border-white/10 shadow-xl animate-float-delay">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse delay-300" />
                </div>
                <span className="text-gray-200">Full-Stack • UI/UX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes pulse-slow  { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes pulse-slower { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.55; } }
        @keyframes ping-slow   { 75%, 100% { transform: scale(2); opacity: 0; } }

        .animate-fade-in-up   { animation: fade-in-up 1.2s ease-out forwards; }
        .animate-gradient-x   { animation: gradient-x 8s ease infinite; background-size: 200% auto; }
        .animate-float        { animation: float 6s ease-in-out infinite; }
        .animate-float-delay  { animation: float 6s ease-in-out infinite 1.5s; }
        .animate-pulse-slow   { animation: pulse-slow 12s infinite; }
        .animate-pulse-slower { animation: pulse-slower 18s infinite; }
        .animate-ping-slow    { animation: ping-slow 3s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </section>
  );
}