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
    <div className='flex flex-row'>
    <div className="bg-[url('/ad85a9a524b4ba1dbd7e4848760a355157925a49.jpg')] bg-cover bg-center w-[100vw] h-[80vh] overflow-hidden border-t-2 border-t-zinc-800">


    <div className='h-[5.5vh] w-[20vw] bg-white relative mt-[14vh] ml-[7vw] rounded-[1vh] whitespace-nowrap font-serif text-black text-center pt-3'>
        <div className='text-[1.3vw]'>🏆 The Leader In Online Learning</div>
    </div>

    <h1 className=' text-5xl pl-[2.7vw] mt-[5vh] text-zinc-700 font-bold font-sans'>
      {heroData.heroTitle}
    </h1>

    <div className='text-5xl pl-[4.1vw] text-zinc-700 font-bold font-sans'>
      {heroData.heroSubtitle}
    </div>
    <div>
      
    <div className="pl-[4.1vw] mt-[8vh] text-zinc-600 w-[37vw] text-[1.3vw] h-[12vh] max-w-[40vw]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    </div>
<div className='-mt-[35.8vh]'>
{/* Container for the first two overlapping images */}
<div className="relative w-[40vw] h-[40vh]  ml-[30vw] z-10">
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
    src="/c46a24ab3b786d907fa774c685140c38babcfcb3.png"
    alt=""
    className="absolute inset-0 w-full h-full object-contain"
  />
</div>
</div>
</div>
<div className='right-[14vw] top-[-25vh] absolute rotate-6'>
   <SwipeableCardDeck/>
</div>
</div>

<div className='h-[25vh] w-[100vw] mt-[-13.4vh] rounded-[100%] bg-white absolute'>
    <div className="ml-[45vw] h-full pt-[3vh]">
      <TagContainer tag={"Categories"}/>
      <div className='text-4xl font-sans text-center ml-[-50vw] font-bold pt-[3vh]'>Explore Top Courses Caterories
      That Change Yourself</div>
    </div>
    <div className='pl-[40vw]'>
        <p>ᐯ</p>
        <p>ᐯ</p>
        <p>ᐯ</p>
  </div>

</div>
  <div className='pl-[40vw]'>
        <p>ᐯ</p>
        <p>ᐯ</p>
        <p>ᐯ</p>
  </div>
</div>

</>
}