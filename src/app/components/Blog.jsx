'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEye, FaHeart, FaCalendar, FaUserGraduate, FaChalkboardTeacher, FaUserShield } from 'react-icons/fa';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getAuthorInfo = (blog) => {
    if (blog.student) {
      return {
        name: blog.student.name,
        type: 'Student',
        icon: <FaUserGraduate className="w-3 h-3 text-blue-400" />
      };
    } else if (blog.professor) {
      return {
        name: blog.professor.name,
        type: 'Professor',
        icon: <FaChalkboardTeacher className="w-3 h-3 text-green-400" />
      };
    } else {
      return {
        name: 'Admin',
        type: 'Admin',
        icon: <FaUserShield className="w-3 h-3 text-purple-400" />
      };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    const cleanText = text.replace(/<[^>]*>/g, '');
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };

  // Get the most popular blog (highest visit numbers) for the main card
  const mainBlog = blogs.length > 0 ? blogs.reduce((prev, current) => 
    (prev.visitNumbers > current.visitNumbers) ? prev : current
  ) : null;

  // Get other blogs for side cards (excluding the main blog)
  const sideBlogs = blogs.filter(blog => blog.id !== mainBlog?.id).slice(0, 3);

  if (loading) {
    return (
      <div className="w-full min-h-screen lg:h-screen bg-[rgba(227,243,255,1)] px-4 py-8 lg:py-0 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen lg:h-screen bg-[rgba(227,243,255,1)] px-4 py-8 lg:py-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading blogs: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen lg:h-screen bg-[rgba(227,243,255,1)] px-4 py-8 lg:py-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-0 mt-4 lg:mt-[2vh] lg:ml-[10vw]">
        <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
          <div
            className="px-3 py-1 text-sm rounded-full transition-colors"
            style={{
              backgroundColor: 'rgba(219, 112, 147, 0.13)',
              color: 'rgba(219, 112, 147, 1)'
            }}
          >
            Blog Post
          </div>
        </div>
        <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-0 lg:absolute lg:mt-[24vh]">
          {blogs.length > 0 ? 'Popular Posts' : 'No Posts Yet'}
        </h2>
        <Link 
          href="/blog"
          className="font-sans bg-[rgba(65,175,255,1)] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 lg:mt-[5vh]"
        >
          View All Articles
        </Link>
      </div>
      
      {blogs.length === 0 ? (
        <div className="flex items-center justify-center mt-8 lg:mt-[15vh]">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">No blog posts available yet.</p>
            <Link 
              href="/admin/blogs/add"
              className="font-sans bg-[rgba(65,175,255,1)] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Create First Post
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 mt-8 lg:mt-[15vh]">
          {/* Main Blog Card */}
          {mainBlog && (
            <div className="w-full lg:w-[40vw] lg:mt-[3vh] lg:ml-[10vw]">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 sm:h-64 lg:h-[41.8vh]">
                  <img 
                    src={mainBlog.picture || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60"} 
                    alt={mainBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {mainBlog.visitNumbers} views
                  </div>
                </div>
                <div className="p-4 lg:p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    {getAuthorInfo(mainBlog).icon}
                    <span className="text-xs text-gray-500">{getAuthorInfo(mainBlog).type}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{formatDate(mainBlog.createdAt)}</span>
                  </div>
                  <h2 className="font-sans text-xl sm:text-2xl font-bold mb-2 lg:mb-4">{mainBlog.title}</h2>
                  <p className="font-sans text-gray-600 mb-4 text-sm lg:text-base">
                    {truncateText(mainBlog.content, 120)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaEye className="w-3 h-3" />
                        <span>{mainBlog.visitNumbers}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaHeart className="w-3 h-3" />
                        <span>{mainBlog.upvote}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${mainBlog.id}`}
                      className="font-sans text-blue-600 hover:text-blue-800 font-medium text-sm lg:text-base"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Side Blog Cards */}
          <div className="w-full lg:w-[35vw] lg:mt-[3vh] flex flex-col lg:h-[64vh] gap-4 lg:gap-15">
            {sideBlogs.map((post) => {
              const authorInfo = getAuthorInfo(post);
              return (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 h-32 sm:h-auto relative">
                      <img 
                        src={post.picture || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1 right-1 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
                        {post.visitNumbers}
                      </div>
                    </div>
                    <div className="w-full sm:w-2/3 p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {authorInfo.icon}
                        <span className="text-xs text-gray-500">{authorInfo.type}</span>
                      </div>
                      <h3 className="font-sans text-lg sm:text-xl font-semibold mb-2">{post.title}</h3>
                      <p className="font-sans text-gray-600 text-sm mb-2">
                        {truncateText(post.content, 60)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <FaCalendar className="w-3 h-3" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <Link 
                          href={`/blog/${post.id}`}
                          className="font-sans text-blue-600 hover:text-blue-800 font-medium text-sm lg:text-base"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
