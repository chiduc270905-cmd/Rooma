import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MATCHED_ROOMS = [
  {
    id: '1',
    title: 'The Editorial Room-Finder',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 128,
    location: 'Downtown District',
    price: '$850/mo'
  },
  {
    id: '2',
    title: 'Sunny Studio Loft',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1e5250a112?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 84,
    location: 'Arts District',
    price: '$920/mo'
  }
];

export default function LikesScreen() {
  const [selectedRoom, setSelectedRoom] = useState<typeof MATCHED_ROOMS[0] | null>(null);
  const [chattingWith, setChattingWith] = useState<typeof MATCHED_ROOMS[0] | null>(null);

  return (
    <div className="min-h-full bg-[#FFF5EE] p-6 pb-32">
      <h2 className="text-3xl font-headline font-bold text-[#5C2D0C] mb-6">Your Likes</h2>
      
      <div className="grid gap-4">
        {MATCHED_ROOMS.map(room => (
          <motion.div 
            key={room.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedRoom(room)}
            className="bg-white rounded-3xl p-4 shadow-sm flex gap-4 cursor-pointer"
          >
            <img src={room.image} alt={room.title} className="w-24 h-24 rounded-2xl object-cover" />
            <div className="flex-1 py-1">
              <h3 className="font-headline font-bold text-[#5C2D0C] text-lg leading-tight mb-1">{room.title}</h3>
              <p className="text-[#5C2D0C]/60 text-sm mb-2">{room.location}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#F27D26]">{room.price}</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm text-[#5C2D0C]/80">
                    <span className="material-symbols-outlined text-[16px] text-[#F27D26]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-medium">{room.rating}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setChattingWith(room); }}
                    className="w-8 h-8 rounded-full bg-[#FCDCC4] text-[#A83C15] flex items-center justify-center hover:bg-[#F27D26] hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedRoom && (
          <RoomReviewModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
        {chattingWith && (
          <ChatModal room={chattingWith} onClose={() => setChattingWith(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function RoomReviewModal({ room, onClose }: { room: any, onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#FFF5EE] overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-[#FFF5EE]/90 backdrop-blur-md z-10 px-4 py-4 flex items-center justify-between">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 text-[#5C2D0C]">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="font-headline font-bold text-[#5C2D0C] text-lg">{room.title}</h2>
        <img src={room.hostAvatar} alt="Host" className="w-10 h-10 rounded-full border-2 border-[#F27D26]" />
      </div>

      <div className="px-6 pb-24">
        {/* Rating Overview */}
        <div className="mb-8">
          <p className="text-[#0066FF] text-xs font-bold tracking-wider uppercase mb-1">Verified Feedback</p>
          <div className="flex items-baseline gap-2 mb-2">
            <h1 className="text-5xl font-headline font-bold text-[#5C2D0C]">4.8</h1>
            <span className="text-4xl font-headline font-bold text-[#F27D26]">/5.0</span>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-[#F27D26]">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {i === 5 ? 'star_half' : 'star'}
                </span>
              ))}
            </div>
            <span className="text-[#5C2D0C]/60 text-sm">(128 Reviews)</span>
          </div>

          {/* Rating Bars */}
          <div className="space-y-2">
            {[
              { stars: 5, width: '85%' },
              { stars: 4, width: '15%' },
              { stars: 3, width: '5%' },
            ].map(bar => (
              <div key={bar.stars} className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#5C2D0C] w-2">{bar.stars}</span>
                <div className="flex-1 h-2 bg-[#FCDCC4] rounded-full overflow-hidden">
                  <div className="h-full bg-[#A83C15] rounded-full" style={{ width: bar.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tenant Perspectives */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-headline font-bold text-[#5C2D0C] leading-tight">Tenant<br/>Perspectives</h3>
            <button className="text-[#A83C15] text-sm font-medium">View all 24<br/>photos</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full aspect-square object-cover rounded-3xl" />
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full aspect-square object-cover rounded-3xl" />
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full aspect-square object-cover rounded-3xl" />
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" className="w-full aspect-square object-cover rounded-3xl" />
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-8 mb-8">
          {/* Review 1 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-[#5C2D0C] text-sm">Elena Rodriguez</h4>
                <p className="text-xs text-[#5C2D0C]/60">Verified Tenant • 6 months</p>
              </div>
            </div>
            <div className="flex text-[#A83C15] mb-3">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <h5 className="text-xl font-headline font-bold italic text-[#1A1A1A] mb-3 leading-tight">"The light in this room is actually life-changing for morning people."</h5>
            <p className="text-[#5C2D0C]/80 text-sm leading-relaxed mb-4">
              I lived here during my final semester and the atmosphere was perfect for focusing. The host is incredibly responsive—when the heater had a small rattle, it was fixed within 4 hours. The communal kitchen is surprisingly quiet and everyone respects the cleaning schedule.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <button className="flex items-center gap-1 text-[#0066FF] font-medium">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                Helpful (12)
              </button>
              <span className="text-[#5C2D0C]/40">October 14, 2023</span>
            </div>
          </div>

          <div className="h-px bg-[#5C2D0C]/10 w-full" />

          {/* Review 2 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-[#5C2D0C] text-sm">Marcus Chen</h4>
                <p className="text-xs text-[#5C2D0C]/60">Verified Tenant • 1 year</p>
              </div>
            </div>
            <div className="flex text-[#A83C15] mb-3">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <h5 className="text-xl font-headline font-bold italic text-[#1A1A1A] mb-3 leading-tight">"Solid choice for city-center proximity."</h5>
            <p className="text-[#5C2D0C]/80 text-sm leading-relaxed mb-4">
              The location is the real winner here. You're 5 minutes from the library and right next to the best coffee shops. The room itself is cozy, though the street noise can be a bit much on Friday nights if you're a light sleeper. Super secure building though.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <button className="flex items-center gap-1 text-[#0066FF] font-medium">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                Helpful (8)
              </button>
              <span className="text-[#5C2D0C]/40">September 2, 2023</span>
            </div>
          </div>
        </div>

        {/* Write Review CTA */}
        <div className="bg-[#F27D26] rounded-[2rem] p-6 text-center text-white">
          <h3 className="text-xl font-headline font-bold mb-2 text-[#5C2D0C]">Stayed here before?</h3>
          <p className="text-[#5C2D0C]/80 text-sm mb-6 px-4">Your feedback helps fellow curators find their perfect home.</p>
          <button className="bg-[#3A1B07] text-white font-bold py-4 px-8 rounded-full w-full hover:bg-black transition-colors">
            Write a Review
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ChatModal({ room, onClose }: { room: any, onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: `Hi there! I'm interested in ${room.title}. Is it still available?`, sender: 'user' },
    { id: 2, text: `Hello! Yes, it's still available. Would you like to schedule a viewing?`, sender: 'host' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), text: message, sender: 'user' }]);
    setMessage('');
    
    // Simulate host reply
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: "Thanks for your message! I'll get back to you shortly.", 
        sender: 'host' 
      }]);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[110] bg-[#FFF5EE] flex flex-col"
    >
      {/* Chat Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 shadow-sm z-10">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 text-[#5C2D0C]">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="relative">
          <img src={room.hostAvatar} alt="Host" className="w-12 h-12 rounded-full object-cover border-2 border-[#FCDCC4]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="font-headline font-bold text-[#5C2D0C] text-lg leading-tight">Host of {room.title}</h2>
          <p className="text-xs text-[#5C2D0C]/60 font-medium">Typically replies in 1 hour</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              msg.sender === 'user' 
                ? 'bg-[#F27D26] text-white rounded-br-sm' 
                : 'bg-white text-[#5C2D0C] shadow-sm border border-[#5C2D0C]/5 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 bg-[#FFF5EE] rounded-full p-2 pr-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-[#5C2D0C]/40 hover:text-[#F27D26] hover:bg-white transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-[#5C2D0C] placeholder:text-[#5C2D0C]/40 text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-10 h-10 rounded-full bg-[#F27D26] text-white flex items-center justify-center disabled:opacity-50 disabled:bg-[#5C2D0C]/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
