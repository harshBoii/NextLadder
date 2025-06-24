'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import TagContainer from './TagContainer';

const GuidanceCard = () => {
  const titleRefs = useRef([]);
  const descriptionRefs = useRef([]);

  // Mock data for guidance cards with technical YouTube videos
  const guidanceData = [
    {
      id: 1,
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript and modern frameworks",
      icon: "🌐",
      color: "rgba(47, 87, 239, 0.13)",
      textColor: "rgba(47, 87, 239, 1)",
      video: "https://www.youtube.com/embed/916GWv2Qs08"
    },
    {
      id: 2, 
      title: "Data Science",
      description: "Learn Python, statistics, and machine learning",
      icon: "📊",
      color: "rgba(185, 102, 231, 0.13)",
      textColor: "rgba(185, 102, 231, 1)",
      video: "https://www.youtube.com/embed/ua-CiDNNj30"
    },
    {
      id: 3,
      title: "Mobile Development",
      description: "Build iOS and Android apps with React Native",
      icon: "📱",
      color: "rgba(233, 150, 122, 0.13)", 
      textColor: "rgba(233, 150, 122, 1)",
      video: "https://www.youtube.com/embed/ua-CiDNNj30"
    },
    {
      id: 4, 
      title: "Cloud Computing",
      description: "Master AWS, Azure, and Google Cloud platforms",
      icon: "☁️",
      color: "rgba(34, 197, 94, 0.13)",
      textColor: "rgba(34, 197, 94, 1)",
      video: "https://www.youtube.com/embed/3hLmDS179YE"
    },
  ];

  const handleMouseEnter = (index) => {
    const titleRef = titleRefs.current[index];
    const descriptionRef = descriptionRefs.current[index];
    
    if (!titleRef || !descriptionRef) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    // Glitch effect for title
    tl.to(titleRef, {
      duration: 0.05,
      x: () => Math.random() * 4 - 2,
      y: () => Math.random() * 4 - 2,
      filter: "drop-shadow(2px 0 red) drop-shadow(-1px 0 blue)",
      ease: "none"
    })
    .to(titleRef, {
      duration: 0.05,
      x: () => Math.random() * 4 - 2,
      y: () => Math.random() * 4 - 2,
      filter: "drop-shadow(-2px 0 green) drop-shadow(1px 0 red)",
      ease: "none"
    })
    .to(titleRef, {
      duration: 0.05,
      x: 0,
      y: 0,
      filter: "none",
      ease: "none"
    });

    // Glitch effect for description
    tl.to(descriptionRef, {
      duration: 0.05,
      x: () => Math.random() * 3 - 1.5,
      y: () => Math.random() * 3 - 1.5,
      filter: "drop-shadow(1px 0 red) drop-shadow(-1px 0 blue)",
      ease: "none"
    }, "-=0.05")
    .to(descriptionRef, {
      duration: 0.05,
      x: () => Math.random() * 3 - 1.5,
      y: () => Math.random() * 3 - 1.5,
      filter: "drop-shadow(-1px 0 green) drop-shadow(1px 0 red)",
      ease: "none"
    })
    .to(descriptionRef, {
      duration: 0.05,
      x: 0,
      y: 0,
      filter: "none",
      ease: "none"
    });

    // Store timeline reference for cleanup
    titleRef._glitchTl = tl;
  };

  const handleMouseLeave = (index) => {
    const titleRef = titleRefs.current[index];
    if (titleRef && titleRef._glitchTl) {
      titleRef._glitchTl.kill();
      titleRef._glitchTl = null;
    }
    
    // Reset positions and filters
    gsap.set([titleRef, descriptionRefs.current[index]], {
      x: 0,
      y: 0,
      filter: "none"
    });
  };

  return (
    <div className="container mx-auto mt-50 px-4 py-16">
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <div
          className="px-3 py-1 text-xl font-mono rounded-full transition-colors"
          style={{
            backgroundColor: 'rgba(47, 87, 239, 0.13)',
            color: 'rgba(47, 87, 239, 1)'
          }}
        >
        Get Expert Guidance
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4"></h2>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
          Personalized guidance to prepare for your interview needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-6xl mx-auto">
        {guidanceData.map((card, index) => (
          <div 
            key={card.id}
            className="relative h-64 sm:h-72 lg:h-[30vh] w-full bg-white rounded-lg p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 99%, 99% 100%, 0 100%)",
              boxShadow: '0 5px 5px -55px rgba(0, 0, 0, 0.3), 10px 10px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 0 3px rgba(0, 0, 0, 0.05), 0 0 50px rgba(0, 0, 0, 0.1)"
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 70%)",
                pointerEvents: "none"
              }}
            />
            <TagContainer className="pb-2 lg:pb-[2vh]" tag="New Collection"/>
            <div className="flex flex-row h-full relative z-10">
              <div className="flex-1 flex flex-col justify-center mb-4 lg:mb-0">
                <h3 
                  ref={el => titleRefs.current[index] = el}
                  className="text-xl lg:text-2xl font-serif mb-2"
                >
                  {card.title}
                </h3>
                <p 
                  ref={el => descriptionRefs.current[index] = el}
                  className="font-serif opacity-80 text-sm lg:text-base"
                >
                  {card.description}
                </p>
              </div>
              <div className="flex-1 lg:mb-8 flex items-center justify-center">
                <iframe 
                  src={card.video} 
                  title={card.title}
                  className="w-full h-32 sm:h-40 lg:h-full rounded shadow-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidanceCard;



// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';
// import TagContainer from './TagContainer';

// const GuidanceCard = () => {
//   const titleRefs = useRef([]);
//   const descriptionRefs = useRef([]);
//   const canvasRef = useRef(null);

//   // Binary rain setup
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);

//     const binary = ['0', '1'];
//     const fontSize = 16;
//     const columns = Math.floor(width / fontSize);
//     const drops = Array(columns).fill(1);

//     const draw = () => {
//       // translucent overlay to create trail effect
//       ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
//       ctx.fillRect(0, 0, width, height);
//       ctx.fillStyle = '#0f0';
//       ctx.font = `${fontSize}px monospace`;

//       for (let i = 0; i < drops.length; i++) {
//         const text = binary[Math.floor(Math.random() * binary.length)];
//         const x = i * fontSize;
//         const y = drops[i] * fontSize;
//         ctx.fillText(text, x, y);

//         if (y > height && Math.random() > 0.975) {
//           drops[i] = 0;
//         }
//         drops[i]++;
//       }
//     };

//     let animId;
//     const loop = () => {
//       draw();
//       animId = requestAnimationFrame(loop);
//     };
//     loop();

//     const handleResize = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const guidanceData = [
//     { id: 1, title: 'Web Development', description: 'Master HTML, CSS, JavaScript and modern frameworks', icon: '🌐', color: 'rgba(47, 87, 239, 0.13)', textColor: 'rgba(47, 87, 239, 1)', video: 'https://www.youtube.com/embed/916GWv2Qs08' },
//     { id: 2, title: 'Data Science', description: 'Learn Python, statistics, and machine learning', icon: '📊', color: 'rgba(185, 102, 231, 0.13)', textColor: 'rgba(185, 102, 231, 1)', video: 'https://www.youtube.com/embed/ua-CiDNNj30' },
//     { id: 3, title: 'Mobile Development', description: 'Build iOS and Android apps with React Native', icon: '📱', color: 'rgba(233, 150, 122, 0.13)', textColor: 'rgba(233, 150, 122, 1)', video: 'https://www.youtube.com/embed/VozPNrt-LfI' },
//     { id: 4, title: 'Cloud Computing', description: 'Master AWS, Azure, and Google Cloud platforms', icon: '☁️', color: 'rgba(34, 197, 94, 0.13)', textColor: 'rgba(34, 197, 94, 1)', video: 'https://www.youtube.com/embed/3hLmDS179YE' }
//   ];

//   const handleMouseEnter = (index) => {
//     const titleRef = titleRefs.current[index];
//     const descriptionRef = descriptionRefs.current[index];
//     if (!titleRef || !descriptionRef) return;

//     const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

//     // Glitch effect for title
//     tl.to(titleRef, { duration: 0.05, x: () => Math.random() * 4 - 2, y: () => Math.random() * 4 - 2, filter: 'drop-shadow(2px 0 red) drop-shadow(-1px 0 blue)', ease: 'none' })
//       .to(titleRef, { duration: 0.05, x: 0, y: 0, filter: 'none', ease: 'none' });

//     // Glitch effect for description
//     tl.to(descriptionRef, { duration: 0.05, x: () => Math.random() * 3 - 1.5, y: () => Math.random() * 3 - 1.5, filter: 'drop-shadow(1px 0 red) drop-shadow(-1px 0 blue)', ease: 'none' })
//       .to(descriptionRef, { duration: 0.05, x: 0, y: 0, filter: 'none', ease: 'none' });

//     titleRef._glitchTl = tl;
//   };

//   const handleMouseLeave = (index) => {
//     const titleRef = titleRefs.current[index];
//     if (titleRef && titleRef._glitchTl) {
//       titleRef._glitchTl.kill();
//       titleRef._glitchTl = null;
//     }
//     gsap.set([titleRef, descriptionRefs.current[index]], { x: 0, y: 0, filter: 'none' });
//   };

//   return (
//     <div className="relative w-full h-full lg:mt-50">
//       <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

//       <div className="container mx-auto mt-12 px-4 py-16 relative z-10">
//         <div className="flex flex-wrap gap-2 justify-center mb-8">
//           <div className="px-3 py-1 text-xl font-mono rounded-full transition-colors" style={{ backgroundColor: guidanceData[0].color, color: guidanceData[0].textColor }}>
//             Get Expert Guidance
//           </div>
//         </div>

//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-green-200 mb-4">Explore Tech Tracks</h2>
//           <p className="text-gray-200 text-xl max-w-2xl mx-auto">Personalized guidance to prepare for your interview needs</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-6xl mx-auto">
//           {guidanceData.map((card, index) => (
//             <div key={card.id} className="relative h-64 sm:h-72 lg:h-[30vh] w-full bg-black bg-opacity-40 rounded-lg p-4 lg:p-6 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm" style={{ border: '1px solid rgba(255,255,255,0.1)' }} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
//               <div className="absolute inset-0 rounded-lg pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%)' }} />
//               <TagContainer className="pb-2 lg:pb-[2vh]" tag="New Collection" />
//               <div className="flex flex-row h-full relative z-10">
//                 <div className="flex-1 flex flex-col justify-center mb-4 lg:mb-0">
//                   <h3 ref={el => titleRefs.current[index] = el} className="text-xl lg:text-2xl font-serif mb-2" style={{ color: card.textColor }}>
//                     {card.icon} {card.title}
//                   </h3>
//                   <p ref={el => descriptionRefs.current[index] = el} className="font-serif opacity-80 text-sm lg:text-base" style={{ color: card.textColor }}>
//                     {card.description}
//                   </p>
//                 </div>
//                 <div className="flex-1 lg:mb-8 flex items-center justify-center">
//                   <iframe src={card.video} title={card.title} className="w-full h-32 sm:h-40 lg:h-full rounded shadow-lg" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuidanceCard;
