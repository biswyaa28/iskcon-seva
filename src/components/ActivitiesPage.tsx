import React, { useState } from 'react';
import { 
  BookOpen, 
  Utensils, 
  ShieldAlert, 
  Building2, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Heart, 
  Sparkles, 
  DollarSign, 
  IndianRupee, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown,
  Video,
  Award
} from 'lucide-react';

interface ActivitiesPageProps {
  onOpenSevaModal?: (amount: number, cause: string) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onOpenSevaModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Donation State
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState<string>('50');
  const [selectedCause, setSelectedCause] = useState<string>('Feed the Needy (Anna Daan)');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [dedicationMsg, setDedicationMsg] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const categories = [
    'All',
    'Spiritual Education',
    'Food Distribution',
    'Anti-Drug & Counseling Initiatives',
    'Temple Support'
  ];

  interface ActivityItem {
    id: string;
    title: string;
    sanskritTag: string;
    category: 'Spiritual Education' | 'Food Distribution' | 'Anti-Drug & Counseling Initiatives' | 'Temple Support';
    icon: React.ReactNode;
    schedule: string;
    location: string;
    isOnline: boolean;
    description: string;
    impact: string;
    keyHighlights: string[];
  }

  const activitiesList: ActivityItem[] = [
    // Spiritual Education
    {
      id: 'gita-seminar',
      title: 'Bhagavad Gita & Quantum Physics Masterclass',
      sanskritTag: 'Gita Jnana Sastra',
      category: 'Spiritual Education',
      icon: <BookOpen className="w-6 h-6 text-[#C69214]" />,
      schedule: 'Every Saturday, 6:00 PM - 7:30 PM',
      location: 'Main Auditorium & YouTube Live',
      isOnline: true,
      description: 'Weekly deep dive analyzing Bhagavad Gita verses alongside observer mechanics, quantum entanglement, and consciousness studies.',
      impact: '2,500+ Weekly Learners',
      keyHighlights: ['Interactive Q&A', 'Sanskrit Verse Chanting', 'Sloka Study Guides Provided']
    },
    {
      id: 'youth-wisdom',
      title: 'Vedic Leadership & Ethics Circle',
      sanskritTag: 'Youth Dharma Club',
      category: 'Spiritual Education',
      icon: <BookOpen className="w-6 h-6 text-[#C69214]" />,
      schedule: 'Every Sunday, 10:00 AM - 11:30 AM',
      location: 'University Campus Center',
      isOnline: false,
      description: 'Tailored for college students and young professionals seeking timeless moral clarity, decision-making mastery, and focus.',
      impact: '40+ College Chapters',
      keyHighlights: ['Peer Group Discussions', 'Free Bhagavad Gita Copies', 'Career Mentorship']
    },

    // Food Distribution
    {
      id: 'daily-anna-daan',
      title: 'Daily Sattvic Food Relief Drive (Anna Daan)',
      sanskritTag: 'Maha Prasadam Seva',
      category: 'Food Distribution',
      icon: <Utensils className="w-6 h-6 text-[#B24227]" />,
      schedule: 'Daily, 12:00 PM - 2:00 PM',
      location: 'City Shelter Zones & Public Hospitals',
      isOnline: false,
      description: 'Distributing thousands of hot, freshly cooked, 100% Sattvic vegetarian meals to patients, homeless individuals, and children.',
      impact: '1,500+ Meals Daily',
      keyHighlights: ['Hygienic Vedic Cooking', 'Free Distribution', 'Zero Waste Policy']
    },
    {
      id: 'sunday-feast',
      title: 'Sunday Community Gratitude Prasadam Feast',
      sanskritTag: 'Ananda Bhandara',
      category: 'Food Distribution',
      icon: <Utensils className="w-6 h-6 text-[#B24227]" />,
      schedule: 'Every Sunday, 1:00 PM - 3:00 PM',
      location: 'Temple Cultural Hall',
      isOnline: false,
      description: 'Open to all without distinction. A magnificent 7-course Sattvic feast accompanied by spiritual music and community fellowship.',
      impact: '800+ Sunday Guests',
      keyHighlights: ['All Are Welcome', '7-Course Traditional Menu', 'Volunteer Prep Opportunities']
    },

    // Anti-Drug & Counseling Initiatives
    {
      id: 'nasha-mukti',
      title: 'Campus Anti-Drug & Addiction Awareness Campaign',
      sanskritTag: 'Nasha Mukti Campaign',
      category: 'Anti-Drug & Counseling Initiatives',
      icon: <ShieldAlert className="w-6 h-6 text-[#B24227]" />,
      schedule: 'Bi-Weekly Wednesdays',
      location: 'Regional High Schools & Universities',
      isOnline: false,
      description: 'Interactive educational presentations debunking addiction myths, demonstrating neurobiological recovery, and teaching spiritual habit replacement.',
      impact: '25,000+ Youth Educated',
      keyHighlights: ['Medical & Spiritual Experts', 'Peer Support Networks', 'Free Helpline Pamphlets']
    },
    {
      id: 'confidential-counseling',
      title: 'Confidential 1-on-1 Spiritual & Personal Counseling',
      sanskritTag: 'Atma Samvaad Care',
      category: 'Anti-Drug & Counseling Initiatives',
      icon: <ShieldAlert className="w-6 h-6 text-[#C69214]" />,
      schedule: 'By Appointment (24/7 Helpline Available)',
      location: 'Sanctuary Care Rooms or Private Zoom',
      isOnline: true,
      description: 'Compassionate, safe, non-judgmental personal mentorship grounded in Bhagavad Gita psychology for individuals facing crisis, grief, or addiction.',
      impact: '1,500+ Hours Provided',
      keyHighlights: ['100% Confidential', 'Certified Counselors', 'Free of Charge']
    },

    // Temple Support
    {
      id: 'temple-renovation',
      title: 'Temple Preservation & Deity Worship Seva',
      sanskritTag: 'Mandir Archanam',
      category: 'Temple Support',
      icon: <Building2 className="w-6 h-6 text-[#C69214]" />,
      schedule: 'Daily Worship: 4:30 AM - 8:30 PM',
      location: 'Main Temple Sanctuary',
      isOnline: false,
      description: 'Sustaining traditional Vedic arati rituals, floral decorations, incense offerings, and architectural preservation of sacred spaces.',
      impact: '12 Sanctuaries Maintained',
      keyHighlights: ['Ancient Vedic Chanting', 'Flower Garland Service', 'Heritage Restoration']
    },
    {
      id: 'evening-kirtan',
      title: 'Soul-Elevating Sandhya Kirtan & Mantra Meditation',
      sanskritTag: 'Nāmāmrta Kirtan',
      category: 'Temple Support',
      icon: <Building2 className="w-6 h-6 text-[#C69214]" />,
      schedule: 'Daily, 7:00 PM - 8:15 PM',
      location: 'Temple Main Hall & Live Stream',
      isOnline: true,
      description: 'Immersive acoustic mantra meditation with classical mridanga and kartals, reducing mental anxiety and elevating spiritual awareness.',
      impact: 'Daily Live Streamed Worldwide',
      keyHighlights: ['Traditional Instruments', 'Open to Beginners', 'Meditation Cushion Seating']
    }
  ];

  const filteredActivities = activeCategory === 'All'
    ? activitiesList
    : activitiesList.filter(act => act.category === activeCategory);

  const usdPresets = [10, 50, 100, 250];
  const inrPresets = [500, 2000, 5000, 10000];

  const currentPresets = currency === 'USD' ? usdPresets : inrPresets;

  const getEffectiveAmount = (): number => {
    if (selectedPreset === 'custom') {
      return parseFloat(customAmount) || 0;
    }
    return selectedPreset;
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmt = getEffectiveAmount();
    if (finalAmt <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }
    setPaymentSuccess(true);
  };

  return (
    <div className="w-full bg-[#0D0C0A] text-[#E4E3E0] min-h-screen pt-6 pb-20">
      
      {/* HEADER HERO */}
      <section className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto text-center border-b border-[#C69214]/20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1A1815] border border-[#C69214]/40 text-[#C69214] text-xs font-bold uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Programs & Seva Initiatives</span>
        </div>

        <h1 className="serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E4E3E0] leading-tight mb-6">
          Community Initiatives & <span className="serif italic text-[#C69214]">Spiritual Gathering Schedule</span>
        </h1>

        <p className="text-base sm:text-lg text-[#A39E93] max-w-3xl mx-auto leading-relaxed border-l-2 sm:border-l-0 sm:border-t-2 border-[#C69214] pl-4 sm:pl-0 sm:pt-4">
          Explore our weekly educational discourses, food relief distribution drives, anti-drug awareness campaigns, and sacred temple gatherings.
        </p>
      </section>

      {/* SECTION 1: TABBED CATEGORY FILTER */}
      <section className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-[#C69214] text-[#0D0C0A] border-[#C69214] shadow-lg gold-glow'
                  : 'bg-[#1A1815] text-[#A39E93] hover:text-[#E4E3E0] border-[#C69214]/30 hover:border-[#C69214]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-[#1A1815] gold-border border-t-2 border border-[#C69214]/20 p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Top Row: Category Tag & Online Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[#28241F] text-[#C69214] border border-[#C69214]/30">
                    {act.sanskritTag}
                  </span>

                  {act.isOnline && (
                    <span className="flex items-center gap-1 text-[11px] text-green-400 font-medium bg-green-950/40 px-2.5 py-0.5 border border-green-800/40">
                      <Video className="w-3 h-3" />
                      Live Streamed
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 bg-[#0D0C0A] border border-[#C69214]/30 shrink-0">
                    {act.icon}
                  </div>
                  <h3 className="serif italic text-2xl font-bold text-[#E4E3E0] leading-snug">
                    {act.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-6">
                  {act.description}
                </p>

                {/* Details Meta */}
                <div className="space-y-2 mb-6 text-xs text-[#E4E3E0] bg-[#0D0C0A]/60 p-4 border border-[#28241F]">
                  <div className="flex items-center gap-2 text-[#C69214]">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span className="font-semibold uppercase tracking-wider">{act.schedule}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#A39E93]">
                    <MapPin className="w-4 h-4 shrink-0 text-[#B24227]" />
                    <span>{act.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#A39E93]">
                    <Award className="w-4 h-4 shrink-0 text-[#C69214]" />
                    <span className="text-[#C69214] font-bold">{act.impact}</span>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-1.5 mb-6">
                  {act.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#A39E93]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C69214] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA */}
              <div className="pt-4 border-t border-[#28241F] flex items-center justify-between">
                <button
                  onClick={() => {
                    const el = document.getElementById('donation-block');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 bg-[#C69214] text-[#0D0C0A] text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-md"
                >
                  Sponsor This Initiative
                </button>

                <span className="text-[10px] text-[#A39E93] uppercase tracking-wider">
                  Open to All
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* SECTION 2: COMPREHENSIVE "SUPPORT OUR SEVA" DONATION BLOCK */}
      <section id="donation-block" className="px-6 sm:px-12 lg:px-16 py-16 max-w-5xl mx-auto">
        <div className="bg-[#1A1815] gold-border border-2 border-[#C69214]/40 p-8 sm:p-12 relative shadow-2xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0D0C0A] border border-[#B24227]/40 text-[#FF9E85] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <Heart className="w-3.5 h-3.5 text-[#B24227] fill-current" />
              <span>Sacred Contribution Offering</span>
            </div>

            <h2 className="serif text-3xl sm:text-4xl font-bold text-[#E4E3E0] leading-tight mb-3">
              Support Our <span className="serif italic text-[#C69214]">Seva Initiatives</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed">
              Your financial contribution directly feeds the hungry with Sattvic Prasadam, prints Bhagavad Gita wisdom books, and funds confidential youth counseling.
            </p>
          </div>

          {paymentSuccess ? (
            <div className="p-8 bg-[#0D0C0A] border border-[#C69214] text-center space-y-4">
              <div className="w-16 h-16 bg-[#C69214]/20 border border-[#C69214] rounded-full flex items-center justify-center mx-auto text-[#C69214]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="serif italic text-2xl text-[#C69214]">Offering Received with Gratitude</h3>
              <p className="text-sm text-[#E4E3E0]/80 max-w-md mx-auto">
                Thank you, <strong className="text-white">{donorName || 'Kind Sevaka'}</strong>! Your offering of <strong className="text-[#C69214]">{currency === 'USD' ? '$' : '₹'}{getEffectiveAmount()}</strong> towards <strong className="text-[#B24227]">{selectedCause}</strong> has been received. May transcendental peace and divine blessings illuminate your life.
              </p>
              <button
                onClick={() => setPaymentSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-[#C69214] text-[#0D0C0A] text-xs font-bold uppercase tracking-widest hover:brightness-110"
              >
                Make Another Offering
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonateSubmit} className="space-y-8">
              
              {/* Row 1: Currency Selector & Cause Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Currency Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#C69214] mb-2">
                    1. Select Currency
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('USD');
                        setSelectedPreset(50);
                        setCustomAmount('50');
                      }}
                      className={`py-2.5 text-xs font-bold uppercase tracking-wider border flex items-center justify-center gap-2 transition-all ${
                        currency === 'USD'
                          ? 'bg-[#C69214] text-[#0D0C0A] border-[#C69214]'
                          : 'bg-[#0D0C0A] text-[#A39E93] border-[#28241F] hover:border-[#C69214]/50'
                      }`}
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>USD ($)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('INR');
                        setSelectedPreset(2000);
                        setCustomAmount('2000');
                      }}
                      className={`py-2.5 text-xs font-bold uppercase tracking-wider border flex items-center justify-center gap-2 transition-all ${
                        currency === 'INR'
                          ? 'bg-[#C69214] text-[#0D0C0A] border-[#C69214]'
                          : 'bg-[#0D0C0A] text-[#A39E93] border-[#28241F] hover:border-[#C69214]/50'
                      }`}
                    >
                      <IndianRupee className="w-4 h-4" />
                      <span>INR (₹)</span>
                    </button>
                  </div>
                </div>

                {/* Cause Selector Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#C69214] mb-2">
                    2. Choose Cause / Initiative
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCause}
                      onChange={(e) => setSelectedCause(e.target.value)}
                      className="w-full bg-[#0D0C0A] border border-[#C69214]/40 px-4 py-2.5 text-xs text-[#E4E3E0] font-medium appearance-none focus:border-[#C69214] focus:outline-none"
                    >
                      <option value="Feed the Needy (Anna Daan)">Feed the Needy (Anna Daan Prasadam)</option>
                      <option value="Youth Counseling & Anti-Drug">Youth Counseling & Anti-Drug Campaigns</option>
                      <option value="Spiritual Education & Bhagavad Gita Books">Spiritual Education & Bhagavad Gita Books</option>
                      <option value="Temple Restoration & Sanctuary Care">Temple Restoration & Sanctuary Care</option>
                      <option value="General Seva Fund">General Unrestricted Seva Fund</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#C69214] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Row 2: Predefined Amount Buttons & Custom Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#C69214] mb-3">
                  3. Select Offering Amount
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {currentPresets.map((amt) => {
                    const isSelected = selectedPreset === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedPreset(amt);
                          setCustomAmount(amt.toString());
                        }}
                        className={`py-3 px-4 border text-center transition-all ${
                          isSelected
                            ? 'bg-[#B24227] text-white border-[#B24227] shadow-md rust-glow'
                            : 'bg-[#0D0C0A] text-[#E4E3E0] border-[#28241F] hover:border-[#C69214]/40'
                        }`}
                      >
                        <span className="serif text-xl font-bold block">
                          {currency === 'USD' ? '$' : '₹'}{amt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="flex items-center gap-3 bg-[#0D0C0A] border border-[#C69214]/40 p-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C69214] px-3">
                    Custom Amount ({currency}):
                  </span>
                  <input
                    type="number"
                    min={1}
                    value={customAmount}
                    onChange={(e) => {
                      setSelectedPreset('custom');
                      setCustomAmount(e.target.value);
                    }}
                    placeholder="Enter custom amount"
                    className="flex-grow bg-transparent text-lg font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Donor Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#28241F]">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#C69214] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Arjuna Sharma"
                    className="w-full bg-[#0D0C0A] border border-[#C69214]/30 px-4 py-2.5 text-xs text-[#E4E3E0] focus:border-[#C69214] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#C69214] mb-1">
                    Email Address (for tax receipt)
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="e.g. arjuna@gita.org"
                    className="w-full bg-[#0D0C0A] border border-[#C69214]/30 px-4 py-2.5 text-xs text-[#E4E3E0] focus:border-[#C69214] focus:outline-none"
                  />
                </div>
              </div>

              {/* Optional Dedication */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#C69214] mb-1">
                  Dedication Message / Prayer (Optional)
                </label>
                <textarea
                  rows={2}
                  value={dedicationMsg}
                  onChange={(e) => setDedicationMsg(e.target.value)}
                  placeholder="In memory of family or special prayer request..."
                  className="w-full bg-[#0D0C0A] border border-[#C69214]/30 px-4 py-2 text-xs text-[#E4E3E0] focus:border-[#C69214] focus:outline-none resize-none"
                />
              </div>

              {/* Trigger Payment Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#C69214] text-[#0D0C0A] font-bold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl gold-glow flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>
                  Proceed to Complete Seva Offering ({currency === 'USD' ? '$' : '₹'}{getEffectiveAmount()})
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};
