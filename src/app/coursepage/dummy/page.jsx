'use client';
import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '../../components/navbar';
import Intro from '../../CoursePageComp/Intro';
import Sky from '../../CoursePageComp/Sky';
import Scroll from '../../CoursePageComp/Scroll';
import Placement from '../../CoursePageComp/placement';
import Bootcamp from '../../CoursePageComp/Bootcamp';
import Review from '../../CoursePageComp/Review';
import RequestCallBack from '../../CoursePageComp/RequestCallBack';

const CoursePage = () => {
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHomePage() {
      try {
        const response = await fetch('/api/HomePage');
        if (!response.ok) throw new Error('Failed to fetch homepage data');
        const data = await response.json();
        setIcon(data.LogoUrl);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHomePage();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <NavbarDefault icon={icon} />
      <Intro />
      <Sky />
      <Scroll />
      <Placement />
      <Bootcamp />
      <Review />
      <RequestCallBack />
    </>
  );
};

export default CoursePage;
