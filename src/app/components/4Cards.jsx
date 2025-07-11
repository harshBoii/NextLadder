import React, { useEffect, useRef } from 'react';
import { FaUser, FaChartLine, FaCog, FaBell } from 'react-icons/fa';
import gsap from 'gsap';
import TagContainer from './TagContainer';
import { data } from 'autoprefixer';

const FourCards = ({data}) => {
  const cardsRef = useRef([]);
  const circlesRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    // Initialize refs arrays
    cardsRef.current = cardsRef.current.slice(0, 4);
    circlesRef.current = circlesRef.current.slice(0, 4);
    linesRef.current = linesRef.current.slice(0, 4);

    // Create hover animations
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      card.addEventListener('mouseenter', () => {
        // Animate card glow
        gsap.to(card, {
          boxShadow: '0 0 20px rgba(73, 47, 239, 0.4)',
          borderBottom: '0.5vh solid rgba(159, 47, 239, 0.8)',
          duration: 0.001,
          ease: "power2.out"
        });

        // Animate circle glow
        gsap.to(circlesRef.current[index], {
          backgroundColor: 'rgb(143, 47, 239)',
          boxShadow: '0 0 15px rgba(239, 47, 239, 0.8)',
          scale: 1.2,
          duration: 0.6,
          ease: "power2.out"

        });

        // Animate connecting line
        gsap.to(linesRef.current[index], {
          background: 'linear-gradient(to bottom, rgba(47, 87, 239, 1), rgba(47, 87, 239, 0.3))',
          duration: 0.6,
          ease: "power2.out"

        });
      });

      card.addEventListener('mouseleave', () => {
        // Reset card glow
        gsap.to(card, {
          boxShadow: '0 0.4vh 0.6vh rgba(0, 0, 0, 0.1)',
          borderBottom: '0.5vh solid rgba(199, 24, 230, 0.35)',
           duration: 0.6,
          ease: "power2.out"

        });

        // Reset circle glow
        gsap.to(circlesRef.current[index], {
          backgroundColor: 'rgba(47, 85, 239, 0.86)',
          boxShadow: '0 0.2vh 0.4vh rgba(0, 0, 0, 0.2)',
          scale: 1,
           duration: 0.6,
          ease: "power2.out"

        });

        // Reset connecting line
        gsap.to(linesRef.current[index], {
          background: 'linear-gradient(to bottom, rgba(47, 87, 239, 1), rgba(255, 255, 255, 0))',
           duration: 0.6,
          ease: "power2.out"

        });
      });
    });
  }, []);

  return (
    <div className='flex flex-col min-h-screen lg:h-[40vh] mt-17 py-8 lg:py-0 mb-50'>

      <div className="flex flex-col lg:mt-25 items-center gap-4 px-4">
        <TagContainer tag="WHY CHOOSE US" />
        <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-center max-w-4xl lg:mt-10">
          {data.WhyChooseUs}
        </h2>
      </div>
      
      {/* Mobile Layout */}
      <div className='lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 mt-8'>
        {[
          { title: '800+', description: 'Learners & counting', image: '/WhyChooseUs/Learners.png' },
          { title: '1.2K+', description: 'Courses & Video', image: '/WhyChooseUs/watch.png' },
          { title: '500+', description: 'Certified Students', image: '/WhyChooseUs/scholar.png' },
          { title: '2.5K+', description: 'Registered Enrolls', image: '/WhyChooseUs/Enrolls.png' }
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-lg border-b-2 border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cover bg-center border border-white shadow-lg"
                 style={{ backgroundImage: `url(${card.image})` }}>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className='hidden lg:flex justify-center items-center gap-4 p-4 max-w-7xl mx-auto mt-16 relative'>
      
        {/* Line with gradient */}
        <div className="absolute lg:top-1 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent z-10"></div>

        {/* Circles above the line and connecting lines */}
        {[0, 1, 2, 3].map((index) => (
          <React.Fragment key={`circle-${index}`}>
            {/* Circle */}
            <div
              ref={el => circlesRef.current[index] = el}
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md z-20"
              style={{ left: `${13.7 + (index * 24.5)}%` }}
            ></div>
            
            {/* Connecting line */}
            <div
              ref={el => linesRef.current[index] = el}
              className="absolute top-0 w-1 h-20 bg-gradient-to-b from-blue-600 to-transparent z-10"
              style={{ left: `${13.5 + (index * 24.5)}%` }}
            ></div>
          </React.Fragment>
        ))}

        {[
          { title: '800+', description: 'Learners & counting', image: '/WhyChooseUs/Learners.png' },
          { title: '1.2K+', description: 'Courses & Video', image: '/WhyChooseUs/watch.png' },
          { title: '500+', description: 'Certified Students', image: '/WhyChooseUs/scholar.png' },
          { title: '2.5K+', description: 'Registered Enrolls', image: '/WhyChooseUs/Enrolls.png' }
        ].map((card, index) => (
          <div
            ref={el => cardsRef.current[index] = el}
            key={index}
            className="relative lg:mt-12 bg-white rounded-lg p-6 shadow-lg transition-all duration-300 cursor-pointer overflow-hidden w-72 h-90 lg:h-95 lg:w-76 transform hover:scale-105 border-b-2 border-purple-300"
            style={{ transform: `translateY(${index % 2 === 0 ? '-16px' : '16px'})` }}
          >
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-16 h-16 lg:-mt-3.5 rounded-full bg-cover bg-center border border-white shadow-lg z-0"
                 style={{ backgroundImage: `url(${card.image})` }}>
            </div>

            <div className='absolute left-40 transform lg:left-44 -translate-x-1/2 w-full'>
              <img src="/Background.png" alt="" />
            </div>
            
            <div className="relative z-10 mt-64 lg:mt-68">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600 text-center">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FourCards;
