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

import { useState, useEffect } from 'react';

export default function HomePageDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHomePage() {
      try {
        const res = await fetch('/api/HomePage');
        if (!res.ok) throw new Error('Failed to fetch homepage data');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHomePage();
  }, []);

  if (loading) return <p>Loading homepage...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No homepage data found.</p>;

  return (
  <>
    <NavbarDefault icon={data.LogoUrl}/>
    <Hero/>
    <Categories/>
    <TopPopularCourses/>
    <FourCards/>
    <KnowAboutUs/>
    <GuidanceCard/>
    <MovingCarousel/>
    <Blog/>

  </>
  );
}
