import React from 'react';

const Placement = () => {
  const benefits = [
    {
      image: "/PlacementIcons/B1.png", // Add your image paths
      title: "Resume Building",
      description: "Professional resume crafting with industry experts"
    },
    {
      image: "/PlacementIcons/B2.png",
      title: "Interview Prep", 
      description: "Mock interviews and technical assessment training"
    },
    {
      image: "/PlacementIcons/B3.png",
      title: "Networking",
      description: "Connect with industry professionals and alumni"
    },
    {
      image: "/PlacementIcons/B4.png",
      title: "Job Portal",
      description: "Access to exclusive job opportunities"
    },
    {
      image: "/PlacementIcons/B5.png",
      title: "Career Guidance",
      description: "Personalized career path planning"
    },
    {
      image: "/PlacementIcons/B6.png",
      title: "Placement Support",
      description: "End-to-end placement assistance"
    }
  ];

  return (
    <div className="w-full min-h-screen h-[60vh] overflow-hidden flex flex-col items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h1 className="text-[3.5vh] mb-[15vh] font-extrabold text-center my-[5vh] text-black rounded-lg">
          Placement Benefits
        </h1>

        <div className="grid grid-cols-3 gap-x-16 gap-y-20 mt-8 w-[80vw] justify-items-center">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center w-[20vw]">
              <div className="w-[4vw] h-[4vw] mb-6 flex justify-center">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[2.3vh] font-bold mb-3 text-black">
                {benefit.title}
              </h3>
              <p className="text-[1.8vh] text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Added buttons container */}
        <div className="flex gap-8 mt-[12vh]">
          <button 
            className="px-12 py-4 rounded-lg text-black font-extrabold text-[1.8vh] border-2 border-black hover:shadow-lg transition-shadow duration-300"
            style={{
              backgroundColor: 'white'
            }}
          >
            Request callback
          </button>
          <button 
            className="px-12 py-4 rounded-lg text-white font-extrabold text-[1.8vh] hover:shadow-lg transition-shadow duration-300"
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
