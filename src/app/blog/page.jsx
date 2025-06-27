'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NavbarDefault } from '../components/navbar';
import { 
  FaEye, 
  FaHeart, 
  FaClock,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaCalendar,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

const BlogPage = () => {
  const router = useRouter();
  const [icon, setIcon] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        y: particle.y < -10 ? 110 : particle.y - particle.speed
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch logo
        const homeResponse = await fetch('/api/HomePage');
        if (homeResponse.ok) {
          const homeData = await homeResponse.json();
          setIcon(homeData.LogoUrl);
        }

        // Fetch blogs
        const blogsResponse = await fetch('/api/blogs');
        if (blogsResponse.ok) {
          const blogsData = await blogsResponse.json();
          setBlogs(blogsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAuthorInfo = (blog) => {
    if (blog.student) {
      return {
        name: blog.student.name,
        type: 'Student',
        icon: <FaUserGraduate className="w-4 h-4 text-blue-400" />
      };
    } else if (blog.professor) {
      return {
        name: blog.professor.name,
        type: 'Professor',
        icon: <FaChalkboardTeacher className="w-4 h-4 text-green-400" />
      };
    } else {
      return {
        name: 'Admin',
        type: 'Admin',
        icon: <FaUserShield className="w-4 h-4 text-purple-400" />
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

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'student' && blog.student) ||
                         (filterType === 'professor' && blog.professor) ||
                         (filterType === 'admin' && !blog.student && !blog.professor);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center font-mono">
        <div className="animate-pulse">
          <span className="text-2xl">Loading blogs...</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
          />
        ))}
      </div>

      {/* Matrix Rain Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          >
            {['0', '1', 'A', 'B', 'C', '@', '#', '$', '%'][Math.floor(Math.random() * 9)]}
          </div>
        ))}
      </div>

      <NavbarDefault icon={icon} />

      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-mono text-white">
                <span className="text-green-400">$</span> Blog Hub
              </h1>
            </div>
            <p className="text-gray-400 text-lg">Explore insights, tutorials, and stories from our community</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <FaFilter className="text-cyan-400 w-4 h-4" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                >
                  <option value="all">All Authors</option>
                  <option value="student">Students</option>
                  <option value="professor">Professors</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              Showing {filteredBlogs.length} of {blogs.length} blogs
            </div>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No blogs found</div>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => {
                const authorInfo = getAuthorInfo(blog);
                return (
                  <div 
                    key={blog.id} 
                    className="bg-gray-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg overflow-hidden hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group"
                    onClick={() => router.push(`/blog/${blog.id}`)}
                  >
                    {/* Blog Image */}
                    {blog.picture && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={blog.picture} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    )}
                    
                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Author Info */}
                      <div className="flex items-center space-x-2 mb-3">
                        {authorInfo.icon}
                        <span className="text-sm text-gray-400">{authorInfo.type}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-400">{authorInfo.name}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                        {blog.title}
                      </h3>
                      
                      {/* Content Preview */}
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {truncateText(blog.content.replace(/<[^>]*>/g, ''), 120)}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <FaCalendar className="w-3 h-3" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaEye className="w-3 h-3" />
                            <span>{blog.visitNumbers}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaHeart className="w-3 h-3" />
                            <span>{blog.upvote}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-cyan-400">
                          <FaClock className="w-3 h-3" />
                          <span>Read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">{blogs.length}</div>
              <div className="text-gray-400">Total Blogs</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">
                {blogs.filter(blog => blog.student).length}
              </div>
              <div className="text-gray-400">Student Blogs</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-300 mb-2">
                {blogs.filter(blog => blog.professor).length}
              </div>
              <div className="text-gray-400">Professor Blogs</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-2">
                {blogs.reduce((total, blog) => total + blog.visitNumbers, 0).toLocaleString()}
              </div>
              <div className="text-gray-400">Total Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage; 