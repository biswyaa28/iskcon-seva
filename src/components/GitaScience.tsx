import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GITA_PARALLELS } from '../data/mockData';
import { GitaParallel } from '../types';
import { Search, Atom, Copy, Check } from 'lucide-react';

export const GitaScience: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tags = ['All', 'Quantum Physics', 'Neuroscience', 'Energy Conservation', 'Observer Effect', 'Epigenetics'];

  const filteredVerses = GITA_PARALLELS.filter((item) => {
    const matchesSearch =
      item.chapterVerse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scientificParallel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.field.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === 'All' ||
      item.tags.includes(selectedTag) ||
      item.field.toLowerCase() === selectedTag.toLowerCase();

    return matchesSearch && matchesTag;
  });

  const handleCopy = (item: GitaParallel) => {
    const textToCopy = `${item.chapterVerse}\n${item.sanskritText}\n\nTranslation: ${item.translation}\n\nScientific Parallel: ${item.scientificParallel}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="gita-science" className="py-24 bg-transparent relative border-t border-[#DDA038]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#181512] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-4 rounded-sm shadow-xs">
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            <span>Verses & Scientific Parallels</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E1] leading-tight mb-4">
            Bhagavad Gita & <span className="font-heading italic text-[#DDA038]">Modern Science Explorer</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[#A39B90]">
            Examine ancient Sanskrit slokas alongside modern peer-reviewed physics, biology, and cognitive science.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#DDA038]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by verse (e.g. 2.20), quantum physics, DMN, energy..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#161412] border border-[#DDA038]/30 focus:border-[#DDA038] text-[#EDE8E1] placeholder-[#A39B90]/70 text-sm focus:outline-none transition-colors shadow-xs rounded-sm font-body"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                  selectedTag === tag
                    ? 'bg-[#9B2C3B] text-[#EDE8E1] border border-[#DDA038]/30'
                    : 'bg-[#161412] text-[#A39B90] hover:text-[#EDE8E1] border border-[#DDA038]/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Parallels Cards */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredVerses.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                key={item.id}
                className="bg-[#161412] rounded-sm border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/35 p-6 sm:p-8 flex flex-col justify-between relative shadow-md hover:border-[#DDA038]/50 transition-all"
              >
                <div>
                  {/* Header Tag & Chapter */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-bold text-xl text-[#DDA038]">
                      {item.chapterVerse}
                    </span>
                    <span className="font-ui text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#1F1C18] text-[#DDA038] border border-[#DDA038]/30 rounded-xs">
                      {item.field}
                    </span>
                  </div>

                  {/* Sanskrit Sloka */}
                  <div className="p-4 bg-[#1F1C18] border border-[#DDA038]/35 rounded-xs mb-4 text-center">
                    <p className="font-body italic text-base sm:text-lg text-[#EDE8E1] leading-relaxed">
                      {item.sanskritText}
                    </p>
                  </div>

                  {/* English Translation */}
                  <p className="font-body text-xs sm:text-sm text-[#EDE8E1]/90 leading-relaxed mb-6 italic border-l-2 border-[#DDA038] pl-3">
                    "{item.translation}"
                  </p>

                  {/* Scientific Parallel Box */}
                  <div className="p-4 bg-[#1F1C18] border border-[#9B2C3B]/40 rounded-xs mb-6">
                    <div className="flex items-center gap-2 text-[#DDA038] font-ui font-bold text-xs uppercase tracking-wider mb-1">
                      <Atom className="w-4 h-4 text-[#DDA038]" />
                      <span>Scientific Parallel</span>
                    </div>
                    <p className="font-body text-xs sm:text-sm text-[#EDE8E1] font-medium leading-snug">
                      {item.scientificParallel}
                    </p>
                    {item.modernPaperRef && (
                      <span className="font-body text-[11px] text-[#A39B90] block mt-2 pt-2 border-t border-[#DDA038]/15">
                        📄 Ref: {item.modernPaperRef}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#DDA038]/20 flex items-center justify-between gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCopy(item)}
                    className="font-ui text-xs text-[#A39B90] hover:text-[#EDE8E1] flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#1F1C18] border border-[#DDA038]/25 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#DDA038]" />
                        <span>Copy Sloka</span>
                      </>
                    )}
                  </motion.button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
