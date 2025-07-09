'use client'

import { useState, useEffect } from 'react'
import AdminNavbar from '@/app/admincomp/adminnav'
import LeftNav from '@/app/admincomp/leftNav'
import { ArrowRight, Tag, Upload, Save, CheckCircle, AlertCircle } from 'lucide-react'

export default function AddTagPage() {
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const form = new FormData()
    form.append('image', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form
      })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json()
      setFormData(prev => ({ ...prev, image: url }))
    } catch (err) {
      console.error(err)
      setMessage('Image upload failed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/AddTag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed to create tag')
      setMessage('Tag created successfully!')
      setFormData({ name: '', image: '' })
    } catch (err) {
      setMessage('Error creating tag')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 '>
      <LeftNav />
      <div className='flex-1 relative overflow-hidden'>
        {/* Animated Background Grid */}
        
        <AdminNavbar/>
        <div className={`w-full pt-[80px] lg:ml-50 lg:pt-[80px] relative z-10 min-h-screen transition-all duration-300 ${
          isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[20vw]'
        }`}>
          
          {/* Header Section */}
          <div className='flex flex-col lg:flex-row gap-6 mb-8 px-4 lg:px-6'>
            <div className="h-[20vh] w-full lg:w-[50vw] bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 rounded-2xl flex flex-row items-start overflow-hidden justify-between p-4 lg:p-8 animated-border border-2 border-gray-800-400/50">
              <div className='flex flex-col'>
                <h1 className="text-gray-800 text-lg sm:text-xl lg:text-[2vw] font-orbitron font-bold">Add New Tag</h1>
                <p className="text-gray-800-100 text-sm sm:text-base lg:text-[1vw] mt-[1vh] font-share-tech-mono">Create a new tag for courses</p>
                <button className="bg-white/10 backdrop-blur-sm text-gray-800 px-4 lg:px-6 py-2 lg:py-[0.7vh] my-[2vh] w-full sm:w-auto lg:w-[12.2vw] flex flex-row rounded-lg font-orbitron hover:bg-white/20 transition-all duration-300 border border-white/20 glow-on-focus">
                  View All Tags <ArrowRight size={20} className='ml-2 lg:ml-[1vw] mt-[0.2vh]' />
                </button>
              </div>
              <div className='hidden lg:block h-50 w-50 -mt-[11vh] mr-[-4vw] rounded-full bg-gradient-to-br from-gray-800-400 to-blue-500'></div>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="px-4 lg:px-6 mt-20 lg:ml-20 backdrop-blur-300 ">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 lg:p-8 border border-gray-800-400/20 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Tag className="text-gray-800-400" size={28} />
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 font-orbitron">Create New Tag</h1>
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="name" className="flex items-center gap-2 text-gray-800-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                    <Tag size={20} />
                    Tag Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white/5 border border-gray-800-400/30 rounded-lg text-gray-800-100 font-share-tech-mono placeholder-gray-800-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    placeholder="Enter tag name"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="image" className="flex items-center gap-2 text-gray-800-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                    <Upload size={20} />
                    Tag Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 bg-white/5 border border-gray-800-400/30 rounded-lg text-gray-800-100 font-share-tech-mono file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-orbitron file:bg-gray-800-500/20 file:text-gray-800-300 hover:file:bg-gray-800-500/30 transition-all duration-300 glow-on-focus"
                  />
                  {formData.image && (
                    <div className="mt-3 p-3 bg-white/5 rounded-lg border border-gray-800-400/20">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-gray-800-500 to-blue-600 text-gray-800 font-orbitron font-bold rounded-xl hover:from-gray-800-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-800-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Create Tag
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
