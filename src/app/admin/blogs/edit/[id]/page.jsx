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
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#41afff] mb-2">Edit Blog</h1>
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              disabled={deleting}
            >
              <FaTrash className="w-4 h-4" />
              <span>{deleting ? 'Deleting...' : 'Delete Blog'}</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 border border-[#41afff]" style={{ background: 'rgba(65,175,255,0.08)' }}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-lg font-bold text-[#41afff] mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-[#41afff] focus:ring-2 focus:ring-[#41afff] text-black bg-white placeholder-[#41afff]"
                placeholder="Enter blog title"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="content" className="block text-lg font-bold text-[#41afff] mb-2">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleContentChange}
                className="w-full px-4 py-3 rounded-lg border border-[#41afff] focus:ring-2 focus:ring-[#41afff] text-black bg-white placeholder-[#41afff]"
                placeholder="Enter blog content"
                rows={8}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-bold text-[#41afff] mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="w-full px-4 py-2 rounded-lg border border-[#41afff] focus:ring-2 focus:ring-[#41afff] text-black bg-white"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="w-48 h-32 object-cover rounded-lg border border-[#41afff]" />
                </div>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-lg font-bold text-[#41afff] mb-2">Author</label>
              <select
                name="authorType"
                value={formData.authorType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-[#41afff] focus:ring-2 focus:ring-[#41afff] text-black bg-white"
              >
                <option value="admin">Admin</option>
                <option value="student">Student</option>
                <option value="professor">Professor</option>
              </select>
              {formData.authorType !== 'admin' && (
                <select
                  name="authorId"
                  value={formData.authorId}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-4 py-3 rounded-lg border border-[#41afff] focus:ring-2 focus:ring-[#41afff] text-black bg-white"
                >
                  <option value="">Select {formData.authorType}</option>
                  {(formData.authorType === 'student' ? students : professors).map((author) => (
                    <option key={author.id} value={author.id}>{author.name}</option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#41afff] hover:bg-[rgba(65,175,255,0.8)] text-white rounded-lg font-medium transition-colors mr-4"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/blogs')}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-black rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPage; 