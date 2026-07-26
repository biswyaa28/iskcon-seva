import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CorePillars } from './components/CorePillars';
import { SevaImpact } from './components/SevaImpact';
import { GitaScience } from './components/GitaScience';
import { ActivitiesSchedule } from './components/ActivitiesSchedule';
import { Footer } from './components/Footer';
import { AboutPage } from './components/AboutPage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { SchedulePage } from './components/SchedulePage';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'objectives' | 'activities' | 'schedule' | 'seva' | 'wisdom'>('home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [sevaModalData, setSevaModalData] = useState<{ amount: number; meals: number } | null>(null);

  const handleNavigate = (tab: string) => {
    if (tab === 'about' || tab === 'objectives' || tab === 'activities' || tab === 'schedule') {
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
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenSeva={() => setSevaModalData({ amount: 250, meals: 500 })}
      />

      {/* Main View Area */}
      <main className="flex-grow flex flex-col">
        {activeTab === 'schedule' ? (
          <SchedulePage />
        ) : activeTab === 'activities' ? (
          <ActivitiesPage />
        ) : activeTab === 'about' || activeTab === 'objectives' ? (
          <AboutPage 
            onOpenSeva={() => setSevaModalData({ amount: 250, meals: 500 })}
            onOpenLogin={() => setLoginModalOpen(true)}
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

            {/* Seva Impact Calculator */}
            <div id="seva">
              <SevaImpact 
                onInitiateSeva={(amount, meals) => setSevaModalData({ amount, meals })}
              />
            </div>

            {/* Weekly Activities & Gatherings */}
            <ActivitiesSchedule />
          </>
        )}
      </main>

      {/* Modern Responsive Footer */}
      <Footer onNavClick={handleNavigate} />

      {/* Portal Login Modal Overlay */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1815] border-2 border-[#C69214] p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-xl font-bold"
            >
              ✕
            </button>
            <h3 className="serif italic text-2xl text-[#C69214] mb-1">Portal Access</h3>
            <p className="text-xs text-[#A39E93] mb-6 uppercase tracking-widest">Science of Krishna Sangha</p>
            
            <form onSubmit={(e) => { e.preventDefault(); setLoginModalOpen(false); alert('Welcome to the Science of Krishna Portal!'); }} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C69214] mb-1 font-bold">Email / Member ID</label>
                <input 
                  type="email" 
                  required 
                  placeholder="seeker@vedicscience.org" 
                  className="w-full bg-[#0D0C0A] border border-[#C69214]/30 px-4 py-2.5 text-sm text-[#E4E3E0] focus:border-[#C69214] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#C69214] mb-1 font-bold">Passcode</label>
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  className="w-full bg-[#0D0C0A] border border-[#C69214]/30 px-4 py-2.5 text-sm text-[#E4E3E0] focus:border-[#C69214] focus:outline-none"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#C69214] text-[#0D0C0A] py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 mt-2 transition-all shadow-md"
              >
                Enter Portal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Initiate Seva Confirmation Modal */}
      {sevaModalData && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1815] border-2 border-[#B24227] p-8 max-w-md w-full relative shadow-2xl">
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

            <button 
              onClick={() => {
                alert(`Thank you for contributing $${sevaModalData.amount} monthly seva! May you be blessed with transcendental peace.`);
                setSevaModalData(null);
              }}
              className="w-full bg-[#B24227] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#D85436] transition-all shadow-lg rust-glow"
            >
              Complete Offering (${sevaModalData.amount}/mo)
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
