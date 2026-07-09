// src/components/PortfolioLoader.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PortfolioLoader = ({ 
  redirectTo = '/',
  onComplete,
  messages = [
    'Initializing',
    'Loading assets',
    'Preparing experience', 
    'Almost ready'
  ],
  minDisplayTime = 2000,
  maxDisplayTime = 8000
}) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingStage, setLoadingStage] = useState('resources');
  const navigate = useNavigate();
  const startTimeRef = useRef(Date.now());
  const resourcesLoadedRef = useRef(false);
  const minimumTimeReachedRef = useRef(false);

  // Track actual resource loading
  useEffect(() => {
    const trackResourceLoading = () => {
      // Get all resources on the page
      const resources = performance.getEntriesByType('resource');
      const navigationEntries = performance.getEntriesByType('navigation');
      
      if (resources.length === 0) {
        // No resources yet, set initial progress
        setProgress(5);
        return;
      }

      const totalResources = resources.length;
      const loadedResources = resources.filter(entry => {
        // Check if resource has finished loading
        return entry.responseEnd > 0 || entry.transferSize > 0;
      }).length;

      // Calculate progress based on loaded resources
      const resourceProgress = (loadedResources / totalResources) * 70; // Resources account for 70% of total progress
      
      setProgress(prev => {
        const newProgress = Math.max(prev, Math.round(resourceProgress));
        return Math.min(newProgress, 100);
      });

      // Update loading stage based on progress
      if (resourceProgress > 60) {
        setLoadingStage('finalizing');
        setCurrentMessage(3);
      } else if (resourceProgress > 40) {
        setLoadingStage('preparing');
        setCurrentMessage(2);
      } else if (resourceProgress > 20) {
        setLoadingStage('assets');
        setCurrentMessage(1);
      }

      // Check if all resources are loaded
      if (loadedResources === totalResources && totalResources > 0) {
        resourcesLoadedRef.current = true;
        checkCompletion();
      }
    };

    // Use MutationObserver to detect DOM changes (new resources being added)
    const observer = new MutationObserver(() => {
      trackResourceLoading();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'href']
    });

    // Initial check
    trackResourceLoading();
    
    // Periodic check for dynamically loaded resources
    const interval = setInterval(trackResourceLoading, 200);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Handle minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      minimumTimeReachedRef.current = true;
      checkCompletion();
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  // Handle maximum display time (failsafe)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isComplete) {
        // Force complete if taking too long
        setProgress(100);
        resourcesLoadedRef.current = true;
        minimumTimeReachedRef.current = true;
        checkCompletion();
      }
    }, maxDisplayTime);

    return () => clearTimeout(timer);
  }, [maxDisplayTime, isComplete]);

  // Check if we should complete the loading
  const checkCompletion = useCallback(() => {
    if (resourcesLoadedRef.current && minimumTimeReachedRef.current && !isComplete) {
      finishLoading();
    }
  }, [isComplete]);

  // Smooth progress animation for the remaining progress
  useEffect(() => {
    if (resourcesLoadedRef.current && !isComplete) {
      // Animate from current progress to 100%
      const animateToCompletion = () => {
        setProgress(prev => {
          const next = prev + 2;
          if (next >= 100) {
            return 100;
          }
          requestAnimationFrame(animateToCompletion);
          return next;
        });
      };
      
      requestAnimationFrame(animateToCompletion);
    }
  }, [resourcesLoadedRef.current, isComplete]);

  // Handle loading completion
  const finishLoading = useCallback(() => {
    setIsComplete(true);
    setProgress(100);
    
    if (typeof onComplete === 'function') {
      onComplete();
    }
    
    // Start exit animation
    setTimeout(() => {
      setIsVisible(false);
      
      // Navigate after exit animation
      setTimeout(() => {
        navigate(redirectTo);
      }, 600);
    }, 500);
  }, [onComplete, navigate, redirectTo]);

  // Handle escape key to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isComplete) {
        resourcesLoadedRef.current = true;
        minimumTimeReachedRef.current = true;
        finishLoading();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, finishLoading]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950 flex items-center justify-center z-50 transition-opacity duration-600 ${
        isComplete ? 'opacity-0' : 'opacity-100'
      }`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label={`Loading portfolio: ${Math.round(progress)}% complete`}
    >
      {/* Background particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00ff41]/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8 w-full px-6 max-w-2xl">
        {/* Tech circle decoration */}
        <div className="relative w-24 h-24 mb-4">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-2 border-[#00ff41]/20 rounded-full animate-spin-slow" />
          
          {/* Inner rotating ring (opposite direction) */}
          <div className="absolute inset-2 border border-[#00ff41]/30 rounded-full animate-spin-slow-reverse" />
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#00ff41] rounded-full animate-pulse"
                 style={{ boxShadow: '0 0 20px #00ff41, 0 0 40px #00ff4144' }} />
          </div>
          
          {/* Progress arc */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="45"
              fill="none"
              stroke="#00ff41"
              strokeWidth="2"
              strokeDasharray={`${(progress / 100) * 283} 283`}
              strokeLinecap="round"
              className="transition-all duration-300"
              style={{ filter: 'drop-shadow(0 0 8px #00ff41)' }}
            />
          </svg>
        </div>

        {/* Loading Bar Container */}
        <div className="relative w-full">
          {/* Stage indicators */}
          <div className="flex justify-between mb-4 px-1">
            {['Init', 'Assets', 'Ready', 'Done'].map((stage, index) => (
              <div key={stage} className="flex flex-col items-center gap-1">
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    (index === 0 && progress >= 0) ||
                    (index === 1 && progress >= 25) ||
                    (index === 2 && progress >= 50) ||
                    (index === 3 && progress >= 75)
                      ? 'bg-[#00ff41] shadow-lg shadow-[#00ff41]/50'
                      : 'bg-gray-800'
                  }`} 
                />
                <span className={`text-[10px] transition-colors duration-500 ${
                  (index === 0 && progress >= 0) ||
                  (index === 1 && progress >= 25) ||
                  (index === 2 && progress >= 50) ||
                  (index === 3 && progress >= 75)
                    ? 'text-[#00ff41]'
                    : 'text-gray-600'
                }`}>
                  {stage}
                </span>
              </div>
            ))}
          </div>

          {/* Main progress bar */}
          <div className="relative w-full">
            <div className="w-full h-[3px] bg-gray-900 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-800/50" />
              
              <div 
                className="h-full rounded-full relative transition-all duration-300 ease-out"
                style={{ 
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00ff41 0%, #00cc33 100%)',
                  boxShadow: '0 0 20px #00ff41, 0 0 40px #00ff4144, inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                
                {/* Leading edge */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-[#00ff41] blur-[2px]" />
              </div>
            </div>
            
            {/* Tick marks */}
            <div className="absolute inset-0 flex justify-between px-0.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-px h-2 bg-gray-800/50 mt-0.5" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="text-center space-y-3">
          <h2 
            className="text-xl md:text-2xl font-light tracking-wider text-gray-300"
            aria-live="polite"
          >
            <span className="inline-block min-w-[200px]">
              {messages[currentMessage]}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff41] ml-3 animate-pulse align-middle" />
          </h2>
          
          {/* Progress percentage with resource count */}
          <div className="font-mono text-sm tracking-wider space-x-1">
            <span 
              className="text-[#00ff41] inline-block min-w-[3ch] text-right"
              style={{ textShadow: '0 0 15px #00ff41' }}
            >
              {Math.round(progress)}
            </span>
            <span className="text-gray-500">%</span>
            
            {loadingStage === 'resources' && (
              <span className="text-gray-600 text-xs ml-2">
                ({performance.getEntriesByType('resource').length} resources)
              </span>
            )}
          </div>
          
          {/* Skip hint */}
          {progress < 90 && (
            <p className="text-xs text-gray-700 mt-4 opacity-0 animate-fadeIn animation-delay-2000">
              Press <kbd className="px-2 py-0.5 text-xs bg-gray-900 border border-gray-800 rounded text-gray-500">Esc</kbd> to skip
            </p>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 6s linear infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .transition-opacity {
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .duration-600 {
          transition-duration: 600ms;
        }
      `}</style>
    </div>
  );
};

PortfolioLoader.propTypes = {
  redirectTo: PropTypes.string,
  onComplete: PropTypes.func,
  messages: PropTypes.arrayOf(PropTypes.string),
  minDisplayTime: PropTypes.number,
  maxDisplayTime: PropTypes.number
};

PortfolioLoader.defaultProps = {
  redirectTo: '/',
  minDisplayTime: 2000,
  maxDisplayTime: 8000,
  messages: [
    'Initializing',
    'Loading assets',
    'Preparing experience',
    'Almost ready'
  ]
};

export default PortfolioLoader;