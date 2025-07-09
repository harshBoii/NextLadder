'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/app/admincomp/adminnav'
import LeftNav from '@/app/admincomp/leftNav'
import { 
  FaSave, 
  FaEye, 
  FaTimes, 
  FaPlus,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaImage,
  FaUpload
} from 'react-icons/fa';

const AddBlogPage = () => {
  const router = useRouter();
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);
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
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Set default authorId for admin
      ...(name === 'authorType' && value === 'admin' ? { authorId: 'admin' } : {})
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

    // For admin-authored blogs, we don't need a specific authorId
    if (formData.authorType !== 'admin' && !formData.authorId) {
      alert('Please select an author');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const blog = await response.json();
        alert('Blog created successfully!');
        router.push(`/admin/blogs`);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog');
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-white text-black">
      <AdminNavbar />
      <LeftNav />
      
      <div className="lg:ml-[20vw] pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className=" mt-20 text-5xl font-bold text-zinc-800 mb-2">Add New Blog</h1>
            <p className="text-zinc-9000">Create engaging content for your audience</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-zinc-9000 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-zinc-100 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-black"
                placeholder="Enter blog title..."
                required
              />
            </div>

            {/* Blog Picture */}
            <div>
              <label className="block text-sm font-medium text-zinc-9000 mb-2">
                Blog Picture
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 px-4 py-2 bg-white-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-cyan-100 transition-colors">
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
                      className="px-3 py-2 bg-red-600 hover:bg-cyan-100 rounded-lg text-sm transition-colors"
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

            {/* Author Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-9000 mb-2">
                  Author Type *
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="authorType"
                      value="admin"
                      checked={formData.authorType === 'admin'}
                      onChange={handleInputChange}
                      className="text-cyan-500"
                    />
                    <FaUserShield className="w-4 h-4 text-cyan-400" />
                    <span>Admin</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="authorType"
                      value="student"
                      checked={formData.authorType === 'student'}
                      onChange={handleInputChange}
                      className="text-cyan-500"
                    />
                    <FaUserGraduate className="w-4 h-4 text-cyan-400" />
                    <span>Student</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="authorType"
                      value="professor"
                      checked={formData.authorType === 'professor'}
                      onChange={handleInputChange}
                      className="text-cyan-500"
                    />
                    <FaChalkboardTeacher className="w-4 h-4 text-cyan-400" />
                    <span>Professor</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-9000 mb-2">
                  Author *
                </label>
                {formData.authorType === 'admin' ? (
                  <div className="w-full px-4 py-3 bg-zinc-100 border border-gray-600 rounded-lg text-zinc-9000">
                    Admin (Default)
                  </div>
                ) : (
                  <select
                    name="authorId"
                    value={formData.authorId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-zinc-900"
                  >
                    <option value="">Select an author...</option>
                    {formData.authorType === 'student' 
                      ? students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.name} ({student.email})
                          </option>
                        ))
                      : professors.map(professor => (
                          <option key={professor.id} value={professor.id}>
                            {professor.name} ({professor.email})
                          </option>
                        ))
                    }
                  </select>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-zinc-9000">
                  Blog Content *
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center space-x-2 px-3 py-1 bg-white-700 hover:bg-cyan-100 rounded text-sm transition-colors"
                  >
                    <FaEye className="w-4 h-4" />
                    <span>{previewMode ? 'Edit' : 'Preview'}</span>
                  </button>
                </div>
              </div>

              {previewMode ? (
                <div className="w-full min-h-[400px] p-4 bg-white-800 border border-gray-600 rounded-lg overflow-y-auto">
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
                    className="w-full min-h-[400px] px-4 py-3 bg-white-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-zinc-900 resize-y"
                    placeholder="Write your blog content here... You can use markdown-style formatting:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
- List item
1. Numbered item"
                    required
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-zinc-9000">
                    {formData.content.length} characters
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-cyan-600 text-zinc-900 rounded-lg font-medium transition-colors"
              >
                <FaSave className="w-4 h-4" />
                <span>{loading ? 'Creating...' : 'Create Blog'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/admin/blogs')}
                className="flex items-center space-x-2 px-6 py-3 bg-white-700 hover:bg-cyan-100 rounded-lg font-medium transition-colors"
              >
                <FaTimes className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>

          {/* Preview Info */}
          {formData.authorId && (
            <div className="mt-8 p-4 bg-white-800 rounded-lg">
              <h3 className="text-lg font-medium text-cyan-300 mb-2">Blog Preview Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-zinc-9000">Title:</span>
                  <span className="ml-2 text-zinc-900">{formData.title || 'Not set'}</span>
                </div>
                <div>
                  <span className="text-zinc-9000">Author:</span>
                  <span className="ml-2 text-zinc-900">{getAuthorName()}</span>
                </div>
                <div>
                  <span className="text-zinc-9000">Author Type:</span>
                  <span className="ml-2 text-zinc-900 capitalize">{formData.authorType}</span>
                </div>
                <div>
                  <span className="text-zinc-9000">Content Length:</span>
                  <span className="ml-2 text-zinc-900">{formData.content.length} characters</span>
                </div>
                <div>
                  <span className="text-zinc-9000">Picture:</span>
                  <span className="ml-2 text-zinc-900">{imagePreview ? 'Uploaded' : 'Not set'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBlogPage; 