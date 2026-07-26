import React from 'react';

export const CorePillars: React.FC = () => {
  return (
    <section id="philosophy" className="px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-[#1A1815] p-6 gold-border border-t-2">
        <span className="text-[#C69214] text-xs font-bold uppercase tracking-widest block mb-2">01. Karma Yoga</span>
        <h3 className="serif text-xl mb-2 italic text-[#E4E3E0]">The Science of Action</h3>
        <p className="text-sm text-white/50">Understanding the causal relationship between intent and result in the material world.</p>
      </div>
      <div className="bg-[#1A1815] p-6 gold-border border-t-2">
        <span className="text-[#C69214] text-xs font-bold uppercase tracking-widest block mb-2">02. Bhakti</span>
        <h3 className="serif text-xl mb-2 italic text-[#E4E3E0]">Devotional Resonance</h3>
        <p className="text-sm text-white/50">Cultivating the emotional frequency of absolute connection with the Divine source.</p>
      </div>
      <div className="bg-[#1A1815] p-6 gold-border border-t-2">
        <span className="text-[#C69214] text-xs font-bold uppercase tracking-widest block mb-2">03. Atma-Vidya</span>
        <h3 className="serif text-xl mb-2 italic text-[#E4E3E0]">Self-Realization</h3>
        <p className="text-sm text-white/50">An analytical approach to identifying the observer beyond the physical and mental shells.</p>
      </div>
    </section>
  );
};
