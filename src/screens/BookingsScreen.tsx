import React from 'react';

export default function BookingsScreen() {
  return (
    <div className="pt-24 px-6 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12">
        <h2 className="font-headline text-5xl font-extrabold tracking-tighter text-on-background mb-4">
          Your <span className="text-primary italic">Viewings</span>
        </h2>
        <p className="text-on-surface-variant font-medium leading-relaxed max-w-md">
          Manage your curated schedule and book new walkthroughs for your next potential home.
        </p>
      </section>

      {/* Dynamic Date Selector */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
        <button className="flex-shrink-0 w-20 h-28 bg-primary rounded-xl flex flex-col items-center justify-center text-on-primary editorial-shadow transform scale-105">
          <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Oct</span>
          <span className="font-headline text-3xl font-extrabold">24</span>
          <span className="text-[10px] font-bold mt-1">TODAY</span>
        </button>
        {[25, 26, 27].map((day, i) => (
          <button key={i} className="flex-shrink-0 w-20 h-28 bg-surface-container-low rounded-xl flex flex-col items-center justify-center text-on-surface hover:bg-surface-variant transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Oct</span>
            <span className="font-headline text-3xl font-extrabold">{day}</span>
            <span className="text-[10px] font-bold opacity-60 mt-1">{['FRI', 'SAT', 'SUN'][i]}</span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-8">
        <h3 className="font-headline text-xl font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          Confirmed Viewings
        </h3>

        {[
          { time: "14:30", title: "The Nordic Loft", location: "24 Baker St, Marylebone", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
          { time: "16:45", title: "Skyline Terrace", location: "110 Canary Wharf Tower", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        ].map((viewing, i) => (
          <div key={i} className="relative group">
            <div className="absolute -top-4 -right-2 z-10 glass-panel px-4 py-2 rounded-full editorial-shadow border border-white/20">
              <span className="text-primary font-headline font-extrabold text-lg italic">{viewing.time}</span>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-6 editorial-shadow border border-outline-variant/5">
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src={viewing.img} alt={viewing.title} />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-secondary">Verified Host</span>
                  </div>
                  <h4 className="font-headline text-xl font-bold text-on-surface">{viewing.title}</h4>
                  <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {viewing.location}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-surface-container flex justify-between items-center">
                <button className="text-error font-bold text-sm hover:underline">Cancel Viewing</button>
                <button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-95 transition-transform">
                  <span className="material-symbols-outlined text-sm">directions</span>
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
