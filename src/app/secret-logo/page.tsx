'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretLogoPage() {
  const [intensity, setIntensity] = useState(0.5);
  const [hue, setHue] = useState(265); // Default purple hue
  const [showDetails, setShowDetails] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
        // Shift between 260 (purple) and 275 (deep purple/blue)
        const newHue = prev + (Math.random() * 1 - 0.5);
        return newHue > 275 ? 260 : newHue < 260 ? 275 : newHue;
      });
    }, 200);
    
    return () => {
      clearInterval(intensityInterval);
      clearInterval(hueInterval);
    };
  }, []);

  // Logo sections
  const SolanaLogo = () => (
    <svg 
      className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
      viewBox="0 0 397 311" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `hue-rotate(${(hue - 265) * 2}deg)`,
      }}
    >
      <path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7zM64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8zM333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
        fill={`url(#solana-logo-gradient-${Math.round(hue)})`}
      />
      <defs>
        <linearGradient id={`solana-logo-gradient-${Math.round(hue)}`} x1="0" y1="0" x2="397" y2="311" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={`hsla(${hue - 5}, 89%, 78%, 1)`} />
          <stop offset="100%" stopColor={`hsla(${hue + 5}, 70%, 40%, 1)`} />
        </linearGradient>
      </defs>
    </svg>
  );

  const getParticleStyles = (i: number) => {
    const size = Math.random() * 4 + 1;
    const speed = Math.random() * 20 + (i % 6 === 0 ? 30 : 10);
    const startPosX = Math.random() * 100;
    const startPosY = Math.random() * 100;
    const initOpacity = Math.random() * 0.5 + 0.3;
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      top: `${startPosY}%`,
      left: `${startPosX}%`,
      opacity: initOpacity,
      backgroundColor: `hsla(${hue}, 89%, 78%, ${Math.random() * 0.5 + 0.5})`,
      boxShadow: i % 5 === 0 ? `0 0 ${size * 2}px hsla(${hue}, 89%, 78%, 0.8)` : 'none',
      animation: `float ${speed}s linear infinite`,
      animationDelay: `${Math.random() * 10}s`,
    };
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Background glow effects */}
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] z-0"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [intensity * 0.8, intensity, intensity * 0.8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ 
          backgroundColor: `hsla(${hue}, 89%, 78%, 0.2)`,
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      />
      
      {/* Secondary glow */}
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] z-0"
        animate={{
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ 
          opacity: intensity * 0.7,
          backgroundColor: `hsla(${hue}, 89%, 78%, 0.3)`,
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      />
      
      {/* Tertiary glow */}
      <motion.div 
        className="absolute w-[200px] h-[200px] rounded-full blur-[60px] z-0"
        animate={{
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ 
          opacity: intensity * 0.6,
          backgroundColor: `hsla(${hue - 20}, 89%, 78%, 0.25)`,
          transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
        }}
      />
      
      {/* Logo */}
      <motion.div 
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        onClick={() => setShowDetails(!showDetails)}
      >
        <SolanaLogo />
        
        <div 
          className="text-7xl md:text-9xl font-bold relative"
          style={{
            transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          }}
        >
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Sol</span>
          <span className="relative">
            <span 
              className="text-transparent bg-clip-text [text-shadow:0_0_30px_rgba(168,85,247,0.7)]"
              style={{
                backgroundImage: `linear-gradient(to bottom right, hsla(${hue - 5}, 89%, 78%, 1), hsla(${hue + 5}, 89%, 40%, 1))`,
              }}
            >
              Hire
            </span>
          </span>
        </div>
      </motion.div>
      
      {/* Brand Details Section */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className="absolute inset-0 z-20 bg-black/90 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="max-w-2xl p-8 m-4 bg-background-dark/80 rounded-2xl border border-gray-800"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Logo & Brand Guidelines</h2>
                <motion.button 
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-primary/20"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setShowDetails(false)}
                >
                  ✕
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">SOL Symbol</h3>
                  <p className="text-gray-400 text-sm">The SOL symbol represents the native cryptocurrency of the Solana blockchain. It's displayed with the Solana logo for brand recognition.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Gradient Colors</h3>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                    <div className="w-8 h-8 rounded-full bg-purple-400"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                    <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Our brand uses a gradient from purple to blue to represent speed, innovation, and trust.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Typography</h3>
                  <p className="text-gray-400 text-sm">We use a clean, modern sans-serif font with "Sol" in white and "Hire" in our signature gradient for maximum impact and readability.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Animation</h3>
                  <p className="text-gray-400 text-sm">Interactive elements utilize subtle animations that respond to user interactions, creating an engaging and dynamic experience.</p>
                </div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Solana Integration</h3>
                <div className="flex items-center space-x-4 mb-3">
                  <SolanaLogo />
                  <div>
                    <div className="text-4xl font-bold">
                      <span className="text-white">Sol</span>
                      <span 
                        className="text-transparent bg-clip-text"
                        style={{
                          backgroundImage: `linear-gradient(to bottom right, hsla(${hue - 5}, 89%, 78%, 1), hsla(${hue + 5}, 89%, 40%, 1))`,
                        }}
                      >
                        Hire
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Our branding emphasizes our integration with the Solana blockchain, featuring the distinctive Solana logo alongside our name to reinforce our platform's foundation on this high-performance blockchain.</p>
              </div>
              
              <motion.button 
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetails(false)}
              >
                Got it
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Particles effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        {Array.from({ length: 70 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={getParticleStyles(i)}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
} 