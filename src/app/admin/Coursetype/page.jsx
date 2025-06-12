'use client'

import { useState } from 'react'
import AdminNavbar from '@/app/admincomp/adminnav'
import LeftNav from '@/app/admincomp/leftNav'
import { ArrowRight } from 'lucide-react'

export default function AddTagPage() {
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

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
      const res = await fetch('/api/AddCourseType', {
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
    <div className='flex'>
      <LeftNav />
      <div className='flex-1'>
        <AdminNavbar/>
        <div className="pl-[25vw] w-[100vw] pt-[10vh]">
          <div className='flex flex-row'>
            <div className="h-[20vh] w-[50vw] bg-[rgba(65,175,255,1)] rounded-lg flex flex-row items-start overflow-hidden justify-between p-8">
              <div className='flex flex-col'>
                <h1 className="text-white text-[2vw] font-sans">Add New Course Type</h1>
                <p className="text-white text-[1vw] mt-[1vh] font-sans">Create a new type of Learning ✨</p>
                <button className="bg-white text-black px-6 py-[0.7vh] my-[2vh] w-[12.2vw] flex flex-row rounded-lg font-sans hover:bg-gray-100 transition-colors">
                  View All Tags <ArrowRight size={20} className='ml-[1vw] mt-[0.2vh]' />
                </button>
              </div>
              <div className='h-50 w-50 -mt-[11vh] mr-[-4vw] rounded-full bg-[rgba(39,160,248,1)]'/>
            </div>
          </div>

          <div className="mt-8 max-w-2xl">
            {message && (
              <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  We Will Teach ...
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter tag name"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Tag Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.imageUrl && (
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="mt-2 h-32 w-32 object-cover rounded"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Tag'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
