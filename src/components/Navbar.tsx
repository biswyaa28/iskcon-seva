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
    <header className="sticky top-0 z-50 bg-[#0C0B0A]/90 backdrop-blur-md border-b border-[#DDA038]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-full overflow-hidden border border-[#DDA038]/50 p-0.5 bg-[#181512] shadow-sm shrink-0 flex items-center justify-center"
          >
            <img src={logoImg} alt="Science of Krishna Logo" className="w-full h-full object-cover object-center scale-110 rounded-full" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg sm:text-xl text-[#EDE8E1] group-hover:text-[#DDA038] transition-colors">
              Science of Krishna
            </span>
            <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-[0.2em] font-semibold">
              Wisdom & Compassionate Service
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 bg-[#161412] px-6 py-2 rounded-full border border-[#DDA038]/25 relative shadow-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`font-ui text-xs font-semibold uppercase tracking-wider relative py-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#DDA038] font-bold'
                    : 'text-[#A39B90] hover:text-[#EDE8E1]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#DDA038]"
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenSeva}
            className="px-5 py-2.5 bg-[#9B2C3B] text-[#EDE8E1] font-ui text-xs font-bold uppercase tracking-wider hover:bg-[#B33A4A] transition-colors duration-300 shadow-sm rounded-sm flex items-center gap-2 border border-[#DDA038]/30"
          >
            <HeartHandshake className="w-4 h-4 text-[#DDA038]" />
            <span>Contribute Seva</span>
          </motion.button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#DDA038] hover:text-[#EDE8E1] focus:outline-none"
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
            className="lg:hidden bg-[#161412] border-b border-[#DDA038]/25 px-6 py-6 space-y-4 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`font-ui text-left text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-sm transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#9B2C3B] text-[#EDE8E1]'
                      : 'text-[#A39B90] hover:bg-[#1A1815] hover:text-[#DDA038]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#DDA038]/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenSeva?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#9B2C3B] text-[#EDE8E1] font-ui text-xs font-bold uppercase tracking-wider hover:bg-[#B33A4A] transition-all rounded-sm flex items-center justify-center gap-2 border border-[#DDA038]/30"
              >
                <HeartHandshake className="w-4 h-4 text-[#DDA038]" />
                <span>Contribute Seva</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
