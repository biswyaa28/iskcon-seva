import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, HeartHandshake } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

interface NavbarProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onOpenSeva?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  onNavigate,
  onOpenSeva,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'activities', label: 'Activities' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About Us' },
  ];

  const handleNav = (id: string) => {
    onNavigate?.(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0D0C0A]/95 backdrop-blur-md border-b border-[#C69214]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <motion.div 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full overflow-hidden border border-[#C69214]/60 p-0.5 bg-[#1A1815] shadow-md shrink-0 flex items-center justify-center"
          >
            <img src={logoImg} alt="Science of Krishna Logo" className="w-full h-full object-cover object-center scale-110 rounded-full" />
          </motion.div>
          <div className="flex flex-col">
            <span className="serif italic font-bold text-lg sm:text-xl text-[#C69214] group-hover:text-[#F4EFE6] transition-colors">
              Science of Krishna
            </span>
            <span className="text-[10px] text-[#A39E93] uppercase tracking-[0.2em] font-semibold">
              Wisdom & Compassionate Service
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 bg-[#1A1815]/80 px-6 py-2.5 rounded-full border border-[#C69214]/30 relative">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-xs font-semibold uppercase tracking-[0.18em] relative py-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#C69214] font-bold'
                    : 'text-[#C69214]/70 hover:text-[#C69214]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#C69214]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenSeva}
            className="px-5 py-2 bg-[#B24227] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D85436] transition-colors duration-300 shadow-md flex items-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Contribute Seva</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#C69214] hover:text-[#F4EFE6] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-[#1A1815] border-b border-[#C69214]/30 px-6 py-6 space-y-4 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left text-sm font-bold uppercase tracking-widest py-2 px-3 rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#C69214] text-[#0D0C0A]'
                      : 'text-[#E4E3E0] hover:bg-[#28241F] hover:text-[#C69214]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#28241F] flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenSeva?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#B24227] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D85436] transition-all flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Contribute Seva</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
