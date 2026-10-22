// src/components/TestimonialsSection.jsx
import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// ============================================================================
// REAL TESTIMONIAL DATA
// ============================================================================

const testimonials = [
  {
    id: 1,
    name: "Project Collaborator",
    role: "Developer, Project Collaboration",
    text: "Clear communication, reliable delivery, and solid engineering. Working with Drev felt like having an experienced teammate, not just a freelancer.",
    highlight: "Communication & Reliability"
  },
  {
    id: 2,
    name: "Backend Developer",
    role: "Developer, Backend Architecture",
    text: "Drev helped me refactor a messy API and set up proper error handling. He didn't just fix the issues—he showed me why the changes mattered. The code's been running smoothly ever since.",
    highlight: "Backend Architecture"
  },
  {
    id: 3,
    name: "Frontend Developer",
    role: "Developer, Frontend Implementation",
    text: "I had a design but struggled to bring it to life. Drev turned it into a clean, responsive interface faster than I expected. He explained his decisions along the way, which helped me improve my own frontend skills.",
    highlight: "Frontend Implementation"
  },
  {
    id: 4,
    name: "Database Developer",
    role: "Developer, Database Optimization",
    text: "Our queries were slowing everything down. Drev restructured the database, added proper indexing, and walked me through the changes. Performance improved immediately, and I actually understood what he did.",
    highlight: "Database Optimization"
  }
];

// ============================================================================
// MEMOIZED STAR RATING
// ============================================================================

const StarRating = memo(() => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
));

StarRating.displayName = 'StarRating';

// ============================================================================
// MEMOIZED TESTIMONIAL CARD
// ============================================================================

const TestimonialCard = memo(({ testimonial, isActive }) => (
  <motion.div 
    className={`
      flex-shrink-0 w-full px-2
      transition-all duration-500 ease-out
      ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}
    `}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm border border-blue-500/20 p-6 md:p-8 shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
      
      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="w-12 h-12 text-blue-400" />
      </div>

      {/* Stars */}
      <StarRating />

      {/* Text */}
      <blockquote className="text-gray-300 text-sm md:text-base leading-relaxed mt-4 mb-6">
        "{testimonial.text}"
      </blockquote>

      {/* Divider */}
      <div className="border-t border-blue-500/20 pt-5">
        {/* Highlight tag */}
        <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400 font-medium mb-3">
          {testimonial.highlight}
        </div>
        
        {/* Name & Role */}
        <p className="text-white font-semibold text-sm">{testimonial.name}</p>
        <p className="text-gray-500 text-xs mt-0.5">{testimonial.role}</p>
      </div>
    </div>
  </motion.div>
));

TestimonialCard.displayName = 'TestimonialCard';

// ============================================================================
// MEMOIZED DOT INDICATOR
// ============================================================================

const DotButton = memo(({ active, onClick }) => (
  <button
    onClick={onClick}
    className={`transition-all duration-300 rounded-full ${
      active 
        ? 'w-8 h-1.5 bg-gradient-to-r from-blue-500 to-blue-400' 
        : 'w-1.5 h-1.5 bg-gray-700 hover:bg-gray-500'
    }`}
    aria-label="Go to testimonial"
  />
));

DotButton.displayName = 'DotButton';

// ============================================================================
// MEMOIZED STAT CARD
// ============================================================================

const StatCard = memo(({ value, label }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="text-center p-4 rounded-xl bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
  >
    <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
    <div className="text-gray-400 text-sm mt-1">{label}</div>
  </motion.div>
));

StatCard.displayName = 'StatCard';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = testimonials.length;

  // Auto-rotate with pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  return (
    <section 
      className="relative w-full py-16 md:py-24 bg-black overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500" />
            <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase">
              Testimonials
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">What Developers </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Say
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto rounded-full" />
          
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mt-4">
            Real feedback from developers I've worked with
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="relative">
          
          {/* Cards container - Single card view */}
          <div className="overflow-hidden">
            <div className="flex justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`
                    transition-all duration-500 ease-out
                    ${index === activeIndex ? 'block w-full' : 'hidden'}
                  `}
                >
                  <TestimonialCard 
                    testimonial={testimonial}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500 hover:bg-blue-900/30 transition-all duration-200 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-blue-500/30 hover:border-blue-500 hover:bg-blue-900/30 transition-all duration-200 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <DotButton
              key={index}
              active={index === activeIndex}
              onClick={() => goTo(index)}
            />
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard value="100%" label="Client Satisfaction" />
          <StatCard value="5.0" label="Average Rating" />
          <StatCard value="8+" label="Technologies" />
          <StatCard value="100%" label="On-Time Delivery" />
        </div>
      </div>
    </section>
  );
}