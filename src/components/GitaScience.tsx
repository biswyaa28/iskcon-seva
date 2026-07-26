import React, { useState } from 'react';
import { GITA_PARALLELS } from '../data/mockData';
import { GitaParallel } from '../types';
import { Search, Sparkles, BookOpen, Atom, Copy, Check, ExternalLink } from 'lucide-react';

interface GitaScienceProps {
  onOpenAiWithPrompt?: (prompt: string) => void;
}

export const GitaScience: React.FC<GitaScienceProps> = ({ onOpenAiWithPrompt }) => {
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
    <section id="gita-science" className="py-24 bg-[#0D0C0A] relative border-t border-[#1A1815]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1815] border border-[#C69214]/30 text-[#C69214] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            <span>Verses & Scientific Parallels</span>
          </div>
          <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#E4E3E0] leading-tight mb-4">
            Bhagavad Gita & <span className="serif italic text-[#C69214]">Modern Science Explorer</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93]">
            Examine ancient Sanskrit slokas alongside modern peer-reviewed physics, biology, and cognitive science.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C69214]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by verse (e.g. 2.20), quantum physics, DMN, energy..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#1A1815] border border-[#C69214]/30 focus:border-[#C69214] text-[#E4E3E0] placeholder-[#A39E93] text-sm focus:outline-none transition-colors shadow-inner"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedTag === tag
                    ? 'bg-[#C69214] text-[#0D0C0A]'
                    : 'bg-[#1A1815] text-[#A39E93] hover:text-[#E4E3E0] border border-[#28241F]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Parallels Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredVerses.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1815] gold-border border-t-2 border border-[#C69214]/20 p-6 sm:p-8 flex flex-col justify-between relative"
            >
              <div>
                {/* Header Tag & Chapter */}
                <div className="flex items-center justify-between mb-4">
                  <span className="serif font-bold text-xl text-[#C69214]">
                    {item.chapterVerse}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#28241F] text-[#E4E3E0] border border-[#C69214]/20">
                    {item.field}
                  </span>
                </div>

                {/* Sanskrit Sloka */}
                <div className="p-4 bg-[#0D0C0A] border border-[#C69214]/20 mb-4 text-center">
                  <p className="serif italic text-base sm:text-lg text-[#F9E2AF] leading-relaxed">
                    {item.sanskritText}
                  </p>
                </div>

                {/* English Translation */}
                <p className="text-xs sm:text-sm text-[#E4E3E0] leading-relaxed mb-6 italic border-l-2 border-[#C69214] pl-3">
                  "{item.translation}"
                </p>

                {/* Scientific Parallel Box */}
                <div className="p-4 bg-[#28241F]/80 border border-[#B24227]/30 mb-6">
                  <div className="flex items-center gap-2 text-[#FF9E85] font-bold text-xs uppercase tracking-wider mb-1">
                    <Atom className="w-4 h-4" />
                    <span>Scientific Parallel</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E4E3E0] font-medium leading-snug">
                    {item.scientificParallel}
                  </p>
                  {item.modernPaperRef && (
                    <span className="text-[11px] text-[#A39E93] block mt-2 pt-2 border-t border-[#1A1815]">
                      📄 Ref: {item.modernPaperRef}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-[#28241F] flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="text-xs text-[#A39E93] hover:text-[#F4EFE6] flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0D0C0A] border border-[#28241F]"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Sloka</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (onOpenAiWithPrompt) {
                      onOpenAiWithPrompt(`Analyze ${item.chapterVerse} (${item.scientificParallel}) with deeper scientific research references.`);
                    }
                  }}
                  className="text-xs font-semibold text-[#C69214] hover:text-[#E5A91B] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C69214]/10 border border-[#C69214]/30 hover:bg-[#C69214]/20 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Deep AI Analysis</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
