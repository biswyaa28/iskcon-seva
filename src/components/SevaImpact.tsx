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
    <section id="seva" className="bg-[#161412] mx-6 sm:mx-12 p-6 sm:p-8 border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/30 flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-12 mb-8 shadow-xs rounded-sm">
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4 sm:gap-0">
          <div>
            <h2 className="font-heading text-2xl font-bold text-[#DDA038]">Seva Impact Calculator</h2>
            <p className="font-ui text-xs text-[#A39B90] uppercase tracking-wider mt-1">
              Calculate your contribution to the food relief program
            </p>
          </div>
          <div className="text-left sm:text-right">
            <motion.span 
              key={amount}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="inline-block text-4xl sm:text-5xl font-heading font-bold text-[#DDA038] tracking-tight"
            >
              ${amount}
            </motion.span>
            <span className="block font-ui text-[10px] text-[#A39B90] uppercase tracking-widest">
              Monthly Donation
            </span>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="relative h-2 bg-[#DDA038]/20 rounded-full mb-6 cursor-pointer group">
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
            className="absolute left-0 top-0 h-full bg-[#DDA038] rounded-full transition-all duration-150"
            style={{ width: `${sliderPercentage}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#0F0D0C] border-2 border-[#DDA038] rounded-full shadow-md transition-all duration-150 pointer-events-none"
            style={{ left: `calc(${sliderPercentage}% - 10px)` }}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTierChange(50)}
            className={`px-4 py-1.5 font-ui text-[10px] uppercase font-bold border transition-all rounded-xs ${
              amount === 50 
                ? 'bg-[#9B2C3B] border-[#DDA038]/40 text-[#EDE8E1]' 
                : 'border-[#DDA038]/20 text-[#A39B90] hover:border-[#DDA038]/40 hover:text-[#EDE8E1]'
            }`}
          >
            $50 Tier
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTierChange(100)}
            className={`px-4 py-1.5 font-ui text-[10px] uppercase font-bold border transition-all rounded-xs ${
              amount === 100 
                ? 'bg-[#9B2C3B] border-[#DDA038]/40 text-[#EDE8E1]' 
                : 'border-[#DDA038]/20 text-[#A39B90] hover:border-[#DDA038]/40 hover:text-[#EDE8E1]'
            }`}
          >
            $100 Tier
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTierChange(250)}
            className={`px-4 py-1.5 font-ui text-[10px] uppercase font-bold border transition-all rounded-xs ${
              amount === 250 
                ? 'bg-[#9B2C3B] border-[#DDA038]/40 text-[#EDE8E1]' 
                : 'border-[#DDA038]/20 text-[#A39B90] hover:border-[#DDA038]/40 hover:text-[#EDE8E1]'
            }`}
          >
            $250 Advocate
          </motion.button>
        </div>
      </div>

      <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-[#DDA038]/20 pt-6 md:pt-0 md:pl-12 flex flex-col justify-center">
        <motion.div 
          key={meals}
          initial={{ scale: 1.15, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-4xl font-heading italic text-[#EDE8E1] font-bold"
        >
          {meals}
        </motion.div>
        <div className="font-ui text-xs text-[#A39B90] uppercase tracking-wider mb-4">
          Meals distributed daily
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onInitiateSeva?.(amount, meals)}
          className="w-full bg-[#9B2C3B] text-[#EDE8E1] py-3 font-ui text-xs font-bold uppercase tracking-wider hover:bg-[#B33A4A] border border-[#DDA038]/30 transition-all shadow-xs rounded-sm"
        >
          Initiate Seva
        </motion.button>
      </div>
    </section>
  );
};
