import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Heart, Check, ArrowRight, Shield } from 'lucide-react';

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
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C69214] rounded-full flex items-center justify-center text-[#0D0C0A] font-bold text-xl shadow-md">
                K
              </div>
              <div className="flex flex-col">
                <span className="serif italic font-bold text-xl text-[#C69214]">
                  Science of Krishna
                </span>
                <span className="text-[10px] text-[#A39E93] uppercase tracking-[0.2em] font-semibold">
                  Wisdom & Compassionate Service
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#A39E93]/80">
              Bridging timeless Bhagavad Gita principles with modern scientific inquiry to uplift consciousness and alleviate human suffering through Anna Daan and compassionate care.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#C69214]">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1A1815] border border-[#C69214]/30 hover:bg-[#C69214] hover:text-[#0D0C0A] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#1A1815] border border-[#C69214]/30 hover:bg-[#C69214] hover:text-[#0D0C0A] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="mailto:info@scienceofkrishna.org" className="p-2 bg-[#1A1815] border border-[#C69214]/30 hover:bg-[#C69214] hover:text-[#0D0C0A] transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Key Objectives */}
          <div className="space-y-3">
            <h4 className="serif italic text-lg font-bold text-[#C69214] uppercase tracking-wider">
              Key Objectives
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <button onClick={() => onNavClick?.('objectives')} className="hover:text-[#C69214] transition-colors text-left">
                  • Bhagavad Gita Teachings
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('objectives')} className="hover:text-[#C69214] transition-colors text-left">
                  • Food Relief (Anna Daan)
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('objectives')} className="hover:text-[#C69214] transition-colors text-left">
                  • Temple Seva & Preservation
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('objectives')} className="hover:text-[#C69214] transition-colors text-left">
                  • Anti-Drug Youth Campaigns
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('objectives')} className="hover:text-[#C69214] transition-colors text-left">
                  • Confidential Counseling
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('objectives')} className="hover:text-[#C69214] transition-colors text-left">
                  • Mental Health Workshops
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Quick Links */}
          <div className="space-y-3">
            <h4 className="serif italic text-lg font-bold text-[#C69214] uppercase tracking-wider">
              Explore & Seva
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-wider">
              <li>
                <button onClick={() => onNavClick?.('home')} className="hover:text-[#C69214] transition-colors text-left">
                  Main Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('about')} className="hover:text-[#C69214] transition-colors text-left">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('seva')} className="hover:text-[#C69214] transition-colors text-left">
                  Seva Impact Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick?.('wisdom')} className="hover:text-[#C69214] transition-colors text-left">
                  Vedic Science Papers
                </button>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#C69214] transition-colors">
                  Privacy Policy & Governance
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="space-y-3">
            <h4 className="serif italic text-lg font-bold text-[#C69214] uppercase tracking-wider">
              Wisdom Newsletter
            </h4>
            <p className="text-xs text-[#A39E93]">
              Subscribe for weekly Bhagavad Gita discourses, scientific research digests, and seva updates.
            </p>

            {subscribed ? (
              <div className="p-3 bg-green-950/60 border border-green-800 text-green-300 flex items-center gap-2 text-xs">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                <span>Subscribed! Welcome to the Sangha.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 bg-[#1A1815] border border-[#C69214]/30 focus:border-[#C69214] text-xs text-[#E4E3E0] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#C69214] text-[#0D0C0A] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe to Digest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#28241F] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-[#A39E93]/60">
          <div>© {new Date().getFullYear()} Science of Krishna Foundation. All Rights Reserved.</div>
          <div className="flex items-center gap-2 text-[#C69214]/80">
            <Shield className="w-3.5 h-3.5" />
            <span>Non-Profit Spiritual & Charitable Organization</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
