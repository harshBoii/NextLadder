'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="max-h-40 overflow-y-auto p-2 border rounded">
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((category) => (
                <label key={category} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={formData.category === category}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Tags Selection with Search */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Course Tags</label>
          <input
            type="text"
            placeholder="Search tags..."
            value={tagSearch}
            onChange={(e) => setTagSearch(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="max-h-40 overflow-y-auto p-2 border rounded">
            <div className="grid grid-cols-2 gap-2">
              {filteredTags.map((tag) => (
                <label key={tag.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={formData.selectedTags.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{tag.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Course Type Selection with Search */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Course Type</label>
          <input
            type="text"
            placeholder="Search course types..."
            value={courseTypeSearch}
            onChange={(e) => setCourseTypeSearch(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="max-h-40 overflow-y-auto p-2 border rounded">
            <div className="grid grid-cols-2 gap-2">
              {filteredCourseTypes.map((courseType) => (
                <label key={courseType.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    checked={formData.selectedCourseTypes.includes(courseType.id)}
                    onChange={() => handleCourseTypeChange(courseType.id)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{courseType.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="professorId"
          placeholder="Professor ID"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="professorName"
          placeholder="Professor Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="noOfStudents"
          placeholder="No. of Students"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="hours"
          placeholder="Hours"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="placementRate"
          placeholder="Placement Rate (%)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="companiesHiring"
          placeholder="Number of Companies Hiring"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="averageHike"
          placeholder="Average Hike (%)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="learner"
          placeholder="Number of Learners"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="highlightedOn"
          placeholder="Highlighted On"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="ExpertFrom"
          placeholder="Expert From"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="projects"
          placeholder="Projects"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input 
          type="hidden" 
          name="secretMuse" 
          value="Her<3" 
          data-note="Every keystroke was for you ,Miss." 
        />


        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating' : 'Create Course'}
        </button>
      </form>
    </div>
  )
}