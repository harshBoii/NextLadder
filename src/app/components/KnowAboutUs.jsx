import { useState, useEffect } from 'react';
import Image from 'next/image';

const KnowAboutUs = ({daata}) => {
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
    <div className="container mx-auto px-4 py-16 lg:py-20">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left half with images */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative h-64 sm:h-80 lg:h-150">
            <div className="absolute top-0 sm:ml-20 left-0 h-32 sm:h-40 lg:h-[35vh] w-32 sm:w-40 lg:w-[15vw] z-10">
              <Image
                src="/3d1.png"
                alt="About Us Image 1"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute top-16 sm:top-20 lg:top-[27vh] left-16 sm:mt-10 sm:left-50 lg:left-[10vw] h-32 sm:h-40 lg:h-[40vh] w-40 sm:w-48 lg:w-[24vw] z-20">
              <Image
                src="/3d2.png"
                alt="About Us Image 2"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="absolute top-0 right-0 h-20  sm:top-10 sm:h-32 lg:h-[20vh] sm:mr-20 w-20 sm:w-32 lg:w-[14vw] lg:mr-[10vw] z-30">
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
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 pb-4 lg:pb-[5vh]">
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

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-[6vh] text-left">{daata.AboutUsTitle}</h2>
          <div className="space-y-4">
            <p className="text-base lg:text-lg text-gray-700">{daata.AboutUsContent}</p>
            
            <div className="flex items-start gap-3 mt-8 lg:mt-[5vh] mb-4">
              <div 
                className="w-8 h-8 lg:w-[35px] lg:h-[35px] rounded-full opacity-70 flex-shrink-0 mt-1 lg:mt-[1vh]"
                style={{ backgroundColor: 'rgba(219, 112, 147, 0.6)' }}
              />
              <div>
                <h3 className="font-sans text-base lg:text-lg font-medium mb-1">Expert Instructors</h3>
                <p className="font-sans text-sm text-gray-700">Learn from industry professionals with years of real-world experience</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 lg:w-[35px] lg:h-[35px] rounded-full opacity-70 flex-shrink-0 mt-1 lg:mt-[1vh]"
                style={{ backgroundColor: 'rgba(47, 87, 239, 0.08)' }}
              />
              <div>
                <h3 className="font-sans text-base lg:text-lg font-medium mb-1">Flexible Learning</h3>
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
