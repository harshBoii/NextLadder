'use client';

import React from 'react';

const Card = ({ image, title, description, lessons, students }) => {
  return (
    <div className="w-42 h-96 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="w-full h-40 bg-gray-100">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-sans font-semibold text-lg mb-2">{title}</h3>
        <p className="font-sans text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            {lessons} Lessons
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {students} Students
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Cards() {
  const courses = [
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Web Development Bootcamp",
      description: "Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, and modern frameworks.",
      lessons: 24,
      students: 1234
    },
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
      title: "Data Science Fundamentals",
      description: "Introduction to data science, statistics, and machine learning concepts for beginners.",
      lessons: 18,
      students: 856
    },
    {
      image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0",
      title: "UI/UX Design Masterclass",
      description: "Master the principles of user interface and user experience design with practical projects.",
      lessons: 32,
      students: 2103
    }
  ];

  return (
    <div className="flex gap-6">
      {courses.map((course, index) => (
        <Card
          key={index}
          image={course.image}
          title={course.title}
          description={course.description}
          lessons={course.lessons}
          students={course.students}
        />
      ))}
    </div>
  );
}
