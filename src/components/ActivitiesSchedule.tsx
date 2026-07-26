import React, { useState } from 'react';
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
    <section id="schedule" className="py-24 bg-[#0D0C0A] relative border-t border-[#1A1815]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1815] border border-[#C69214]/30 text-[#C69214] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="material-symbols-outlined text-sm">calendar_month</span>
            <span>Gatherings & Discourses</span>
          </div>
          <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#E4E3E0] leading-tight mb-4">
            Weekly <span className="serif italic text-[#C69214]">Activities & Feasts</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A39E93]">
            Join our vibrant community for weekly discourses, Sunday Prasadam feasts, scientific study circles, and meditation sessions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C69214] text-[#0D0C0A]'
                  : 'bg-[#1A1815] text-[#A39E93] hover:text-[#E4E3E0] border border-[#28241F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#1A1815] gold-border border-t-2 border border-[#C69214]/20 p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Event Category Badge & Time */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-[#28241F] text-[#C69214] border border-[#C69214]/30">
                    {event.category}
                  </span>

                  {event.isOnlineAvailable && (
                    <span className="flex items-center gap-1 text-[11px] text-green-400 font-medium bg-green-950/40 px-2.5 py-0.5 border border-green-800/40">
                      <Video className="w-3 h-3" />
                      Live Stream
                    </span>
                  )}
                </div>

                {/* Event Title */}
                <h3 className="serif italic text-xl font-bold text-[#E4E3E0] mb-3">
                  {event.title}
                </h3>

                {/* Event Description */}
                <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Details List */}
                <div className="space-y-2 mb-6 text-xs text-[#E4E3E0]">
                  <div className="flex items-center gap-2 text-[#C69214]">
                    <Clock className="w-4 h-4 shrink-0 text-[#C69214]" />
                    <span className="font-semibold uppercase tracking-wider">{event.dayTime}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#A39E93]">
                    <MapPin className="w-4 h-4 shrink-0 text-[#B24227]" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#A39E93]">
                    <UserCheck className="w-4 h-4 shrink-0 text-[#C69214]" />
                    <span>Host: {event.speakerOrHost}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#28241F] flex items-center justify-between gap-3">
                <button
                  onClick={() => setRsvpModalEvent(event)}
                  className="px-4 py-2 bg-[#C69214] text-[#0D0C0A] text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-md"
                >
                  RSVP Spot
                </button>

                {event.meetingLink && (
                  <a
                    href={event.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-[#1A1815] hover:bg-[#28241F] border border-[#C69214]/30 text-xs text-[#F4EFE6] flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5 text-green-400" />
                    <span>Join Online</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* RSVP Modal */}
      {rsvpModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D0C0A]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="obsidian-card rounded-2xl max-w-md w-full p-6 border border-[#C69214]/40 relative">
            <button
              onClick={() => setRsvpModalEvent(null)}
              className="absolute top-4 right-4 text-[#A39E93] hover:text-[#F4EFE6]"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto animate-bounce" />
                <h3 className="font-cinzel text-xl font-bold text-[#F4EFE6]">
                  Spot Reserved!
                </h3>
                <p className="text-xs text-[#A39E93]">
                  We have sent confirmation details to <strong className="text-[#F4EFE6]">{rsvpEmail}</strong>. We look forward to welcoming you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#C69214] uppercase tracking-wider">
                    RSVP Registration
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-[#F4EFE6]">
                    {rsvpModalEvent.title}
                  </h3>
                  <p className="text-xs text-[#A39E93] mt-1">
                    {rsvpModalEvent.dayTime}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-[#A39E93] block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="e.g. Arjuna Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0C0A] border border-[#28241F] focus:border-[#C69214] text-xs text-[#F4EFE6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#A39E93] block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      placeholder="arjuna@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D0C0A] border border-[#28241F] focus:border-[#C69214] text-xs text-[#F4EFE6] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#C69214] hover:bg-[#E5A91B] text-[#0D0C0A] font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Confirm My Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
