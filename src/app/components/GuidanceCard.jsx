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
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyZWVyJTIwZ3VpZGFuY2V8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 2, 
      title: "Course Selection",
      description: "Find the perfect courses to achieve your goals",
      icon: "📚",
      color: "rgba(185, 102, 231, 0.13)",
      textColor: "rgba(185, 102, 231, 1)",
      image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww"
    },
    {
      id: 3,
      title: "Learning Path",
      description: "Create a personalized learning roadmap",
      icon: "🗺️",
      color: "rgba(233, 150, 122, 0.13)", 
      textColor: "rgba(233, 150, 122, 1)",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhcm5pbmd8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 4, 
        title: "Course Selection",
        description: "Find the perfect courses to achieve your goals",
        icon: "📚",
        color: "rgba(185, 102, 231, 0.13)",
        textColor: "rgba(185, 102, 231, 1)",
        image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-8xl mx-auto">
        {guidanceData.map((card) => (
          <div 
            key={card.id}
            className="relative bg-white rounded-lg p-6 hover:shadow-2xl transition-all duration-300 border border-black backdrop-blur-sm"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
              boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1)"
            }}
          >
            <TagContainer className="pb-[2vh]" tag="New Collection"/>
                <div className="flex flex-row">
                
              <div className="flex-1">
                <h3 className="text-2xl font-serif mb-2">{card.title}</h3>
                <p className="font-serif opacity-80">{card.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Learn More</button>
              </div>
              <div className="flex-1">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover rounded" />
              </div>
            </div>
            <div 
              className="absolute bottom-0 right-0 w-16 h-16"
              style={{
                backgroundColor: card.color,
                clipPath: "polygon(100% 0, 0 0, 100% 100%)"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidanceCard;