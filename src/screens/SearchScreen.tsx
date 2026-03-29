import React, { useState } from 'react';

export default function SearchScreen() {
  const [availability, setAvailability] = useState('now');
  const [gender, setGender] = useState('any');
  const [quiet, setQuiet] = useState(false);
  const [social, setSocial] = useState(true);
  const [minPrice, setMinPrice] = useState(2000000);
  const [maxPrice, setMaxPrice] = useState(8000000);

  const MIN_BOUND = 1000000;
  const MAX_BOUND = 20000000;
  const STEP = 500000;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - STEP);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + STEP);
    setMaxPrice(value);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val);
  };

  return (
    <div className="min-h-screen bg-[#FFF5EE] text-[#3E1A04] pb-40 font-body">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#FFF5EE]/90 backdrop-blur-md z-40">
        <button className="p-2 -ml-2 text-[#3E1A04]">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight">Advanced Filter UI</h1>
        <button className="bg-[#F27D26] text-white px-5 py-2 rounded-full text-sm font-bold shadow-sm">
          Reset
        </button>
      </header>

      <div className="px-6 space-y-8 mt-4">
        {/* Price Range */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-extrabold">Price Range</h2>
            <span className="text-[#8C3A00] font-bold text-sm">VND / month</span>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#3E1A04]/5">
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <p className="text-[#3E1A04]/50 text-[10px] font-bold uppercase tracking-wider mb-1">Minimum</p>
                <p className="font-bold text-lg text-[#3E1A04]">{formatPrice(minPrice)}</p>
              </div>
              <div className="w-4 h-[2px] bg-[#3E1A04]/20 rounded-full shrink-0"></div>
              <div className="text-center">
                <p className="text-[#3E1A04]/50 text-[10px] font-bold uppercase tracking-wider mb-1">Maximum</p>
                <p className="font-bold text-lg text-[#3E1A04]">{formatPrice(maxPrice)}</p>
              </div>
            </div>

            <div className="relative h-6 flex items-center">
              <div className="absolute w-full h-2 bg-[#3E1A04]/10 rounded-full"></div>
              <div 
                className="absolute h-2 bg-[#F27D26] rounded-full"
                style={{ 
                  left: `${((minPrice - MIN_BOUND) / (MAX_BOUND - MIN_BOUND)) * 100}%`, 
                  right: `${100 - ((maxPrice - MIN_BOUND) / (MAX_BOUND - MIN_BOUND)) * 100}%` 
                }}
              ></div>
              <input 
                type="range" 
                min={MIN_BOUND} max={MAX_BOUND} step={STEP} 
                value={minPrice} 
                onChange={handleMinChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-[#F27D26] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
              />
              <input 
                type="range" 
                min={MIN_BOUND} max={MAX_BOUND} step={STEP} 
                value={maxPrice} 
                onChange={handleMaxChange}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-[#F27D26] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Availability */}
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Availability</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-5 bg-white rounded-3xl shadow-sm cursor-pointer">
              <div>
                <h3 className="font-bold text-lg">Available Now</h3>
                <p className="text-[#3E1A04]/70 text-sm">Immediate move-in ready rooms</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${availability === 'now' ? 'border-[#8C3A00]' : 'border-[#3E1A04]/20'}`}>
                {availability === 'now' && <div className="w-3 h-3 rounded-full bg-[#8C3A00]" />}
              </div>
              <input type="radio" className="hidden" checked={availability === 'now'} onChange={() => setAvailability('now')} />
            </label>

            <label className="flex items-center justify-between p-5 bg-[#FDF2EB] rounded-3xl cursor-pointer">
              <div>
                <h3 className="font-bold text-lg">Moving Out Soon</h3>
                <p className="text-[#3E1A04]/70 text-sm">Available within the next 30 days</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${availability === 'soon' ? 'border-[#8C3A00]' : 'border-[#3E1A04]/20'}`}>
                {availability === 'soon' && <div className="w-3 h-3 rounded-full bg-[#8C3A00]" />}
              </div>
              <input type="radio" className="hidden" checked={availability === 'soon'} onChange={() => setAvailability('soon')} />
            </label>
          </div>
        </section>

        {/* Roommate Preferences */}
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Roommate Preferences</h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <button 
              onClick={() => setGender('any')}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-colors ${gender === 'any' ? 'bg-[#8C3A00] text-white' : 'bg-[#FCDCC4] text-[#8C3A00]'}`}
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              Any Gender
            </button>
            <button 
              onClick={() => setGender('male')}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-colors ${gender === 'male' ? 'bg-[#8C3A00] text-white' : 'bg-[#FCDCC4] text-[#8C3A00]'}`}
            >
              <span className="material-symbols-outlined text-[18px]">male</span>
              Male Only
            </button>
            <button 
              onClick={() => setGender('female')}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-colors ${gender === 'female' ? 'bg-[#8C3A00] text-white' : 'bg-[#FCDCC4] text-[#8C3A00]'}`}
            >
              <span className="material-symbols-outlined text-[18px]">female</span>
              Female Only
            </button>
          </div>

          <div className="bg-[#FDF2EB] rounded-3xl p-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Quiet Environment</h3>
                <p className="text-[#3E1A04]/70 text-sm">Strict no-party rules</p>
              </div>
              <button 
                onClick={() => setQuiet(!quiet)}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${quiet ? 'bg-[#8C3A00]' : 'bg-[#E8D8CE]'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${quiet ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Social & Friendly</h3>
                <p className="text-[#3E1A04]/70 text-sm">Likely to hang out in common areas</p>
              </div>
              <button 
                onClick={() => setSocial(!social)}
                className={`w-14 h-8 rounded-full p-1 transition-colors ${social ? 'bg-[#8C3A00]' : 'bg-[#E8D8CE]'}`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transition-transform ${social ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Lease Term */}
        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-extrabold">Lease Term</h2>
            <button className="text-[#8C3A00] font-bold text-sm">Flexible Options</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="relative bg-white border-2 border-[#F27D26] rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <div className="absolute top-0 right-4 bg-[#8C3A00] text-white text-[10px] font-bold px-3 py-1 rounded-b-lg uppercase tracking-wider">
                Popular
              </div>
              <span className="material-symbols-outlined text-3xl text-[#8C3A00] mb-3">calendar_month</span>
              <h3 className="font-bold text-lg mb-1">Long-term</h3>
              <p className="text-[#3E1A04]/70 text-xs">12+ Months</p>
            </div>

            <div className="bg-[#FDF2EB] rounded-3xl p-6 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-3xl text-[#8C3A00] mb-3">timer</span>
              <h3 className="font-bold text-lg mb-1">Short-term</h3>
              <p className="text-[#3E1A04]/70 text-xs">3-6 Months</p>
            </div>
          </div>
        </section>

        {/* Specific Amenities */}
        <section>
          <h2 className="text-2xl font-extrabold mb-4">Specific Amenities</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#FCDCC4] rounded-3xl p-6 aspect-square flex flex-col justify-between">
              <span className="material-symbols-outlined text-2xl text-[#8C3A00]">local_laundry_service</span>
              <h3 className="font-bold text-lg leading-tight">Free Laundry</h3>
            </div>
            
            <div className="bg-[#C2D3FF] rounded-3xl p-6 aspect-square flex flex-col justify-between">
              <span className="material-symbols-outlined text-2xl text-[#002B99]">balcony</span>
              <h3 className="font-bold text-lg leading-tight text-[#002B99]">Balcony</h3>
            </div>
          </div>
          
          <div className="mt-4 bg-[#FCDCC4] rounded-3xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-2xl text-[#8C3A00]">door_front</span>
               <h3 className="font-bold text-lg">Private Room</h3>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#8C3A00] flex items-center justify-center text-white">
               <span className="material-symbols-outlined text-sm">check</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-28 left-6 right-6 z-40">
        <button className="w-full bg-[#D9611A] text-white py-4 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform">
          Show 142 Results
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
