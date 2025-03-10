'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SecretLogoPage() {
  const [intensity, setIntensity] = useState(0.5);
  const [hue, setHue] = useState(270); // Changed to purple base hue
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExploding, setIsExploding] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Show grid after a delay
    const timer = setTimeout(() => {
      setShowGrid(true);
    }, 500);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);
  
  // Pulsing effect
  useEffect(() => {
    const intensityInterval = setInterval(() => {
      setIntensity(prev => {
        const newValue = prev + (Math.random() * 0.1 - 0.05);
        return Math.max(0.3, Math.min(0.8, newValue));
      });
    }, 100);
    
    // Subtle hue shift effect
    const hueInterval = setInterval(() => {
      setHue(prev => {
        // Shift between 260 (deep purple) and 280 (bright purple)
        const newHue = prev + (Math.random() * 1 - 0.5);
        return newHue > 280 ? 260 : newHue < 260 ? 280 : newHue;
      });
    }, 200);
    
    return () => {
      clearInterval(intensityInterval);
      clearInterval(hueInterval);
    };
  }, []);

  const handleLogoClick = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 1500);
  };

  // Logo sections
  const SolanaLogo = () => (
    <motion.div
      className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-10"
      onClick={handleLogoClick}
      whileHover={{ scale: 1.05 }}
      animate={{
        rotateY: mousePosition.x * 15,
        rotateX: mousePosition.y * -15,
      }}
    >
      {/* Sol Hire Logo - Modern Design */}
      <motion.div 
        className={`absolute inset-0 rounded-xl bg-black border-[3px] shadow-[0_0_50px_rgba(147,51,234,0.7)] ${isExploding ? 'animate-ping' : ''}`}
        style={{
          borderColor: `hsla(${hue}, 90%, 60%, 1)`,
          boxShadow: `0 0 50px hsla(${hue}, 90%, 70%, ${intensity})`,
        }}
      />
      
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full"
      >
        {/* Hexagonal base with glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Hexagonal base */}
        <motion.polygon 
          points="50,20 80,40 80,70 50,90 20,70 20,40" 
          fill="transparent" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          stroke={`hsla(${hue}, 90%, 70%, 1)`}
          filter="url(#glow)"
          animate={{
            strokeDasharray: ["0,1000", "1000,0"],
            strokeDashoffset: [0, -1000]
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        {/* Blockchain-inspired connections with animation */}
        <motion.path
          d="M20,40 L50,20 L80,40"
          fill="none"
          stroke={`hsla(${hue}, 90%, 70%, 0.8)`}
          strokeWidth="1.5"
          strokeDasharray="4,4"
          animate={{
            strokeDashoffset: [0, -32]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.path
          d="M20,70 L50,90 L80,70"
          fill="none"
          stroke={`hsla(${hue}, 90%, 70%, 0.8)`}
          strokeWidth="1.5"
          strokeDasharray="4,4"
          animate={{
            strokeDashoffset: [0, 32]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Central elements with pulse animation */}
        <motion.circle 
          cx="50" cy="50" r="15" 
          fill="transparent" 
          stroke={`hsla(${hue}, 90%, 70%, 1)`} 
          strokeWidth="2.5"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle 
          cx="50" cy="50" r="5" 
          fill={`hsla(${hue}, 90%, 70%, 1)`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Blockchain nodes with glow */}
        {[
          [20, 40],
          [80, 40],
          [20, 70],
          [80, 70]
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle 
              cx={cx} cy={cy} r="4" 
              fill={`hsla(${hue}, 90%, 70%, 0.3)`}
              filter="url(#glow)"
            />
            <motion.circle 
              cx={cx} cy={cy} r="2.5" 
              fill={`hsla(${hue}, 90%, 70%, 1)`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );

  // Enhanced particle styles
  const getParticleStyles = (i: number) => {
    const size = Math.random() * 3 + 1;
    const speed = Math.random() * 25 + (i % 6 === 0 ? 35 : 15);
    const startPosX = Math.random() * 100;
    const startPosY = Math.random() * 100;
    const initOpacity = Math.random() * 0.5 + 0.3;
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      top: `${startPosY}%`,
      left: `${startPosX}%`,
      opacity: initOpacity,
      backgroundColor: `hsla(${hue}, 90%, 70%, ${Math.random() * 0.5 + 0.5})`,
      boxShadow: i % 4 === 0 ? `0 0 ${size * 3}px hsla(${hue}, 90%, 70%, 0.8)` : 'none',
      animation: `float ${speed}s linear infinite`,
      animationDelay: `${Math.random() * 10}s`,
    };
  };

  // Generate exploding particles for the effect
  const ExplosionParticles = () => {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * 360;
          const distance = 100 + Math.random() * 100;
          const size = 2 + Math.random() * 5;
          const duration = 0.5 + Math.random() * 1;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-sm top-[50%] left-[50%]"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `hsla(${hue}, 80%, 70%, 1)`,
                boxShadow: `0 0 ${size * 2}px hsla(${hue}, 80%, 70%, 0.8)` 
              }}
              animate={{ 
                x: Math.cos(angle * Math.PI / 180) * distance,
                y: Math.sin(angle * Math.PI / 180) * distance,
                opacity: 0
              }}
              transition={{ 
                duration,
                ease: "easeOut" 
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gray-950 flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        perspective: '1200px',
      }}
    >
      {/* Enhanced grid background */}
      {showGrid && (
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1.5 }}
        >
          <div className="relative w-full h-full">
            {Array.from({ length: 24 }).map((_, i) => (
              <>
                <motion.div 
                  key={`h-${i}`}
                  className="absolute h-px w-full"
                  style={{ 
                    top: `${(i / 24) * 100}%`,
                    background: `linear-gradient(90deg, 
                      transparent 0%, 
                      hsla(${hue}, 90%, 70%, 0.3) 50%,
                      transparent 100%
                    )`
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                />
                <motion.div 
                  key={`v-${i}`}
                  className="absolute w-px h-full"
                  style={{ 
                    left: `${(i / 24) * 100}%`,
                    background: `linear-gradient(180deg, 
                      transparent 0%, 
                      hsla(${hue}, 90%, 70%, 0.3) 50%,
                      transparent 100%
                    )`
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                />
              </>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Enhanced background glow effects */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [intensity * 0.4, intensity * 0.6, intensity * 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ 
          backgroundColor: `hsla(${hue}, 90%, 40%, 0.2)`,
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
        }}
      />
      
      {/* Secondary glow */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full blur-[80px] z-0"
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [intensity * 0.3, intensity * 0.5, intensity * 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ 
          backgroundColor: `hsla(${hue + 30}, 90%, 50%, 0.2)`,
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        <SolanaLogo />
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-white">Sol</span>
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">Hire</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-purple-300 mb-8 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Revolutionizing Talent Acquisition on the Blockchain
        </motion.p>
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={getParticleStyles(i)}
          />
        ))}
      </div>
      
      {/* Explosion effect */}
      {isExploding && <ExplosionParticles />}
    </div>
  );
} 