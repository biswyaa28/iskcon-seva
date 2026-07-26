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
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="bg-[#161412] rounded-sm p-6 border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/35 hover:border-[#DDA038]/50 transition-all shadow-md group cursor-default"
        >
          <span className="font-ui text-[#DDA038] text-xs font-bold uppercase tracking-wider block mb-2">
            {item.num}. {item.title}
          </span>
          <h3 className="font-heading text-xl mb-2 italic text-[#EDE8E1] font-bold">
            {item.subtitle}
          </h3>
          <p className="font-body text-sm text-[#A39B90] leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
};
