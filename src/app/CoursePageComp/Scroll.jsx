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
        borderTop: "0px solid rgba(98, 73, 197, 0.3)",
        backgroundColor: "rgba(98, 73, 197, 0.3)",
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
                    width: `${progress * 10}%`
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
      className="flex w-full h-[90vh]"
      style={{
        backgroundColor: 'rgba(246, 244, 251, 1)'
      }}
      ref={scrollRef}
    >
      {/* Left section - 35vw */}
      <div className="w-[45vw] pl-[10vw] ml-[-5vw] flex flex-col items-center justify-center">
        <h1 
          className="text-[1.9vh] ml-[5.5vw] mb-[3vh] font-extrabold font-sans"
          style={{
            color: 'rgba(98, 73, 197, 1)'
          }}
        >
          Bootcamp Journey
        </h1>

        <div className='text-[4.6vh] text-black font-sans font-extrabold ml-[15vw] mb-[2vh]'>
            It's Not Just a Course;
        </div>

        <div 
          className='text-[4.6vh] font-sans font-extrabold ml-[15vw] mb-[2vh]'
          style={{
            background: 'linear-gradient(to right, rgba(0, 71, 255, 1), rgba(0, 194, 255, 1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
            It's An Experience.
        </div>

        <button 
          className="px-8 py-3 rounded-lg text-white font-extrabold text-[1.8vh] ml-[15vw] mt-[2vh] shadow-lg hover:shadow-xl transition-shadow duration-300 font-sans"
          style={{
            backgroundColor: 'rgba(65, 175, 255, 1)',
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Book a Webinar
        </button>
      </div>

      {/* Right section - 65vw */}
      <div className=" w-[55vw] flex flex-col justify-center pr-[5vw] ml-[3vw] relative"
      >
        {/* Vertical dotted line connecting boxes */}
        <div 
          className="absolute left-[15vw] ml-[10vw] top-[10vh] bottom-[10vh] w-[2px]"
          style={{
            borderLeft: '2px dotted rgba(98, 73, 197, 0.3)'
          }}
        />

        <div 
          className="absolute left-[15vw] ml-[10vw] top-[10vh] bottom-[10vh] w-[2px]"
          style={{
            borderLeft: '2px solid rgba(0, 0, 0, 0.98)'
          }}
          ref={lineRefLeft}
        />


        {features.map((feature, index) => (
          <div key={index} className="flex items-center mb-8 relative">
            {/* Circle with emoji and tag */}
            <div className="relative">
              <div 
                className="w-15 h-15 ml-[5vw] mb-[1.1vh] rounded-full flex items-center justify-center mr-6 shadow-md relative z-10"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <span className="text-2xl">{feature.emoji}</span>
              </div>
              {/* Tag */}
              <div 
                className="absolute -bottom-2 mt-[-6.6vh] ml-[-3vw] left-[5vw] px-2 py-1 text-[1.2vh] font-extrabold whitespace-nowrap font-sans"
                style={{
                  backgroundColor: feature.tagColor,
                  color: feature.textColor,
                  borderRadius: '80vh',
                }}
              >
                {feature.tag}
              </div>
            </div>
            
            {/* Horizontal dotted line connecting circle to box */}
            <div 
              className=" absolute left-[calc(1vw+7rem)] top-[50%] w-[8vw] h-[4vh]"
              style={{
                borderTop: '0.3vh dotted rgba(98, 73, 197, 0.3)'
              }}
            />


            <div 
              className=" absolute left-[calc(1vw+7rem)] top-[50%] w-[8vw] h-[4vh]"
              ref={lineRef}
              style={{
                borderTop: '0.3vh solid rgba(73, 64, 151, 0)'
              }}
            />

            
            {/* Rectangular box with text */}
            <div 
              className="flex-1 p-4 mb-[2vh] rounded-lg shadow-md ml-[5vw] w-[40vw] h-[12vh] relative z-10"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <div className="flex h-full">
                {/* Left half - Title */}
                <div className="w-1/2 flex items-center justify-center border-r border-gray-200">
                  <h3 className="text-[1.6vh] font-sans rounded-lgfont-semibold text-gray-700">
                    {feature.title}
                  </h3>
                </div>
                
                {/* Right half - Description */}
                <div className="w-1/2 pl-4 flex flex-col justify-center">
                  <ul className="list-disc list-inside">
                    {feature.description.map((point, idx) => (
                      <li key={idx} className="text-[1.4vh] opacity-70 text-gray-600 mb-1">
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