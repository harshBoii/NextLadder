'use client';

import React, { useState, useEffect } from 'react';
import TagContainer from './TagContainer';
import Link from 'next/link';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center flex flex-col h-full">
      <Link href={`/coursepage/${course.id}`}>
      <img 
        src={course.image} 
        alt={course.title}
        className="w-[90%] h-48 object-cover rounded-lg mb-4 mx-auto"
      />
      <h3 className="text-xl font-semibold mb-2 text-center">{course.title}</h3>
      <p className="text-gray-600 mb-4 text-center">{course.description}</p>
      <div className="flex justify-center items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-500">{course.hours} hours</span>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm text-gray-500">{course.students} students</span>
        </div>
      </div>
      <div className="mt-auto">
        <span className="text-sm text-gray-500 block mb-2">By {course.professor.name}</span>
        {/* <Link href={`/coursepage/${course.id}`}>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full">
            Enroll Now
          </button>
        </Link> */}
      </div>
      </Link>
    </div>
    
  );
};

export default function TopPopularCourses({data}) {
  const [courses, setCourses] = useState([
    {
      id: 8,
      title: "Morder Web Dev 2",
      description: "Learn full-stack web development from scratch",
      professor: { name: "Arun Dip" },
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      hours: 85,
      students: 123
    },
    {
      id: 9,
      title: "UI/UX", 
      description: "A hands‑on UI/UX design journey ",
      professor: { name: "Amresh Rao" },
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      hours: 26,
      students: 126
    },
    {
      id: 10,
      title: "UI/UX Design Masterclass",
      description: "Master the principles of user interface design",
      professor: { name: "Amresh Rao" },
      image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
      hours: 27,
      students: 123
    },
    
  ]);

  return (
    <div className="container mx-auto lg:mt-50 px-4 py-16">
      <div>
      <div className="flex flex-wrap gap-2 justify-center">
     
     <div
       className="px-3 py-1 text-sm rounded-full transition-colors"
       style={{
         backgroundColor: 'rgba(185, 102, 231, 0.13)',
         color: 'rgba(185, 102, 231, 1)'
       }}
     >
       Top Popular Courses
     </div>

 </div>

      </div>
      <div className="text-center mb-12 mt-10">
        <h2 className="text-5xl font-bold mb-4">{data.TopCoursesTitle}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-2xl">
          Discover our most popular courses, carefully curated to help you achieve your learning goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    <div className="text-center mt-12">
      <Link href="/coursepage">
        <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-black font-orbitron font-bold rounded-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50 border-2 border-cyan-400/50 hover:border-cyan-400 overflow-hidden">
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/200 via-blue-400/200 to-purple-400/200 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          
          {/* Button content */}
          <span className="relative flex items-center justify-center space-x-3 text-black z-10">
            <span className="text-lg">EXPLORE ALL COURSES</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
        </button>
      </Link>
    </div>
    </div>
  );
}
