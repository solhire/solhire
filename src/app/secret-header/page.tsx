'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function TwitterHeaderPage() {
  const [intensity, setIntensity] = useState(0.5);
  const [hue, setHue] = useState(265); // Default purple hue
  
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

  // Solana Logo
  const SolanaLogo = () => (
    <svg 
      className="w-20 h-20 drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
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

  // Particle generator function
  const getParticleStyles = (i: number) => {
    const size = Math.random() * 3 + 1;
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
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4">
      <div 
        className="relative w-[1500px] h-[500px] bg-black overflow-hidden border border-gray-800 rounded-lg"
        style={{ maxWidth: '100%' }}
      >
        {/* Background glow effects */}
        <motion.div 
          className="absolute w-[800px] h-[800px] top-[50%] left-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] z-0"
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
          }}
        />
        
        {/* Secondary glow */}
        <motion.div 
          className="absolute w-[400px] h-[400px] top-[50%] right-[20%] -translate-y-1/2 rounded-full blur-[100px] z-0"
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
            backgroundColor: `hsla(${hue}, 89%, 78%, 0.25)`,
          }}
        />
        
        {/* Particles effect */}
        <div className="absolute inset-0 z-0 opacity-30">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={getParticleStyles(i)}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex items-center">
            <SolanaLogo />
            <div className="text-5xl font-bold ml-4">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Sol</span>
              <span 
                className="text-transparent bg-clip-text [text-shadow:0_0_30px_rgba(168,85,247,0.7)]"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, hsla(${hue - 5}, 89%, 78%, 1), hsla(${hue + 5}, 89%, 40%, 1))`,
                }}
              >
                Hire
              </span>
            </div>
          </div>
        </div>
        
        {/* Tagline */}
        <div className="absolute bottom-6 left-0 right-0 text-center z-10">
          <p className="text-white/80 text-xl">The Web3 Marketplace for Creative Professionals</p>
        </div>
      </div>
      
      {/* Instructions for screenshot */}
      <div className="fixed top-0 left-0 right-0 bg-black/80 p-4 text-center text-white">
        Take a screenshot of the header area (1500x500) for your Twitter profile
      </div>
    </div>
  );
} 