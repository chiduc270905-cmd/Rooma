import React from 'react';
import { motion } from 'motion/react';

export default function RoommateScreen() {
  return (
    <div className="min-h-full bg-[#FFF5EE] p-6 pb-32">
      <h2 className="text-3xl font-headline font-bold text-[#5C2D0C] mb-6">Find a Roommate</h2>
      
      <div className="bg-white rounded-[2rem] p-6 shadow-sm text-center">
        <div className="w-24 h-24 bg-[#FCDCC4] rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-[#A83C15]">group_add</span>
        </div>
        <h3 className="text-xl font-headline font-bold text-[#5C2D0C] mb-2">Looking for someone to share with?</h3>
        <p className="text-[#5C2D0C]/60 text-sm mb-6">
          Connect with potential roommates who match your lifestyle and preferences.
        </p>
        <button className="bg-[#F27D26] text-white font-bold py-3 px-8 rounded-full w-full hover:bg-[#E06B15] transition-colors">
          Create Roommate Profile
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-headline font-bold text-[#5C2D0C] mb-4">Suggested Matches</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
            >
              <img 
                src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold text-[#5C2D0C]">Alex Johnson</h4>
                <p className="text-xs text-[#5C2D0C]/60 mb-1">Student • 22 • Clean & Quiet</p>
                <div className="flex gap-2">
                  <span className="bg-[#FCDCC4] text-[#A83C15] text-[10px] px-2 py-1 rounded-full font-bold">Early Bird</span>
                  <span className="bg-[#FCDCC4] text-[#A83C15] text-[10px] px-2 py-1 rounded-full font-bold">Non-smoker</span>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-[#FFF5EE] flex items-center justify-center text-[#F27D26]">
                <span className="material-symbols-outlined">chat</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
