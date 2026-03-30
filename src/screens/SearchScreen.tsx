import React, { useState } from 'react';

export default function SearchScreen() {
  const [minPrice, setMinPrice] = useState(2500000);
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [roomTypes, setRoomTypes] = useState<string[]>(['Studio', '3BR']);
  const [distance, setDistance] = useState('<2km');
  const [moveIn, setMoveIn] = useState('Sẵn sàng ngay');

  const toggleRoomType = (type: string) => {
    if (roomTypes.includes(type)) {
      setRoomTypes(roomTypes.filter(t => t !== type));
    } else {
      setRoomTypes([...roomTypes, type]);
    }
  };

  const MIN_BOUND = 0;
  const MAX_BOUND = 20000000;

  // For the histogram, just static bars
  const histogramHeights = [20, 30, 50, 80, 100, 70, 60, 40, 20, 10];

  return (
    <div className="min-h-screen bg-[#FFF8F4] text-[#4A2511] pb-32 font-body">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sticky top-0 bg-[#FFF8F4]/90 backdrop-blur-md z-40">
        <button className="p-2 -ml-2 text-[#9B3F00]">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-xl font-bold tracking-tight text-[#9B3F00]">Bộ lọc</h1>
        <button className="text-[#4A2511] text-sm font-medium">
          Thiết lập lại
        </button>
      </header>

      <div className="px-6 space-y-8 mt-2">
        {/* Price Range */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#4A2511]">Khoảng giá (VND)</h2>
            <span className="text-[#9B3F00] font-bold">{(minPrice / 1000000).toFixed(1)}M - {(maxPrice / 1000000).toFixed(1)}M</span>
          </div>
          
          <div className="relative pt-8 pb-4">
            {/* Histogram */}
            <div className="flex items-end justify-between h-24 mb-2 gap-1 px-2">
              {histogramHeights.map((h, i) => {
                // Determine if bar is in range
                const barMin = MIN_BOUND + (i / histogramHeights.length) * (MAX_BOUND - MIN_BOUND);
                const barMax = MIN_BOUND + ((i + 1) / histogramHeights.length) * (MAX_BOUND - MIN_BOUND);
                const inRange = barMax > minPrice && barMin < maxPrice;
                return (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-sm ${inRange ? 'bg-[#9B3F00]' : 'bg-[#FDECE2]'}`}
                    style={{ height: `${h}%` }}
                  ></div>
                );
              })}
            </div>

            {/* Slider track */}
            <div className="relative h-6 flex items-center mx-2">
              <div className="absolute w-full h-1 bg-[#FDECE2] rounded-full"></div>
              <div 
                className="absolute h-1 bg-[#9B3F00] rounded-full"
                style={{ 
                  left: `${((minPrice - MIN_BOUND) / (MAX_BOUND - MIN_BOUND)) * 100}%`, 
                  right: `${100 - ((maxPrice - MIN_BOUND) / (MAX_BOUND - MIN_BOUND)) * 100}%` 
                }}
              ></div>
              
              <input
                type="range"
                min={MIN_BOUND}
                max={MAX_BOUND}
                step={500000}
                value={minPrice}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), maxPrice - 500000);
                  setMinPrice(val);
                }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#FFF8F4] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#9B3F00] [&::-webkit-slider-thumb]:rounded-full z-10"
              />
              <input
                type="range"
                min={MIN_BOUND}
                max={MAX_BOUND}
                step={500000}
                value={maxPrice}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), minPrice + 500000);
                  setMaxPrice(val);
                }}
                className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#FFF8F4] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#9B3F00] [&::-webkit-slider-thumb]:rounded-full z-20"
              />
            </div>
          </div>
        </section>

        {/* Room Type */}
        <section>
          <h2 className="text-xl font-bold text-[#4A2511] mb-4">Loại phòng</h2>
          <div className="flex flex-wrap gap-3">
            {['Studio', '1BR', '2BR', '3BR', 'Căn hộ nguyên căn'].map(type => (
              <button
                key={type}
                onClick={() => toggleRoomType(type)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${
                  roomTypes.includes(type) 
                    ? 'bg-[#9B3F00] text-white' 
                    : 'bg-[#FDF2EB] text-[#4A2511]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Distance */}
        <section>
          <h2 className="text-xl font-bold text-[#4A2511] mb-4">Khoảng cách đến trường</h2>
          <div className="flex gap-4">
            {[
              { id: '<1km', label: '<1km', sub: 'Đi bộ' },
              { id: '<2km', label: '<2km', sub: 'Xe đạp' },
              { id: '<5km', label: '<5km', sub: 'Xe máy/Bus' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setDistance(item.id)}
                className={`flex-1 aspect-square rounded-full flex flex-col items-center justify-center transition-all ${
                  distance === item.id
                    ? 'bg-[#FFF8F4] border-2 border-[#9B3F00] text-[#9B3F00]'
                    : 'bg-[#FDF2EB] border-2 border-transparent text-[#4A2511]'
                }`}
              >
                <span className="font-bold text-lg">{item.label}</span>
                <span className="text-xs opacity-70">{item.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Move-in Time */}
        <section>
          <h2 className="text-xl font-bold text-[#4A2511] mb-4">Thời gian dọn vào</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setMoveIn('Sẵn sàng ngay')}
              className={`flex-1 py-4 rounded-2xl font-medium text-sm transition-colors ${
                moveIn === 'Sẵn sàng ngay'
                  ? 'bg-[#CDE0FF] text-[#1E3A8A]'
                  : 'bg-[#FDF2EB] text-[#4A2511]'
              }`}
            >
              Sẵn sàng ngay
            </button>
            <button
              onClick={() => setMoveIn('Trong 30 ngày')}
              className={`flex-1 py-4 rounded-2xl font-medium text-sm transition-colors ${
                moveIn === 'Trong 30 ngày'
                  ? 'bg-[#CDE0FF] text-[#1E3A8A]'
                  : 'bg-[#FDF2EB] text-[#4A2511]'
              }`}
            >
              Trong 30 ngày
            </button>
          </div>
        </section>

        {/* Amenities */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#4A2511]">Tiện nghi</h2>
            <button className="text-[#004BE2] font-medium text-sm">Tất cả</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: 'local_laundry_service', label: 'Máy giặt', color: 'bg-[#FCDCC4]', iconColor: 'text-[#9B3F00]' },
              { icon: 'heat_pump', label: 'Máy sấy', color: 'bg-[#FCDCC4]', iconColor: 'text-[#9B3F00]' },
              { icon: 'ac_unit', label: 'Điều hòa', color: 'bg-[#F27D26]', iconColor: 'text-white' },
              { icon: 'wifi', label: 'WiFi Miễn phí', color: 'bg-[#F27D26]', iconColor: 'text-white' },
              { icon: 'local_parking', label: 'Chỗ để xe', color: 'bg-[#FCDCC4]', iconColor: 'text-[#9B3F00]' },
              { icon: 'pets', label: 'Nuôi thú cưng', color: 'bg-[#FCDCC4]', iconColor: 'text-[#9B3F00]' },
            ].map((item, i) => (
              <div key={i} className="bg-[#FDF2EB] rounded-2xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
                  <span className={`material-symbols-outlined text-[20px] ${item.iconColor}`}>{item.icon}</span>
                </div>
                <span className="font-medium text-sm text-[#4A2511] leading-tight flex-1">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="relative rounded-3xl overflow-hidden h-48">
          <img 
            src="https://images.unsplash.com/photo-1626806787426-5910811b6325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Laundry" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4">
            <div className="bg-[#FFF8F4]/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-[#4A2511]">verified</span>
              <span className="text-xs font-bold text-[#4A2511]">Thiết bị tiêu chuẩn cao cấp</span>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-6 right-6 z-40">
        <button className="w-full bg-[#E86A1C] text-white py-4 rounded-full font-bold text-lg shadow-xl active:scale-95 transition-transform">
          Áp dụng (124 kết quả)
        </button>
      </div>
    </div>
  );
}
