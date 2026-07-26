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
      icon: <BookOpen className="w-8 h-8 text-[#C69214]" />,
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
      badgeColor: 'border-[#C69214]/40 text-[#C69214] bg-[#C69214]/10'
    },
    {
      id: 'food',
      title: 'Food Relief (Anna Daan)',
      sanskritName: 'Sattvic Prasadam Seva',
      icon: <Utensils className="w-8 h-8 text-[#B24227]" />,
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
      badgeColor: 'border-[#B24227]/40 text-[#FF9E85] bg-[#B24227]/10'
    },
    {
      id: 'temple',
      title: 'Temple Seva & Preservation',
      sanskritName: 'Mandir Archanam & Sanatana Dharma',
      icon: <Building2 className="w-8 h-8 text-[#C69214]" />,
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
      badgeColor: 'border-[#C69214]/40 text-[#C69214] bg-[#C69214]/10'
    },
    {
      id: 'anti-drug',
      title: 'Anti-Drug Campaigns',
      sanskritName: 'Nasha Mukti & Youth Upliftment',
      icon: <ShieldAlert className="w-8 h-8 text-[#B24227]" />,
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
      badgeColor: 'border-[#B24227]/40 text-[#FF9E85] bg-[#B24227]/10'
    },
    {
      id: 'counseling',
      title: 'Confidential Counseling',
      sanskritName: 'Atma Samvaad & Personal Mentorship',
      icon: <UserCheck className="w-8 h-8 text-[#C69214]" />,
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
      badgeColor: 'border-[#C69214]/40 text-[#C69214] bg-[#C69214]/10'
    },
    {
      id: 'mental-health',
      title: 'Mental Health Workshops',
      sanskritName: 'Manah Prashamanam & Vedic Psychology',
      icon: <Brain className="w-8 h-8 text-[#B24227]" />,
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
      badgeColor: 'border-[#B24227]/40 text-[#FF9E85] bg-[#B24227]/10'
    }
  ];

  return (
    <div className="w-full bg-[#0D0C0A] text-[#E4E3E0] min-h-screen pt-4 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 sm:px-12 lg:px-16 py-16 sm:py-24 border-b border-[#C69214]/20 overflow-hidden">
        {/* Subtle Background Glow Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C69214]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1A1815] border border-[#C69214]/40 text-[#C69214] text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Science of Krishna</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="serif text-4xl sm:text-5xl lg:text-7xl font-extrabold heading-light-texture leading-[1.1] mb-8">
            Bridging Eternal Wisdom & <br className="hidden sm:block" />
            <span className="serif italic text-textured-terracotta font-black">Compassionate Service</span>
          </h1>

          {/* Subtitle / Narrative */}
          <p className="text-base sm:text-lg text-[#E4E3E0]/80 max-w-3xl mx-auto font-normal leading-relaxed mb-10 border-l-2 sm:border-l-0 sm:border-t-2 border-[#C69214] pl-4 sm:pl-0 sm:pt-6">
            Dedicated to decoding the deep scientific principles of Vedic scriptures while actively uplifting society through food relief, mental wellness programs, and compassionate human care.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenSeva}
              className="px-8 py-3.5 bg-[#B24227] hover:bg-[#D85436] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg rust-glow"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Contribute to Seva</span>
            </button>

            <button
              onClick={() => onNavigate?.('schedule')}
              className="px-8 py-3.5 bg-[#1A1815] hover:bg-[#C69214] hover:text-[#0D0C0A] text-[#C69214] border border-[#C69214] font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <span>Explore Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Quick Impact Numbers Bar */}
        <div className="max-w-6xl mx-auto mt-16 pt-10 border-t border-[#28241F] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-[#1A1815] gold-border">
            <span className="serif text-3xl sm:text-4xl font-bold text-[#C69214] block mb-1">500,000+</span>
            <span className="text-[10px] text-[#A39E93] uppercase tracking-[0.18em]">Meals Served</span>
          </div>
          <div className="p-4 bg-[#1A1815] gold-border">
            <span className="serif text-3xl sm:text-4xl font-bold text-[#B24227] block mb-1">50,000+</span>
            <span className="text-[10px] text-[#A39E93] uppercase tracking-[0.18em]">Gita Books</span>
          </div>
          <div className="p-4 bg-[#1A1815] gold-border">
            <span className="serif text-3xl sm:text-4xl font-bold text-[#C69214] block mb-1">25,000+</span>
            <span className="text-[10px] text-[#A39E93] uppercase tracking-[0.18em]">Youth Reached</span>
          </div>
          <div className="p-4 bg-[#1A1815] gold-border">
            <span className="serif text-3xl sm:text-4xl font-bold text-[#E4E3E0] block mb-1">1,500+ Hrs</span>
            <span className="text-[10px] text-[#A39E93] uppercase tracking-[0.18em]">Counseling Given</span>
          </div>
        </div>
      </section>

      {/* 2. VISION STATEMENT BLOCK */}
      <section className="px-6 sm:px-12 lg:px-16 py-16 max-w-6xl mx-auto">
        <div className="bg-[#1A1815] gold-border border-2 p-8 sm:p-12 relative shadow-2xl overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2 text-[#C69214] font-bold text-xs uppercase tracking-[0.2em]">
                <Compass className="w-4 h-4 text-[#C69214]" />
                <span>Our Sacred Vision & Mission</span>
              </div>

              <blockquote className="serif italic text-2xl sm:text-3xl md:text-4xl text-[#E4E3E0] leading-snug">
                "Our vision is a spiritually awakened and socially uplifted world where timeless Vedic wisdom enlightens human mindsets, and selfless compassionate service eradicates physical, mental, and social suffering."
              </blockquote>

              <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed pt-2">
                We believe that true empowerment requires a dual harmonized engine: intellectual illumination through the Bhagavad Gita's science of consciousness, and direct social action through hunger relief, mental health care, and addiction rehabilitation.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-[#28241F] pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-3 text-xs text-[#E4E3E0]">
                <CheckCircle2 className="w-4 h-4 text-[#C69214]" />
                <span className="font-semibold uppercase tracking-wider">Unconditional Compassion</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#E4E3E0]">
                <CheckCircle2 className="w-4 h-4 text-[#C69214]" />
                <span className="font-semibold uppercase tracking-wider">Scientific Inquiry</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#E4E3E0]">
                <CheckCircle2 className="w-4 h-4 text-[#C69214]" />
                <span className="font-semibold uppercase tracking-wider">Holistic Wellbeing</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#E4E3E0]">
                <CheckCircle2 className="w-4 h-4 text-[#C69214]" />
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1815] border border-[#C69214]/30 text-[#C69214] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Pillars of Action</span>
          </div>
          <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-extrabold heading-light-texture leading-tight mb-4">
            Our Key <span className="serif italic text-textured-gold font-extrabold">Objectives & Service Initiatives</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93]">
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
              className="bg-[#1A1815] gold-border border-t-2 border border-[#C69214]/20 p-7 flex flex-col justify-between group transition-all duration-300 cursor-pointer shadow-lg relative"
            >
              <div>
                {/* Header Row: Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 bg-[#0D0C0A] border border-[#C69214]/30 group-hover:border-[#C69214] transition-colors">
                    {obj.icon}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border ${obj.badgeColor}`}>
                    {obj.badge}
                  </span>
                </div>

                {/* Sanskrit Term */}
                <span className="text-[#C69214] text-xs font-bold uppercase tracking-widest block mb-1">
                  {obj.sanskritName}
                </span>

                {/* Card Title */}
                <h3 className="serif italic text-2xl font-bold text-[#E4E3E0] group-hover:text-[#C69214] transition-colors mb-3">
                  {obj.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#E4E3E0]/70 leading-relaxed mb-6">
                  {obj.shortDesc}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#28241F] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C69214] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
                <span className="text-[10px] text-[#A39E93] uppercase tracking-wider">
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-[#1A1815] border-2 border-[#C69214] p-6 sm:p-10 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              
              <button
                onClick={() => setSelectedObjective(null)}
                className="absolute top-4 right-4 text-[#A39E93] hover:text-white p-2"
                aria-label="Close detail modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#0D0C0A] border border-[#C69214]/40">
                  {selectedObjective.icon}
                </div>
                <div>
                  <span className="text-xs text-[#C69214] uppercase tracking-widest font-bold block">
                    {selectedObjective.sanskritName}
                  </span>
                  <h3 className="serif italic text-2xl sm:text-3xl font-bold text-[#E4E3E0]">
                    {selectedObjective.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#E4E3E0]/90 leading-relaxed mb-6 border-l-2 border-[#C69214] pl-4 italic">
                {selectedObjective.fullDesc}
              </p>

              {/* Impact Metric Banner */}
              <div className="p-4 bg-[#0D0C0A] border border-[#C69214]/30 mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#C69214] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#A39E93] uppercase tracking-wider block">Key Benchmark</span>
                  <span className="text-sm font-bold text-[#C69214]">{selectedObjective.impactMetric}</span>
                </div>
              </div>

              {/* Program Highlights */}
              <div className="mb-8 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#E4E3E0] mb-3">
                  Core Sub-Programs:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedObjective.keyPrograms.map((prog, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#E4E3E0]/80 bg-[#0D0C0A]/60 p-2 border border-[#28241F]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C69214] shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#28241F]">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedObjective(null);
                    onOpenSeva?.();
                  }}
                  className="px-6 py-2.5 bg-[#B24227] hover:bg-[#D85436] text-white text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Sponsor This Seva
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedObjective(null)}
                  className="px-6 py-2.5 border border-[#C69214] text-[#C69214] hover:bg-[#C69214] hover:text-[#0D0C0A] text-xs font-bold uppercase tracking-widest transition-all"
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
