import { useState } from "react";

const Review = () => {
    const reviews = [
        {
          name: "Sarah Johnson",
          role: "Software Engineer", 
          company: "Tech Corp",
          review: "This bootcamp transformed my career. Coming from a non-technical background, I was initially intimidated, but the structured learning path, constant support from mentors, and hands-on projects made the transition smooth. I especially appreciated the mock interviews and resume reviews that helped me land my first software engineering job at Tech Corp. The experience not only taught me how to code but also how to think like a developer.",
          rating: "⭐⭐⭐⭐⭐",
          category: "Non tech to Tech",
          image: "https://i.pravatar.cc/300?img=1",
          companyLogo: "/logo1.png"
        },
        {
          name: "Michael Chen", 
          role: "Full Stack Developer",
          company: "StartUpX",
          review: "The curriculum is industry-relevant and the instructors are incredibly supportive. As someone moving from a service-based role to a product-based company, I needed to upskill quickly. The bootcamp gave me exactly that — real-world assignments, agile practices, and collaboration tools like Git and Jira. I felt confident going into interviews and now contribute to full-stack development at StartUpX. The transition wouldn't have been possible without this learning experience.",
          rating: "⭐⭐⭐⭐⭐", 
          category: "Service to Product",
          image: "https://i.pravatar.cc/300?img=2",
          companyLogo: "/logo2.jpg"
        },
        {
          name: "Emily Rodriguez",
          role: "Frontend Developer", 
          company: "DesignHub",
          review: "Best investment in my career. Before the bootcamp, I was self-learning with limited progress. The structured modules, consistent feedback, and live project reviews helped me understand not just the 'how' but the 'why' of frontend development. I built a solid portfolio during the course and got noticed by recruiters. The bootcamp community and alumni network were instrumental in helping me land my first job at DesignHub, and I still stay connected for peer learning and job leads.",
          rating: "⭐⭐⭐⭐⭐",
          category: "Landed The First Job",
          image: "https://i.pravatar.cc/300?img=3",
          companyLogo: "/logo3.png"
        }
      ];
      
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredReviews = activeFilter === "All" 
    ? reviews 
    : reviews.filter(review => review.category === activeFilter);

  return (
    <div className="w-full bg-black py-[10vh] -mt-[10vh] px-[5vw]">
      <h2 
        className="text-[2.8vh] font-extrabold text-white text-center mb-[4vh]"
        style={{
          textShadow: '0px 4px 8px rgba(0, 0, 0, 0.5)'
        }}
      >
        Voices of Trust & Love
      </h2>

      {/* Filter Tags */}
      <div className="flex justify-center gap-4 mt-[7vh] mb-[6vh]">
        {["All", "Non tech to Tech", "service to product", "Landed The First Job"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full text-[1.6vh] font-medium transition-all duration-300
              ${activeFilter === filter 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid mt-[7vh] grid-cols-3 gap-8">
        {filteredReviews.map((review, index) => (
          <div 
            key={index}
            className="flex flex-col items-center p-8 rounded-xl relative card-hover h-[500px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(31, 31, 31, 1), rgba(20, 20, 20, 1))',
              boxShadow: '5px 25px 24px rgba(0, 0, 0, 0.21)'
            }}
          >
            {/* Shine effect border */}
            <div className="absolute inset-0 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shine-effect"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Circular Image */}
              <div className="w-18 h-18 rounded-full absolute z-20 overflow-hidden mt-[-8vh] border-4 border-gray-700">
                <img 
                  src={review.image}
                  alt={review.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://i.pravatar.cc/300?img=4";
                  }}
                />
              </div>

              {/* Name and Role */}
              <h3 className="mt-[4vh] text-[2vh] opacity-60 font-bold text-white ">{review.name}</h3>
              <p className="text-[1.4vh] text-white opacity-70 mb-4">{review.role} at {review.company}</p>

              {/* Review Text */}
              <p className="text-[1.6vh] font-semibold font-sans rounded-lg mt-[2vh] text-white opacity-90 italic flex-grow">
                "{review.review}"
              </p>


              <img src="/reviewcontainer.png" alt="" className="w-full h-full absolute -top-[3.3vh] h-[14vh] left-[0vw] " />

              {/* Post, Coding Ninjas, Arrow and Company Logo */}
              <div className="absolute top-[45vh] left-[0vw] w-[28vw] flex items-center">
                <div className="text-left">
                  <p className="text-[0.8vw] text-white opacity-70">Post</p>
                  <p className="text-[0.8vw] font-semibold text-white mt-1">Coding Ninjas</p>
                </div>
                <div className="ml-[22%] text-[2vh] h-[2vh] font-semibold text-white">
                 <img src="/arrow.png" alt="" className="w-full h-full" />
                </div>
                <div className="ml-[7%] h-[5vh] w-[20vh]  rounded-md overflow-hidden flex items-center justify-center">
                  <img 
                    src={review.companyLogo} 
                    alt={`${review.company} logo`}
                    className="h-[80%] w-[80%] object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://i.pravatar.cc/100?img=4";
                    }}
                  />
                </div>
              </div>
              
            </div>
            
          </div>
        ))}
        
      </div>
      <div className="flex gap-4 ml-[23vw] mt-[8vh]">
              <button 
                className="px-6 py-2 w-[23vw] h-[5vh] rounded-lg border-2 border-white text-white font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Read All Success Stories
              </button>
              <button 
                className="px-6 py-2 w-[15vw] h-[5vh] rounded-lg bg-[rgba(65,175,255,1)] text-white font-semibold hover:bg-[rgba(197, 197, 197, 0.9)] transition-colors duration-200"
              >
                Book a free webinar
              </button>
            </div>
    </div>
  );
};

export default Review;









