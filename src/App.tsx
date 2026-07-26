import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CorePillars } from './components/CorePillars';
import { GitaScience } from './components/GitaScience';
import { ActivitiesSchedule } from './components/ActivitiesSchedule';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { SchedulePage } from './components/SchedulePage';
import { BlogPage } from './components/BlogPage';
import { BlogPostDetail } from './components/BlogPostDetail';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'objectives' | 'activities' | 'schedule' | 'blog' | 'seva' | 'wisdom'>('home');
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [sevaModalData, setSevaModalData] = useState<{ amount: number; meals: number } | null>(null);

  const handleNavigate = (tab: string) => {
    setSelectedPostSlug(null);
    if (tab === 'about' || tab === 'objectives' || tab === 'activities' || tab === 'schedule' || tab === 'blog') {
      setActiveTab(tab as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById(tab);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (tab === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0D0C0A] text-[#E4E3E0] flex flex-col font-sans overflow-x-hidden selection:bg-[#C69214] selection:text-[#0D0C0A]">
      
      {/* Modern Responsive Navbar */}
      <Navbar 
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSeva={() => setSevaModalData({ amount: 250, meals: 500 })}
      />

      {/* Main View Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedPostSlug || '')}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-grow flex flex-col"
          >
            {activeTab === 'blog' ? (
              selectedPostSlug ? (
                <BlogPostDetail 
                  slug={selectedPostSlug} 
                  onBack={() => setSelectedPostSlug(null)}
                  onSelectPost={(s) => {
                    setSelectedPostSlug(s);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ) : (
                <BlogPage 
                  onSelectPost={(s) => {
                    setSelectedPostSlug(s);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )
            ) : activeTab === 'schedule' ? (
              <SchedulePage />
            ) : activeTab === 'activities' ? (
              <ActivitiesPage />
            ) : activeTab === 'about' || activeTab === 'objectives' ? (
              <AboutPage 
                onOpenSeva={() => setSevaModalData({ amount: 250, meals: 500 })}
                onNavigate={handleNavigate}
              />
            ) : (
              <>
                {/* Hero Section */}
                <Hero />

                {/* Core Pillars */}
                <CorePillars />

                {/* Gita & Modern Science Explorer */}
                <div id="wisdom">
                  <GitaScience />
                </div>

                {/* Weekly Activities & Gatherings */}
                <ActivitiesSchedule />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Modern Responsive Footer */}
      <Footer onNavClick={handleNavigate} />

      {/* Initiate Seva Confirmation Modal */}
      <AnimatePresence>
        {sevaModalData && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#1A1815] border-2 border-[#B24227] p-8 max-w-md w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setSevaModalData(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
              <span className="text-[10px] uppercase tracking-widest text-[#B24227] font-bold block mb-1">Sacred Seva Contribution</span>
              <h3 className="serif italic text-2xl text-white mb-2">Confirm ${sevaModalData.amount} Monthly Seva</h3>
              <p className="text-sm text-white/70 mb-6 border-l-2 border-[#B24227] pl-4">
                Your contribution directly sponsors <strong className="text-[#C69214]">{sevaModalData.meals} hot Sattvic meals daily</strong> for underprivileged communities and hospital visitors.
              </p>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  alert(`Thank you for contributing $${sevaModalData.amount} monthly seva! May you be blessed with transcendental peace.`);
                  setSevaModalData(null);
                }}
                className="w-full bg-[#B24227] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#D85436] transition-all shadow-lg rust-glow"
              >
                Complete Offering (${sevaModalData.amount}/mo)
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
