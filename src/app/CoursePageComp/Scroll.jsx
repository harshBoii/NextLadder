import React from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Scroll = ({courseData}) => {
    const lineRef = useRef(null);
    const lineRefLeft = useRef(null);
    const scrollRef = useRef(null);
useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(lineRef.current,{
        width: "0%",
        borderTop: "0px solid rgb(178, 0, 0)",
        backgroundColor: "rgba(255, 0, 0, 0.84)",
        height: "2px"        // give it a visible thickness
        },
         {
        borderTop: "2px solid rgb(0, 0, 0)",
        scrollTrigger: {
            trigger: scrollRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 5,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(lineRef.current, {
                    width: `${progress * 15}%`
                });
            }
        }
    });
}, []);

useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(lineRefLeft.current, {
        borderLeft: "2px solid rgba(98, 73, 197, 0.3)",
        duration: 20,
        scrollTrigger: {
            trigger: lineRefLeft.current,
            start: "top bottom",
            end: "bottom center",
            scrub: true,
            markers: false,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(lineRefLeft.current, {
                    height: `${progress * 80}%`
                });
            }
        }
    });
}, []);
          

  const features = [
    { 
      emoji: "🎯", 
      title: "Industry-aligned curriculum",
      description: [
        `Designed by ${courseData.professor.name}`,
        "Updated with latest trends",
        "Comprehensive coverage"
      ],
      tag: "Precise",
      tagColor: 'rgba(255, 99, 132, 0.1)',
      textColor: 'rgba(255, 99, 132, 1)'
    },
    { 
      emoji: "👨‍💻", 
      title: "Hands-on projects",
      description: [
        "Real-world applications",
        "Industry-standard tools",
        "Portfolio development"
      ],
      tag: "Practical",
      tagColor: 'rgba(54, 162, 235, 0.1)',
      textColor: 'rgba(54, 162, 235, 1)'
    },
    { 
      emoji: "🤝", 
      title: "1:1 mentorship",
      description: [
        "Personalized guidance",
        "Career counseling",
        "Regular feedback"
      ],
      tag: "Supportive",
      tagColor: 'rgba(75, 192, 192, 0.1)',
      textColor: 'rgba(75, 192, 192, 1)'
    },
    { 
      emoji: "💼", 
      title: "Job placement assistance",
      description: [
        "Interview preparation",
        "Resume building",
        "Company connections"
      ],
      tag: "Career-focused",
      tagColor: 'rgba(153, 102, 255, 0.1)',
      textColor: 'rgba(153, 102, 255, 1)'
    },
    { 
      emoji: "🌐", 
      title: "Tech community access",
      description: [
        "Exclusive resources",
        "Networking events",
        "Peer learning"
      ],
      tag: "Connected",
      tagColor: 'rgba(255, 159, 64, 0.1)',
      textColor: 'rgba(255, 159, 64, 1)'
    }
  ];

  return (
    <div 
      className="flex flex-col lg:flex-row w-full min-h-screen lg:h-[120vh]"
      style={{
        backgroundColor: 'rgba(246, 244, 251, 1)'
      }}
      ref={scrollRef}
    >
      {/* Left section - Mobile: full width, Desktop: 45vw */}
      <div className="w-full lg:w-[45vw] px-4 lg:pl-[10vw] lg:ml-[-5vw] flex flex-col items-center justify-center py-8 lg:py-0">
        <h1 
          className="text-lg lg:text-[1.9vh] lg:ml-[5.5vw] mb-4 lg:mb-[3vh] font-extrabold font-sans text-center lg:text-left"
          style={{
            color: 'rgba(98, 73, 197, 1)'
          }}
        >
          Bootcamp Journey
        </h1>

        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-[4.6vh] text-black font-sans font-extrabold lg:ml-[15vw] mb-2 lg:mb-[2vh] text-center lg:text-left'>
            It's Not Just a Course;
        </div>

        <div 
          className='text-2xl sm:text-3xl md:text-4xl lg:text-[4.6vh] font-sans font-extrabold lg:ml-[15vw] mb-4 lg:mb-[2vh] text-center lg:text-left'
          style={{
            background: 'linear-gradient(to right, rgba(0, 71, 255, 1), rgba(0, 194, 255, 1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
            It's An Experience.
        </div>

        <button 
          className="px-6 lg:px-8 py-3 rounded-lg text-white font-extrabold text-base lg:text-[1.8vh] lg:ml-[12vw] mt-4 lg:mt-[2vh] shadow-lg hover:shadow-xl transition-shadow duration-300 font-sans"
          style={{
            backgroundColor: 'rgba(65, 175, 255, 1)',
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Book a Webinar
        </button>
      </div>

      {/* Right section - Mobile: full width, Desktop: 55vw */}
      <div className="w-full lg:w-[55vw] flex flex-col justify-center px-4 lg:pr-[5vw] lg:ml-[3vw] relative py-8 lg:py-0">
        {/* Vertical dotted line connecting boxes - Hidden on mobile */}
        <div 
          className="hidden lg:block absolute left-[15vw] ml-[10vw] top-[10vh] bottom-[10vh] w-[2px]"
          style={{
            borderLeft: '2px dotted rgba(98, 73, 197, 0.3)'
          }}
        />

        <div 
          className="hidden lg:block absolute left-[15vw] ml-[10vw] top-[10vh] bottom-[10vh] w-[2px]"
          style={{
            borderLeft: '2px solid rgba(0, 0, 0, 0.98)'
          }}
          ref={lineRefLeft}
        />

        {features.map((feature, index) => (
          <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center mb-6 lg:mb-8 relative">
            {/* Circle with emoji and tag */}
            <div className="relative mb-4 lg:mb-0">
              <div 
                className="w-12 h-12 lg:w-15 lg:h-15 lg:ml-[5vw] lg:mb-[1.1vh] rounded-full flex items-center justify-center lg:mr-6 shadow-md relative z-10 mx-auto lg:mx-0"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <span className="text-xl lg:text-2xl">{feature.emoji}</span>
              </div>
              {/* Tag */}
              <div 
                className="absolute -bottom-2 lg:mt-[-6.6vh] ml-8 lg:ml-[-3vw] lg:left-[5vw] px-2 py-1 text-xs lg:text-[1.2vh] font-extrabold whitespace-nowrap font-sans text-center lg:text-left"
                style={{
                  backgroundColor: feature.tagColor,
                  color: feature.textColor,
                  borderRadius: '80vh',
                }}
              >
                {feature.tag}
              </div>
            </div>
            
            {/* Horizontal dotted line connecting circle to box - Hidden on mobile */}
            <div 
              className="hidden lg:block absolute left-[calc(1vw+7rem)] top-[50%] w-[8vw] h-[4vh]"
              style={{
                borderTop: '0.3vh dotted rgba(98, 73, 197, 0.3)'
              }}
            />

            <div 
              className="hidden lg:block absolute left-[calc(1vw+7rem)] top-[50%] w-[8vw] h-[4vh]"
              ref={lineRef}
              style={{
                borderTop: '0.3vh solid rgba(73, 64, 151, 0)'
              }}
            />

            {/* Rectangular box with text */}
            <div 
              className="flex-1 p-4 lg:mb-[2vh] rounded-lg shadow-md lg:ml-[5vw] w-full lg:w-[40vw] min-h-[8rem] lg:h-[12vh] relative z-10"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <div className="flex flex-col lg:flex-row h-full">
                {/* Left half - Title */}
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:border-r border-gray-200 mb-4 lg:mb-0">
                  <h3 className="text-lg lg:text-[1.6vh] font-sans font-semibold text-gray-700 text-center lg:text-left">
                    {feature.title}
                  </h3>
                </div>
                
                {/* Right half - Description */}
                <div className="w-full lg:w-1/2 lg:pl-4 flex flex-col justify-center">
                  <ul className="list-disc list-inside">
                    {feature.description.map((point, idx) => (
                      <li key={idx} className="text-sm lg:text-[1.4vh] opacity-70 text-gray-600 mb-1">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scroll;