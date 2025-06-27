'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { NavbarDefault } from '../../components/navbar';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaHeart, 
  FaEye, 
  FaClock,
  FaRocket,
  FaBug,
  FaLightbulb,
  FaThumbsUp,
  FaThumbsDown,
  FaCalendar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield
} from 'react-icons/fa';

const BlogPage = () => {
  const params = useParams();
  const [blogData, setBlogData] = useState(null);
  const [icon, setIcon] = useState('');
  const [particles, setParticles] = useState([]);
  const [upvoteLoading, setUpvoteLoading] = useState(false);
  const [userVote, setUserVote] = useState(null); // 'upvote', 'downvote', or null

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
    async function fetchData() {
      try {
        // Fetch homepage data for logo
        const homeResponse = await fetch('/api/HomePage');
        if (!homeResponse.ok) throw new Error('Failed to fetch homepage data');
        const homeData = await homeResponse.json();
        setIcon(homeData.LogoUrl);

        // Fetch blog data from API
        const blogResponse = await fetch(`/api/blogs/${params.id}`);
        if (!blogResponse.ok) throw new Error('Failed to fetch blog data');
        const blogData = await blogResponse.json();
        
        // Transform the API data to match our expected format
        const transformedBlogData = {
          id: blogData.id,
          title: blogData.title,
          subtitle: "A deep dive into creating stunning UI with modern web technologies",
          picture: blogData.picture,
          author: {
            name: blogData.student?.name || blogData.professor?.name || "Admin",
            avatar: blogData.student?.image || "https://i.pravatar.cc/150?img=32",
            github: "admin-dev",
            twitter: "@admin_dev",
            linkedin: "admin-dev",
            bio: blogData.student?.name || blogData.professor?.name 
              ? "Full-stack developer obsessed with clean code and beautiful UIs. Building the future, one component at a time."
              : "System administrator and content creator. Dedicated to providing valuable insights and resources for the developer community.",
            type: blogData.student ? 'Student' : blogData.professor ? 'Professor' : 'Admin'
          },
          publishedAt: blogData.createdAt,
          readTime: "8 min read",
          tags: ["Next.js", "React", "CSS", "Dark Mode", "UI/UX"],
          views: blogData.visitNumbers,
          likes: blogData.upvote,
          tldr: "Learn how to create a stunning dark mode interface with neon highlights, modern elements, and smooth animations using Next.js and modern CSS techniques.",
          content: blogData.content
        };
        
        setBlogData(transformedBlogData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const handleUpvote = async (action) => {
    if (upvoteLoading) return;
    
    setUpvoteLoading(true);
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogData(prev => ({
          ...prev,
          likes: updatedBlog.upvote
        }));
        setUserVote(action);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating upvote:', error);
      alert('Failed to update upvote');
    } finally {
      setUpvoteLoading(false);
    }
  };

  const getAuthorIcon = (type) => {
    switch (type) {
      case 'Student':
        return <FaUserGraduate className="w-4 h-4 text-blue-400" />;
      case 'Professor':
        return <FaChalkboardTeacher className="w-4 h-4 text-green-400" />;
      default:
        return <FaUserShield className="w-4 h-4 text-purple-400" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!blogData) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center font-mono">
        <div className="animate-pulse">
          <span className="text-2xl">Loading blog post...</span>
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
          
          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Content Column */}
            <div className="flex-1 lg:max-w-4xl">
              
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-mono text-white">
                    <span className="text-green-400">$</span> {blogData.title}
                  </h1>
                </div>
                <p className="text-gray-400 text-lg mb-6">{blogData.subtitle}</p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FaEye className="w-4 h-4" />
                    <span>{blogData.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaHeart className="w-4 h-4" />
                    <span>{blogData.likes} likes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaCalendar className="w-4 h-4" />
                    <span>{formatDate(blogData.publishedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Blog Picture */}
              {blogData.picture && (
                <div className="mb-8">
                  <div className="relative overflow-hidden rounded-lg border border-cyan-500/30">
                    <img 
                      src={blogData.picture} 
                      alt={blogData.title}
                      className="w-full h-64 lg:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>
              )}

              {/* Blog Content */}
              <div className="blog-content max-w-none">
                <div className="space-y-8 text-white">
                  <div 
                    dangerouslySetInnerHTML={{ __html: blogData.content }} 
                    className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-cyan-300 [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-cyan-200 [&>h2]:mb-4 [&>h2]:mt-6 [&>p]:text-gray-300 [&>p]:mb-4 [&>p]:leading-relaxed [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:space-y-2 [&>ol]:text-gray-300 [&>ol]:mb-4 [&>li]:text-gray-300 [&>hr]:border-gray-600 [&>hr]:my-8 [&>em]:italic [&>strong]:font-bold [&>strong]:text-cyan-300"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:w-80 space-y-6">
              
              {/* Author Card */}
              <div className="bg-dark-surface border border-gray-700 rounded-lg p-6 sticky top-24">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={blogData.author.avatar} 
                    alt={blogData.author.name}
                    className="w-16 h-16 rounded-full border-2 border-cyan-500/50"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      {getAuthorIcon(blogData.author.type)}
                      <span className="text-xs text-gray-400">{blogData.author.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{blogData.author.name}</h3>
                    <p className="text-sm text-gray-400">Full-stack Developer</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{blogData.author.bio}</p>
                <div className="flex space-x-3">
                  <a 
                    href={`https://github.com/${blogData.author.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FaGithub className="w-5 h-5 text-gray-300" />
                  </a>
                  <a 
                    href={`https://twitter.com/${blogData.author.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FaTwitter className="w-5 h-5 text-gray-300" />
                  </a>
                  <a 
                    href={`https://linkedin.com/in/${blogData.author.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5 text-gray-300" />
                  </a>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                  <FaRocket className="w-5 h-5 text-cyan-400" />
                  <span>Quick Stats</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <span className="text-gray-400 block">Views</span>
                    <span className="text-cyan-300 font-bold">{blogData.views.toLocaleString()}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-gray-400 block">Likes</span>
                    <span className="text-cyan-300 font-bold">{blogData.likes}</span>
                  </div>
                </div>
              </div>

              {/* Upvote Section */}
              <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                  <FaRocket className="w-5 h-5 text-cyan-400" />
                  <span>Was this helpful?</span>
                </h3>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => handleUpvote('upvote')}
                    disabled={upvoteLoading}
                    className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      userVote === 'upvote' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    <FaThumbsUp className="w-4 h-4" />
                    <span>Upvote ({blogData.likes})</span>
                  </button>
                  
                  <button
                    onClick={() => handleUpvote('downvote')}
                    disabled={upvoteLoading}
                    className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      userVote === 'downvote' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    <FaThumbsDown className="w-4 h-4" />
                    <span>Downvote</span>
                  </button>
                </div>
              </div>

              {/* Tags
              <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                  <FaLightbulb className="w-5 h-5 text-purple-400" />
                  <span>Tags</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Bug Report */}
              <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-4">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center space-x-2">
                  <FaBug className="w-5 h-5 text-red-400" />
                  <span>Have Suggestions?</span>
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Help improve this post by reporting issues or suggesting improvements.
                </p>
                <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;