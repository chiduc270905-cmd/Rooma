import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SwipeScreen from './screens/SwipeScreen';
import SearchScreen from './screens/SearchScreen';
import MatchesScreen from './screens/MatchesScreen';
import LikesScreen from './screens/LikesScreen';
import RoommateScreen from './screens/RoommateScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('swipe');

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">menu_open</span>
          <h1 className="font-headline font-extrabold text-primary tracking-tighter text-xl">Rooma</h1>
        </div>
        <div className="h-10 w-10 rounded-full bg-surface-variant overflow-hidden border-2 border-primary-container">
          <img 
            className="h-full w-full object-cover" 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
            alt="User Profile" 
          />
        </div>
      </header>

      <main className="flex-1 relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 overflow-y-auto pb-24"
          >
            {activeTab === 'swipe' && <SwipeScreen />}
            {activeTab === 'search' && <SearchScreen />}
            {activeTab === 'likes' && <LikesScreen />}
            {activeTab === 'roommate' && <RoommateScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#FFF5EE] shadow-[0_-4px_40px_rgba(74,37,6,0.06)] rounded-t-[3rem]">
        <NavItem icon="style" label="SWIPE" isActive={activeTab === 'swipe'} onClick={() => setActiveTab('swipe')} />
        <NavItem icon="search" label="SEARCH" isActive={activeTab === 'search'} onClick={() => setActiveTab('search')} />
        <NavItem icon="favorite" label="LIKES" isActive={activeTab === 'likes'} onClick={() => setActiveTab('likes')} />
        <NavItem icon="group" label="ROOMMATE" isActive={activeTab === 'roommate'} onClick={() => setActiveTab('roommate')} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: string, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-5 py-2 transition-all ${
        isActive 
          ? 'bg-[#FCDCC4] text-[#5C2D0C] rounded-full scale-110' 
          : 'text-[#5C2D0C]/60 hover:text-[#5C2D0C]'
      }`}
    >
      <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
        {icon}
      </span>
      <span className="font-headline text-[10px] font-semibold uppercase tracking-widest">{label}</span>
    </button>
  );
}
