// File: app/HomePageEditor/page.js
'use client';

import { useState, useEffect } from 'react';
import AdminNavbar from '../../admincomp/adminnav';
import LeftNav from '../../admincomp/leftNav';
import { 
  ArrowRight, 
  Save, 
  Upload, 
  Settings, 
  FileText, 
  Image, 
  Phone, 
  Mail, 
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function HomePageEditor() {
  // State for the homepage data including image URLs
  const [formData, setFormData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: '',
    CategoriesTitle: '',
    TopCoursesTitle: '',
    WhyChooseUs: '',
    AboutUsTitle: '',
    AboutUsContent: '',
    AboutUsImageUrl: '',
    Personalized: '',
    ReviewsTitle: '',
    PopularPost: '',
    LogoUrl: '',
    ContactUsPrompt: '',
    Phone: '',
    Email: '',
    Location: '',
    FirstCourseId: '',
    SecondCourseId: '',
    ThirdCourseId: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Listen for navigation collapse state changes
  useEffect(() => {
    const handleNavToggle = (event) => {
      if (event.detail && typeof event.detail.isCollapsed === 'boolean') {
        setIsNavCollapsed(event.detail.isCollapsed);
      }
    };

    window.addEventListener('navToggle', handleNavToggle);
    return () => window.removeEventListener('navToggle', handleNavToggle);
  }, []);

  // Fetch existing data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/HomePage');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setFormData({
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          heroImageUrl: data.heroImageUrl || '',
          CategoriesTitle: data.CategoriesTitle || '',
          TopCoursesTitle: data.TopCoursesTitle || '',
          WhyChooseUs: data.WhyChooseUs || '',
          AboutUsTitle: data.AboutUsTitle || '',
          AboutUsContent: data.AboutUsContent || '',
          AboutUsImageUrl: data.AboutUsImageUrl || '',
          Personalized: data.Personalized || '',
          ReviewsTitle: data.ReviewsTitle || '',
          PopularPost: data.PopularPost || '',
          LogoUrl: data.LogoUrl || '',
          ContactUsPrompt: data.ContactUsPrompt || '',
          Phone: data.Phone ? data.Phone.toString() : '',
          Email: data.Email || '',
          Location: data.Location || '',
          FirstCourseId: data.no1card || '',
          SecondCourseId: data.no2card || '',
          ThirdCourseId: data.no3card || '',
        });
      } catch (error) {
        setMessage('Error loading homepage data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle changes for text, number, and file inputs
  async function handleChange(e) {
    const { name, value, files } = e.target;

    // File upload case
    if (files && files[0]) {
      const file = files[0];
      const form = new FormData();
      form.append('image', file);

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: form });
        if (!res.ok) throw new Error('Upload failed');
        const { url } = await res.json();
        setFormData(prev => ({ ...prev, [name]: url }));
      } catch (err) {
        console.error(err);
        setMessage('Image upload failed');
      }
      return;
    }

    // Text/number fields
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Submit updated data
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);
    const payload = { ...formData, Phone: formData.Phone ? Number(formData.Phone) : null };

    try {
      const res = await fetch('/api/HomePage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      setMessage('Homepage data saved successfully!');
    } catch {
      setMessage('Error saving homepage data');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Get icon for field type
  const getFieldIcon = (key) => {
    const iconMap = {
      heroTitle: <FileText size={20} />,
      heroSubtitle: <FileText size={20} />,
      heroImageUrl: <Image size={20} />,
      AboutUsImageUrl: <Image size={20} />,
      LogoUrl: <Image size={20} />,
      Phone: <Phone size={20} />,
      Email: <Mail size={20} />,
      Location: <MapPin size={20} />,
      FirstCourseId: <TrendingUp size={20} />,
      SecondCourseId: <TrendingUp size={20} />,
      ThirdCourseId: <TrendingUp size={20} />,
    };
    return iconMap[key] || <Settings size={20} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Google Fonts CDN */}
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      
      <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'>
        <LeftNav />
        <div className='flex-1 relative overflow-hidden'>
          {/* Animated Background Grid */}
          <div className="absolute inset-0 particle-bg opacity-10"></div>
          
          <AdminNavbar />
          <div className={`w-full pt-[80px] lg:pt-[80px] relative z-10  min-h-screen transition-all duration-300 ${
            isNavCollapsed ? 'lg:pl-[80px] w-90' : 'lg:pl-[20vw] w-100'
          }`}>

            {/* Header Section */}
            <div className='flex flex-col lg:flex-row gap-6 mb-8 px-4 lg:px-6'>
              <div className="h-[20vh] w-full lg:w-[50vw] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex flex-row items-start overflow-hidden justify-between p-4 lg:p-8 animated-border border-2 border-cyan-400/50">
                <div className='flex flex-col'>
                  <h1 className="text-white text-lg sm:text-xl lg:text-[2vw] font-orbitron font-bold">Welcome Back, Admin!</h1>
                  <p className="text-cyan-100 text-sm sm:text-base lg:text-[1vw] mt-[1vh] font-share-tech-mono">Practical HR solution positive Results</p>
                  <button className="bg-white/10 backdrop-blur-sm text-white px-4 lg:px-6 py-2 lg:py-[0.7vh] my-[2vh] w-full sm:w-auto lg:w-[12.2vw] flex flex-row rounded-lg font-orbitron hover:bg-white/20 transition-all duration-300 border border-white/20 glow-on-focus">
                    Explore Now <ArrowRight size={20} className='ml-2 lg:ml-[1vw] mt-[0.2vh]' />
                  </button>
                </div>
                <div className='hidden lg:block h-50 w-50 -mt-[11vh] mr-[-4vw] rounded-full bg-gradient-to-br from-cyan-400 to-blue-500'></div>
              </div>
              
              <div className="w-full lg:w-[20vw] h-[20vh]">
                <h2 className="text-cyan-100 text-lg sm:text-xl lg:text-[1.5vw] text-center font-bold font-orbitron mb-[2vh]">Students Report</h2>
                <div className="flex flex-row gap-4 lg:gap-[2vw] justify-center">
                  <div className="w-full sm:w-[8vw] h-[12vh] bg-white/10 backdrop-blur-sm rounded-xl flex flex-col items-center border-2 border-cyan-400/30 justify-center">
                    <span className="text-cyan-400 text-lg sm:text-xl lg:text-[2vw] font-orbitron font-bold">150</span>
                    <span className="text-cyan-100 text-xs sm:text-sm lg:text-[0.8vw] font-share-tech-mono mt-[1vh] text-center">Enquired Student</span>
                  </div>
                  <div className="w-full sm:w-[8vw] h-[12vh] bg-white/10 backdrop-blur-sm rounded-xl flex flex-col items-center border-2 border-cyan-400/30 justify-center">
                    <span className="text-cyan-400 text-lg sm:text-xl lg:text-[2vw] font-orbitron font-bold">75</span>
                    <span className="text-cyan-100 text-xs sm:text-sm lg:text-[0.8vw] font-share-tech-mono mt-[1vh] text-center">Onboarded Student</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Form Section */}
            <div className="px-4 lg:px-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 lg:p-8 border border-cyan-400/20">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="text-cyan-400" size={28} />
                  <h1 className="text-2xl lg:text-3xl font-bold text-white font-orbitron">Edit HomePage Data</h1>
                </div>
                
                {message && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                    message.includes('successfully') 
                      ? 'bg-green-500/20 border border-green-400/50 text-green-300' 
                      : 'bg-red-500/20 border border-red-400/50 text-red-300'
                  }`}>
                    {message.includes('successfully') ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span className="font-share-tech-mono text-sm lg:text-base">{message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    {Object.keys(formData).map(key => {
                      const isImageField = ['heroImageUrl', 'AboutUsImageUrl', 'LogoUrl'].includes(key);
                      const isTextarea = ['AboutUsContent', 'Personalized'].includes(key);
                      const inputType = key === 'Phone' ? 'tel' : 'text';

                      return (
                        <div key={key} className="space-y-3 group">
                          <label htmlFor={key} className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                            {getFieldIcon(key)}
                            <span className="text-xs lg:text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          </label>
                          
                          {isImageField ? (
                            <div className="relative">
                              <input
                                id={key}
                                name={key}
                                type="file"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-orbitron file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 transition-all duration-300 glow-on-focus"
                              />
                              {formData[key] && (
                                <div className="mt-3 p-3 bg-white/5 rounded-lg border border-cyan-400/20">
                                  <img src={formData[key]} alt={key} className="w-full h-32 object-cover rounded-lg" />
                                </div>
                              )}
                            </div>
                          ) : isTextarea ? (
                            <textarea
                              id={key}
                              name={key}
                              value={formData[key]}
                              onChange={handleChange}
                              rows={4}
                              className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 resize-none transition-all duration-300 glow-on-focus focus:bg-white/10"
                              placeholder={`Enter ${key.toLowerCase()}...`}
                            />
                          ) : (
                            <input
                              id={key}
                              name={key}
                              type={inputType}
                              value={formData[key]}
                              onChange={handleChange}
                              className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                              placeholder={`Enter ${key.toLowerCase()}...`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-center pt-6">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
                    >
                      <span className="relative z-10 flex items-center gap-2 justify-center">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={20} />
                            Save HomePage
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
