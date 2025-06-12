import React, { useEffect, useRef } from 'react';
import { FaUser, FaChartLine, FaCog, FaBell } from 'react-icons/fa';
import gsap from 'gsap';
import TagContainer from './TagContainer';

const FourCards = () => {
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
    <div className='flex flex-col h-[85vh]'>

      <div className="flex flex-col items-center gap-4">
        <TagContainer tag="WHY CHOOSE US" />
        <h2 className="font-sans text-5xl text-extrabold width-[20vw] text-center">
          Creating A Community Of Life Long Learners
        </h2>
      </div>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2vh',
      padding: '2vh',
      maxWidth: '90vw',
      margin:'10vh auto',
      height: "40vh",
      position: 'relative'
    }}>
      
      {/* Line with gradient */}
      <div style={{
        position: 'absolute',
        top: '-1vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70vw',
        height: '0.5vh',
        background: 'radial-gradient(circle at center, rgba(47, 87, 239, 1) 0%, rgba(255, 255, 255, 0) 100%)',
        zIndex: 2,
      }}></div>

      {/* Circles above the line and connecting lines */}
      {[0, 1, 2, 3].map((index) => (
        <React.Fragment key={`circle-${index}`}>
          {/* Circle */}
          <div
            ref={el => circlesRef.current[index] = el}
            style={{
              position: 'absolute',
              top: '-0.8vh',
              left: `${15 + (index * 23)}%`,
              transform: 'translate(-50%, -50%)',
              width: '2vh',
              height: '2vh',
              borderRadius: '50%',
              backgroundColor: 'rgba(47, 85, 239, 0.86)',
              border: '0.3vh solid white',
              boxShadow: '0 0.2vh 0.4vh rgba(0, 0, 0, 0.2)',
              zIndex: 3,
            }}
          ></div>
          
          {/* Connecting line */}
          <div
            ref={el => linesRef.current[index] = el}
            style={{
              position: 'absolute',
              top: '-0.8vh',
              left: `${15 + (index * 23)}%`,
              transform: 'translate(-50%, 0)',
              width: '0.5vh',
              height: '10vh',
              background: 'linear-gradient(to bottom, rgba(47, 87, 239, 1), rgba(255, 255, 255, 0))',
              zIndex: 2,
            }}
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
          style={{
            marginTop:'10vh',
            position: 'relative',
            backgroundColor: '#ffffff',
            borderRadius: '1.5vh',
            padding: '2vh',
            boxShadow: '0 0.4vh 0.6vh rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            overflow: 'hidden',
            width: '20vw',
            transform: `translateY(${index % 2 === 0 ? '-2vh' : '2vh'})`,
            borderBottom: '0.5vh solid rgba(199, 24, 230, 0.35)',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-20vh',
            right: '0vw',
            width: '21vw',
            height: '21vw',
            border: '3vh solid rgba(210, 163, 222, 0.44)',
            borderRadius: '50%',
            opacity: 0.5,
            borderBottom: '0.5vh solid rgba(141, 24, 230, 0.29)',
          }}></div>

          <div style={{
            position: 'absolute',
            top: '34%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10vw',
            height: '10vw',
            borderRadius: '80%',
            opacity: 1,
            zIndex: 0,
            background: `url(${card.image}) center/98%`,
            border: '0.5vh solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0.4vh 0.6vh rgba(0, 0, 0, 0.2)',
          }}></div>
          
          <div style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: '20vh'
          }}>
            <h3 style={{
              color: '#333',
              textAlign: 'center'
            }} className='text-serif text-3xl font-bold'>{card.title}</h3>

            <h3 className='text-sans text-center text-md opacity-60 zinc-800 font-bold'>
              {card.description}
            </h3>
          </div>
          
          <div style={{
            marginTop: '2vh',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <div style={{
              fontSize: '1.5rem',
              color: '#666'
            }}>{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default FourCards;
