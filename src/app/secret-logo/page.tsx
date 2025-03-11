'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SecretLogoPage() {
  const [intensity, setIntensity] = useState(0.5);
  const [hue, setHue] = useState(270); // Purple base hue
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

  // Updated Logo component to match header style
  const SolanaLogo = () => (
    <motion.div
      className="relative w-40 h-40 md:w-64 md:h-64 mx-auto mb-10"
      onClick={handleLogoClick}
      whileHover={{ scale: 1.05 }}
      animate={{
        rotateY: mousePosition.x * 15,
        rotateX: mousePosition.y * -15,
      }}
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/70 to-indigo-600/70 rounded-full blur-md opacity-75 group-hover:opacity-100 animate-pulse"></div>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA">
              <animate attributeName="stop-color" values="#9333EA; #A855F7; #9333EA" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#8B5CF6">
              <animate attributeName="stop-color" values="#8B5CF6; #6366F1; #8B5CF6" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#4F46E5">
              <animate attributeName="stop-color" values="#4F46E5; #818CF8; #4F46E5" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7">
              <animate attributeName="stop-color" values="#A855F7; #C084FC; #A855F7" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#6366F1">
              <animate attributeName="stop-color" values="#6366F1; #818CF8; #6366F1" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
            <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          </filter>
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feFlood floodColor="#A855F7" floodOpacity="0.5" result="flood" />
            <feComposite in="flood" in2="SourceGraphic" operator="in" result="mask" />
            <feGaussianBlur in="mask" stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Background Circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="40" 
          fill="black" 
          stroke="url(#logoGradient)" 
          strokeWidth="2"
        >
          <animate attributeName="r" values="40; 41; 40" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Outer Glow */}
        <circle 
          cx="50" 
          cy="50" 
          r="42" 
          stroke="url(#logoGradient)" 
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
        >
          <animate attributeName="r" values="42; 44; 42" dur="3s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5; 0.8; 0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* S Shape */}
        <path
          d="M35 35C35 32.24 37.24 30 40 30H55C57.76 30 60 32.24 60 35V40C60 42.76 57.76 45 55 45H45C42.24 45 40 47.24 40 50V50C40 52.76 42.24 55 45 55H60C62.76 55 65 57.24 65 60V65C65 67.76 62.76 70 60 70H45C42.24 70 40 67.76 40 65V60"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#neonGlow)"
        >
          <animate attributeName="stroke-width" values="4; 4.5; 4" dur="3s" repeatCount="indefinite" />
        </path>
        
        {/* H Shape */}
        <path
          d="M30 30V70M70 30V70M30 50H70"
          stroke="url(#logoGradient2)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#neonGlow)"
        >
          <animate attributeName="stroke-width" values="4; 4.5; 4" dur="3s" repeatCount="indefinite" />
        </path>
        
        {/* Decorative Elements */}
        <circle cx="30" cy="30" r="3" fill="url(#logoGradient)" filter="url(#glow)">
          <animate attributeName="r" values="3; 3.5; 3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="30" r="3" fill="url(#logoGradient2)" filter="url(#glow)">
          <animate attributeName="r" values="3; 3.5; 3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="70" r="3" fill="url(#logoGradient2)" filter="url(#glow)">
          <animate attributeName="r" values="3; 3.5; 3" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="70" r="3" fill="url(#logoGradient)" filter="url(#glow)">
          <animate attributeName="r" values="3; 3.5; 3" dur="1.8s" repeatCount="indefinite" />
        </circle>
        
        {/* Solana Symbol */}
        <path
          d="M50 20L53 23H47L50 20Z"
          fill="url(#logoGradient)"
          filter="url(#glow)"
        >
          <animate attributeName="fill-opacity" values="1; 0.8; 1" dur="2s" repeatCount="indefinite" />
        </path>
        <path
          d="M50 80L53 77H47L50 80Z"
          fill="url(#logoGradient2)"
          filter="url(#glow)"
        >
          <animate attributeName="fill-opacity" values="1; 0.8; 1" dur="2s" repeatCount="indefinite" />
        </path>
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
    
    // Use the gradient colors for particles
    const colors = ['#9333EA', '#8B5CF6', '#6366F1', '#A855F7'];
    const color = colors[i % colors.length];
    
    return {
      width: `${size}px`,
      height: `${size}px`,
      top: `${startPosY}%`,
      left: `${startPosX}%`,
      opacity: initOpacity,
      backgroundColor: color,
      boxShadow: i % 4 === 0 ? `0 0 ${size * 3}px ${color}` : 'none',
      animation: `float ${speed}s linear infinite`,
      animationDelay: `${Math.random() * 10}s`,
    };
  };

  // Generate exploding particles for the effect
  const ExplosionParticles = () => {
    // Use the gradient colors for explosion particles
    const colors = ['#9333EA', '#8B5CF6', '#6366F1', '#A855F7'];
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * 360;
          const distance = 100 + Math.random() * 150;
          const size = 2 + Math.random() * 5;
          const duration = 0.5 + Math.random() * 1;
          const color = colors[i % colors.length];
          
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
                backgroundColor: color,
                boxShadow: `0 0 ${size * 2}px ${color}` 
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
              <React.Fragment key={i}>
                <motion.div 
                  className="absolute h-px w-full"
                  style={{ 
                    top: `${(i / 24) * 100}%`,
                    background: `linear-gradient(90deg, 
                      transparent 0%, 
                      #9333EA 50%,
                      transparent 100%
                    )`
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                />
                <motion.div 
                  className="absolute w-px h-full"
                  style={{ 
                    left: `${(i / 24) * 100}%`,
                    background: `linear-gradient(180deg, 
                      transparent 0%, 
                      #9333EA 50%,
                      transparent 100%
                    )`
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, delay: i * 0.05 }}
                />
              </React.Fragment>
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
          backgroundColor: '#9333EA',
          opacity: 0.2,
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
          backgroundColor: '#6366F1',
          opacity: 0.2,
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