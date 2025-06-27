'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CourseCard = ({ course }) => {
  return (
    <div className="relative group">
      {/* Glowing border effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-2000 group-hover:duration-500"></div>
      
      <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg p-6 hover:border-cyan-400 transition-all duration-500 hover:scale-102">
        {/* Course Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <div className="w-full h-48 bg-gradient-to-br from-cyan-900/50 to-purple-900/50 flex items-center justify-center">
            {course.imageUrl ? (
              <img 
                src={course.imageUrl} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-cyan-400 text-6xl font-orbitron">
                {course.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-orbitron font-bold text-cyan-400">
            {course.title}
          </h3>
          
          <p className="text-gray-300 text-sm line-clamp-2">
            {course.description || 'Master the latest technologies and advance your career with this comprehensive course.'}
          </p>

          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-cyan-300 font-share-tech-mono">
                {course.hours || 0}h
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-purple-300 font-share-tech-mono">
                {course.noOfStudents || 0} students
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-300 font-share-tech-mono">
                {course.placementRate || 0}% placement
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-300 font-share-tech-mono">
                ₹{course.averageHike || 0}K avg
              </span>
            </div>
          </div>

          {/* Professor Info */}
          {course.professor && (
            <div className="flex items-center space-x-2 pt-2 border-t border-cyan-400/20">
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-black text-xs font-bold">
                  {course.professor.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-cyan-300 text-sm font-share-tech-mono">
                {course.professor.name}
              </span>
            </div>
          )}

          {/* Visit Button */}
          <Link href={`/coursepage/${course.id}`}>
            <button className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-orbitron font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 border border-cyan-400/50 hover:border-cyan-400">
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
      <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{ animationDelay: '-1s' }}></div>
    </div>
    <div className="ml-4 text-cyan-400 font-orbitron">LOADING COURSES...</div>
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          willChange: 'transform'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-7xl font-orbitron font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-100 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              COURSE MATRIX
            </span>
          </h1>
          <p className="text-xl text-cyan-300 font-share-tech-mono max-w-2xl mx-auto">
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
              className="w-full px-6 py-4 bg-black/50 border border-cyan-400/30 rounded-lg text-cyan-300 font-share-tech-mono placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className={`px-4 py-2 rounded-lg font-share-tech-mono text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold'
                    : 'bg-black/50 border border-cyan-400/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Course Count */}
        <div className="text-center mb-8">
          <p className="text-cyan-300 font-share-tech-mono">
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
            <h2 className="text-2xl font-orbitron text-cyan-400 mb-2">NO COURSES FOUND</h2>
            <p className="text-gray-400">Try adjusting your search criteria or browse all categories</p>
          </div>
        )}
      </div>
    </div>
  );
}
