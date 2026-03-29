import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation, AnimatePresence } from 'motion/react';

const ROOMS = [
  {
    id: 1,
    title: 'Neon Loft District 3',
    price: '7.500.000',
    distance: '800m from UEH',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1e5240980c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Verified Host', 'Co-living'],
    description: 'A high-energy, modern studio designed for student life. Features high-speed fiber internet and shared rooftop terrace.',
    match: '95%',
    amenities: [
      { icon: 'wifi', label: 'Fast WiFi' },
      { icon: 'ac_unit', label: 'Air Conditioning' },
      { icon: 'local_laundry_service', label: 'In-unit Washer' },
      { icon: 'kitchen', label: 'Shared Kitchen' },
      { icon: 'directions_bike', label: 'Bike Parking' },
      { icon: 'security', label: '24/7 Security' },
    ],
    reviews: [
      { name: 'Minh T.', text: 'Great place, very close to campus. The host is super responsive.', rating: 5 },
      { name: 'Sarah L.', text: 'A bit noisy on weekends, but the amenities are top notch.', rating: 4 },
    ]
  },
  {
    id: 2,
    title: 'Minimalist Haven D1',
    price: '8.200.000',
    distance: '1.2km from UEH',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['New', 'Private Room'],
    description: 'Clean, quiet, and perfectly located. Ideal for focused studying and relaxing after classes.',
    match: '88%',
    amenities: [
      { icon: 'wifi', label: 'Fast WiFi' },
      { icon: 'ac_unit', label: 'Air Conditioning' },
      { icon: 'kitchen', label: 'Shared Kitchen' },
      { icon: 'security', label: '24/7 Security' },
    ],
    reviews: [
      { name: 'Khoa N.', text: 'Very clean and peaceful.', rating: 5 },
    ]
  },
  {
    id: 3,
    title: 'Sunny Balcony Studio',
    price: '6.800.000',
    distance: '2.5km from UEH',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1e5240980c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Balcony', 'Pet Friendly'],
    description: 'Bright studio with a large balcony. Great natural light for your plants and studying.',
    match: '75%',
    amenities: [
      { icon: 'wifi', label: 'Fast WiFi' },
      { icon: 'ac_unit', label: 'Air Conditioning' },
      { icon: 'pets', label: 'Pet Friendly' },
      { icon: 'local_laundry_service', label: 'In-unit Washer' },
    ],
    reviews: [
      { name: 'Linh P.', text: 'Love the balcony! A bit far from campus though.', rating: 4 },
    ]
  },
  {
    id: 4,
    title: 'Cozy Dorm Binh Thanh',
    price: '3.500.000',
    distance: '3km from UEH',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Budget', 'Shared'],
    description: 'Affordable shared dorm with friendly roommates. Great community vibe.',
    match: '60%',
    amenities: [
      { icon: 'wifi', label: 'Fast WiFi' },
      { icon: 'kitchen', label: 'Shared Kitchen' },
      { icon: 'directions_bike', label: 'Bike Parking' },
    ],
    reviews: [
      { name: 'Tuan A.', text: 'Good for the price. Roommates are nice.', rating: 4 },
    ]
  },
  {
    id: 5,
    title: 'Riverside Studio D2',
    price: '11.000.000',
    distance: '5km from UEH',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1e5240980c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Luxury', 'Pool'],
    description: 'Premium studio with river view and access to a rooftop pool.',
    match: '82%',
    amenities: [
      { icon: 'pool', label: 'Swimming Pool' },
      { icon: 'fitness_center', label: 'Gym' },
      { icon: 'wifi', label: 'Fast WiFi' },
    ],
    reviews: [
      { name: 'David W.', text: 'Amazing view and great facilities.', rating: 5 }
    ]
  },
  {
    id: 6,
    title: 'Vintage Room Phu Nhuan',
    price: '4.500.000',
    distance: '2km from UEH',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Vintage', 'Quiet'],
    description: 'A cozy room with vintage decor in a quiet neighborhood.',
    match: '90%',
    amenities: [
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'ac_unit', label: 'AC' },
    ],
    reviews: [
      { name: 'Hoa T.', text: 'Very peaceful and aesthetic.', rating: 5 }
    ]
  },
  {
    id: 7,
    title: 'Green Oasis D7',
    price: '9.000.000',
    distance: '7km from UEH',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ec8fe3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Garden', 'Spacious'],
    description: 'Large room with access to a beautiful shared garden.',
    match: '65%',
    amenities: [
      { icon: 'yard', label: 'Garden' },
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'kitchen', label: 'Kitchen' },
    ],
    reviews: [
      { name: 'John D.', text: 'Love the green space!', rating: 4 }
    ]
  },
  {
    id: 8,
    title: 'Student Hub D10',
    price: '3.000.000',
    distance: '1km from UEH',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Budget', 'Shared'],
    description: 'Affordable shared room, perfect for students on a budget.',
    match: '98%',
    amenities: [
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'directions_bike', label: 'Parking' },
    ],
    reviews: [
      { name: 'Nam K.', text: 'Cheap and close to school.', rating: 4 }
    ]
  },
  {
    id: 9,
    title: 'Sky View Penthouse',
    price: '15.000.000',
    distance: '4km from UEH',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505843513577-22bb7dc50c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Premium', 'View'],
    description: 'Luxurious penthouse room with panoramic city views.',
    match: '50%',
    amenities: [
      { icon: 'ac_unit', label: 'Central AC' },
      { icon: 'balcony', label: 'Private Balcony' },
      { icon: 'security', label: '24/7 Security' },
    ],
    reviews: [
      { name: 'Vy L.', text: 'Absolutely stunning view.', rating: 5 }
    ]
  },
  {
    id: 10,
    title: 'Cozy Corner D4',
    price: '5.500.000',
    distance: '3km from UEH',
    images: [
      'https://images.unsplash.com/photo-1493809842364-4cb854fd4600?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Cozy', 'Foodie Area'],
    description: 'Small but cozy room in the heart of D4, surrounded by street food.',
    match: '78%',
    amenities: [
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'restaurant', label: 'Near Food' },
    ],
    reviews: [
      { name: 'Binh P.', text: 'Food paradise outside the door!', rating: 4 }
    ]
  },
  {
    id: 11,
    title: 'Modern Studio Tan Binh',
    price: '6.000.000',
    distance: '6km from UEH',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1e5240980c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Modern', 'Airport'],
    description: 'Newly built studio near the airport, very clean and modern.',
    match: '60%',
    amenities: [
      { icon: 'wifi', label: 'Fast WiFi' },
      { icon: 'local_laundry_service', label: 'Washer' },
    ],
    reviews: [
      { name: 'Trang N.', text: 'Very new and clean.', rating: 5 }
    ]
  },
  {
    id: 12,
    title: 'Coliving Space D1',
    price: '4.000.000',
    distance: '1.5km from UEH',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Coliving', 'Social'],
    description: 'Vibrant coliving space with weekly community events.',
    match: '85%',
    amenities: [
      { icon: 'groups', label: 'Community Events' },
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'kitchen', label: 'Large Kitchen' },
    ],
    reviews: [
      { name: 'Kevin', text: 'Made so many friends here!', rating: 5 }
    ]
  },
  {
    id: 13,
    title: 'Quiet Alley Room D3',
    price: '5.000.000',
    distance: '1.8km from UEH',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493809842364-4cb854fd4600?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Quiet', 'Central'],
    description: 'Tucked away in a quiet alley but right in the city center.',
    match: '92%',
    amenities: [
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'ac_unit', label: 'AC' },
    ],
    reviews: [
      { name: 'An H.', text: 'Surprisingly quiet for D3.', rating: 4 }
    ]
  },
  {
    id: 14,
    title: 'Spacious Balcony D5',
    price: '7.000.000',
    distance: '2.2km from UEH',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ec8fe3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Balcony', 'Bright'],
    description: 'Large room with a huge balcony, perfect for relaxing.',
    match: '80%',
    amenities: [
      { icon: 'balcony', label: 'Large Balcony' },
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'kitchen', label: 'Kitchen' },
    ],
    reviews: [
      { name: 'Phuong M.', text: 'The balcony is the best part.', rating: 5 }
    ]
  }
];

export default function SwipeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiped, setSwiped] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedRoom, setMatchedRoom] = useState<typeof ROOMS[0] | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();
  
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = async (event: any, info: any) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    
    if (info.offset.x > threshold || velocity > 500) {
      setSwiped('right');
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.3, ease: "easeOut" } });
      
      // 40% chance of matching
      if (Math.random() > 0.6) {
        triggerMatch(ROOMS[currentIndex]);
      } else {
        nextCard();
      }
    } else if (info.offset.x < -threshold || velocity < -500) {
      setSwiped('left');
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.3, ease: "easeOut" } });
      nextCard();
    } else {
      controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } });
    }
  };

  const triggerMatch = (room: typeof ROOMS[0]) => {
    setMatchedRoom(room);
    setShowMatch(true);
  };

  const closeMatch = () => {
    setShowMatch(false);
    setTimeout(() => {
      setMatchedRoom(null);
      nextCard();
    }, 300);
  };

  const nextCard = () => {
    setTimeout(() => {
      setSwiped(null);
      setCurrentIndex((prev) => prev + 1);
      setCurrentImageIndex(0);
      x.set(0);
      y.set(0);
      controls.set({ x: 0, y: 0, opacity: 1 });
    }, 100);
  };

  const handleImageTap = (e: React.MouseEvent, direction: 'left' | 'right') => {
    e.stopPropagation();
    const activeRoom = ROOMS[currentIndex];
    if (!activeRoom) return;
    
    if (direction === 'left') {
      setCurrentImageIndex((prev) => Math.max(0, prev - 1));
    } else {
      setCurrentImageIndex((prev) => Math.min(activeRoom.images.length - 1, prev + 1));
    }
  };

  const handleSwipe = async (direction: string) => {
    setSwiped(direction);
    if (direction === 'right') {
      await controls.start({ x: 500, rotate: 15, opacity: 0, transition: { duration: 0.3 } });
      
      // 40% chance of matching
      if (Math.random() > 0.6) {
        triggerMatch(ROOMS[currentIndex]);
      } else {
        nextCard();
      }
    } else {
      await controls.start({ x: -500, rotate: -15, opacity: 0, transition: { duration: 0.3 } });
      nextCard();
    }
  };

  const activeRoom = ROOMS[currentIndex];
  const nextRoom = ROOMS[currentIndex + 1];

  if (currentIndex >= ROOMS.length) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center px-6 pb-24 h-full mt-10 text-center">
        <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-primary">search_off</span>
        </div>
        <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">You're all caught up!</h2>
        <p className="text-on-surface-variant mb-8">We've shown you all the available rooms matching your criteria.</p>
        <button 
          onClick={() => setCurrentIndex(0)}
          className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-md shadow-primary/20"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center relative px-6 pb-24 overflow-hidden h-full mt-10">
      {/* Next Card (Peeking) */}
      {nextRoom && (
        <div className="absolute w-[90%] max-w-md aspect-[3/4] rounded-xl bg-surface-container-low shadow-sm translate-y-4 scale-95 opacity-60">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={nextRoom.images[0]}
              alt="Next room preview"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-on-surface/40 to-transparent">
              <div className="w-24 h-4 bg-surface-container rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Active Swiping Card */}
      <motion.div
        key={activeRoom.id}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        style={{ x, y, rotate, opacity, scale }}
        animate={controls}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        className="relative w-full max-w-md aspect-[3/4] rounded-xl bg-surface-container-lowest shadow-[0_40px_60px_-15px_rgba(74,37,6,0.15)] z-10 cursor-grab active:cursor-grabbing"
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 pointer-events-none">
          {/* Room Image */}
          <img
            className="w-full h-full object-cover"
            src={activeRoom.images[currentImageIndex]}
            alt="Active room card"
          />

          {/* Image Pagination Indicators */}
          <div className="absolute top-2 left-0 right-0 flex gap-1 px-2 z-40">
            {activeRoom.images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 flex-1 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40'} shadow-sm`}
              />
            ))}
          </div>

          {/* Tap Zones for Image Navigation */}
          <div className="absolute inset-0 flex z-30 pointer-events-auto">
            <div className="w-1/2 h-full" onClick={(e) => handleImageTap(e, 'left')} />
            <div className="w-1/2 h-full" onClick={(e) => handleImageTap(e, 'right')} />
          </div>

          {/* "LIKE" / "NOPE" Overlay Stamp */}
          <motion.div 
            style={{ opacity: likeOpacity }}
            className="absolute top-12 left-10 stamp-like px-6 py-2 text-5xl rounded-2xl border-8 z-30"
          >
            LIKE
          </motion.div>
          <motion.div 
            style={{ opacity: nopeOpacity }}
            className="absolute top-12 right-12 nope-stamp text-4xl border-[10px] z-30"
          >
            NOPE
          </motion.div>

          {/* Price/Distance Chips */}
          <div className="absolute top-6 right-6 flex flex-col gap-3 items-end">
            <div className="bg-surface/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
              <span className="text-primary font-bold font-headline text-lg">
                {activeRoom.price} <span className="text-xs uppercase">VND</span>
              </span>
            </div>
            <div className="bg-surface/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
              <span className="text-on-surface font-semibold text-xs">{activeRoom.distance}</span>
            </div>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-on-surface/80 via-on-surface/40 to-transparent z-40">
            <div className="flex items-center gap-2 mb-2">
              {activeRoom.tags.map((tag, i) => (
                <span key={i} className={`${i === 0 ? 'bg-secondary text-on-secondary' : 'bg-tertiary text-on-tertiary'} px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase`}>
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-headline font-extrabold text-white leading-tight mb-2">{activeRoom.title}</h2>
            <p className="text-white/80 font-body text-sm line-clamp-2 mb-4">
              {activeRoom.description}
            </p>

            {/* Distance Data Viz */}
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-[10px] font-bold text-white/70 uppercase tracking-tighter">
                <span>Proximity to Campus</span>
                <span>{activeRoom.match} Match</span>
              </div>
              <div className="h-1.5 w-full bg-secondary-container/30 rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: activeRoom.match }}></div>
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setShowDetails(true); }}
              className="w-full py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg text-white font-bold text-sm tracking-wide transition-colors pointer-events-auto flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">info</span>
              View Details & Book
            </button>
          </div>
        </div>
      </motion.div>

      {/* Action Floating Controls */}
      <div className="absolute bottom-10 flex items-center gap-6 z-20">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-lg flex items-center justify-center text-error border border-error/5 hover:scale-110 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-4xl">close</span>
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-container shadow-xl flex items-center justify-center text-on-primary hover:scale-110 active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
        </button>
        <button className="w-16 h-16 rounded-full bg-surface-container-lowest shadow-lg flex items-center justify-center text-secondary border border-secondary/5 hover:scale-110 active:scale-90 transition-all">
          <span className="material-symbols-outlined text-4xl">star</span>
        </button>
      </div>

      {/* Match Overlay */}
      <AnimatePresence>
        {showMatch && matchedRoom && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
              className="text-center mb-10"
            >
              <h1 className="text-6xl font-headline font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F27D26] to-[#FCDCC4] italic tracking-tighter drop-shadow-[0_0_15px_rgba(242,125,38,0.5)]">
                It's a Match!
              </h1>
              <p className="text-white/80 mt-4 text-lg">You and the host liked each other.</p>
            </motion.div>

            <div className="flex items-center justify-center gap-4 mb-12">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
                className="w-28 h-28 rounded-full border-4 border-[#F27D26] overflow-hidden shadow-[0_0_30px_rgba(242,125,38,0.4)]"
              >
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="You" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center z-10 -mx-8 shadow-lg"
              >
                <span className="material-symbols-outlined text-[#F27D26] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", delay: 0.4 }}
                className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-lg"
              >
                <img src={matchedRoom.images[0]} alt="Room" className="w-full h-full object-cover" />
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-sm space-y-4"
            >
              <button 
                onClick={closeMatch}
                className="w-full py-4 bg-gradient-to-r from-[#F27D26] to-[#E06B15] text-white rounded-full font-bold text-lg shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">chat</span>
                Send a Message
              </button>
              <button 
                onClick={closeMatch}
                className="w-full py-4 bg-white/10 text-white rounded-full font-bold text-lg backdrop-blur-md hover:bg-white/20 active:scale-95 transition-all"
              >
                Keep Swiping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-0 z-50 bg-surface flex flex-col"
          >
            <div className="relative h-64 shrink-0">
              <img
                className="w-full h-full object-cover"
                src={activeRoom.images[currentImageIndex]}
                alt="Room"
              />
              <button 
                onClick={() => setShowDetails(false)}
                className="absolute top-6 left-6 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24 space-y-8">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-headline font-extrabold text-on-surface">{activeRoom.title}</h2>
                  <span className="text-primary font-bold text-xl">{activeRoom.price.split('.')[0]}M <span className="text-sm">VND</span></span>
                </div>
                <p className="text-on-surface-variant text-sm">{activeRoom.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-headline font-bold text-lg mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {activeRoom.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary">{amenity.icon}</span>
                      <span className="text-sm font-medium">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-lg">Reviews</h3>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-bold">
                      {(activeRoom.reviews.reduce((acc, r) => acc + r.rating, 0) / activeRoom.reviews.length).toFixed(1)}
                    </span>
                    <span className="text-on-surface-variant text-sm">({activeRoom.reviews.length})</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {activeRoom.reviews.map((review, i) => (
                    <div key={i} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm">{review.name}</span>
                        <div className="flex text-primary text-sm">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <span key={j} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: j < review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fixed Bottom Action */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-surface border-t border-outline-variant/20">
              <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold text-lg shadow-lg shadow-primary/30 active:scale-95 transition-transform flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">calendar_month</span>
                Request Booking
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
