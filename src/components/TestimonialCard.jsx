import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const testimonials = [
  {
    name: "Startup Founder",
    role: "SaaS Practice Project",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "Drev was reliable and detail-oriented throughout the project. He communicated clearly and delivered features exactly as discussed.",
    highlights: ["Clear communication", "Problem solving", "Clean code"],
    project: "SaaS MVP"
  },
  {
    name: "Product Manager",
    role: "UI/UX Collaboration",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "Working with Drev was smooth from start to finish. He asked the right questions and translated designs into solid, responsive components.",
    highlights: ["UI implementation", "Responsiveness", "Frontend logic"],
    project: "Web App Interface"
  },
  {
    name: "Peer Developer",
    role: "Code Review & Pair Programming",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "Drev writes readable, well-structured code and is always open to feedback. A great teammate to collaborate with.",
    highlights: ["Code quality", "Collaboration", "Best practices"],
    project: "React Application"
  },
  {
    name: "Design Collaborator",
    role: "Personal Project",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 5,
    text: "Drev has a strong eye for detail and consistency. He brought the designs to life while keeping performance in mind.",
    highlights: ["Design accuracy", "Performance", "Consistency"],
    project: "Portfolio Website"
  },
  {
    name: "Open Source Contributor",
    role: "Community Feedback",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "Drev’s contributions were thoughtful and well-documented. His commits were clean and easy to review.",
    highlights: ["Documentation", "Git workflow", "Code clarity"],
    project: "Open Source Project"
  },
  {
    name: "Project Reviewer",
    role: "Code Assessment",
    avatar: "https://i.pravatar.cc/150?img=6",
    rating: 5,
    text: "Drev demonstrated strong fundamentals and a structured approach to solving problems. Solid execution overall.",
    highlights: ["Logical thinking", "Structure", "Reliability"],
    project: "Full-Stack Assessment"
  }
];


  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((i) => (i + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        next();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const visibleTestimonials = isMobile 
    ? [testimonials[activeIndex]]
    : testimonials.slice(activeIndex, activeIndex + 3).length === 3
      ? testimonials.slice(activeIndex, activeIndex + 3)
      : [...testimonials.slice(activeIndex), ...testimonials.slice(0, 3 - testimonials.slice(activeIndex).length)];

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-black via-gray-900/90 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
              Client Feedback
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Say</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real feedback from real projects
          </p>
        </div>

        {/* Desktop: 3-column slider */}
        {!isMobile ? (
          <div className="relative">
            <div className="flex gap-6 lg:gap-8 transition-transform duration-500 ease-out">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-1 min-w-0 transition-all duration-500 ${
                    index === 1 ? "scale-105 z-10" : "scale-95 opacity-90"
                  }`}
                >
                  <div className="h-full group">
                    {/* Card glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                    
                    {/* Main card */}
                    <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-800/50 p-6 md:p-8 text-gray-300 backdrop-blur-sm shadow-xl">
                      {/* Quote icon */}
                      <div className="absolute top-6 right-6 opacity-10">
                        <Quote className="w-8 h-8 text-blue-400" />
                      </div>

                      {/* Avatar & Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur opacity-70" />
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="relative w-12 h-12 rounded-full object-cover border-2 border-gray-900"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-blue-400 font-medium">{testimonial.role}</p>
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Text */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>

                      {/* Project highlight */}
                      <div className="pt-6 border-t border-gray-800/50">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                          Project
                        </p>
                        <p className="text-sm font-medium text-white">
                          {testimonial.project}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <button
              onClick={prev}
              disabled={isAnimating}
              className="absolute -left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300 z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={next}
              disabled={isAnimating}
              className="absolute -right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300 z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        ) : (
          // Mobile: Single testimonial
          <div className="relative">
            <div className="group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-emerald-500/20 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
              
              <div className="relative rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-800/50 p-6 text-gray-300 backdrop-blur-sm shadow-xl">
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-8 h-8 text-blue-400" />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur opacity-70" />
                    <img
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      className="relative w-12 h-12 rounded-full object-cover border-2 border-gray-900"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-blue-400 font-medium">{testimonials[activeIndex].role}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonials[activeIndex].text}"
                </p>

                <div className="pt-6 border-t border-gray-800/50">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                    Project
                  </p>
                  <p className="text-sm font-medium text-white">
                    {testimonials[activeIndex].project}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prev}
                disabled={isAnimating}
                className="p-2 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => !isAnimating && setActiveIndex(i)}
                    className={`transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-gradient-to-r from-blue-500 to-emerald-400"
                        : "w-1.5 bg-gray-700"
                    } h-1.5 rounded-full`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={isAnimating}
                className="p-2 rounded-full bg-black/80 backdrop-blur-sm border border-gray-700 hover:bg-blue-900/40 hover:border-blue-500 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
            <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
            <div className="text-gray-400 text-sm mt-1">Client Satisfaction</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
            <div className="text-2xl md:text-3xl font-bold text-white">5.0</div>
            <div className="text-gray-400 text-sm mt-1">Average Rating</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
            <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
            <div className="text-gray-400 text-sm mt-1">Projects</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/50">
            <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
            <div className="text-gray-400 text-sm mt-1">Support</div>
          </div>
        </div>

        {/* Auto-rotate indicator */}
        {/* <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Auto-rotates every 8 seconds • Click dots to navigate
          </p>
        </div> */}
      </div>
    </section>
  );
}