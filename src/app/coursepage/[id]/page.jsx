'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NavbarDefault } from '../../components/navbar';
import Intro from '../../CoursePageComp/Intro';
import Sky from '../../CoursePageComp/Sky';
import Scroll from '../../CoursePageComp/Scroll';
import Placement from '../../CoursePageComp/placement';
import Bootcamp from '../../CoursePageComp/Bootcamp';
import Review from '../../CoursePageComp/Review';
import RequestCallBack from '../../CoursePageComp/RequestCallBack';

const CoursePage = () => {
  const params = useParams();
  const [icon, setIcon] = useState('');
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch homepage data for logo
        const homeResponse = await fetch('/api/HomePage');
        if (!homeResponse.ok) throw new Error('Failed to fetch homepage data');
        const homeData = await homeResponse.json();
        setIcon(homeData.LogoUrl);

        // Fetch course data using the id from params
        const courseResponse = await fetch(`/api/courses/${params.id}`);
        if (!courseResponse.ok) throw new Error('Failed to fetch course data');
        const courseData = await courseResponse.json();
        setCourseData(courseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!courseData) return <p>Course not found</p>;

  return (
    <>
      <NavbarDefault icon={icon} />
      <Intro courseData={courseData} />
      {/* <Sky courseData={courseData} /> */}
      <Scroll courseData={courseData} />
      <Placement courseData={courseData} />
      <Bootcamp courseData={courseData} />
      <Review courseData={courseData} />
      <RequestCallBack courseData={courseData} />
    </>
  );
};

export default CoursePage;
