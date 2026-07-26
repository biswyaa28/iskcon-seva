import React, { useState } from 'react';
import { Mail, Instagram, Youtube, Check, ArrowRight, Shield } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

interface FooterProps {
  onNavClick?: (target: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0908] border-t border-[#DDA038]/20 pt-6 pb-4 text-[#A39B90]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Streamlined 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5 items-start">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#DDA038]/50 p-0.5 bg-[#181512] shadow-xs shrink-0 flex items-center justify-center">
                <img src={logoImg} alt="Science of Krishna Logo" className="w-full h-full object-cover object-center scale-110 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base text-[#EDE8E1]">
                  Science of Krishna
                </span>
                <span className="font-ui text-[9px] text-[#DDA038] uppercase tracking-[0.2em] font-semibold">
                  Vedic Wisdom & Service
                </span>
              </div>
            </div>
            <p className="font-body text-xs leading-snug text-[#A39B90] max-w-sm">
              Bridging timeless Bhagavad Gita principles with scientific inquiry to uplift consciousness and serve society.
            </p>
            <div className="flex items-center gap-2 text-[#DDA038]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-[#181512] rounded-sm border border-[#DDA038]/30 hover:bg-[#9B2C3B] hover:text-[#EDE8E1] transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-[#181512] rounded-sm border border-[#DDA038]/30 hover:bg-[#9B2C3B] hover:text-[#EDE8E1] transition-colors" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="mailto:info@scienceofkrishna.org" className="p-1.5 bg-[#181512] rounded-sm border border-[#DDA038]/30 hover:bg-[#9B2C3B] hover:text-[#EDE8E1] transition-colors" aria-label="Email">
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2 md:pl-4">
            <h4 className="font-ui text-xs font-bold text-[#DDA038] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs font-medium tracking-wide">
              <li>
                <button onClick={() => onNavClick?.('home')} className="font-ui text-[#A39B90] hover:text-[#EDE8E1] transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('activities')} className="font-ui text-[#A39B90] hover:text-[#EDE8E1] transition-colors text-left">
                  Activities
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('schedule')} className="font-ui text-[#A39B90] hover:text-[#EDE8E1] transition-colors text-left">
                  Schedule
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('blog')} className="font-ui text-[#A39B90] hover:text-[#EDE8E1] transition-colors text-left">
                  Articles
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('about')} className="font-ui text-[#A39B90] hover:text-[#EDE8E1] transition-colors text-left">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletter */}
          <div className="space-y-2 bg-[#161412] p-3.5 rounded-sm border border-[#DDA038]/20">
            <h4 className="font-ui text-xs font-bold text-[#DDA038] uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="font-body text-[11px] text-[#A39B90] leading-tight">
              Subscribe for weekly Bhagavad Gita insights and community event updates.
            </p>

            {subscribed ? (
              <div className="p-2 bg-[#1F1C18] border border-[#DDA038]/30 rounded-sm text-emerald-400 flex items-center gap-2 text-xs font-body">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Subscribed! Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow min-w-0 px-3 py-1.5 bg-[#0F0D0C] border border-[#DDA038]/30 rounded-sm focus:border-[#DDA038] font-body text-xs text-[#EDE8E1] placeholder-[#A39B90]/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#9B2C3B] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-[#B33A4A] transition-all flex items-center justify-center gap-1 border border-[#DDA038]/30 shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3 h-3 text-[#DDA038]" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-3 border-t border-[#DDA038]/15 flex flex-col sm:flex-row items-center justify-between gap-2 font-ui text-[10px] uppercase tracking-[0.15em] text-[#A39B90]/70">
          <div>© {new Date().getFullYear()} Science of Krishna Foundation</div>
          <div className="flex items-center gap-1.5 text-[#DDA038]">
            <Shield className="w-3 h-3 text-[#DDA038]" />
            <span>Spiritual & Charitable Organization</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

