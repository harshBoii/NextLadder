import CourseTag from "./CourseTag";
import Image from "next/image";

const Intro = () => {
  // Array of tag names and icons to display
  const tagData = [
    { name: "Web Development", icon: "🌐" },
    { name: "MERN Stack", icon: "⚛️" },
    { name: "Spring Boot", icon: "🍃" },
    { name: "GenAI", icon: "🤖" },
    { name: "Full Stack", icon: "💻" },
    { name: "Job Ready", icon: "🎯" }
  ];

  // Array of segment data
  const segments = [
    { title: "Placement rate", value: "95%" },
    { title: "Projects", value: "12+" },
    { title: "Live Classes", value: "180+" },
    { title: "Placement", value: "100%" },
    { title: "Salary", value: "6-15 LPA" }
  ];

  return (
    <div 
      className="w-full h-screen flex"
      style={{
        background: 'radial-gradient(circle at top, rgba(57, 73, 102, 1), rgba(27, 29, 34, 1), rgba(20, 20, 20, 1))'
      }}
    >
      {/* Left side - Text content */}
      <div className="w-1/2 flex flex-col items-start pl-[15vw] pt-[15vh]">
        {/* For Professionals tag */}
        <div
          className="px-3 py-1 text-sm rounded-full transition-colors"
          style={{
            color: 'rgb(255, 255, 255)',
            border: '1px solid transparent',
            background: 'transparent',
            backgroundImage: 'linear-gradient(black, black), linear-gradient(90deg, #000000, #FFD700, #000000, #FFD700, #000000, #000000)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            backgroundSize: '200% 100%',
            opacity: '0.8',
          }}
        >
          <div className="opacity-80"> 
          ✨ For Professionals
          </div>
        </div>

        {/* Header below professional tag */}
        <div className="mt-6">
          <h1 className="text-[3.8vh] font-bold font-sans text-white">
            Full Stack Web Development Job Bootcamp with GenAI
          </h1>
        </div>
        <div className="mt-[5vh]">
          <h1 className="text-[1.8vh] font-sans opacity-50 text-white">
            Choose MERN stack or Spring Boot and acquire expertise
            through practical application and real-world projects.
          </h1>
        </div>

        {/* Tags Container */}
        <div className="mt-[6vh] grid grid-cols-3 gap-4">
          {tagData.map((tag, index) => (
            <div key={index} className="text-white">
                <CourseTag tag={tag.name} icon={tag.icon} />
            </div>
          ))}
        </div>

        {/* Segments Container with Vertical Lines */}
        <div className="mt-[6vh] w-[40vw] bg-white/5 backdrop-blur-sm rounded-xl p-8 h-[10vh]">
          <div className="flex items-center justify-between">
            {segments.map((segment, index) => (
              <div key={index} className="flex items-center">
                <div className="flex mt-[-1vh] flex-col items-center text-white mr-[1vw]">
                  <div className="text-xl font-mono font-bold rounded-lg text-center">
                    {segment.value}
                  </div>
                  <div className="text-xs font-mono text-center mt-1.5 opacity-80">
                    {segment.title}
                  </div>
                </div>
                {index < segments.length - 1 && (
                  <div className="h-[8vh] mt-[-2.8vh] w-[1px] bg-white/20 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Webinar Text */}
        <div className="mt-[6vh] text-white text-[2.5vh] font-sans opacity-60 flex items-center">
          Know in-depth details in our free webinar 
          <Image 
            src="/hand.png"
            alt="pointing hand"
            width={40}
            height={40}
            className="ml-[2vw]"
          />
        </div>

      </div>

      {/* Right side - Container */}
      <div className="w-1/2 flex items-center justify-end pr-[5%]">
        <div className="w-[80%] h-[80vh] rounded-3xl bg-white/10 backdrop-blur-sm shadow-2xl">
        </div>
      </div>
    </div>
  );
};

export default Intro;
