import React, { useState, useEffect } from 'react';

const ProcessOverview = () => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      const duration = 4000;
      const steps = 100;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const easedProgress = 1 - Math.pow(1 - (currentStep / steps), 2);
        setProgress(Math.min(Math.floor(easedProgress * 100), 100));
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    };

    const timer = setTimeout(startAnimation, 300);
    return () => clearTimeout(timer);
  }, []);

  const getCompletionStatus = (phaseItem) => {
    if (phaseItem <= 3) {
      const itemProgress = (phaseItem * 15);
      return progress >= itemProgress;
    } else {
      const itemProgress = 45 + ((phaseItem - 4) * 18.33);
      return progress >= itemProgress;
    }
  };

  const designItems = [
    { id: 1, title: "User Research" },
    { id: 2, title: "Wireframing" },
    { id: 3, title: "UI Design" }
  ];

  const developmentItems = [
    { id: 4, title: "Frontend" },
    { id: 5, title: "Backend" },
    { id: 6, title: "Testing" }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center justify-center px-4 py-12">
      {/* Small tag above headline */}
      <div className="mb-3">
        <span className="px-3 py-1 bg-gray-900 text-indigo-300 text-xs font-medium rounded-full border border-indigo-500/30">
          Our Expertise
        </span>
      </div>

      {/* Main headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
        Full-Stack<span className="text-indigo-400"> Design</span> Expertise
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-gray-400 text-center max-w-2xl mb-10 leading-relaxed">
        Delivering <span className="text-white font-medium">measurable results</span> through strategic thinking and technical excellence
      </p>

      {/* Main card / container - Reduced width */}
      <div className="w-full max-w-4xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Top bar with status */}
        <div className="px-6 pt-5 pb-3 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-indigo-500 animate-pulse' : 'bg-gray-600'}`}></div>
            <span className="text-indigo-300 font-medium text-sm flex items-center gap-1">
              {progress < 100 ? (
                <>
                  <span className={isAnimating ? 'animate-pulse' : ''}>Designing in Progress...</span>
                </>
              ) : (
                <span className="text-green-400">✓ Completed</span>
              )}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xl font-bold text-indigo-400 transition-all duration-300 ease-out">
              {progress}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600 transition-all duration-300 ease-out"
              style={{ 
                width: `${progress}%`,
                opacity: isAnimating ? 1 : 0
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Design Phase</span>
            <span>Development Phase</span>
          </div>
        </div>

        {/* Phases content - Adjusted spacing */}
        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Left - Design Phase */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${progress >= 45 ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                <span className={`text-lg ${progress >= 45 ? 'text-green-400' : 'text-blue-400'}`}>
                  {progress >= 45 ? '✅' : '✨'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-300">Design Phase</h3>
                <p className="text-xs text-gray-500">{progress >= 45 ? 'Completed' : progress >= 15 ? 'In Progress' : 'Starting...'}</p>
              </div>
            </div>

            <ul className="space-y-3 text-gray-300">
              {designItems.map((item) => {
                const isComplete = getCompletionStatus(item.id);
                return (
                  <li key={item.id} className="flex items-center gap-2 group">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isComplete ? 'bg-green-500/20 border border-green-500/30' : 'bg-gray-800 border border-gray-700'
                    }`}>
                      {isComplete ? (
                        <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      )}
                    </div>
                    <span className={`text-sm transition-all duration-300 ${isComplete ? 'text-green-300' : ''}`}>
                      {item.title}
                    </span>
                    {progress >= (item.id * 15) && progress < (item.id * 15 + 15) && (
                      <span className="text-xs text-indigo-400 animate-pulse ml-auto">
                        {progress}%
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right - Development Phase */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${progress >= 100 ? 'bg-green-500/20' : 'bg-purple-500/20'}`}>
                <span className={`text-lg ${progress >= 100 ? 'text-green-400' : 'text-purple-400'}`}>
                  {progress >= 100 ? '✅' : '⚡'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-300">Development Phase</h3>
                <p className="text-xs text-gray-500">
                  {progress >= 100 ? 'Completed' : progress >= 45 ? 'In Progress' : 'Pending'}
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-gray-300">
              {developmentItems.map((item) => {
                const isComplete = getCompletionStatus(item.id);
                const isActive = !isComplete && getCompletionStatus(item.id - 1);
                
                return (
                  <li key={item.id} className="flex items-center gap-2 group">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isComplete ? 'bg-green-500/20 border border-green-500/30' : 
                      isActive ? 'bg-purple-500/20 border border-purple-500/30 animate-pulse' : 
                      'bg-gray-800 border border-gray-700'
                    }`}>
                      {isComplete ? (
                        <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : isActive ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      )}
                    </div>
                    <span className={`text-sm transition-all duration-300 ${
                      isComplete ? 'text-green-300' : 
                      isActive ? 'text-purple-300' : ''
                    }`}>
                      {item.title}
                    </span>
                    {isActive && (
                      <span className="text-xs text-purple-400 animate-pulse ml-auto">
                        {progress}%
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom gradient line - thinner */}
        <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
          {isAnimating && progress < 100 && (
            <div 
              className="absolute top-0 h-full w-6 bg-white/30 rounded-full blur-sm transition-all duration-300 ease-out"
              style={{ 
                left: `${progress}%`,
                transform: 'translateX(-50%)'
              }}
            />
          )}
        </div>
      </div>

      {/* Smaller restart button */}
      {/* {progress >= 100 && (
        <button
          onClick={() => {
            setProgress(0);
            setTimeout(() => {
              const startAnimation = () => {
                setIsAnimating(true);
                const duration = 4000;
                const steps = 100;
                const interval = duration / steps;

                let currentStep = 0;
                const timer = setInterval(() => {
                  currentStep++;
                  const easedProgress = 1 - Math.pow(1 - (currentStep / steps), 2);
                  setProgress(Math.min(Math.floor(easedProgress * 100), 100));
                  
                  if (currentStep >= steps) {
                    clearInterval(timer);
                  }
                }, interval);

                return () => clearInterval(timer);
              };
              startAnimation();
            }, 300);
          }}
          className="mt-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Restart Animation
        </button>
      )} */}
    </div>
  );
};

export default ProcessOverview;