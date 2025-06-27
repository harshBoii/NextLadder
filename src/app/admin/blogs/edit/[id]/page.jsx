'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminNavbar from '@/app/admincomp/adminnav'
import LeftNav from '@/app/admincomp/leftNav';
import { 
  FaSave, 
  FaEye, 
  FaTimes, 
  FaTrash,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaImage,
  FaUpload
} from 'react-icons/fa';

const EditBlogPage = () => {
  const router = useRouter();
  const params = useParams();
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    picture: '',
    authorId: '',
    authorType: 'admin'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch logo
        const homeResponse = await fetch('/api/HomePage');
        if (homeResponse.ok) {
          const homeData = await homeResponse.json();
          setIcon(homeData.LogoUrl);
        }

        // Fetch blog data
        const blogResponse = await fetch(`/api/blogs/${params.id}`);
        if (blogResponse.ok) {
          const blogData = await blogResponse.json();
          setFormData({
            title: blogData.title,
            content: blogData.content,
            picture: blogData.picture || '',
            authorId: blogData.studentId || blogData.professorId || '',
            authorType: blogData.studentId ? 'student' : blogData.professorId ? 'professor' : 'admin'
          });
          if (blogData.picture) {
            setImagePreview(blogData.picture);
          }
        }

        // Fetch students and professors for author selection
        const studentsResponse = await fetch('/api/students');
        if (studentsResponse.ok) {
          const studentsData = await studentsResponse.json();
          setStudents(studentsData);
        }

        const professorsResponse = await fetch('/api/professors');
        if (professorsResponse.ok) {
          const professorsData = await professorsResponse.json();
          setProfessors(professorsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (e) => {
    setFormData(prev => ({
      ...prev,
      content: e.target.value
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          picture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          picture: formData.picture
        }),
      });

      if (response.ok) {
        alert('Blog updated successfully!');
        router.push('/admin/blogs');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/blogs/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog deleted successfully!');
        router.push('/admin/blogs');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    } finally {
      setDeleting(false);
    }
  };

  const getAuthorName = () => {
    if (!formData.authorId) return '';
    
    if (formData.authorType === 'student') {
      const student = students.find(s => s.id === parseInt(formData.authorId));
      return student ? student.name : '';
    } else if (formData.authorType === 'professor') {
      const professor = professors.find(p => p.id === parseInt(formData.authorId));
      return professor ? professor.name : '';
    } else if (formData.authorType === 'admin') {
      return 'Admin';
    }
    return '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminNavbar />
      <LeftNav />
      
      <div className="lg:ml-[20vw] pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">Edit Blog</h1>
            <p className="text-gray-400">Update your blog content and settings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
                placeholder="Enter blog title..."
                required
              />
            </div>

            {/* Blog Picture */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Blog Picture
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <FaUpload className="w-4 h-4 text-cyan-400" />
                    <span>Choose Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePictureChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, picture: '' }));
                      }}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                {imagePreview && (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full max-w-md h-48 object-cover rounded-lg border border-cyan-500/30"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                      <FaImage className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Author Selection (Read-only for editing) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Author Type
                </label>
                <div className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300">
                  {formData.authorType === 'admin' && <FaUserShield className="w-4 h-4 inline mr-2" />}
                  {formData.authorType === 'student' && <FaUserGraduate className="w-4 h-4 inline mr-2" />}
                  {formData.authorType === 'professor' && <FaChalkboardTeacher className="w-4 h-4 inline mr-2" />}
                  {formData.authorType.charAt(0).toUpperCase() + formData.authorType.slice(1)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Author
                </label>
                <div className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-300">
                  {getAuthorName()}
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Blog Content *
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                  >
                    <FaEye className="w-4 h-4" />
                    <span>{previewMode ? 'Edit' : 'Preview'}</span>
                  </button>
                </div>
              </div>

              {previewMode ? (
                <div className="w-full min-h-[400px] p-4 bg-gray-800 border border-gray-600 rounded-lg overflow-y-auto">
                  {imagePreview && (
                    <div className="mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Blog preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formData.content 
                        .replace(/\n/g, '<br/>')
                        .replace(/#{1,6}\s+(.+)/g, '<h1>$1</h1>')
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em>$1</em>')
                    }} 
                  />
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleContentChange}
                    className="w-full min-h-[400px] px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white resize-y"
                    placeholder="Write your blog content here..."
                    required
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    {formData.content.length} characters
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
              
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                <FaTrash className="w-4 h-4" />
                <span>{deleting ? 'Deleting...' : 'Delete Blog'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/admin/blogs')}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPage; 