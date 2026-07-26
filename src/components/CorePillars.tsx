import React from 'react';
import { motion } from 'motion/react';

export const CorePillars: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Karma Yoga',
      subtitle: 'The Science of Action',
      desc: 'Understanding the causal relationship between intent and result in the material world.'
    },
    {
      num: '02',
      title: 'Bhakti',
      subtitle: 'Devotional Resonance',
      desc: 'Cultivating the emotional frequency of absolute connection with the Divine source.'
    },
    {
      num: '03',
      title: 'Atma-Vidya',
      subtitle: 'Self-Realization',
      desc: 'An analytical approach to identifying the observer beyond the physical and mental shells.'
    }
  ];

  return (
    <section id="philosophy" className="px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {pillars.map((item, idx) => (
        <motion.div
          key={item.num}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.25, 1, 0.5, 1] }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-[#1A1815] rounded-2xl p-6 gold-border border-t-2 border border-[#C69214]/20 hover:border-[#C69214]/50 transition-colors shadow-lg group cursor-default"
        >
          <span className="text-[#C69214] text-xs font-bold uppercase tracking-widest block mb-2 group-hover:text-[#F4EFE6] transition-colors">
            {item.num}. {item.title}
          </span>
          <h3 className="serif text-xl mb-2 italic text-[#E4E3E0]">
            {item.subtitle}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
};
