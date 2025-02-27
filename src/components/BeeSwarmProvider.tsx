
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BeeSwarm } from './BeeSwarm';
import { AnimatePresence } from 'framer-motion';

type BeeSwarmContextType = {
  triggerBeeSwarm: () => void;
};

const BeeSwarmContext = createContext<BeeSwarmContextType | undefined>(undefined);

export const useBeeSwarm = () => {
  const context = useContext(BeeSwarmContext);
  if (!context) {
    throw new Error('useBeeSwarm must be used within a BeeSwarmProvider');
  }
  return context;
};

export const BeeSwarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showBeeSwarm, setShowBeeSwarm] = useState(true);

  // Show bee swarm on initial mount
  useEffect(() => {
    // Hide bee swarm after animation completes
    const timer = setTimeout(() => {
      setShowBeeSwarm(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const triggerBeeSwarm = () => {
    setShowBeeSwarm(true);
    // Hide again after animation completes
    setTimeout(() => {
      setShowBeeSwarm(false);
    }, 5000);
  };

  return (
    <BeeSwarmContext.Provider value={{ triggerBeeSwarm }}>
      <AnimatePresence>
        {showBeeSwarm && <BeeSwarm />}
      </AnimatePresence>
      {children}
    </BeeSwarmContext.Provider>
  );
};
