const Bootcamp = () => {
  const cardData = [
    {
      icon: "/BootcampIcons/C1.png", // Update with actual image paths
      title: "Industry Projects",
      description: "Work on real-world projects that mirror industry challenges and requirements"
    },
    {
      icon: "/BootcampIcons/C2.png",
      title: "Expert Mentorship", 
      description: "Get guidance from industry professionals with years of experience"
    },
    {
      icon: "/BootcampIcons/C3.png",
      title: "Comprehensive Curriculum",
      description: "Learn the latest technologies and frameworks used in modern web development"
    },
    {
      icon: "/BootcampIcons/C4.png",
      title: "Career Support",
      description: "Get assistance with resume building, interview preparation and job placement"
    },
    {
      icon: "/BootcampIcons/C5.png",
      title: "Community Access",
      description: "Join a community of learners and professionals for networking and support"
    }
  ];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: 'black' }}>
      <div className="container mx-auto px-4 pt-[5vh]">
        <h1 
          className="text-[2.8vh] font-extrabold rounded-lg mt-[10vh] text-white text-center"
          style={{
            textShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
          }}
        >
          Job BootCamp Details
        </h1>

        {/* Cards Container */}
        <div className="mt-[8vh] px-[5vw]">
          {/* First Row - Two Cards */}
          <div className="flex gap-8 mb-8">
            {/* First Card - 67% width */}
            <div 
              className="w-[67%] h-[25vh] rounded-xl p-6 relative card-hover"
              style={{
                background: 'linear-gradient(to bottom, rgba(31, 31, 31, 1), rgba(20, 20, 20, 1))',
                boxShadow: '5px 25px 24px rgba(0, 0, 0, 0.21)'
              }}
            >
              {/* Shine effect border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
              </div>
              <div className="flex flex-col h-full relative z-10">
                <img 
                  src={cardData[0].icon}
                  alt={cardData[0].title}
                  className="w-[3vw] h-[3vw] mb-4 object-contain"
                />
                <h3 
                  className="text-[2vh] font-bold text-white mb-2"
                  style={{
                    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {cardData[0].title}
                </h3>
                <p className="text-[1.6vh] text-white opacity-70">{cardData[0].description}</p>
              </div>
            </div>

            {/* Second Card - 33% width */}
            <div 
              className="w-[33%] h-[25vh] rounded-xl p-6 relative card-hover"
              style={{
                background: 'linear-gradient(to bottom, rgba(31, 31, 31, 1), rgba(20, 20, 20, 1))',
                boxShadow: '5px 25px 24px rgba(0, 0, 0, 0.21)'
              }}
            >
              {/* Shine effect border */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
              </div>
              <div className="flex flex-col h-full relative z-10">
                <img 
                  src={cardData[1].icon}
                  alt={cardData[1].title}
                  className="w-[3vw] h-[3vw] mb-4 object-contain"
                />
                <h3 
                  className="text-[2vh] font-bold text-white mb-2"
                  style={{
                    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {cardData[1].title}
                </h3>
                <p className="text-[1.6vh] text-white opacity-70">{cardData[1].description}</p>
              </div>
            </div>
          </div>

          {/* Second Row - Three Cards */}
          <div className="flex gap-8">
            {/* Three equal width cards */}
            {[2, 3, 4].map((index) => (
              <div 
                key={index}
                className="w-[33%] h-[25vh] rounded-xl p-6 relative card-hover"
                style={{
                  background: 'linear-gradient(to bottom, rgba(31, 31, 31, 1), rgba(20, 20, 20, 1))',
                  boxShadow: '5px 25px 24px rgba(0, 0, 0, 0.21)'
                }}
              >
                {/* Shine effect border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
                </div>
                <div className="flex flex-col h-full relative z-10">
                  <img 
                    src={cardData[index].icon}
                    alt={cardData[index].title}
                    className="w-[3vw] h-[3vw] mb-4 object-contain"
                  />
                  <h3 
                    className="text-[2vh] font-bold text-white mb-2"
                    style={{
                      textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {cardData[index].title}
                  </h3>
                  <p className="text-[1.6vh] text-white opacity-70">{cardData[index].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add this style tag for the shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .shine-effect {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .card-hover:hover .shine-effect {
          opacity: 1;
          animation: shine 1.5s ease-in-out;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 8px 30px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>

    <div>
    <div className="w-[80%]  ml-[10%] py-[10vh] px-[5vw]">
      <h2 
        className="text-[2.8vh] font-extrabold text-white text-center mb-[8vh]"
        style={{
          textShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
        }}
      >
        Benefits Beyond Learning
      </h2>

      {/* First row - 3 cards */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {[
          {
            title: "Lifetime Access",
            description: "Access to course materials and updates even after completion",
            icon: "📚"
          },
          {
            title: "Certificate",
            description: "Industry-recognized certification upon successful completion",
            icon: "🏆"
          },
          {
            title: "Alumni Network",
            description: "Join our growing network of successful graduates",
            icon: "👥"
          }
        ].map((benefit, index) => (
          <div 
            key={index}
            className="p-6 rounded-xl relative overflow-hidden card-hover"
            style={{
              background: 'radial-gradient(circle at center, rgba(31, 31, 31, 1), rgba(20, 20, 20, 1))',
              boxShadow: '5px 25px 24px rgba(0, 0, 0, 0.21)'
            }}
          >
            {/* Shine effect border */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
            </div>

            <div className="relative z-10">
              <div className="text-[3vh] mb-4">{benefit.icon}</div>
              <h3 className="text-[2vh] font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-[1.6vh] text-white opacity-70">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Second row - 2 cards of 50% width */}
      <div className="flex gap-8">
        {[
          {
            title: "Career Transition Support",
            description: "Get guidance and resources to smoothly transition into your new tech career",
            icon: "🔄"
          },
          {
            title: "Continuous Learning",
            description: "Stay updated with the latest industry trends through our alumni resources",
            icon: "📈"
          }
        ].map((benefit, index) => (
          <div 
            key={index}
            className="w-1/2 p-6 rounded-xl relative overflow-hidden card-hover"
            style={{
              background: 'radial-gradient(circle at center, rgba(31, 31, 31, 1), rgba(20, 20, 20, 1))',
              boxShadow: '5px 25px 24px rgba(0, 0, 0, 0.21)'
            }}
          >
            {/* Shine effect border */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
            </div>

            <div className="relative z-10">
              <div className="text-[3vh] mb-4">{benefit.icon}</div>
              <h3 className="text-[2vh] font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-[1.6vh] text-white opacity-70">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>

    </div>
  );
};

export default Bootcamp;






