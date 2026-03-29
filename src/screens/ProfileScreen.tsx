import React from 'react';

export default function ProfileScreen() {
  return (
    <div className="pt-24 px-6 max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-container mb-4 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-headline text-3xl font-extrabold text-on-background">Minh Hạnh, 20</h2>
        <p className="text-on-surface-variant font-medium mt-1">NEU - Marketing Major</p>
        
        <div className="flex gap-2 mt-4">
          <span className="bg-surface-container-low px-3 py-1 rounded-full text-xs font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">smoke_free</span> Non-smoker
          </span>
          <span className="bg-surface-container-low px-3 py-1 rounded-full text-xs font-bold text-on-surface flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">bedtime</span> Night Owl
          </span>
        </div>
      </div>

      {/* About Me */}
      <div className="bg-surface-container-lowest p-6 rounded-xl editorial-shadow mb-6">
        <h3 className="font-headline text-xl font-bold mb-3">About Me</h3>
        <p className="text-on-surface-variant leading-relaxed text-sm">
          Sociable, loves cooking and weekend treks. Looking for a tidy and respectful roommate to share a nice apartment near the university.
        </p>
      </div>

      {/* Living Preferences */}
      <div className="bg-surface-container-lowest p-6 rounded-xl editorial-shadow mb-6">
        <h3 className="font-headline text-xl font-bold mb-4">Living Preferences</h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center border-b border-surface-container pb-2">
            <span className="text-on-surface-variant text-sm font-medium">Budget</span>
            <span className="font-bold text-primary">&lt; 3M VND</span>
          </li>
          <li className="flex justify-between items-center border-b border-surface-container pb-2">
            <span className="text-on-surface-variant text-sm font-medium">Cleanliness</span>
            <span className="font-bold text-on-surface">High</span>
          </li>
          <li className="flex justify-between items-center border-b border-surface-container pb-2">
            <span className="text-on-surface-variant text-sm font-medium">Quiet Hours</span>
            <span className="font-bold text-on-surface">After 11 PM</span>
          </li>
        </ul>
      </div>

      {/* Settings / Actions */}
      <div className="space-y-3">
        <button className="w-full bg-surface-container-lowest p-4 rounded-xl editorial-shadow flex items-center justify-between hover:bg-surface-container-low transition-colors">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">edit_document</span>
            <span className="font-bold text-on-surface">Edit Profile</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </button>
        <button className="w-full bg-surface-container-lowest p-4 rounded-xl editorial-shadow flex items-center justify-between hover:bg-surface-container-low transition-colors">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">settings</span>
            <span className="font-bold text-on-surface">Settings</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </button>
        <button className="w-full bg-surface-container-lowest p-4 rounded-xl editorial-shadow flex items-center justify-between hover:bg-surface-container-low transition-colors">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-error">logout</span>
            <span className="font-bold text-error">Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
