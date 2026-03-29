import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function MatchesScreen() {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I saw you matched with my room.", sender: 'host', time: '10:00 AM' },
    { id: 2, text: "Yes! Is it still available?", sender: 'user', time: '10:05 AM' },
    { id: 3, text: "It is. Would you like to schedule a viewing?", sender: 'host', time: '10:06 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMessage('');
    
    // Simulate host reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: "Sounds good! Let me know what time works for you.", sender: 'host', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  return (
    <div className="pt-24 px-6 max-w-2xl mx-auto">
      {/* Header Section */}
      <header className="mb-10">
        <h2 className="font-headline text-4xl font-extrabold tracking-tighter text-primary mb-2">Your Matches</h2>
        <p className="font-body text-on-surface-variant text-sm">You have 4 potential new homes waiting for a conversation.</p>
      </header>

      {/* Vertical List of Match Cards */}
      <div className="flex flex-col gap-6">
        {[
          { title: "The Sun-Drenched Loft", price: "2.8M", distance: "0.4 miles", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
          { title: "Industrial Brick Suite", price: "1.9M", distance: "1.2 miles", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
          { title: "Nordic Minimalist Room", price: "2.4M", distance: "0.8 miles", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
          { title: "Modern Open Concept", price: "3.0M", distance: "2.1 miles", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
        ].map((match, i) => (
          <div key={i} className="bg-surface-container-lowest rounded-lg editorial-shadow p-4 flex items-center gap-4 group transition-transform active:scale-95">
            <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover" src={match.img} alt={match.title} />
              <div className="absolute top-1 left-1 bg-surface/90 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Verified</span>
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-headline font-bold text-lg text-on-surface truncate">{match.title}</h3>
              <p className="font-headline text-2xl font-black text-primary-container tracking-tighter mb-1">
                {match.price} <span className="text-sm font-bold">VND</span><span className="text-xs font-medium text-on-surface-variant">/mo</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-outline">location_on</span>
                <span className="text-xs text-on-surface-variant font-medium">{match.distance} from Campus</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveChat(match)}
              className="flex items-center justify-center bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg shadow-primary/30 hover:scale-110 active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
            </button>
          </div>
        ))}
      </div>

      {/* Trust Indicator */}
      <div className="mt-12 p-6 rounded-lg bg-secondary-container/30 border-l-4 border-secondary flex gap-4">
        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
        <div>
          <p className="text-sm font-bold text-on-secondary-container mb-1">Secure Messaging Active</p>
          <p className="text-xs text-on-secondary-container/80 leading-relaxed">
            Your data is encrypted. We recommend keeping all conversations within the app to remain eligible for our $2,000 Deposit Guarantee.
          </p>
        </div>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {activeChat && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-surface flex flex-col"
          >
            {/* Chat Header */}
            <div className="px-4 py-4 border-b border-outline-variant/30 flex items-center gap-4 bg-surface-container-lowest shadow-sm">
              <button 
                onClick={() => setActiveChat(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <div className="flex items-center gap-3 flex-1">
                <img src={activeChat.img} alt="Room" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-sm line-clamp-1">{activeChat.title}</h3>
                  <p className="text-xs text-on-surface-variant">Host is typically responsive</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors text-primary">
                <span className="material-symbols-outlined">call</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-lowest">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-on-primary rounded-tr-sm' : 'bg-surface-container text-on-surface rounded-tl-sm'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-on-surface-variant mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-surface border-t border-outline-variant/30 pb-safe">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <button type="button" className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-surface-container-low border border-outline-variant/50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
