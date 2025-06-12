// File: app/HomePageEditor/page.js
'use client';

import { useState, useEffect } from 'react';
import AdminNavbar from '../../admincomp/adminnav';
import LeftNav from '../../admincomp/leftNav';
import { ArrowRight } from 'lucide-react';


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
    }
  }

  if (loading) return <p>Loading...</p>;

  // Render form including file inputs for images
  return (
    <div className='flex'>
      <LeftNav />
      <div className='flex-1'>
        <AdminNavbar/>
        <div className="pl-[25vw] w-[100vw] pt-[10vh]">

    <div className='flex flex-row'>
        <div className="h-[20vh] w-[50vw] bg-[rgba(65,175,255,1)] rounded-lg flex flex-row items-start overflow-hidden justify-between p-8">
            <div className='flex flex-col'>
              <h1 className="text-white text-[2vw] font-sans">Welcome Back, Admin ! </h1>
              <p className="text-white text-[1vw] mt-[1vh] font-sans">Pratical HR solution positive Results</p>
              <button className="bg-white text-black px-6 py-[0.7vh] my-[2vh] w-[12.2vw] flex flex-row rounded-lg font-sans hover:bg-gray-100 transition-colors">
              Explore Now <ArrowRight size={20} className='ml-[1vw] mt-[0.2vh]' />
              </button>
              
            </div>

            <div className='h-50 w-50 -mt-[11vh] mr-[-4vw] rounded-full bg-[rgba(39,160,248,1)]'/>
          </div>
          <div className="w-[20vw] h-[20vh] ml-[2vw]">
            <h2 className="text-zinc-600 text-[1.5vw] text-center font-bold font-sans mb-[2vh]">Students Report</h2>
            <div className=" ml-[1vw] flex flex-row gap-[2vw]">
              <div className="w-[8vw] h-[12vh] bg-white rounded-lg flex flex-col items-center border-2 border-zinc-200 justify-center">
                <span className="text-[rgba(65,175,255,1)] text-[2vw] font-sans font-bold">150</span>
                <span className="text-black text-[0.8vw] font-sans mt-[1vh]">Enquired Student</span>
              </div>
              <div className="w-[8vw] h-[12vh] bg-white rounded-lg flex flex-col items-center border-2 border-zinc-200 justify-center">
                <span className="text-[rgba(65,175,255,1)] text-[2vw] font-sans font-bold">75</span>
                <span className="text-black text-[0.8vw] font-sans mt-[1vh]">Onboarded Student</span>
              </div>
            </div>
          </div>

          </div>
          <h1 className="text-2xl font-bold my-4">Edit HomePage Data</h1>
          {message && <p className="mb-4">{message}</p>}
          <form onSubmit={handleSubmit} className="grid gap-4">
            {Object.keys(formData).map(key => {
              const isImageField = ['heroImageUrl', 'AboutUsImageUrl', 'LogoUrl'].includes(key);
              const isTextarea = ['AboutUsContent', 'Personalized'].includes(key);
              const inputType = key === 'Phone' ? 'int' : 'text';

              return (
                <div key={key} className="space-y-2">
                  <label htmlFor={key} className="block font-bold">{key}</label>
                  {isImageField ? (
                    <>
                      <input
                        id={key}
                        name={key}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                      />
                      {formData[key] && <img src={formData[key]} alt={key} className="mt-2" />}
                    </>
                  ) : isTextarea ? (
                    <textarea
                      id={key}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      rows={4}
                      className="w-[60vw] border rounded"
                    />
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type={inputType}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-[60vw] p-2 border rounded"
                    />
                  )}
                </div>
              );
            })}
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-3 px-6 rounded font-bold hover:bg-blue-700 transition-colors"
            >
              Save HomePage
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
