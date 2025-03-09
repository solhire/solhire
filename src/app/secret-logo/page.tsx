'use client';

import { useEffect, useState } from 'react';

export default function SecretLogoPage() {
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
        // Shift between 260 (purple) and 270 (violet)
        return prev + (Math.random() * 0.5 - 0.25);
      });
    }, 200);
    
    return () => {
      clearInterval(intensityInterval);
      clearInterval(hueInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background glow effects */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] z-0"
        style={{ 
          opacity: intensity,
          backgroundColor: `hsla(${hue}, 89%, 78%, 0.2)`
        }}
      />
      
      {/* Secondary glow */}
      <div 
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] z-0 animate-pulse"
        style={{ 
          opacity: intensity * 0.7,
          backgroundColor: `hsla(${hue}, 89%, 78%, 0.3)`,
          animation: 'pulse 4s infinite alternate'
        }}
      />
      
      {/* Logo */}
      <div className="relative z-10">
        <div className="text-7xl md:text-9xl font-bold relative">
          <span className="text-white">Sol</span>
          <span className="relative">
            <span 
              className="text-transparent bg-clip-text [text-shadow:0_0_30px_rgba(168,85,247,0.7)]"
              style={{
                backgroundImage: `linear-gradient(to bottom right, hsla(${hue - 5}, 89%, 78%, 1), hsla(${hue + 5}, 89%, 40%, 1))`,
              }}
            >
              Hire
            </span>
            {/* Light swipe animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shine"></span>
          </span>
        </div>
      </div>
      
      {/* Particles effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              backgroundColor: `hsla(${hue}, 89%, 78%, ${Math.random() * 0.5 + 0.5})`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
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
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
} 