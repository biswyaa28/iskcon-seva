import React from 'react';
import logoImg from '../assets/logo.jpg';

interface HeaderProps {
  onLoginClick?: () => void;
  onNavClick?: (target: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick, onNavClick }) => {
  return (
    <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-white/5 bg-[#0D0C0A] z-40">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavClick?.('home')}>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#C69214]/60 p-0.5 bg-[#1A1815] shrink-0 flex items-center justify-center">
          <img src={logoImg} alt="Science of Krishna Logo" className="w-full h-full object-cover object-center scale-110 rounded-full" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#C69214] serif italic">
          Science of Krishna
        </span>
      </div>
      <nav className="hidden md:flex gap-10 text-sm font-medium uppercase tracking-[0.2em] text-[#C69214]/80">
        <a href="#philosophy" onClick={(e) => { e.preventDefault(); onNavClick?.('philosophy'); }} className="hover:text-[#C69214] transition-colors">Philosophy</a>
        <a href="#seva" onClick={(e) => { e.preventDefault(); onNavClick?.('seva'); }} className="hover:text-[#C69214] transition-colors">Seva</a>
        <a href="#wisdom" onClick={(e) => { e.preventDefault(); onNavClick?.('wisdom'); }} className="hover:text-[#C69214] transition-colors">Wisdom</a>
        <a href="#community" onClick={(e) => { e.preventDefault(); onNavClick?.('community'); }} className="hover:text-[#C69214] transition-colors">Community</a>
      </nav>
      <button 
        onClick={onLoginClick}
        className="px-6 py-2 border border-[#C69214] text-[#C69214] text-xs uppercase tracking-widest hover:bg-[#C69214] hover:text-[#0D0C0A] transition-all"
      >
        Portal Login
      </button>
    </header>
  );
};
