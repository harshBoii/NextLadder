'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminNavbar from '@/app/admincomp/adminnav'
import LeftNav from '@/app/admincomp/leftNav'
import { 
  BookOpen, 
  Upload, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Search,
  User,
  Clock,
  TrendingUp,
  Users,
  Star,
  Briefcase,
  FileText,
  Image as ImageIcon
} from 'lucide-react'

const CATEGORIES = [
  "For Professionals",
  "For Non-tech",
  "For Freshers", 
  "Career Transition",
  "Skill Enhancement",
  "Industry Specific",
  "Certification",
  "Bootcamp"
]

export default function NewCoursePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    professorId: '',
    professorName: '',
    noOfStudents: '0',
    hours: '0',
    placementRate: '0',
    companiesHiring: '0',
    averageHike: '0',
    learner: '0',
    highlightedOn: '',
    ExpertFrom: '',
    selectedTags: [],
    projects: '0',
    selectedCourseTypes: [],
    courseType: [],
  })
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [tagSearch, setTagSearch] = useState('')
  const [filteredTags, setFilteredTags] = useState([])
  const [courseTypes, setCourseTypes] = useState([])
  const [courseTypeSearch, setCourseTypeSearch] = useState('')
  const [filteredCourseTypes, setFilteredCourseTypes] = useState([])
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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/AddTag')
        if (!res.ok) throw new Error('Failed to fetch tags')
        const data = await res.json()
        setTags(data)
        setFilteredTags(data)
      } catch (err) {
        console.error('Error fetching tags:', err)
        setError('Failed to load tags')
      }
    }
    fetchTags()
  }, [])

  useEffect(() => {
    const fetchCourseTypes = async () => {
      try {
        const res = await fetch('/api/AddCourseType')
        if (!res.ok) throw new Error('Failed to fetch course types')
        const data = await res.json()
        setCourseTypes(data)
        setFilteredCourseTypes(data)
      } catch (err) {
        console.error('Error fetching course types:', err)
        setError('Failed to load course types')
      }
    }
    fetchCourseTypes()
  }, [])


  // Filter tags based on search input
  useEffect(() => {
    const filtered = tags.filter(tag => 
      tag.name.toLowerCase().includes(tagSearch.toLowerCase())
    )
    setFilteredTags(filtered)
  }, [tagSearch, tags])

  useEffect(() => {
    const filtered = courseTypes.filter(courseType => 
      courseType.name.toLowerCase().includes(courseTypeSearch.toLowerCase())
    )
    setFilteredCourseTypes(filtered)
    }, [courseTypeSearch, courseTypes])
 

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTagChange = (tagId) => {
    setFormData(prev => {
      const selectedTags = prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
      return { ...prev, selectedTags }
    })
  }

  const handleCourseTypeChange = (courseTypeId) => {
    setFormData(prev => {
      const selectedCourseTypes = prev.selectedCourseTypes.includes(courseTypeId)
        ? prev.selectedCourseTypes.filter(id => id !== courseTypeId)
          : [...prev.selectedCourseTypes, courseTypeId]
      return { ...prev, selectedCourseTypes }
    })
  }


  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const data = new FormData()
    data.append('title', formData.title)
    data.append('category', formData.category)
    data.append('description', formData.description)
    data.append('professorId', formData.professorId)
    data.append('professorName', formData.professorName)
    data.append('noOfStudents', formData.noOfStudents)
    data.append('hours', formData.hours)
    data.append('placementRate', formData.placementRate)
    data.append('companiesHiring', formData.companiesHiring)
    data.append('averageHike', formData.averageHike)
    data.append('learner', formData.learner)
    data.append('highlightedOn', formData.highlightedOn)
    data.append('ExpertFrom', formData.ExpertFrom)
    data.append('tags', JSON.stringify(formData.selectedTags))
    data.append('projects', formData.projects)
    data.append('courseType', JSON.stringify(formData.selectedCourseTypes))
    if (imageFile) data.append('image', imageFile)

    try {
      const res = await fetch('/api/course/new', {
        method: 'POST',
        body: data,
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Failed to create course.')
        setLoading(false)
        return
      }
    } catch (err) {
      console.error(err)
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'>
      <LeftNav />
      <div className='flex-1 relative overflow-hidden'>
        {/* Animated Background Grid */}
        <div className="absolute inset-0 particle-bg opacity-10"></div>
        
        <AdminNavbar/>
        <div className={`w-full pt-[80px] lg:pt-[80px] relative z-10 min-h-screen transition-all duration-300 ${
          isNavCollapsed ? 'lg:pl-[80px]' : 'lg:pl-[20vw]'
        }`}>
          
          {/* Header Section */}
          <div className="mb-8 px-4 lg:px-6 lg:ml-53">
            <div className="h-[20vh] w-full lg:w-[50vw] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex flex-row items-start overflow-hidden justify-between p-4 lg:p-8 animated-border border-2 border-cyan-400/50">
              <div className='flex flex-col'>
                <h1 className="text-white text-lg sm:text-xl lg:text-[2vw] font-orbitron font-bold">Add New Course</h1>
                <p className="text-cyan-100 text-sm sm:text-base lg:text-[1vw] mt-[1vh] font-share-tech-mono">Create a new course for learners</p>
              </div>
              <div className='hidden lg:block h-50 w-50 -mt-[11vh] mr-[-4vw] rounded-full bg-gradient-to-br from-cyan-400 to-blue-500'></div>
            </div>
          </div>

          {/* Main Form Section */}
          <div className="px-4 lg:px-6">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 lg:p-8 border border-cyan-400/20 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-cyan-400" size={28} />
                <h1 className="text-2xl lg:text-3xl font-bold text-white font-orbitron">Create New Course</h1>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg flex items-center gap-3 bg-red-500/20 border border-red-400/50 text-red-300">
                  <AlertCircle size={20} />
                  <span className="font-share-tech-mono text-sm lg:text-base">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <FileText size={20} />
                      Course Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter course title"
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <BookOpen size={20} />
                      Category
                    </label>
                    <div className="max-h-40 overflow-y-auto p-3 bg-white/5 border border-cyan-400/30 rounded-lg">
                      <div className="grid grid-cols-1 gap-2">
                        {CATEGORIES.map((category) => (
                          <label key={category} className="flex items-center space-x-2 p-2 hover:bg-cyan-500/10 rounded transition-colors">
                            <input
                              type="radio"
                              name="category"
                              value={category}
                              checked={formData.category === category}
                              onChange={handleChange}
                              className="form-radio h-4 w-4 text-cyan-400 bg-transparent border-cyan-400"
                            />
                            <span className="text-sm text-cyan-100 font-share-tech-mono">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                    <FileText size={20} />
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Enter course description"
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 resize-none transition-all duration-300 glow-on-focus focus:bg-white/10"
                  />
                </div>

                {/* Professor Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <User size={20} />
                      Professor ID
                    </label>
                    <input
                      type="number"
                      name="professorId"
                      placeholder="Enter professor ID"
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <User size={20} />
                      Professor Name
                    </label>
                    <input
                      type="text"
                      name="professorName"
                      placeholder="Enter professor name"
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>
                </div>

                {/* Course Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <Users size={20} />
                      No. of Students
                    </label>
                    <input
                      type="number"
                      name="noOfStudents"
                      placeholder="0"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <Clock size={20} />
                      Hours
                    </label>
                    <input
                      type="number"
                      name="hours"
                      placeholder="0"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <TrendingUp size={20} />
                      Placement Rate (%)
                    </label>
                    <input
                      type="number"
                      name="placementRate"
                      placeholder="0"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>
                </div>

                {/* More Statistics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <Briefcase size={20} />
                      Companies Hiring
                    </label>
                    <input
                      type="number"
                      name="companiesHiring"
                      placeholder="0"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <TrendingUp size={20} />
                      Average Hike (%)
                    </label>
                    <input
                      type="number"
                      name="averageHike"
                      placeholder="0"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <Users size={20} />
                      Number of Learners
                    </label>
                    <input
                      type="number"
                      name="learner"
                      placeholder="0"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <Star size={20} />
                      Highlighted On
                    </label>
                    <input
                      type="text"
                      name="highlightedOn"
                      placeholder="Enter highlight information"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <User size={20} />
                      Expert From
                    </label>
                    <input
                      type="text"
                      name="ExpertFrom"
                      placeholder="Enter expert information"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>
                </div>

                {/* Tags Selection */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                    <Search size={20} />
                    Course Tags
                  </label>
                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10 mb-3"
                  />
                  <div className="max-h-40 overflow-y-auto p-3 bg-white/5 border border-cyan-400/30 rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      {filteredTags.map((tag) => (
                        <label key={tag.id} className="flex items-center space-x-2 p-2 hover:bg-cyan-500/10 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.selectedTags.includes(tag.id)}
                            onChange={() => handleTagChange(tag.id)}
                            className="form-checkbox h-4 w-4 text-cyan-400 bg-transparent border-cyan-400"
                          />
                          <span className="text-sm text-cyan-100 font-share-tech-mono">{tag.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Course Type Selection */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                    <BookOpen size={20} />
                    Course Type
                  </label>
                  <input
                    type="text"
                    placeholder="Search course types..."
                    value={courseTypeSearch}
                    onChange={(e) => setCourseTypeSearch(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10 mb-3"
                  />
                  <div className="max-h-40 overflow-y-auto p-3 bg-white/5 border border-cyan-400/30 rounded-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      {filteredCourseTypes.map((courseType) => (
                        <label key={courseType.id} className="flex items-center space-x-2 p-2 hover:bg-cyan-500/10 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.selectedCourseTypes.includes(courseType.id)}
                            onChange={() => handleCourseTypeChange(courseType.id)}
                            className="form-checkbox h-4 w-4 text-cyan-400 bg-transparent border-cyan-400"
                          />
                          <span className="text-sm text-cyan-100 font-share-tech-mono">{courseType.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* File Upload and Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <ImageIcon size={20} />
                      Course Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-orbitron file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 transition-all duration-300 glow-on-focus"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-cyan-300 font-orbitron font-semibold text-sm uppercase tracking-wider">
                      <Briefcase size={20} />
                      Projects
                    </label>
                    <input
                      type="number"
                      name="projects"
                      placeholder="0"
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-100 font-share-tech-mono placeholder-cyan-300/50 transition-all duration-300 glow-on-focus focus:bg-white/10"
                    />
                  </div>
                </div>

                <input 
                  type="hidden" 
                  name="secretMuse" 
                  value="Her<3" 
                  data-note="Every keystroke was for you ,Miss." 
                />

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
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
                          Create Course
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
  )
}