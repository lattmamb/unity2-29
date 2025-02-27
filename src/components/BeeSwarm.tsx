
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Bee = {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  duration: number;
  color: string;
};

export const BeeSwarm: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bees, setBees] = React.useState<Bee[]>([]);
  const numBees = 50; // Number of bees in the swarm
  
  // Colors for the bees
  const beeColors = [
    '#9b87f5', // Primary Purple
    '#7E69AB', // Secondary Purple
    '#8B5CF6', // Vivid Purple
    '#F97316', // Bright Orange (for stinger/details)
  ];

  // Generate initial bee positions and properties
  useEffect(() => {
    if (!containerRef.current) return;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Create array of bee objects with random properties
    const newBees = Array.from({ length: numBees }, (_, i) => ({
      id: i,
      x: Math.random() * windowWidth,
      y: Math.random() * windowHeight,
      scale: Math.random() * 0.4 + 0.4, // Random size between 0.4 and 0.8
      rotation: Math.random() * 360, // Random initial rotation
      delay: Math.random() * 0.8, // Staggered animation start
      duration: Math.random() * 10 + 15, // Random duration between 15-25s
      color: beeColors[Math.floor(Math.random() * beeColors.length)],
    }));
    
    setBees(newBees);
    
    // Cleanup
    return () => {
      setBees([]);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-40 overflow-hidden"
      aria-hidden="true"
    >
      {bees.map((bee) => (
        <motion.div
          key={bee.id}
          initial={{ 
            x: bee.x, 
            y: bee.y, 
            opacity: 0,
            scale: 0,
            rotate: bee.rotation 
          }}
          animate={{
            x: [
              bee.x,
              bee.x + Math.sin(bee.id) * 200,
              bee.x - Math.cos(bee.id) * 300,
              bee.x + Math.sin(bee.id * 0.5) * 400,
              window.innerWidth + 100 // Eventually move off screen
            ],
            y: [
              bee.y,
              bee.y - Math.cos(bee.id) * 200,
              bee.y + Math.sin(bee.id) * 100,
              bee.y - Math.cos(bee.id * 0.5) * 300,
              bee.y + Math.random() * 500 - 250
            ],
            rotate: [
              bee.rotation,
              bee.rotation + 20,
              bee.rotation - 30,
              bee.rotation + 10,
              bee.rotation + 45
            ],
            opacity: [0, 0.9, 0.7, 0.5, 0],
            scale: [0, bee.scale, bee.scale * 0.8, bee.scale * 1.2, bee.scale * 0.5],
          }}
          transition={{
            duration: bee.duration,
            delay: bee.delay,
            ease: [0.25, 0.1, 0.25, 1],
            times: [0, 0.2, 0.5, 0.8, 1]
          }}
          className="absolute"
          style={{ 
            width: '12px', 
            height: '8px',
            willChange: 'transform' 
          }}
        >
          {/* Bee body */}
          <div className="relative">
            {/* Bee body */}
            <div 
              className="absolute rounded-full" 
              style={{ 
                width: '12px', 
                height: '8px', 
                backgroundColor: bee.color,
                boxShadow: '0 0 5px rgba(0,0,0,0.2)',
              }}
            />
            
            {/* Wings - small white translucent ellipses */}
            <div 
              className="absolute rounded-full" 
              style={{ 
                width: '6px', 
                height: '4px', 
                backgroundColor: 'rgba(255,255,255,0.6)',
                top: '-1px',
                left: '3px',
                animation: 'wingsFlap 0.1s infinite alternate',
              }}
            />
            
            {/* Stripes */}
            <div 
              className="absolute rounded-full" 
              style={{ 
                width: '2px', 
                height: '4px', 
                backgroundColor: '#333',
                top: '2px',
                left: '4px',
              }}
            />
            
            {/* Stinger */}
            <div 
              className="absolute"
              style={{ 
                width: '3px', 
                height: '2px', 
                backgroundColor: '#F97316',
                top: '3px',
                right: '-2px',
                transform: 'rotate(0deg)',
              }}
            />
          </div>
        </motion.div>
      ))}
      
      {/* Add CSS for wing flapping animation */}
      <style jsx>{`
        @keyframes wingsFlap {
          0% { transform: scaleX(1); opacity: 0.6; }
          100% { transform: scaleX(1.5); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};
