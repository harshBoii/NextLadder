'use client';

import React from 'react';
import TagContainer from './TagContainer';

const GuidanceCard = () => {
  // Mock data for guidance cards
  const guidanceData = [
    {
      id: 1,
      title: "Career Guidance",
      description: "Get expert advice on career paths and opportunities",
      icon: "🎯",
      color: "rgba(47, 87, 239, 0.13)",
      textColor: "rgba(47, 87, 239, 1)",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 2, 
      title: "Course Selection",
      description: "Find the perfect courses to achieve your goals",
      icon: "📚",
      color: "rgba(185, 102, 231, 0.13)",
      textColor: "rgba(185, 102, 231, 1)",
      video: "https://www.youtube.com/embed/9bZkp7q19f0"
    },
    {
      id: 3,
      title: "Learning Path",
      description: "Create a personalized learning roadmap",
      icon: "🗺️",
      color: "rgba(233, 150, 122, 0.13)", 
      textColor: "rgba(233, 150, 122, 1)",
      video: "https://www.youtube.com/embed/jNQXAC9IVRw"
    },
    {
        id: 4, 
        title: "Course Selection",
        description: "Find the perfect courses to achieve your goals",
        icon: "📚",
        color: "rgba(185, 102, 231, 0.13)",
        textColor: "rgba(185, 102, 231, 1)",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[75vw] ml-[3vw]">
        {guidanceData.map((card) => (
          <div 
            key={card.id}
            className="relative ml-[6.5vw] h-[30vh] w-[35vw] bg-white rounded-lg p-6 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 99%, 99% 100%, 0 100%)",
              boxShadow: '0 5px 5px -55px rgba(0, 0, 0, 0.3), 10px 10px 20px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 0 3px rgba(0, 0, 0, 0.05), 0 0 50px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 70%)",
                pointerEvents: "none"
              }}
            />
            <TagContainer className="pb-[2vh]" tag="New Collection"/>
                <div className="flex flex-row h-full relative z-10">
                
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-2xl font-serif mb-2">{card.title}</h3>
                <p className="font-serif opacity-80">{card.description}</p>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <iframe 
                  src={card.video} 
                  title={card.title}
                  className="w-full h-full rounded shadow-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div 
              className="absolute bottom-0 right-0 w-16 h-16 shadow-lg"
              style={{
                backgroundColor: card.color,
                clipPath: "polygon(0 0, 100% 0, 100% 99%, 99% 100%, 0 100%)",
                boxShadow: '0 100px 60px -55px rgba(0, 0, 0, 0.3), 10px 10px 20px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidanceCard;