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
    <footer className="bg-[#0D0C0A] border-t border-[#C69214]/20 pt-12 pb-8 text-[#A39E93]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Streamlined 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-[#C69214]/60 p-0.5 bg-[#1A1815] shadow-md shrink-0 flex items-center justify-center">
                <img src={logoImg} alt="Science of Krishna Logo" className="w-full h-full object-cover object-center scale-110 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="serif font-bold text-xl text-[#C69214]">
                  Science of Krishna
                </span>
                <span className="text-[10px] text-[#A39E93] uppercase tracking-[0.2em] font-medium">
                  Vedic Wisdom & Service
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#A39E93]/80 max-w-sm">
              Bridging timeless Bhagavad Gita principles with scientific inquiry to uplift consciousness, foster mental well-being, and serve society.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[#C69214]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1A1815] rounded-lg border border-[#C69214]/20 hover:bg-[#C69214] hover:text-[#0D0C0A] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1A1815] rounded-lg border border-[#C69214]/20 hover:bg-[#C69214] hover:text-[#0D0C0A] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="mailto:info@scienceofkrishna.org" className="p-2 bg-[#1A1815] rounded-lg border border-[#C69214]/20 hover:bg-[#C69214] hover:text-[#0D0C0A] transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 md:pl-8">
            <h4 className="serif text-sm font-bold text-[#C69214] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium tracking-wide">
              <li>
                <button onClick={() => onNavClick?.('home')} className="hover:text-[#C69214] transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('activities')} className="hover:text-[#C69214] transition-colors text-left">
                  Activities
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('schedule')} className="hover:text-[#C69214] transition-colors text-left">
                  Weekly Schedule
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('blog')} className="hover:text-[#C69214] transition-colors text-left">
                  Articles & Insights
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('about')} className="hover:text-[#C69214] transition-colors text-left">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="serif text-sm font-bold text-[#C69214] uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-xs text-[#A39E93]">
              Subscribe for weekly Bhagavad Gita insights and community event updates.
            </p>

            {subscribed ? (
              <div className="p-3 bg-green-950/60 border border-green-800 rounded-xl text-green-300 flex items-center gap-2 text-xs">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                <span>Subscribed! Welcome to our community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 bg-[#1A1815] border border-[#C69214]/30 rounded-xl focus:border-[#C69214] text-xs text-[#E4E3E0] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C69214] text-[#0D0C0A] font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#28241F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-[#A39E93]/60">
          <div>© {new Date().getFullYear()} Science of Krishna Foundation</div>
          <div className="flex items-center gap-2 text-[#C69214]/80">
            <Shield className="w-3.5 h-3.5" />
            <span>Spiritual & Charitable Organization</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

