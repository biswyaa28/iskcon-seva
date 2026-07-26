import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  List, 
  Grid, 
  Filter, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Utensils, 
  ShieldAlert, 
  Building2,
  Share2,
  CalendarPlus
} from 'lucide-react';

export interface ScheduleEvent {
  id: string;
  date: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Sat, Aug 12, 2026"
  time: string; // e.g. "6:00 PM - 7:30 PM"
  title: string;
  category: 'Lectures' | 'Food Drives' | 'Youth Workshops' | 'Temple Gatherings';
  location: string;
  isOnline: boolean;
  meetingUrl?: string;
  sanskritTerm: string;
  shortDesc: string;
  capacityLeft: number;
}

export const SchedulePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<ScheduleEvent | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Calendar Month State
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 7, 1)); // August 2026

  const mockEvents: ScheduleEvent[] = [
    {
      id: 'evt-1',
      date: '2026-08-01',
      displayDate: 'Sat, Aug 1, 2026',
      time: '6:00 PM - 7:30 PM',
      title: 'Bhagavad Gita & Quantum Physics Lecture',
      category: 'Lectures',
      location: 'Main Auditorium & Zoom Live',
      isOnline: true,
      meetingUrl: 'https://zoom.us/j/gita-science',
      sanskritTerm: 'Gita Sastra Discourse',
      shortDesc: 'A scientific breakdown of Gita Chapter 2, verse 20 analyzing consciousness, non-locality, and observer effects in physics.',
      capacityLeft: 34
    },
    {
      id: 'evt-2',
      date: '2026-08-02',
      displayDate: 'Sun, Aug 2, 2026',
      time: '12:00 PM - 2:30 PM',
      title: 'Maha Anna Daan Prasadam Food Drive',
      category: 'Food Drives',
      location: 'City Shelter Zone 4 & Central Hospital',
      isOnline: false,
      sanskritTerm: 'Sattvic Prasadam Seva',
      shortDesc: 'Distributing 1,000+ hot, freshly prepared Sattvic meals to homeless individuals and hospital visitors.',
      capacityLeft: 12
    },
    {
      id: 'evt-3',
      date: '2026-08-05',
      displayDate: 'Wed, Aug 5, 2026',
      time: '4:00 PM - 6:00 PM',
      title: 'Youth Anti-Drug & Mental Resilience Workshop',
      category: 'Youth Workshops',
      location: 'Campus Student Center Room 102',
      isOnline: false,
      sanskritTerm: 'Nasha Mukti Seminar',
      shortDesc: 'Interactive workshop teaching neurobiological recovery from addiction and mind control techniques from Chapter 6.',
      capacityLeft: 18
    },
    {
      id: 'evt-4',
      date: '2026-08-08',
      displayDate: 'Sat, Aug 8, 2026',
      time: '7:00 PM - 8:30 PM',
      title: 'Sandhya Kirtan & Mantra Sound Healing',
      category: 'Temple Gatherings',
      location: 'Sanctuary Main Hall & YouTube Live',
      isOnline: true,
      meetingUrl: 'https://youtube.com/c/scienceofkrishna',
      sanskritTerm: 'Nāmāmrta Kirtan',
      shortDesc: 'Acoustic mantra meditation using classical instruments to release mental anxiety and experience inner peace.',
      capacityLeft: 50
    },
    {
      id: 'evt-5',
      date: '2026-08-12',
      displayDate: 'Wed, Aug 12, 2026',
      time: '6:30 PM - 8:00 PM',
      title: 'Confidential Mental Health & Gita Counseling Circle',
      category: 'Youth Workshops',
      location: 'Sanctuary Care Wing & Private Zoom',
      isOnline: true,
      sanskritTerm: 'Atma Samvaad Mentorship',
      shortDesc: 'Group discussion and 1-on-1 breakout sessions for stress reduction, grief management, and emotional grounding.',
      capacityLeft: 8
    },
    {
      id: 'evt-6',
      date: '2026-08-15',
      displayDate: 'Sat, Aug 15, 2026',
      time: '11:00 AM - 2:00 PM',
      title: 'Weekend Hunger Relief & Book Distribution Drive',
      category: 'Food Drives',
      location: 'University Town Square',
      isOnline: false,
      sanskritTerm: 'Dharmic Anna & Vidya Seva',
      shortDesc: 'Combining free nutritious food distribution with sponsored distribution of Bhagavad Gita books to students.',
      capacityLeft: 25
    },
    {
      id: 'evt-7',
      date: '2026-08-22',
      displayDate: 'Sat, Aug 22, 2026',
      time: '5:30 PM - 7:30 PM',
      title: 'Epistemology & Consciousness Symposium',
      category: 'Lectures',
      location: 'Science & Wisdom Auditorium',
      isOnline: true,
      sanskritTerm: 'Pramana Vidya Symposium',
      shortDesc: 'Comparing empirical scientific epistemology with Vedic direct perception (Pratyaksha, Anumana, Sabda).',
      capacityLeft: 40
    }
  ];

  const categories = ['All', 'Lectures', 'Food Drives', 'Youth Workshops', 'Temple Gatherings'];

  const filteredEvents = selectedCategory === 'All'
    ? mockEvents
    : mockEvents.filter(e => e.category === selectedCategory);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  const closeRsvpModal = () => {
    setSelectedEventForRsvp(null);
    setRsvpSubmitted(false);
    setRsvpName('');
    setRsvpEmail('');
    setRsvpPhone('');
    setGuestsCount(1);
  };

  // Calendar Helper Logic
  const daysInMonth = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfWeek = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth(),
    1
  ).getDay();

  const monthName = currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full bg-transparent text-[#EDE8E1] min-h-screen pt-6 pb-20">
      
      {/* HEADER HERO */}
      <section className="px-6 sm:px-12 lg:px-16 py-12 max-w-7xl mx-auto text-center border-b border-[#DDA038]/20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#181512] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded-sm shadow-xs">
          <CalendarIcon className="w-3.5 h-3.5 text-[#DDA038]" />
          <span>Interactive Event Calendar & Schedule</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#EDE8E1]">
          Gathering & <span className="font-heading italic font-bold text-[#DDA038]">Activity Schedule</span>
        </h1>

        <p className="font-body text-base sm:text-lg text-[#A39B90] max-w-3xl mx-auto leading-relaxed border-l-2 sm:border-l-0 sm:border-t-2 border-[#DDA038] pl-4 sm:pl-0 sm:pt-4">
          Reserve your spot for upcoming scientific discourses, community food drives, anti-drug workshops, and temple kirtans.
        </p>
      </section>

      {/* CONTROLS BAR: CATEGORY FILTER & VIEW TOGGLE */}
      <section className="px-6 sm:px-12 lg:px-16 py-8 max-w-7xl mx-auto">
        <div className="bg-[#161412] border border-[#DDA038]/20 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs rounded-sm">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
            <span className="font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#DDA038]" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 font-ui text-xs font-bold uppercase tracking-wider transition-all border rounded-sm ${
                  selectedCategory === cat
                    ? 'bg-[#9B2C3B] text-[#EDE8E1] border-[#DDA038]/40 shadow-xs'
                    : 'bg-[#181512] text-[#A39B90] border-[#DDA038]/20 hover:text-[#EDE8E1] hover:border-[#DDA038]/40'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* List View vs. Calendar View Toggle */}
          <div className="flex items-center gap-2 bg-[#0F0D0C] p-1 border border-[#DDA038]/20 rounded-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all rounded-xs ${
                viewMode === 'list'
                  ? 'bg-[#9B2C3B] text-[#EDE8E1]'
                  : 'text-[#A39B90] hover:text-[#EDE8E1]'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List View</span>
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all rounded-xs ${
                viewMode === 'calendar'
                  ? 'bg-[#9B2C3B] text-[#EDE8E1]'
                  : 'text-[#A39B90] hover:text-[#EDE8E1]'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Calendar View</span>
            </button>
          </div>

        </div>
      </section>

      {/* MAIN SCHEDULE DISPLAY AREA */}
      <section className="px-6 sm:px-12 lg:px-16 py-6 max-w-7xl mx-auto">
        
        {/* MODE 1: LIST VIEW */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="p-12 text-center bg-[#161412] border border-[#DDA038]/20 rounded-sm">
                <p className="font-body text-sm text-[#A39B90]">No events found for this filter category.</p>
              </div>
            ) : (
              filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-[#161412] border-l-4 border-l-[#9B2C3B] border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs hover:-translate-y-0.5 transition-transform rounded-sm"
                >
                  {/* Left Column: Date & Details */}
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider bg-[#1F1C18] text-[#DDA038] border border-[#DDA038]/30 rounded-xs">
                        {evt.category}
                      </span>
                      <span className="font-ui text-xs font-bold text-[#EDE8E1] uppercase tracking-wider">
                        {evt.sanskritTerm}
                      </span>
                      {evt.isOnline && (
                        <span className="flex items-center gap-1 font-ui text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950/40 px-2.5 py-0.5 border border-emerald-500/30 rounded-xs">
                          <Video className="w-3 h-3 text-emerald-400" />
                          Live Stream
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading italic text-2xl font-bold text-[#EDE8E1]">
                      {evt.title}
                    </h3>

                    <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed">
                      {evt.shortDesc}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-xs text-[#EDE8E1] pt-1">
                      <div className="flex items-center gap-1.5 text-[#DDA038] font-ui">
                        <CalendarIcon className="w-4 h-4 shrink-0 text-[#DDA038]" />
                        <span className="font-bold">{evt.displayDate}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[#DDA038] font-ui">
                        <Clock className="w-4 h-4 shrink-0 text-[#DDA038]" />
                        <span>{evt.time}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[#A39B90] font-body">
                        <MapPin className="w-4 h-4 shrink-0 text-[#DDA038]" />
                        <span>{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: RSVP Trigger */}
                  <div className="w-full md:w-auto shrink-0 flex flex-col items-start md:items-end gap-3 border-t md:border-t-0 md:border-l border-[#DDA038]/20 pt-4 md:pt-0 md:pl-8">
                    <span className="font-body text-[11px] text-[#A39B90] font-medium">
                      <strong className="text-[#DDA038] font-bold">{evt.capacityLeft}</strong> seats available
                    </span>

                    <button
                      onClick={() => setSelectedEventForRsvp(evt)}
                      className="w-full md:w-auto px-6 py-3 bg-[#9B2C3B] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider hover:bg-[#B33A4A] transition-all rounded-sm border border-[#DDA038]/30 shadow-xs flex items-center justify-center gap-2"
                    >
                      <CalendarPlus className="w-4 h-4 text-[#DDA038]" />
                      <span>RSVP / Register</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* MODE 2: CALENDAR VIEW */}
        {viewMode === 'calendar' && (
          <div className="bg-[#161412] border border-[#DDA038]/20 p-6 sm:p-8 shadow-xs rounded-sm">
            
            {/* Calendar Month Controls */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#DDA038]/20">
              <h2 className="font-heading italic text-2xl sm:text-3xl font-bold text-[#DDA038]">
                {monthName}
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1))}
                  className="p-2 bg-[#181512] border border-[#DDA038]/30 hover:bg-[#9B2C3B] hover:text-[#EDE8E1] transition-colors rounded-xs text-[#DDA038]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1))}
                  className="p-2 bg-[#181512] border border-[#DDA038]/30 hover:bg-[#9B2C3B] hover:text-[#EDE8E1] transition-colors rounded-xs text-[#DDA038]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center font-ui text-xs font-bold uppercase tracking-wider text-[#DDA038] mb-4">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty offset cells */}
              {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} className="min-h-[100px] bg-[#0F0D0C]/30 border border-transparent p-2" />
              ))}

              {/* Month Day Cells */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const dateStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                const eventsForDay = mockEvents.filter(e => e.date === dateStr);

                return (
                  <div
                    key={`day-${dayNum}`}
                    className="min-h-[110px] bg-[#0F0D0C] border border-[#DDA038]/20 hover:border-[#DDA038]/50 p-2 flex flex-col justify-between rounded-xs"
                  >
                    <span className="font-ui text-xs font-bold text-[#EDE8E1]">{dayNum}</span>

                    <div className="space-y-1">
                      {eventsForDay.map(evt => (
                        <div
                          key={evt.id}
                          onClick={() => setSelectedEventForRsvp(evt)}
                          className="p-1.5 bg-[#9B2C3B]/30 border border-[#DDA038]/30 font-ui text-[10px] font-bold text-[#DDA038] cursor-pointer hover:bg-[#9B2C3B] hover:text-[#EDE8E1] transition-colors rounded-xs truncate"
                          title={evt.title}
                        >
                          {evt.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </section>

      {/* RSVP MODAL TRIGGER OVERLAY */}
      {selectedEventForRsvp && (
        <div className="fixed inset-0 bg-[#000000]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#161412] border-2 border-[#DDA038]/40 p-6 sm:p-10 max-w-lg w-full relative shadow-2xl rounded-sm">
            
            <button
              onClick={closeRsvpModal}
              className="absolute top-4 right-4 text-[#A39B90] hover:text-[#EDE8E1] p-2 font-ui"
            >
              <X className="w-6 h-6" />
            </button>

            {rsvpSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-[#1F1C18] border border-[#DDA038]/40 rounded-full flex items-center justify-center mx-auto text-[#DDA038]">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="font-heading italic text-2xl text-[#DDA038]">Registration Confirmed!</h3>
                <p className="font-body text-xs sm:text-sm text-[#A39B90]">
                  Thank you, <strong className="text-[#EDE8E1]">{rsvpName}</strong>. You are registered for <strong className="text-[#DDA038]">{selectedEventForRsvp.title}</strong> on {selectedEventForRsvp.displayDate} ({guestsCount} attendee{guestsCount > 1 ? 's' : ''}).
                </p>
                <div className="p-3 bg-[#0F0D0C] border border-[#DDA038]/20 text-xs text-[#A39B90] font-body rounded-xs">
                  A calendar invite and access details have been sent to <strong className="text-[#EDE8E1]">{rsvpEmail}</strong>.
                </div>
                <button
                  onClick={closeRsvpModal}
                  className="px-6 py-2.5 bg-[#9B2C3B] text-[#EDE8E1] font-ui text-xs font-bold uppercase tracking-wider rounded-sm border border-[#DDA038]/30 hover:bg-[#B33A4A]"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                <span className="font-ui text-[10px] text-[#DDA038] font-bold uppercase tracking-wider block mb-1">
                  Event Registration
                </span>
                <h3 className="font-heading italic text-2xl font-bold text-[#EDE8E1] mb-2">
                  RSVP: {selectedEventForRsvp.title}
                </h3>
                
                <div className="font-body text-xs text-[#A39B90] space-y-1 mb-6 p-3 bg-[#0F0D0C] border border-[#DDA038]/20 rounded-xs">
                  <p><strong className="text-[#DDA038]">Date & Time:</strong> {selectedEventForRsvp.displayDate} ({selectedEventForRsvp.time})</p>
                  <p><strong className="text-[#DDA038]">Venue:</strong> {selectedEventForRsvp.location}</p>
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Radheshyam Das"
                      className="w-full bg-[#0F0D0C] border border-[#DDA038]/30 rounded-sm px-4 py-2 font-body text-xs text-[#EDE8E1] focus:border-[#DDA038] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="e.g. radhe@vedic.org"
                      className="w-full bg-[#0F0D0C] border border-[#DDA038]/30 rounded-sm px-4 py-2 font-body text-xs text-[#EDE8E1] focus:border-[#DDA038] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={rsvpPhone}
                        onChange={(e) => setRsvpPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-[#0F0D0C] border border-[#DDA038]/30 rounded-sm px-4 py-2 font-body text-xs text-[#EDE8E1] focus:border-[#DDA038] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-ui text-xs font-bold uppercase tracking-wider text-[#A39B90] mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full bg-[#0F0D0C] border border-[#DDA038]/30 rounded-sm px-4 py-2 font-body text-xs text-[#EDE8E1] focus:border-[#DDA038] focus:outline-none"
                      >
                        <option value={1} className="bg-[#161412] text-[#EDE8E1]">1 Person</option>
                        <option value={2} className="bg-[#161412] text-[#EDE8E1]">2 People</option>
                        <option value={3} className="bg-[#161412] text-[#EDE8E1]">3 People</option>
                        <option value={4} className="bg-[#161412] text-[#EDE8E1]">4 People</option>
                        <option value={5} className="bg-[#161412] text-[#EDE8E1]">5+ Group</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#9B2C3B] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider hover:bg-[#B33A4A] transition-all border border-[#DDA038]/30 shadow-xs rounded-sm mt-4"
                  >
                    Confirm RSVP & Get Ticket
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
