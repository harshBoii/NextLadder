'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CourseCard = ({ course }) => {
  return (
    <div className="relative group h-140">
      {/* Glowing border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#41afff] via-[#41afff]/80 to-[#41afff]/60 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-2000 group-hover:duration-500"></div>
      
      <div className="relative bg-blue-100 backdrop-blur-sm border border-[#41afff]/30 rounded-lg p-6 hover:border-[#41afff] transition-all duration-500 hover:scale-102">
        {/* Course Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <div className="w-full h-48 bg-gradient-to-br from-[#41afff]/20 to-[#41afff]/10 flex items-center justify-center">
            {course.imageUrl ? (
              <img 
                src={course.imageUrl} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-[#41afff] text-6xl font-orbitron">
                {course.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-orbitron font-bold text-black">
            {course.title}
          </h3>
          
          <p className="text-black/80 text-md line-clamp-2">
            {course.description || 'Master the latest technologies and advance your career with this comprehensive course.'}
          </p>

          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#41afff] rounded-full"></div>
              <span className="text-black font-share-tech-mono">
                {course.hours || 0}h
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#41afff] rounded-full"></div>
              <span className="text-black font-share-tech-mono">
                {course.noOfStudents || 0} students
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#41afff] rounded-full"></div>
              <span className="text-black font-share-tech-mono">
                {course.placementRate || 0}% placement
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#41afff] rounded-full"></div>
              <span className="text-black font-share-tech-mono">
                ₹{course.averageHike || 0}K avg
              </span>
            </div>
          </div>

          {/* Professor Info */}
          {course.professor && (
            <div className="flex items-center space-x-2 pt-2 border-t border-[#41afff]/20">
              <div className="w-6 h-6 bg-gradient-to-r from-[#41afff] to-[#41afff]/80 rounded-full flex items-center justify-center">
                <span className="text-black text-sm font-bold">
                  {course.professor.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-black font-share-tech-mono">
                {course.professor.name}
              </span>
            </div>
          )}

          {/* Visit Button */}
          <Link href={`/coursepage/${course.id}`}>
            <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#41afff] to-[#41afff]/80 hover:from-[#41afff]/90 hover:to-[#41afff] text-black font-orbitron font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#41afff]/30 border border-[#41afff]/50 hover:border-[#41afff]">
              <span className="flex items-center justify-center space-x-2">
                <span>ACCESS COURSE</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#41afff]/30 border-t-[#41afff] rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#41afff]/60 rounded-full animate-spin" style={{ animationDelay: '-1s' }}></div>
    </div>
    <div className="ml-4 text-[#41afff] font-orbitron">LOADING COURSES...</div>
  </div>
);

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      console.log('Fetching courses from API...');
      const response = await fetch('/api/course');
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Courses data received:', data);
      setCourses(data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(courses.map(course => course.category).filter(Boolean))];

  // Filter courses based on search and category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-orbitron mb-2">SYSTEM ERROR</h1>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#171717] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0" style={{background: 'radial-gradient(circle at 60% 40%, rgba(65,175,255,0.15) 0%, transparent 70%)'}} />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-4">
            <span className="bg-gradient-to-r from-[#41afff] to-[#41afff] bg-clip-text text-transparent">
              COURSE MATRIX
            </span>
          </h1>
          <p className="text-xl text-[#41afff] font-share-tech-mono max-w-2xl mx-auto">
            Explore the digital frontier with our cutting-edge courses designed for the future
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="SEARCH COURSES..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-[#41afff]/5 border border-[#41afff] rounded-lg text-[#171717] font-share-tech-mono placeholder-[#41afff] focus:outline-none focus:border-[#41afff] focus:ring-2 focus:ring-[#41afff]/20 transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-[#41afff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-share-tech-mono text-md transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#41afff] to-[#41afff]/80 text-white font-bold'
                    : 'bg-black/50 border border-[#41afff]/30 text-black hover:border-[#41afff] hover:bg-[#41afff]/10'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Course Count */}
        <div className="text-center mb-8">
          <p className="text-[#41afff]/80 font-share-tech-mono">
            {filteredCourses.length} COURSES AVAILABLE
          </p>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-orbitron text-[#41afff] mb-2">NO COURSES FOUND</h2>
            <p className="text-gray-400">Try adjusting your search criteria or browse all categories</p>
          </div>
        )}
      </div>
    </div>
  );
}
