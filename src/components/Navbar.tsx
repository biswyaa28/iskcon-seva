import React, { useState } from 'react';
import { Menu, X, Sparkles, HeartHandshake, LogIn, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onOpenLogin?: () => void;
  onOpenSeva?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  onNavigate,
  onOpenLogin,
  onOpenSeva,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'objectives', label: 'Objectives' },
    { id: 'activities', label: 'Activities' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'seva', label: 'Seva Impact' },
    { id: 'wisdom', label: 'Wisdom' },
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
          <div className="w-10 h-10 bg-[#C69214] rounded-full flex items-center justify-center text-[#0D0C0A] font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            K
          </div>
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
        <nav className="hidden md:flex items-center gap-8 bg-[#1A1815]/80 px-6 py-2.5 rounded-full border border-[#C69214]/30">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 ${
                  isActive
                    ? 'text-[#C69214] font-bold border-b-2 border-[#C69214] pb-0.5'
                    : 'text-[#C69214]/70 hover:text-[#C69214]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 border border-[#C69214] text-[#C69214] text-xs font-bold uppercase tracking-widest hover:bg-[#C69214] hover:text-[#0D0C0A] transition-all duration-200 flex items-center gap-2"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Portal Login</span>
          </button>

          <button
            onClick={onOpenSeva}
            className="px-5 py-2 bg-[#B24227] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D85436] transition-all duration-300 shadow-md flex items-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Contribute Seva</span>
          </button>
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
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1815] border-b border-[#C69214]/30 px-6 py-6 space-y-4">
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
                onOpenLogin?.();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 border border-[#C69214] text-[#C69214] text-xs font-bold uppercase tracking-widest hover:bg-[#C69214] hover:text-[#0D0C0A] transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Portal Login</span>
            </button>

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
        </div>
      )}
    </header>
  );
};
