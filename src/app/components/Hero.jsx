'use client';
import TagContainer from './TagContainer';


import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import SwipeableCardDeck from './SwipeableCards';


export  default  function Hero(){

  const [heroData, setHeroData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: '',
    topCoursesTitle: ''
  });

  useEffect(() => {
    async function loadHero() {
      try {
        const res = await fetch("/api/HomePage");
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setHeroData({
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          heroImageUrl: data.heroImageUrl,
          topCoursesTitle: data.topCoursesTitle
        });
      } catch (err) {
        console.error("Failed to load hero data:", err);
      }
    }
    loadHero();
  }, []);

//Gsap Arroww

    const arrowRef=useRef();

    useEffect(() => {
    if (!arrowRef.current) return;

    gsap.fromTo(arrowRef.current, {
        opacity:0.5,
        scaleX:0.6,
        y:0
    },
    {
        opacity:1,
        scaleX:1,
        y:10,
        duration: 2,
        ease: "power3.inout",
        repeat: -1,
        yoyo:true
    });
  }, []);

//GSAP Categories Header

const CatHeadRef = useRef()

useEffect(() => {
    if (!CatHeadRef.current) return;

    gsap.fromTo(CatHeadRef.current, {
        opacity:0.5,
        scale:0.7,
        y:0
    },
    {
        opacity:1,
        scale:0.9,
        y:10,
        duration: 6,
        ease: "power3.inout",
        repeat:0,
        backgroundPosition: "100% 0",
        duration: 4,
        ease: "linear",

        
    });
  }, []);

    const handleMouseEnter = () => {
    gsap.to(CatHeadRef.current, {
        rotate:1,
        yoyo:true,
        duration:0.5,
        textShadow: "0 3px 6px #5362F8"
    });
  };

    const handleMouseExit = () => {
    gsap.to(CatHeadRef.current, {
        rotate:0,
        textShadow: "none"

    });
  };

    return<>
    <div className='relative overflow-hidden'>
    <div className='flex flex-col lg:flex-row'>
    <div className="bg-[url('/ad85a9a524b4ba1dbd7e4848760a355157925a49.jpg')] bg-cover bg-center w-full h-[60vh] lg:h-[80vh] overflow-hidden border-t-2 border-t-zinc-800 relative">

    <div className='text-center'>
        {/* Mobile Badge */}
        <div className='h-12 w-48 lg:h-[5.5vh] lg:w-80 bg-white relative mt-8 lg:mt-30 mx-auto lg:ml-15 rounded-lg lg:rounded-[1vh] whitespace-nowrap font-poppins text-black z-10 flex items-center justify-center'>
            <div className='text-xs lg:text-xl'>🏆 The Leader In Online Learning</div>
        </div>

        {/* Mobile Logo */}
        <div className='absolute top-9 lg:mt-21 w-60 left-1/2 transform -translate-x-1/2 lg:left-68 lg:w-120 z-1 lg:z-1'>
          <img src="https://ik.imagekit.io/2ouowzy7v/Mask%20Group.png?updatedAt=1750753310344" alt="" className='w-60 h-10 lg:w-95 h-8 lg:h-11' />
        </div>
    </div>

    {/* Hero Title */}
    <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[4vh] ml-2 lg:ml-[3.7vw] mt-4 lg:mt-[5vh] text-zinc-700 font-bold font-sans w-full lg:w-[35vw] px-4 lg:px-0'>
      {heroData.heroTitle}
    </h1>

    {/* Hero Subtitle */}
    <div className="pl-4 lg:pl-[4.1vw] mt-4 lg:mt-[5vh] text-zinc-600 w-[70%] lg:w-[37vw] text-sm sm:text-base lg:text-[2vh] h-80lg:h-[12vh] sm:h-80 pr-4 lg:pr-0 mx-auto  lg:mx-0 text-center lg:text-left">
    {heroData.heroSubtitle}    
    </div>

    {/* Hero Images - Hidden on mobile, shown on desktop */}
    <div className='hidden lg:block -mt-[54.8vh]'>
    {/* Container for the first two overlapping images */}
    <div className="relative w-[40vw] h-[40vh] ml-[30vw] z-10">
      <img
        src="/a08fa86ffa69d393330edb1b76145a623230f8b0.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain z-10"
      />
      <img
        src="/f1a9762a34052d83b135a78c749d09d3bed3f6b9.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain z-20"
      />
    </div>

    {/* Third image in a separate container, larger, and overlapping the first two */}
    <div className="relative w-[50vw] h-[60vh] -mt-[53vh] ml-[28vw] z-20">
      <img
        src={heroData.heroImageUrl}
        alt=""
        className="absolute inset-0 w-full h-[60vh] overflow-hidden object-contain"
      />
    </div>
    </div>

    {/* Mobile Hero Image */}
    <div className='lg:hidden mt-8 flex justify-center'>
      <img
        src={heroData.heroImageUrl}
        alt=""
        className="w-64 h-48 object-contain"
      />
    </div>
    </div>

    {/* Swipeable Cards - Hidden on mobile, shown on desktop */}
    <div className='hidden lg:block absolute rotate-6 right-[15vw] top-[-20vh]'>
      <SwipeableCardDeck />
    </div>
    </div>

    {/* Categories Section */}
    <div className='h-32 lg:h-[25vh] w-full mt-[-6vh] lg:mt-[-13.4vh] mb-4 lg:mb-[2vh] rounded-[100%] z-50 bg-white relative'>
      <div className="flex flex-col items-center justify-center h-full">
        <div className='mt-4 lg:mt-0'>
          <TagContainer tag={"Categories"}/>
        </div>
        <div className='text-lg sm:text-xl md:text-2xl lg:text-5xl font-sans text-center font-bold mt-2 lg:mt-[7vh] mb-2 lg:mb-[2vh] px-4 lg:px-0'>

        
            Explore Top Courses Categories That Change Yourself


        </div>
      </div>
    </div>
    </div>

    </>
}