import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="flex-grow flex items-center px-6 sm:px-12 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-8">
        <div>
          <h1 className="serif text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 text-[#E4E3E0]">
            Ancient Wisdom <br /> 
            <span className="text-[#B24227] italic">Applied</span> to <br />
            Modern Living.
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-md leading-relaxed border-l-2 border-[#C69214] pl-6">
            Bridging the gap between Vedic philosophy and contemporary science to unlock the deeper layers of consciousness.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 border border-[#C69214]/20 rounded-full animate-pulse"></div>
            <div className="w-64 h-64 sm:w-80 sm:h-80 bg-[#1A1815] rounded-full flex items-center justify-center overflow-hidden border border-[#C69214]/30">
              <div className="text-[#C69214] opacity-20 text-7xl sm:text-9xl font-bold select-none">🪷</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
