import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
      icon: <BookOpen className="w-6 h-6 text-[#6A1B29]" />,
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
      icon: <BookOpen className="w-6 h-6 text-[#6A1B29]" />,
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
      icon: <Utensils className="w-6 h-6 text-[#C68A2C]" />,
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
      icon: <Utensils className="w-6 h-6 text-[#C68A2C]" />,
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
      icon: <ShieldAlert className="w-6 h-6 text-[#C68A2C]" />,
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
      icon: <ShieldAlert className="w-6 h-6 text-[#6A1B29]" />,
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
      icon: <Building2 className="w-6 h-6 text-[#6A1B29]" />,
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
      icon: <Building2 className="w-6 h-6 text-[#6A1B29]" />,
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
    <div className="w-full bg-transparent text-[#EDE8E1] min-h-screen pt-6 pb-20">
      
      {/* HEADER HERO */}
      <section className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto text-center border-b border-[#DDA038]/20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#181512] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-sm shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#DDA038]" />
          <span>Active Programs & Seva Initiatives</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#EDE8E1]">
          Community Initiatives & <span className="font-heading italic font-bold text-[#DDA038]">Spiritual Gathering Schedule</span>
        </h1>

        <p className="font-body text-base sm:text-lg text-[#A39B90] max-w-3xl mx-auto leading-relaxed border-l-2 sm:border-l-0 sm:border-t-2 border-[#DDA038] pl-4 sm:pl-0 sm:pt-4">
          Explore our weekly educational discourses, food relief distribution drives, anti-drug awareness campaigns, and sacred temple gatherings.
        </p>
      </section>

      {/* SECTION 1: TABBED CATEGORY FILTER */}
      <section className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 font-ui text-xs font-bold uppercase tracking-wider transition-all duration-200 border rounded-sm ${
                activeCategory === cat
                  ? 'bg-[#9B2C3B] text-[#EDE8E1] border-[#DDA038]/40 shadow-sm'
                  : 'bg-[#161412] text-[#A39B90] hover:text-[#EDE8E1] border-[#DDA038]/20 hover:border-[#DDA038]/40'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Activity Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredActivities.map((act) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                key={act.id}
                className="bg-[#161412] border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/35 p-6 sm:p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 shadow-md rounded-sm"
              >
                <div>
                  {/* Top Row: Category Tag & Online Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider bg-[#1F1C18] text-[#DDA038] border border-[#DDA038]/30 rounded-xs">
                      {act.sanskritTag}
                    </span>

                    {act.isOnline && (
                      <span className="flex items-center gap-1 font-ui text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/60 px-2.5 py-0.5 border border-emerald-500/30 rounded-xs">
                        <Video className="w-3 h-3 text-emerald-400" />
                        Live Streamed
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 bg-[#1F1C18] border border-[#DDA038]/30 rounded-xs shrink-0">
                      {act.icon}
                    </div>
                    <h3 className="font-heading italic text-2xl font-bold text-[#EDE8E1] leading-snug">
                      {act.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed mb-6">
                    {act.description}
                  </p>

                  {/* Details Meta */}
                  <div className="space-y-2 mb-6 text-xs text-[#EDE8E1] bg-[#1F1C18] p-4 border border-[#DDA038]/20 rounded-xs">
                    <div className="flex items-center gap-2 text-[#DDA038] font-ui">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="font-semibold uppercase tracking-wider">{act.schedule}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#A39B90] font-body">
                      <MapPin className="w-4 h-4 shrink-0 text-[#9B2C3B]" />
                      <span>{act.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#A39B90] font-body">
                      <Award className="w-4 h-4 shrink-0 text-[#DDA038]" />
                      <span className="text-[#DDA038] font-bold">{act.impact}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {act.keyHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 font-body text-xs text-[#A39B90]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DDA038] shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-[#DDA038]/20 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const el = document.getElementById('donation-block');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2 bg-[#9B2C3B] text-[#EDE8E1] font-ui text-xs font-bold uppercase tracking-wider hover:bg-[#B33A4A] transition-all rounded-sm border border-[#DDA038]/30"
                  >
                    Sponsor This Initiative
                  </motion.button>

                  <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-wider">
                    Open to All
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

      {/* SECTION 2: COMPREHENSIVE "SUPPORT OUR SEVA" DONATION BLOCK */}
      <section id="donation-block" className="px-6 sm:px-12 lg:px-16 py-16 max-w-5xl mx-auto">
        <div className="bg-[#161412] border-2 border-[#DDA038]/30 border-b-2 border-b-[#DDA038]/40 p-8 sm:p-12 relative shadow-md rounded-sm">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1F1C18] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-4 rounded-sm">
              <Heart className="w-3.5 h-3.5 text-[#DDA038] fill-current" />
              <span>Sacred Contribution Offering</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#EDE8E1] leading-tight mb-3">
              Support Our <span className="font-heading italic text-[#DDA038]">Seva Initiatives</span>
            </h2>

            <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed">
              Your financial contribution directly feeds the hungry with Sattvic Prasadam, prints Bhagavad Gita wisdom books, and funds confidential youth counseling.
            </p>
          </div>

          {paymentSuccess ? (
            <div className="p-8 bg-[#181512] border border-[#DDA038]/40 text-center space-y-4 rounded-sm">
              <div className="w-16 h-16 bg-[#DDA038]/10 border border-[#DDA038]/40 rounded-full flex items-center justify-center mx-auto text-[#DDA038]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading italic text-2xl text-[#DDA038]">Offering Received with Gratitude</h3>
              <p className="font-body text-sm text-[#A39B90] max-w-md mx-auto">
                Thank you, <strong className="text-[#EDE8E1]">{donorName || 'Kind Sevaka'}</strong>! Your offering of <strong className="text-[#DDA038]">{currency === 'USD' ? '$' : '₹'}{getEffectiveAmount()}</strong> towards <strong className="text-[#DDA038]">{selectedCause}</strong> has been received. May transcendental peace and divine blessings illuminate your life.
              </p>
              <button
                onClick={() => setPaymentSuccess(false)}
                className="mt-4 px-6 py-2.5 bg-[#9B2C3B] text-[#EDE8E1] font-ui text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#B33A4A] border border-[#DDA038]/30"
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
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] mb-2">
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
                      className={`py-2.5 font-ui text-xs font-bold uppercase tracking-wider border rounded-sm flex items-center justify-center gap-2 transition-all ${
                        currency === 'USD'
                          ? 'bg-[#9B2C3B] text-[#EDE8E1] border-[#DDA038]/40'
                          : 'bg-[#181512] text-[#A39B90] border-[#DDA038]/20 hover:border-[#DDA038]/40'
                      }`}
                    >
                      <DollarSign className="w-4 h-4 text-[#DDA038]" />
                      <span>USD ($)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('INR');
                        setSelectedPreset(2000);
                        setCustomAmount('2000');
                      }}
                      className={`py-2.5 font-ui text-xs font-bold uppercase tracking-wider border rounded-sm flex items-center justify-center gap-2 transition-all ${
                        currency === 'INR'
                          ? 'bg-[#9B2C3B] text-[#EDE8E1] border-[#DDA038]/40'
                          : 'bg-[#181512] text-[#A39B90] border-[#DDA038]/20 hover:border-[#DDA038]/40'
                      }`}
                    >
                      <IndianRupee className="w-4 h-4 text-[#DDA038]" />
                      <span>INR (₹)</span>
                    </button>
                  </div>
                </div>

                {/* Cause Selector Dropdown */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] mb-2">
                    2. Choose Cause / Initiative
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCause}
                      onChange={(e) => setSelectedCause(e.target.value)}
                      className="w-full bg-[#13110F] border border-[#DDA038]/30 rounded-sm px-4 py-2.5 font-body text-xs text-[#EDE8E1] appearance-none focus:border-[#DDA038] focus:outline-none"
                    >
                      <option value="Feed the Needy (Anna Daan)">Feed the Needy (Anna Daan Prasadam)</option>
                      <option value="Youth Counseling & Anti-Drug">Youth Counseling & Anti-Drug Campaigns</option>
                      <option value="Spiritual Education & Bhagavad Gita Books">Spiritual Education & Bhagavad Gita Books</option>
                      <option value="Temple Restoration & Sanctuary Care">Temple Restoration & Sanctuary Care</option>
                      <option value="General Seva Fund">General Unrestricted Seva Fund</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#DDA038] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Row 2: Predefined Amount Buttons & Custom Input */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] mb-3">
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
                        className={`py-3 px-4 border text-center transition-all rounded-sm ${
                          isSelected
                            ? 'bg-[#9B2C3B] text-[#EDE8E1] border-[#DDA038]/40 shadow-sm'
                            : 'bg-[#181512] text-[#EDE8E1] border-[#DDA038]/20 hover:border-[#DDA038]/40'
                        }`}
                      >
                        <span className="font-heading text-xl font-bold block text-[#DDA038]">
                          {currency === 'USD' ? '$' : '₹'}{amt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="flex items-center gap-3 bg-[#13110F] border border-[#DDA038]/30 rounded-sm p-2">
                  <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] px-3">
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
                    className="flex-grow bg-transparent font-heading text-lg font-bold text-[#EDE8E1] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Donor Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#DDA038]/20">
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Arjuna Sharma"
                    className="w-full bg-[#13110F] border border-[#DDA038]/30 rounded-sm px-4 py-2.5 font-body text-xs text-[#EDE8E1] focus:border-[#DDA038] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] mb-1">
                    Email Address (for tax receipt)
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="e.g. arjuna@gita.org"
                    className="w-full bg-[#13110F] border border-[#DDA038]/30 rounded-sm px-4 py-2.5 font-body text-xs text-[#EDE8E1] focus:border-[#DDA038] focus:outline-none"
                  />
                </div>
              </div>

              {/* Optional Dedication */}
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] mb-1">
                  Dedication Message / Prayer (Optional)
                </label>
                <textarea
                  rows={2}
                  value={dedicationMsg}
                  onChange={(e) => setDedicationMsg(e.target.value)}
                  placeholder="In memory of family or special prayer request..."
                  className="w-full bg-[#13110F] border border-[#DDA038]/30 rounded-sm px-4 py-2 font-body text-xs text-[#EDE8E1] focus:border-[#DDA038] focus:outline-none resize-none"
                />
              </div>

              {/* Trigger Payment Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#9B2C3B] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider hover:bg-[#B33A4A] transition-all rounded-sm border border-[#DDA038]/40 shadow-sm flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-current text-[#DDA038]" />
                <span>
                  Proceed to Complete Seva Offering ({currency === 'USD' ? '$' : '₹'}{getEffectiveAmount()})
                </span>
                <ArrowRight className="w-4 h-4 text-[#DDA038]" />
              </button>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};
