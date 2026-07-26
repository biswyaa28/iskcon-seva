import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Utensils, 
  Building2, 
  ShieldAlert, 
  UserCheck, 
  Brain, 
  ArrowRight, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Users, 
  Award,
  ChevronRight,
  X
} from 'lucide-react';

interface AboutPageProps {
  onOpenSeva?: () => void;
  onNavigate?: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenSeva, onNavigate }) => {
  const [selectedObjective, setSelectedObjective] = useState<ObjectiveCard | null>(null);

  interface ObjectiveCard {
    id: string;
    title: string;
    sanskritName: string;
    icon: React.ReactNode;
    shortDesc: string;
    fullDesc: string;
    impactMetric: string;
    keyPrograms: string[];
    badge: string;
    badgeColor: string;
  }

  const objectives: ObjectiveCard[] = [
    {
      id: 'gita',
      title: 'Bhagavad Gita Teachings',
      sanskritName: 'Gita Jnana Prachar',
      icon: <BookOpen className="w-8 h-8 text-[#DDA038]" />,
      shortDesc: 'Disseminating timeless spiritual wisdom, cosmic physics, and moral clarity through systematic study of the Gita.',
      fullDesc: 'We conduct regular study circles, university seminars, and online masterclasses breaking down the 700 verses of the Bhagavad Gita. Our scientific approach connects verse-by-verse insights with modern quantum theory, neuroplasticity, and ethical decision-making.',
      impactMetric: '50,000+ Books Distributed & 120+ Study Circles',
      keyPrograms: [
        'Weekly Gita Science Seminars',
        'Youth Leadership Workshops',
        'Free Bhagavad Gita Distribution to Students',
        'Online Multilingual Discourse Portal'
      ],
      badge: 'Wisdom & Philosophy',
      badgeColor: 'border-[#DDA038]/40 text-[#DDA038] bg-[#DDA038]/10'
    },
    {
      id: 'food',
      title: 'Food Relief (Anna Daan)',
      sanskritName: 'Sattvic Prasadam Seva',
      icon: <Utensils className="w-8 h-8 text-[#DDA038]" />,
      shortDesc: 'Nourishing bodies and uplifting minds through hot, freshly cooked, 100% Sattvic vegetarian meals.',
      fullDesc: 'Food relief is at the heart of our compassionate service. Every meal served is cooked in hygienic kitchens with devotion, offered in gratitude, and distributed freely to homeless shelters, hospital waiting zones, and rural communities.',
      impactMetric: '500,000+ Free Meals Served Annually',
      keyPrograms: [
        'Daily City Homeless Prasadam Drives',
        'Hospital Visitor Meal Support',
        'Festival Mass Feasts (Bhandara)',
        'School Nutrition Support Program'
      ],
      badge: 'Compassionate Service',
      badgeColor: 'border-[#DDA038]/40 text-[#DDA038] bg-[#DDA038]/10'
    },
    {
      id: 'temple',
      title: 'Temple Seva & Preservation',
      sanskritName: 'Mandir Archanam & Sanatana Dharma',
      icon: <Building2 className="w-8 h-8 text-[#DDA038]" />,
      shortDesc: 'Sustaining traditional deity worship, sacred temple architecture, and serene sanctuaries for meditation.',
      fullDesc: 'Temples are spiritual batteries for society. We preserve authentic Vedic temple rituals, train dedicated pujaris, restore historic shrines, and host soul-elevating evening Kirtans that awaken divine remembrance.',
      impactMetric: '12 Active Sanctuaries & Daily Kirtan',
      keyPrograms: [
        'Daily Mangala Arati & Sandhya Kirtan',
        'Historic Vedic Shrines Restoration',
        'Spiritual Retreats & Pilgrim Care',
        'Heritage Architecture Preservation'
      ],
      badge: 'Sacred Heritage',
      badgeColor: 'border-[#DDA038]/40 text-[#DDA038] bg-[#DDA038]/10'
    },
    {
      id: 'anti-drug',
      title: 'Anti-Drug Campaigns',
      sanskritName: 'Nasha Mukti & Youth Upliftment',
      icon: <ShieldAlert className="w-8 h-8 text-[#DDA038]" />,
      shortDesc: 'Empowering youth through addiction awareness, habit replacement, and higher spiritual taste.',
      fullDesc: 'Substance abuse drains human potential. Our anti-drug campaigns visit high schools, universities, and youth centers, providing compelling scientific education on addiction mechanics alongside spiritual tools to cultivate internal fulfillment.',
      impactMetric: '25,000+ Students Reached Across 40+ Colleges',
      keyPrograms: [
        'Campus Substance Prevention Drives',
        'Peer Support & Mentorship Groups',
        'Spiritual Habit Swap Workshops',
        'Family Recovery Orientation'
      ],
      badge: 'Youth Protection',
      badgeColor: 'border-[#DDA038]/40 text-[#DDA038] bg-[#DDA038]/10'
    },
    {
      id: 'counseling',
      title: 'Confidential Counseling',
      sanskritName: 'Atma Samvaad & Personal Mentorship',
      icon: <UserCheck className="w-8 h-8 text-[#DDA038]" />,
      shortDesc: 'Providing empathetic, non-judgmental 1-on-1 spiritual and personal guidance for life crises.',
      fullDesc: 'Life brings intense emotional, marital, and vocational challenges. Our compassionate counselors offer a safe, confidential sanctuary rooted in Gita psychology to help individuals find inner equilibrium and clear direction.',
      impactMetric: '1,500+ Hours of Free One-on-One Counseling',
      keyPrograms: [
        '24/7 Confidential Helpline Support',
        'Marital & Family Relationship Healing',
        'Career Crisis & Life Purpose Guidance',
        'Grief & Bereavement Support'
      ],
      badge: 'Empathetic Guidance',
      badgeColor: 'border-[#DDA038]/40 text-[#DDA038] bg-[#DDA038]/10'
    },
    {
      id: 'mental-health',
      title: 'Mental Health Workshops',
      sanskritName: 'Manah Prashamanam & Vedic Psychology',
      icon: <Brain className="w-8 h-8 text-[#DDA038]" />,
      shortDesc: 'Integrating pranayama, mantra meditation, and cognitive balance for stress and anxiety reduction.',
      fullDesc: 'Modern stress requires ancient mental mastery. Our evidence-informed workshops teach diaphragmatic breathing, japa meditation, and cognitive restructuring techniques derived from the Yoga Sutras and Bhagavad Gita Chapter 6.',
      impactMetric: '8,000+ Workshop Participants',
      keyPrograms: [
        'Corporate Stress Resilience Seminars',
        'Pranayama & Mind-Control Intensives',
        'Overcoming Anxiety with Vedic Wisdom',
        'Student Exam Focus & Calmness Labs'
      ],
      badge: 'Mind & Wellbeing',
      badgeColor: 'border-[#DDA038]/40 text-[#DDA038] bg-[#DDA038]/10'
    }
  ];

  return (
    <div className="w-full bg-transparent text-[#EDE8E1] min-h-screen pt-4 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 sm:px-12 lg:px-16 py-16 sm:py-24 border-b border-[#DDA038]/20 overflow-hidden">
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#181512] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-sm shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA038]" />
            <span>About Science of Krishna</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] text-[#EDE8E1] mb-8">
            Bridging Eternal Wisdom & <br className="hidden sm:block" />
            <span className="font-heading italic font-bold text-[#DDA038]">Compassionate Service</span>
          </h1>

          {/* Subtitle / Narrative */}
          <p className="font-body text-base sm:text-lg text-[#A39B90] max-w-3xl mx-auto leading-relaxed mb-10 border-l-2 sm:border-l-0 sm:border-t-2 border-[#DDA038] pl-4 sm:pl-0 sm:pt-6">
            Dedicated to decoding the deep scientific principles of Vedic scriptures while actively uplifting society through food relief, mental wellness programs, and compassionate human care.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenSeva}
              className="px-8 py-3.5 bg-[#9B2C3B] hover:bg-[#B33A4A] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-xs rounded-sm border border-[#DDA038]/30"
            >
              <Heart className="w-4 h-4 fill-current text-[#DDA038]" />
              <span>Contribute to Seva</span>
            </button>

            <button
              onClick={() => onNavigate?.('schedule')}
              className="px-8 py-3.5 bg-[#181512] hover:bg-[#9B2C3B] hover:text-[#EDE8E1] text-[#DDA038] border border-[#DDA038]/40 font-ui font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-xs rounded-sm"
            >
              <span>Explore Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quick Impact Numbers Bar */}
        <div className="max-w-6xl mx-auto mt-16 pt-10 border-t border-[#DDA038]/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-[#161412] border border-[#DDA038]/20 rounded-sm shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-[#DDA038] block mb-1">500,000+</span>
            <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-[0.18em]">Meals Served</span>
          </div>
          <div className="p-4 bg-[#161412] border border-[#DDA038]/20 rounded-sm shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-[#DDA038] block mb-1">50,000+</span>
            <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-[0.18em]">Gita Books</span>
          </div>
          <div className="p-4 bg-[#161412] border border-[#DDA038]/20 rounded-sm shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-[#DDA038] block mb-1">25,000+</span>
            <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-[0.18em]">Youth Reached</span>
          </div>
          <div className="p-4 bg-[#161412] border border-[#DDA038]/20 rounded-sm shadow-xs">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-[#EDE8E1] block mb-1">1,500+ Hrs</span>
            <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-[0.18em]">Counseling Given</span>
          </div>
        </div>
      </section>

      {/* 2. VISION STATEMENT BLOCK */}
      <section className="px-6 sm:px-12 lg:px-16 py-16 max-w-6xl mx-auto">
        <div className="bg-[#161412] border border-[#DDA038]/25 border-b-2 border-b-[#DDA038]/40 p-8 sm:p-12 relative shadow-md rounded-sm">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 text-[#DDA038] font-ui font-bold text-xs uppercase tracking-[0.2em]">
                <Compass className="w-4 h-4 text-[#DDA038]" />
                <span>Our Sacred Vision & Mission</span>
              </div>

              <blockquote className="font-heading italic text-2xl sm:text-3xl md:text-4xl text-[#EDE8E1] leading-snug">
                "Our vision is a spiritually awakened and socially uplifted world where timeless Vedic wisdom enlightens human mindsets, and selfless compassionate service eradicates physical, mental, and social suffering."
              </blockquote>

              <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed pt-2">
                We believe that true empowerment requires a dual harmonized engine: intellectual illumination through the Bhagavad Gita's science of consciousness, and direct social action through hunger relief, mental health care, and addiction rehabilitation.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-[#DDA038]/20 pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-3 font-ui text-xs text-[#EDE8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#DDA038]" />
                <span className="font-semibold uppercase tracking-wider">Unconditional Compassion</span>
              </div>
              <div className="flex items-center gap-3 font-ui text-xs text-[#EDE8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#DDA038]" />
                <span className="font-semibold uppercase tracking-wider">Scientific Inquiry</span>
              </div>
              <div className="flex items-center gap-3 font-ui text-xs text-[#EDE8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#DDA038]" />
                <span className="font-semibold uppercase tracking-wider">Holistic Wellbeing</span>
              </div>
              <div className="flex items-center gap-3 font-ui text-xs text-[#EDE8E1]">
                <CheckCircle2 className="w-4 h-4 text-[#DDA038]" />
                <span className="font-semibold uppercase tracking-wider">Universal Brotherhood</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. 6-CARD OBJECTIVES GRID */}
      <section id="objectives" className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#181512] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-4 rounded-sm">
            <Users className="w-3.5 h-3.5 text-[#DDA038]" />
            <span>Pillars of Action</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E1] leading-tight mb-4">
            Our Key <span className="font-heading italic text-[#DDA038]">Objectives & Service Initiatives</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[#A39B90]">
            Explore how we put Vedic philosophy into tangible action across six key domains of community welfare and spiritual enlightenment.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((obj) => (
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              key={obj.id}
              onClick={() => setSelectedObjective(obj)}
              className="bg-[#161412] border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/35 p-7 flex flex-col justify-between group transition-all duration-300 cursor-pointer shadow-md hover:border-[#DDA038]/50 rounded-sm relative"
            >
              <div>
                {/* Header Row: Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-[#1F1C18] border border-[#DDA038]/30 group-hover:border-[#DDA038] transition-colors rounded-xs">
                    {obj.icon}
                  </div>
                  <span className={`font-ui text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border rounded-xs ${obj.badgeColor}`}>
                    {obj.badge}
                  </span>
                </div>

                {/* Sanskrit Term */}
                <span className="font-ui text-[#DDA038] text-xs font-bold uppercase tracking-wider block mb-1">
                  {obj.sanskritName}
                </span>

                {/* Card Title */}
                <h3 className="font-heading italic text-2xl font-bold text-[#EDE8E1] group-hover:text-[#DDA038] transition-colors mb-3">
                  {obj.title}
                </h3>

                {/* Short Description */}
                <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed mb-6">
                  {obj.shortDesc}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#DDA038]/20 flex items-center justify-between">
                <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-wider">
                  Read More
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* Modal Overlay for Objective Details */}
      <AnimatePresence>
        {selectedObjective && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-[#181512] border-2 border-[#DDA038]/40 p-6 sm:p-10 max-w-2xl w-full relative shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto"
            >
              
              <button
                onClick={() => setSelectedObjective(null)}
                className="absolute top-4 right-4 text-[#A39B90] hover:text-[#EDE8E1] p-2 font-ui"
                aria-label="Close detail modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#1F1C18] border border-[#DDA038]/40 rounded-xs">
                  {selectedObjective.icon}
                </div>
                <div>
                  <span className="font-ui text-xs text-[#DDA038] uppercase tracking-wider font-bold block">
                    {selectedObjective.sanskritName}
                  </span>
                  <h3 className="font-heading italic text-2xl sm:text-3xl font-bold text-[#EDE8E1]">
                    {selectedObjective.title}
                  </h3>
                </div>
              </div>

              <p className="font-body text-sm text-[#EDE8E1] leading-relaxed mb-6 border-l-2 border-[#DDA038] pl-4 italic">
                {selectedObjective.fullDesc}
              </p>

              {/* Impact Metric Banner */}
              <div className="p-4 bg-[#1F1C18] border border-[#DDA038]/30 rounded-xs mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#DDA038] shrink-0" />
                <div>
                  <span className="font-ui text-[10px] text-[#A39B90] uppercase tracking-wider block">Key Benchmark</span>
                  <span className="font-body text-sm font-bold text-[#DDA038]">{selectedObjective.impactMetric}</span>
                </div>
              </div>

              {/* Program Highlights */}
              <div className="mb-8 space-y-2">
                <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-[#EDE8E1] mb-3">
                  Core Sub-Programs:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedObjective.keyPrograms.map((prog, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-body text-xs text-[#EDE8E1] bg-[#1F1C18] p-2 border border-[#DDA038]/20 rounded-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#DDA038] shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DDA038]/20">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedObjective(null);
                    onOpenSeva?.();
                  }}
                  className="px-6 py-2.5 bg-[#9B2C3B] hover:bg-[#B33A4A] text-[#EDE8E1] font-ui text-xs font-bold uppercase tracking-wider transition-all rounded-sm border border-[#DDA038]/30"
                >
                  Sponsor This Seva
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedObjective(null)}
                  className="px-6 py-2.5 border border-[#DDA038]/40 text-[#DDA038] hover:bg-[#DDA038] hover:text-[#0C0B0A] font-ui text-xs font-bold uppercase tracking-wider transition-all rounded-sm"
                >
                  Close Window
                </motion.button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
