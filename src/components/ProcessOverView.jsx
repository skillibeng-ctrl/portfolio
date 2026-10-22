import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProcessOverview = () => {
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const duration = 4000;
    const steps = 120;
    const interval = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const eased = 1 - Math.pow(1 - (currentStep / steps), 2.5);
      setProgress(Math.min(Math.floor(eased * 100), 100));
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
    
  //   const ctx = canvas.getContext('2d');
  //   let width = window.innerWidth;
  //   let height = window.innerHeight;
  //   let particles = [];
  //   let beams = [];
  //   let animationId;
    
  //   const resize = () => {
  //     width = window.innerWidth;
  //     height = window.innerHeight;
  //     canvas.width = width;
  //     canvas.height = height;
  //     initParticles();
  //   };
    
  //   const initParticles = () => {
  //     particles = [];
  //     beams = [];
  //     const particleCount = isMobile ? 30 : 60;
  //     const beamCount = isMobile ? 4 : 8;
      
  //     for (let i = 0; i < particleCount; i++) {
  //       particles.push({
  //         x: Math.random() * width,
  //         y: Math.random() * height,
  //         radius: Math.random() * 1.5,
  //         speedX: (Math.random() - 0.5) * 0.3,
  //         speedY: (Math.random() - 0.5) * 0.2,
  //         opacity: Math.random() * 0.3
  //       });
  //     }
      
  //     for (let i = 0; i < beamCount; i++) {
  //       beams.push({
  //         x: Math.random() * width,
  //         y: Math.random() * height,
  //         angle: Math.random() * Math.PI * 2,
  //         length: 100 + Math.random() * 150,
  //         speed: 0.3 + Math.random() * 0.5,
  //         opacity: 0.05 + Math.random() * 0.1,
  //         color: i % 2 === 0 ? '#a855f7' : '#6366f1'
  //       });
  //     }
  //   };
    
  //   const draw = () => {
  //     if (!ctx) return;
  //     ctx.clearRect(0, 0, width, height);
      
  //     beams.forEach(beam => {
  //       ctx.beginPath();
  //       ctx.moveTo(beam.x, beam.y);
  //       const endX = beam.x + Math.cos(beam.angle) * beam.length;
  //       const endY = beam.y + Math.sin(beam.angle) * beam.length;
  //       ctx.lineTo(endX, endY);
  //       ctx.strokeStyle = beam.color;
  //       ctx.lineWidth = 1.5;
  //       ctx.shadowBlur = 12;
  //       ctx.shadowColor = beam.color;
  //       ctx.stroke();
        
  //       beam.angle += beam.speed * 0.008;
  //       if (beam.angle > Math.PI * 2) beam.angle -= Math.PI * 2;
  //     });
  //     ctx.shadowBlur = 0;
      
  //     particles.forEach(p => {
  //       ctx.beginPath();
  //       ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  //       ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
  //       ctx.fill();
        
  //       p.x += p.speedX;
  //       p.y += p.speedY;
  //       if (p.x < 0) p.x = width;
  //       if (p.x > width) p.x = 0;
  //       if (p.y < 0) p.y = height;
  //       if (p.y > height) p.y = 0;
  //     });
      
  //     animationId = requestAnimationFrame(draw);
  //   };
    
  //   resize();
  //   initParticles();
  //   draw();
    
  //   window.addEventListener('resize', resize);
    
  //   return () => {
  //     window.removeEventListener('resize', resize);
  //     if (animationId) cancelAnimationFrame(animationId);
  //   };
  // }, [isMobile]);

  const getPhaseProgress = (idx) => {
    const thresholds = [25, 50, 75, 100];
    if (idx === 0) return Math.min(progress / 25 * 100, 100);
    return progress >= thresholds[idx - 1] ? Math.min((progress - thresholds[idx - 1]) / 25 * 100, 100) : 0;
  };

  const phases = [
    {
      number: "01",
      title: "Discovery",
      accent: "#6366f1",
      glow: "rgba(99, 102, 241, 0.15)",
      items: ["Requirements analysis", "User research", "Technical planning"]
    },
    {
      number: "02",
      title: "Design",
      accent: "#a855f7",
      glow: "rgba(168, 85, 247, 0.15)",
      items: ["Wireframing & prototyping", "UI component design", "Design system setup"]
    },
    {
      number: "03",
      title: "Build",
      accent: "#ec4899",
      glow: "rgba(236, 72, 153, 0.15)",
      items: ["Frontend development", "Backend & API", "Database architecture"]
    },
    {
      number: "04",
      title: "Launch",
      accent: "#14b8a6",
      glow: "rgba(20, 184, 166, 0.15)",
      items: ["Testing & QA", "Deployment & CI/CD", "Monitoring & iteration"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
  };

  return (
    <div ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#050508',
      overflow: 'hidden',
      fontFamily: "'Space Grotesk', 'Outfit', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        @media (max-width: 768px) {
          .phase-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .phase-card { border-right: none !important; }
        }
        
        @media (max-width: 480px) {
          .phase-grid { grid-template-columns: 1fr !important; }
          .pipeline-header { flex-direction: column; align-items: flex-start !important; }
          .progress-percent { font-size: 20px !important; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '40px 16px 80px' : '80px 24px 120px'
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '64px' }}
        >
          <motion.div variants={itemVariants} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(255, 255, 255, 0.02)', border: '0.5px solid rgba(255, 255, 255, 0.07)', borderRadius: '100px', marginBottom: '20px' }}>
            <motion.div
              animate={{ scale: progress < 100 ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 1.5, repeat: progress < 100 ? Infinity : 0, ease: "easeInOut" }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: progress < 100 ? '#a855f7' : '#14b8a6' }}
            />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '9px' : '11px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', color: progress < 100 ? '#a855f7' : '#14b8a6' }}>
              {progress < 100 ? 'Processing Build' : 'Ready for Launch'}
            </span>
          </motion.div>
          <motion.h2 variants={itemVariants} style={{
            fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(40px, 6vw, 72px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px'
          }}>
           My Development Process
          </motion.h2>
          <motion.p variants={itemVariants} style={{
            fontSize: isMobile ? '14px' : '18px',
            color: '#9ca3af',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.5,
            padding: '0 16px'
          }}>
            From concept to deployment — a streamlined, battle-tested workflow
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '0.5px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '20px',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{
            padding: isMobile ? '16px' : '20px 24px',
            borderBottom: '0.5px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: isMobile ? '10px' : '12px', height: isMobile ? '10px' : '12px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: isMobile ? '10px' : '12px', height: isMobile ? '10px' : '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: isMobile ? '10px' : '12px', height: isMobile ? '10px' : '12px', borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '10px' : '13px', color: '#6b7280' }}>pipeline.yml</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {progress < 100 && (
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '9px' : '11px', color: '#a855f7' }}
                >
                  █ building
                </motion.span>
              )}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '22px' : '28px', fontWeight: 600, color: '#ffffff', letterSpacing: '-0.02em' }}>
                {progress}%
              </span>
            </div>
          </div>

          <div style={{ padding: isMobile ? '12px 16px' : '16px 24px', borderBottom: '0.5px solid rgba(255, 255, 255, 0.07)' }}>
            <div style={{ height: isMobile ? '4px' : '6px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899, #14b8a6)',
                  borderRadius: '3px',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite'
                }} />
              </motion.div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              {phases.map((phase, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: progress >= (idx + 1) * 25 ? '#14b8a6' : 'rgba(255,255,255,0.1)' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '8px' : '10px', color: progress >= (idx + 1) * 25 ? '#14b8a6' : '#374151' }}>{phase.number}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="phase-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
            borderBottom: '0.5px solid rgba(255, 255, 255, 0.07)' 
          }}>
            {phases.map((phase, idx) => {
              const phaseProgress = getPhaseProgress(idx);
              const isActive = progress >= idx * 25 && progress < (idx + 1) * 25;
              const isComplete = progress >= (idx + 1) * 25;
              
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  style={{
                    padding: isMobile ? '20px' : '24px',
                    borderRight: !isMobile && idx < 3 ? '0.5px solid rgba(255, 255, 255, 0.07)' : 'none',
                    borderBottom: isMobile && idx < 3 ? '0.5px solid rgba(255, 255, 255, 0.07)' : 'none',
                    background: isActive ? `radial-gradient(circle at 50% 0%, ${phase.glow}, transparent)` : 'transparent',
                    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    cursor: 'pointer'
                  }}
                  whileHover={!isMobile ? { y: -4, scale: 1.005, transition: { duration: 0.3 } } : {}}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '10px' : '11px', fontWeight: 500, color: isComplete ? '#14b8a6' : isActive ? phase.accent : '#374151' }}>{phase.number}</span>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isComplete ? '#14b8a6' : isActive ? phase.accent : 'rgba(255,255,255,0.1)' }} />
                  </div>

                  <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 600, marginBottom: '12px', color: isComplete ? '#14b8a6' : isActive ? '#ffffff' : '#6b7280' }}>{phase.title}</h3>

                  <div style={{ height: '2px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '1px', marginBottom: '16px', overflow: 'hidden' }}>
                    <motion.div
                      animate={{ width: `${phaseProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{ height: '100%', backgroundColor: isComplete ? '#14b8a6' : phase.accent, borderRadius: '1px' }}
                    />
                  </div>

                  <ul style={{ listStyle: 'none', marginBottom: '16px' }}>
                    {phase.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isActive ? 1 : isComplete ? 0.6 : 0.4, x: 0 }}
                        transition={{ delay: 0.2 + (i * 0.05) }}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '8px' }}
                      >
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '9px' : '10px', color: isComplete ? '#14b8a6' : isActive ? phase.accent : '#374151' }}>
                          {isComplete ? '✓' : isActive ? '>' : '○'}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '10px' : '11px', color: isComplete ? '#9ca3af' : isActive ? '#d1d5db' : '#4b5563' }}>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div style={{ paddingTop: '12px', borderTop: '0.5px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '8px' : '9px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', color: isComplete ? '#14b8a6' : isActive ? phase.accent : '#374151' }}>
                      {isComplete ? '● Complete' : isActive ? '█ In Progress' : '○ Pending'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div style={{ padding: isMobile ? '12px 16px' : '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {progress < 100 ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    style={{ width: '10px', height: '10px', border: '1.5px solid rgba(168, 85, 247, 0.3)', borderTopColor: '#a855f7', borderRadius: '50%' }}
                  />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '9px' : '11px', color: '#6b7280' }}>Executing build pipeline — {Math.floor(progress)}% complete</span>
                </>
              ) : (
                <>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#14b8a6', boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)' }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '9px' : '11px', color: '#14b8a6' }}>Build successful ✓</span>
                </>
              )}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: isMobile ? '9px' : '10px', color: '#374151' }}>
              {progress < 100 ? `${(4 - (progress / 100) * 4).toFixed(1)}s remaining` : '0.0s'}
            </span>
          </div>
        </motion.div>

        {progress >= 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ textAlign: 'center', marginTop: isMobile ? '32px' : '48px' }}
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: isMobile ? '10px 24px' : '14px 32px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                border: '0.5px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '100px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: isMobile ? '13px' : '15px',
                color: '#ffffff',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProcessOverview;