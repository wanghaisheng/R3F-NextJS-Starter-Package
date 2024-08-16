'use client'

import { useState, useEffect, useRef } from 'react'
import soundData from '../../public/soundboard/soundData.json'

const SoundBoard = () => {
  // State variables
  const [sounds, setSounds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSearchTerm, setActiveSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const audioRef = useRef(null)

  // Effect to process sound data when component mounts
  useEffect(() => {
    // Process sound data to handle multiple categories
    const processedSounds = soundData.map((sound) => ({
      ...sound,
      categories: sound.category.split(', '),
    }))
    setSounds(processedSounds)
  }, [])

  // Function to play audio
  const playAudio = async (src) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    const { default: audio } = await import(`../../public/soundboard/${src}`)
    audioRef.current = new Audio(audio)
    audioRef.current.play()
  }

  // Function to handle search
  const handleSearch = () => {
    setActiveSearchTerm(searchTerm)
  }

  // Function to handle 'Enter' key press in search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  // Filter sounds based on search term and selected category
  const filteredSounds = sounds.filter(
    (sound) =>
      sound.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || sound.categories.includes(selectedCategory)),
  )

  // Get unique categories from sounds
  const categories = ['All', ...new Set(sounds.flatMap((sound) => sound.categories))]

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 mt-16 text-center text-4xl font-bold'>SoundBoard</h1>
      {/* Search and filter controls */}
      <div className='mb-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
        {/* Search input */}
        <div className='relative w-full sm:w-auto'>
          <input
            type='text'
            placeholder='Search sounds...'
            className='w-full rounded-full border border-gray-300 p-2 pl-10 pr-4 text-black focus:outline-none focus:ring-2 focus:ring-purple-600 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* Search icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
        {/* Search button */}
        <button
          onClick={handleSearch}
          className='w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 font-semibold text-white shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-600/50 sm:w-auto'
        >
          Search
        </button>
        {/* Category select */}
        <select
          className='w-full rounded-full border border-gray-300 p-2 text-black focus:outline-none focus:ring-2 focus:ring-purple-600 sm:w-auto'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Grid of sound buttons */}
      <div className='grid grid-cols-2 gap-y-10 md:grid-cols-4 lg:grid-cols-6'>
        {filteredSounds.map((sound) => (
          <div key={sound.id} className='flex flex-col items-center'>
            <button
              onClick={() => playAudio(sound.src)}
              className='size-20 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600/50'
              aria-label={`Play ${sound.name}`}
            >
              Play
            </button>
            <span className='mt-2 text-center'>{sound.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SoundBoard
