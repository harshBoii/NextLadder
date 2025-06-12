import { useState, useEffect } from 'react';
import Image from 'next/image';

const KnowAboutUs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/homePage');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container px-4 py-75">
      <div className="flex flex-row ">
        {/* Left half with images */}
        <div className="w-full ">
          <div className="">
            <div className="absolute h-[40vh] z-1 ml-[10vw] -mt-[27vh] w-[20vw]">
              <Image
                src="/3d1.png"
                alt="About Us Image 1"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute h-[40vh] z-2 ml-[20vw] mt-[6vh] w-[24vw]">
              <Image
                src="/3d2.png"
                alt="About Us Image 2"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute h-[20vh] z-3 ml-[34vw] -mt-[20vh] w-[14vw]">
              <Image
                src="/3d3.png"
                alt="About Us Image 3"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right half with text */}
        <div className="w-full h-full justify-center pl-[23vw] mt-[-20vh]">
            <div className="flex flex-wrap gap-2 pb-[5vh]">
        
            <div
            className="px-3 py-1 text-sm rounded-full transition-colors"
            style={{
                backgroundColor: 'rgba(233, 150, 122, 0.13)',
                color: 'rgba(233, 150, 122, 1)'
            }}
            >
            KNOW ABOUT US
            </div>

            </div>

          <h2 className="text-4xl font-bold mb-[6vh] text-left">Know About Histudy Learning Platform </h2>
          <div className="space-y-4">

            <p className="text-lg text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p className="text-lg text-gray-700">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <p className="text-lg text-gray-700">Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          
          <div className="flex items-start gap-3 mb-4">
            <div 
              className="w-[35px] h-[35px] rounded-full opacity-70 flex-shrink-0 mt-[1vh]"
              style={{ backgroundColor: 'rgba(219, 112, 147, 0.6)' }}
            />
            <div>
              <h3 className="font-sans text-lg font-medium mb-1">Expert Instructors</h3>
              <p className="font-sans text-sm text-gray-700">Learn from industry professionals with years of real-world experience</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div 
              className="w-[35px] h-[35px] rounded-full opacity-70 flex-shrink-0 mt-[1vh]"
              style={{ backgroundColor: 'rgba(47, 87, 239, 0.08)' }}
            />
            <div>
              <h3 className="font-sans text-lg font-medium mb-1">Flexible Learning</h3>
              <p className="font-sans text-sm text-gray-700">Study at your own pace with 24/7 access to course materials</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowAboutUs;
