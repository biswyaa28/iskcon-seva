import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WEEKLY_EVENTS } from '../data/mockData';
import { EventItem } from '../types';
import { Calendar, Clock, MapPin, Video, CheckCircle, UserCheck, X } from 'lucide-react';

export const ActivitiesSchedule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rsvpModalEvent, setRsvpModalEvent] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');

  const categories = ['All', 'Feast', 'Study Circle', 'Meditation', 'Seva Drive'];

  const filteredEvents = selectedCategory === 'All'
    ? WEEKLY_EVENTS
    : WEEKLY_EVENTS.filter(e => e.category === selectedCategory);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpModalEvent(null);
      setRsvpName('');
      setRsvpEmail('');
    }, 2500);
  };

  return (
    <section id="schedule" className="py-24 bg-transparent relative border-t border-[#DDA038]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#181512] border border-[#DDA038]/30 text-[#DDA038] font-ui text-xs font-bold uppercase tracking-[0.2em] mb-4 rounded-sm shadow-xs">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span>Gatherings & Discourses</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#EDE8E1] leading-tight mb-4">
            Weekly <span className="font-heading italic text-[#DDA038]">Activities & Feasts</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[#A39B90]">
            Join our vibrant community for weekly discourses, Sunday Prasadam feasts, scientific study circles, and meditation sessions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-[#9B2C3B] text-[#EDE8E1] border border-[#DDA038]/40'
                  : 'bg-[#161412] text-[#A39B90] hover:text-[#EDE8E1] border border-[#DDA038]/20'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Events Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={event.id}
                className="bg-[#161412] rounded-sm border border-[#DDA038]/20 border-b-2 border-b-[#DDA038]/35 p-6 sm:p-7 flex flex-col justify-between hover:border-[#DDA038]/50 transition-all shadow-md"
              >
                <div>
                  {/* Event Category Badge & Time */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-ui px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[#1F1C18] text-[#DDA038] border border-[#DDA038]/30 rounded-xs">
                      {event.category}
                    </span>

                    {event.isOnlineAvailable && (
                      <span className="font-ui flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-0.5 border border-emerald-500/30 rounded-full">
                        <Video className="w-3 h-3 text-emerald-400" />
                        Live Stream
                      </span>
                    )}
                  </div>

                  {/* Event Title */}
                  <h3 className="font-heading italic text-xl font-bold text-[#EDE8E1] mb-3">
                    {event.title}
                  </h3>

                  {/* Event Description */}
                  <p className="font-body text-xs sm:text-sm text-[#A39B90] leading-relaxed mb-6">
                    {event.description}
                  </p>

                  {/* Details List */}
                  <div className="font-body space-y-2 mb-6 text-xs text-[#EDE8E1]">
                    <div className="flex items-center gap-2 text-[#DDA038]">
                      <Clock className="w-4 h-4 shrink-0 text-[#DDA038]" />
                      <span className="font-ui font-semibold uppercase tracking-wider text-[11px]">{event.dayTime}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#A39B90]">
                      <MapPin className="w-4 h-4 shrink-0 text-[#9B2C3B]" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#A39B90]">
                      <UserCheck className="w-4 h-4 shrink-0 text-[#DDA038]" />
                      <span>Host: {event.speakerOrHost}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#DDA038]/20 flex items-center justify-between gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRsvpModalEvent(event)}
                    className="px-4 py-2 bg-[#9B2C3B] text-[#EDE8E1] font-ui text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#B33A4A] transition-all shadow-xs border border-[#DDA038]/30"
                  >
                    RSVP Spot
                  </motion.button>

                  {event.meetingLink && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={event.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-sm bg-[#1F1C18] hover:bg-[#28241F] border border-[#DDA038]/30 font-ui text-xs text-[#EDE8E1] font-semibold flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Join Online</span>
                    </motion.a>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {rsvpModalEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-[#181512] rounded-sm max-w-md w-full p-6 border border-[#DDA038]/40 relative shadow-2xl"
            >
              <button
                onClick={() => setRsvpModalEvent(null)}
                className="absolute top-4 right-4 text-[#A39B90] hover:text-[#EDE8E1] font-ui"
              >
                <X className="w-5 h-5" />
              </button>

              {rsvpSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h3 className="font-heading text-xl font-bold text-[#DDA038]">
                    Spot Reserved!
                  </h3>
                  <p className="font-body text-xs text-[#A39B90]">
                    We have sent confirmation details to <strong className="text-[#EDE8E1]">{rsvpEmail}</strong>. We look forward to welcoming you!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <span className="font-ui text-[11px] font-bold text-[#DDA038] uppercase tracking-wider block mb-0.5">
                      RSVP Registration
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[#EDE8E1]">
                      {rsvpModalEvent.title}
                    </h3>
                    <p className="font-body text-xs text-[#A39B90] mt-1">
                      {rsvpModalEvent.dayTime}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="font-ui text-xs font-semibold text-[#A39B90] block mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="e.g. Arjuna Sharma"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#13110F] border border-[#DDA038]/30 focus:border-[#DDA038] font-body text-xs text-[#EDE8E1] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-ui text-xs font-semibold text-[#A39B90] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={rsvpEmail}
                        onChange={(e) => setRsvpEmail(e.target.value)}
                        placeholder="arjuna@example.com"
                        className="w-full px-3.5 py-2.5 rounded-sm bg-[#13110F] border border-[#DDA038]/30 focus:border-[#DDA038] font-body text-xs text-[#EDE8E1] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 rounded-sm bg-[#9B2C3B] hover:bg-[#B33A4A] text-[#EDE8E1] font-ui font-bold text-xs uppercase tracking-wider transition-all border border-[#DDA038]/30"
                    >
                      Confirm My Reservation
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
