'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/app/admincomp/adminnav'
import LeftNav from '@/app/admincomp/leftNav';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaCalendar,
  FaClock,
  FaHeart
} from 'react-icons/fa';

const BlogsPage = () => {
  const router = useRouter();
  const [icon, setIcon] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

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

  const handleDelete = async (blogId) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    setDeleteLoading(blogId);
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== blogId));
        alert('Blog deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    } finally {
      setDeleteLoading(null);
    }
  };

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

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#41afff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <AdminNavbar />
      <LeftNav />
      
      <div className="lg:ml-[20vw] pt-20 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div mt-10>
              <h1 className="text-5xl font-bold text-black mb-2">Blog Management</h1>
              <p className="text-[#41afff]">Manage your blog posts and content</p>
            </div>
            <button
              onClick={() => router.push('/admin/blogs/add')}
              className="flex items-center space-x-2 px-6 py-3 bg-[#41afff] hover:bg-[rgba(65,175,255,0.8)] text-white rounded-lg font-medium transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              <span>Add New Blog</span>
            </button>
          </div>

          {/* Blog List */}
          <div className="grid gap-6">
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-[#41afff] text-lg mb-4">No blogs found</div>
                <button
                  onClick={() => router.push('/admin/blogs/add')}
                  className="px-6 py-3 bg-[#41afff] hover:bg-[rgba(65,175,255,0.8)] text-white rounded-lg font-medium transition-colors"
                >
                  Create Your First Blog
                </button>
              </div>
            ) : (
              blogs.map((blog) => {
                const authorInfo = getAuthorInfo(blog);
                return (
                  <div key={blog.id} className="rounded-lg p-6 border border-[#41afff]" style={{ background: 'rgba(65,175,255,0.08)' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {authorInfo.icon}
                          <span className="text-sm text-[#41afff]">{authorInfo.type}</span>
                          <span className="text-[#41afff]">•</span>
                          <span className="text-sm text-[#41afff]">{authorInfo.name}</span>
                        </div>
                        
                        <div className="flex space-x-4">
                          {blog.picture && (
                            <div className="flex-shrink-0">
                              <img 
                                src={blog.picture} 
                                alt={blog.title}
                                className="w-24 h-24 object-cover rounded-lg border border-[#41afff]"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-black mb-2">{blog.title}</h3>
                            
                            <p className="text-black mb-4">
                              {truncateText(blog.content.replace(/<[^>]*>/g, ''), 150)}
                            </p>
                            
                            <div className="flex items-center space-x-4 text-sm text-[#41afff]">
                              <div className="flex items-center space-x-1">
                                <FaCalendar className="w-4 h-4" />
                                <span>{formatDate(blog.createdAt)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaClock className="w-4 h-4" />
                                <span>Updated: {formatDate(blog.updatedAt)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaEye className="w-4 h-4" />
                                <span>{blog.visitNumbers} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <FaHeart className="w-4 h-4" />
                                <span>{blog.upvote} likes</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => router.push(`/blog/${blog.id}`)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                          title="View Blog"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                          className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                          title="Edit Blog"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={deleteLoading === blog.id}
                          className="p-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg transition-colors"
                          title="Delete Blog"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[rgba(47, 168, 255, 0.67)] rounded-lg p-6 border border-gray-700">
              <div className="text-2xl font-bold text-cyan-800">{blogs.length}</div>
              <div className="text-gray-900">Total Blogs</div>
            </div>
            <div className="bg-[rgba(44, 130, 191, 0.67)] rounded-lg p-6 border border-gray-700">
              <div className="text-2xl font-bold text-green-800">
                {blogs.filter(blog => blog.student).length}
              </div>
              <div className="text-gray-900">Student Blogs</div>
            </div>
            <div className="bg-[rgba(44, 130, 191, 0.67)] rounded-lg p-6 border border-gray-700">
              <div className="text-2xl font-bold text-purple-800">
                {blogs.filter(blog => blog.professor).length}
              </div>
              <div className="text-gray-900">Professor Blogs</div>
            </div>
            <div className="bg-[rgba(44, 130, 191, 0.67)] rounded-lg p-6 border border-gray-700">
              <div className="text-2xl font-bold text-yellow-800">
                {blogs.reduce((total, blog) => total + blog.visitNumbers, 0).toLocaleString()}
              </div>
              <div className="text-gray-900">Total Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage; 