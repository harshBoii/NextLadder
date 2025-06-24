import React from 'react';

const Placement = () => {
  const benefits = [
    {
      image: "/PlacementIcons/B1.png", // Add your image paths
      title: "Profiles highlighted on hirist.com",
      description: "Get access to an abundance of job openings"
    },
    {
      image: "/PlacementIcons/B2.png",
      title: "1200+ Companies Hiring", 
      description: "Expanded job search with a vast network of companies hiring."
    },
    {
      image: "/PlacementIcons/B3.png",
      title: "Profiles highlighted on naukri.com",
      description: "Make a distinct mark for yourself on India's leading job portal."
    },
    {
      image: "/PlacementIcons/B4.png",
      title: "Dedicated placement team",
      description: "Guiding and motivating you every step of the way."
    },
    {
      image: "/PlacementIcons/B5.png",
      title: "50+ Members placement team",
      description: "A dedicated team to help you get placed in your dream company."
    },
    {
      image: "/PlacementIcons/B6.png",
      title: "Job openings shared every daySupport",
      description: "We send job openings daily to your WhatsApp directly"
    }
  ];

  return (
    <div className="w-full min-h-screen lg:h-[60vh] overflow-hidden flex flex-col items-center justify-center py-8 lg:py-0" style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.5vh] mb-8 lg:mb-[10vh] font-extrabold text-center mt-4 lg:mt-[5vh] text-black rounded-lg">
          Placement Benefits
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-x-16 lg:gap-y-20 mt-4 lg:mt-[2vh] w-full lg:w-[80vw] justify-items-center">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center w-full lg:w-[20vw]">
              <div className="w-16 h-16 lg:w-[4vw] lg:h-[4vw] mb-4 lg:mb-6 flex justify-center">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg lg:text-[1.7vh] font-bold mb-2 lg:mb-3 text-black">
                {benefit.title}
              </h3>
              <p className="text-sm lg:text-[1.5vh] text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Added buttons container */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 mt-8 lg:mt-[12vh]">
          <button 
            className="px-8 lg:px-12 py-3 lg:py-4 rounded-lg text-black font-extrabold text-base lg:text-[1.8vh] border-2 border-black hover:shadow-lg transition-shadow duration-300"
            style={{
              backgroundColor: 'white'
            }}
          >
            Request callback
          </button>
          <button 
            className="px-8 lg:px-12 py-3 lg:py-4 rounded-lg text-white font-extrabold text-base lg:text-[1.8vh] hover:shadow-lg transition-shadow duration-300"
            style={{
              backgroundColor: 'rgba(65, 175, 255, 1)'
            }}
          >
            Book a free webinar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Placement;
