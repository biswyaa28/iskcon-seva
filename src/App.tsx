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
    <div className="w-full min-h-screen bg-[#0C0B0A] text-[#EDE8E1] flex flex-col font-body overflow-x-hidden selection:bg-[#DDA038] selection:text-[#0C0B0A] bg-dot-texture">
      
      {/* Modern Responsive Navbar */}
      <Navbar 
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSeva={() => setSevaModalData({ amount: 250, meals: 500 })}
      />

      {/* Main View Area */}
      <main className="flex-grow flex flex-col relative overflow-hidden bg-transparent">
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#181512] border-2 border-[#DDA038]/40 p-8 max-w-md w-full relative shadow-2xl rounded-sm"
            >
              <button 
                onClick={() => setSevaModalData(null)}
                className="absolute top-4 right-4 text-[#A39B90] hover:text-[#EDE8E1] text-xl font-bold font-ui"
              >
                ✕
              </button>
              <span className="font-ui uppercase text-xs tracking-wider text-[#DDA038] font-bold block mb-1">Sacred Seva Contribution</span>
              <h3 className="font-heading text-2xl text-[#EDE8E1] mb-2 font-bold">Confirm ${sevaModalData.amount} Monthly Seva</h3>
              <p className="text-sm font-body text-[#A39B90] mb-6 border-l-2 border-[#DDA038] pl-4">
                Your contribution directly sponsors <strong className="text-[#DDA038] font-semibold">{sevaModalData.meals} hot Sattvic meals daily</strong> for underprivileged communities and hospital visitors.
              </p>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  alert(`Thank you for contributing $${sevaModalData.amount} monthly seva! May you be blessed with transcendental peace.`);
                  setSevaModalData(null);
                }}
                className="w-full bg-[#9B2C3B] text-[#EDE8E1] py-3 font-ui text-xs font-bold uppercase tracking-wider hover:bg-[#B33A4A] transition-all shadow-md rounded-sm"
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
