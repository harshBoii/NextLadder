'use client';
import { NavbarDefault } from './components/navbar';

import Hero from './components/Hero';
import Categories from './components/Categories';
import TopPopularCourses from './components/topPopularCourses';
import KnowAboutUs from './components/KnowAboutUs';
import GuidanceCard from './components/GuidanceCard';
import MovingCarousel from './components/MovingCarousel';
import FourCards from './components/4Cards';
import Blog from './components/Blog';
import TechNicalCategories from './components/TechNicalCategories';
import { useState, useEffect, useCallback } from 'react';
import FooterComponent from './components/FooterComponent';
import LoadingAnimation from './components/LoadingAnimation';
import CircularGallery from './components/CircularGallery'

export default function HomePageDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true);

  useEffect(() => {
    async function fetchHomePage() {
      try {
        console.log('Fetching homepage data...');
        const res = await fetch('/api/HomePage');
        if (!res.ok) throw new Error('Failed to fetch homepage data');
        const json = await res.json();
        console.log('Homepage data received:', json);
        setData(json);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    }
    fetchHomePage();
  }, []);

  const handleLoadingComplete = useCallback(() => {
    console.log('Loading animation completed, setting showLoadingAnimation to false');
    setShowLoadingAnimation(false);
  }, []);

  console.log('Current state:', { showLoadingAnimation, loading, data: !!data, error });

  // Show loading animation until animation completes
  if (showLoadingAnimation) {
    console.log('Showing loading animation');
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  // Show loading state while data is being fetched (after animation)
  if (loading) {
    console.log('Showing data loading screen');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center text-white">
          <div className="text-2xl font-orbitron mb-4">Loading content...</div>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('Showing error:', error);
    return <p>Error: {error}</p>;
  }
  
  if (!data) {
    console.log('No data found');
    return <p>No homepage data found.</p>;
  }

  console.log('Showing homepage');
  return (
  <>
    <NavbarDefault icon={data.LogoUrl}/>
    <Hero/>
    {/* <Categories/> */}
    {/* <TechNicalCategories/> */}

    <div style={{ height: '600px',fontFamily:"sans-serif", position: 'relative' }}>
      <CircularGallery bend={1} className="border-black border-10 backdrop-blur-md" borderRadius={0.05} scrollEase={0.02}/>
    </div>

    <TopPopularCourses data={data}/>
    <FourCards data={data}/>
    <KnowAboutUs daata={data}/>
    <GuidanceCard data={data}/>
    <MovingCarousel data={data}/>
    <Blog data={data}/>
    <FooterComponent/>
  </>
  );
}
