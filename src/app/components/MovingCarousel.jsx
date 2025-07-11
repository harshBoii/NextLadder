'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MovingCarousel = () => {
  // Generate 20 cards with different colors and icons
  const cards = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    icon: ['🎓', '📚', '💻', '🎯', '🚀', '💡', '🎨', '🔬', '📊', '🌐'][i % 10],
    isBlue: i % 2 === 0, // Alternate between blue and white
    review: `"This course completely transformed my understanding of the subject. Highly recommended!"`,
    name: `Student ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 1}` // Using pravatar.cc for demo avatars
  }));

  return (
    <div className="container mx-auto px-4 py-16 overflow-hidden mb-25">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <div
          className="px-3 py-1 text-xl font-mono rounded-full transition-colors"
          style={{
            backgroundColor: 'rgba(47, 87, 239, 0.13)',
            color: 'rgba(47, 87, 239, 1)'
          }}
        >
          Students Reviews
        </div>
      </div>

      <div className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl my-8 lg:my-[5vh] mb-8 lg:mb-25 font-sans text-center font-bold px-4'>
      People like histudy education. No joking - here's the proof!
      </div>

      {/* First row - moving left */}
      <div className="flex gap-4 mb-8 overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {cards.slice(0, 10).map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-80 lg:w-100 p-4 lg:p-8 rounded-lg transition-all duration-300 relative"
              style={{
                backgroundColor: card.isBlue ? 'rgba(65, 175, 255, 1)' : 'white',
                color: card.isBlue ? 'rgb(250, 251, 255)' : 'black',
                clipPath: "polygon(0 0, 100% 0, 100% 98%, 99% 100%, 0 100%)",
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-lg" />
              <div className="relative z-10">
                <div className="text-3xl lg:text-5xl mb-4 lg:mb-6 flex justify-center">{card.icon}</div>
                <div className="flex flex-col h-full">
                  <p className="text-sm lg:text-base italic mb-4 lg:mb-6 flex-grow">{card.review}</p>
                  <div className="flex items-center justify-center gap-3">
                    <img 
                      src={card.avatar} 
                      alt={card.name}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <p className="font-semibold text-sm lg:text-base">{card.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second row - moving right */}
      <div className="flex gap-4 overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{
            x: [-1000, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {cards.slice(10, 20).map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-80 lg:w-100 p-4 lg:p-8 rounded-lg transition-all duration-300 relative"
              style={{
                backgroundColor: card.isBlue ? 'rgba(65, 175, 255, 1)' : 'white',
                color: card.isBlue ? 'rgb(250, 251, 255)' : 'black',
                clipPath: "polygon(0 0, 100% 0, 100% 99%, 99% 100%, 0 100%)",
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-lg" />
              <div className="relative z-10">
                <div className="text-3xl lg:text-5xl mb-4 lg:mb-6 flex justify-center">{card.icon}</div>
                <div className="flex flex-col h-full">
                  <p className="text-sm lg:text-base italic mb-4 lg:mb-6 flex-grow">{card.review}</p>
                  <div className="flex items-center justify-center gap-3">
                    <img 
                      src={card.avatar} 
                      alt={card.name}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <p className="font-semibold text-sm lg:text-base">{card.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MovingCarousel;
