import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="flex-grow flex items-center px-6 sm:px-12 py-8 md:py-16 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-3 py-1 bg-[#1A1815] border border-[#C69214]/30 text-[#C69214] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4"
          >
            Vedic Science & Consciousness
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="serif text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 text-[#E4E3E0]"
          >
            Ancient Wisdom <br /> 
            <span className="text-[#B24227] italic">Applied</span> to <br />
            Modern Living.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-white/60 max-w-md leading-relaxed border-l-2 border-[#C69214] pl-6"
          >
            Bridging the gap between Vedic philosophy and contemporary science to unlock the deeper layers of consciousness.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 border border-dashed border-[#C69214]/20 rounded-full"
            />
            <div className="absolute -inset-3 border border-[#C69214]/20 rounded-full animate-pulse"></div>
            
            <motion.div 
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 sm:w-80 sm:h-80 bg-[#1A1815] rounded-full flex items-center justify-center overflow-hidden border border-[#C69214]/30 relative shadow-2xl"
            >
              <motion.div 
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#C69214] opacity-25 text-7xl sm:text-9xl font-bold select-none"
              >
                🪷
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
