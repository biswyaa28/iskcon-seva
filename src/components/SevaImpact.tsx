import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SevaImpactProps {
  onInitiateSeva?: (amount: number, meals: number) => void;
}

export const SevaImpact: React.FC<SevaImpactProps> = ({ onInitiateSeva }) => {
  const [amount, setAmount] = useState<number>(250);

  const handleTierChange = (newAmount: number) => {
    setAmount(newAmount);
  };

  const meals = amount * 2;
  const sliderPercentage = Math.min(100, Math.max(0, (amount / 500) * 100));

  return (
    <section id="seva" className="bg-[#1A1815] mx-6 sm:mx-12 p-6 sm:p-8 border border-white/5 flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-12 mb-8 shadow-2xl">
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4 sm:gap-0">
          <div>
            <h2 className="serif text-2xl text-[#C69214]">Seva Impact Calculator</h2>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
              Calculate your contribution to the food relief program
            </p>
          </div>
          <div className="text-left sm:text-right">
            <motion.span 
              key={amount}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="inline-block text-4xl sm:text-5xl font-light text-[#B24227] tracking-tighter"
            >
              ${amount}
            </motion.span>
            <span className="block text-[10px] text-white/40 uppercase tracking-widest">
              Monthly Donation
            </span>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="relative h-2 bg-white/10 rounded-full mb-6 cursor-pointer group">
          <input 
            type="range"
            min={10}
            max={500}
            step={5}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
          />
          <div 
            className="absolute left-0 top-0 h-full bg-[#B24227] rounded-full transition-all duration-150"
            style={{ width: `${sliderPercentage}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#B24227] rounded-full shadow-lg transition-all duration-150 pointer-events-none"
            style={{ left: `calc(${sliderPercentage}% - 10px)` }}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleTierChange(50)}
            className={`px-4 py-1.5 text-[10px] uppercase font-bold border transition-all ${
              amount === 50 
                ? 'bg-[#B24227] border-[#B24227] text-white' 
                : 'border-white/10 text-white/60 hover:border-white/30'
            }`}
          >
            $50 Tier
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleTierChange(100)}
            className={`px-4 py-1.5 text-[10px] uppercase font-bold border transition-all ${
              amount === 100 
                ? 'bg-[#B24227] border-[#B24227] text-white' 
                : 'border-white/10 text-white/60 hover:border-white/30'
            }`}
          >
            $100 Tier
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleTierChange(250)}
            className={`px-4 py-1.5 text-[10px] uppercase font-bold border transition-all ${
              amount === 250 
                ? 'bg-[#B24227] border-[#B24227] text-white' 
                : 'border-white/10 text-white/60 hover:border-white/30'
            }`}
          >
            $250 Advocate
          </motion.button>
        </div>
      </div>

      <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-12 flex flex-col justify-center">
        <motion.div 
          key={meals}
          initial={{ scale: 1.15, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-4xl serif italic text-white/90"
        >
          {meals}
        </motion.div>
        <div className="text-xs text-white/40 uppercase tracking-tighter mb-4">
          Meals distributed daily
        </div>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onInitiateSeva?.(amount, meals)}
          className="w-full bg-[#C69214] text-[#0D0C0A] py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-md"
        >
          Initiate Seva
        </motion.button>
      </div>
    </section>
  );
};
