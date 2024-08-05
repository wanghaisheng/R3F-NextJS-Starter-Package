'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import HomeTabView from './TabViews/HomeTabView'
import ProjectTabView from './TabViews/ProjectTabView'
import { AnimatePresence, motion } from 'framer-motion'
import ExperienceTabView from './TabViews/ExperienceTabView'
import SkillsTabView from './TabViews/SkillsTabView'
import GalleryTabView from './TabViews/GalleryTabView'
import { IoSearchSharp } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx'

export default function MiddleViewComponent({ user, skillsData, guild, experience, publicUserGuild }) {
  const [toggle, setToggle] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  // Check if flipped or not
  const handleIsFlip = (newState) => {
    setIsFlipped(newState)
  }

  const [activeTab, setActiveTab] = useState('home')
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [projPics, setProjPics] = useState([])

  // ----- SEARCH ---

  const [searchClicked, setSearchClicked] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null)

  const handleOpenSearchClick = () => {
    setSearchClicked(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 300)
  }

  const handleCloseSearchClick = (e) => {
    e.stopPropagation()
    setSearchClicked(false)
    setSearchTerm('')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // -----------------

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handletoggle = () => {
    setToggle(!toggle)
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  // Get project pictures
  useEffect(() => {
    const getProjPics = () => {
      if (user?.experienceData) {
        const projPics = user.experienceData
          .filter((exp) => exp.project_pictures && exp.project_pictures.length > 0)
          .flatMap((exp) => exp.project_pictures)
        setProjPics(projPics)
      }
    }
    if (user) {
      getProjPics()
    }
  }, [user])

  return (
    <div
      className={`relative flex size-full select-none flex-col overflow-auto rounded-lg bg-custom-gradient-purple p-4 shadow-xl shadow-black/30 backdrop-blur-md`}
    >
      <div className='relative flex w-full'>
        {/* Profile Picture */}
        {user && (
          <div className='absolute -left-1 -top-2 flex w-full select-none items-center gap-x-2'>
            <div
              className={`relative overflow-hidden rounded-full border-[2px] shadow-lg shadow-black/30
                ${publicUserGuild === 'BUDDHA' ? 'border-white' : publicUserGuild === 'PADMA' ? 'border-red-600' : publicUserGuild === 'KARMA' ? 'border-green-600' : publicUserGuild === 'VAJRA' ? 'border-blue-600' : publicUserGuild === 'RATNA' ? 'border-yellow-600' : 'border-black'}
                `}
              style={{
                borderRadius: '50%',
                height: 54,
                width: 54,
              }}
            >
              <Image
                src={user.user_image ? user.user_image : '/card/defaultbuddha.svg'}
                alt='profile-pic'
                fill
                unoptimized
                className='rounded-full object-cover transition-all duration-500 ease-in-out hover:scale-125'
              />
            </div>
          </div>
        )}
        {/* Profile Picture End */}

        {/* Search */}
        <div
          className={`flex h-[40px] w-full items-center justify-between rounded-full bg-white/50 px-[6px] shadow-md shadow-black/30 ${publicUserGuild === 'BUDDHA' ? 'text-white' : publicUserGuild === 'PADMA' ? 'text-red-600' : publicUserGuild === 'KARMA' ? 'text-green-600' : publicUserGuild === 'VAJRA' ? 'text-blue-600' : publicUserGuild === 'RATNA' ? 'text-yellow-600' : 'text-black'}`}
        >
          <div className='pl-12 text-lg font-bold uppercase'>{user?.username}</div>
          <motion.div
            className={`z-40 flex h-[30px] items-center rounded-full bg-white ${publicUserGuild === 'BUDDHA' && 'text-black'}`}
            initial={{ width: '30px' }}
            animate={{ width: searchClicked ? '300px' : '30px' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={handleOpenSearchClick}
          >
            <AnimatePresence>
              {searchClicked ? (
                <motion.div
                  className='flex w-full items-center justify-between px-[4px]'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    ref={searchInputRef}
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='w-full bg-transparent pl-4 outline-none'
                  />
                  <motion.button
                    className='flex size-[22px] items-center justify-center rounded-full'
                    onClick={handleCloseSearchClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <RxCrossCircled />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  className='flex size-full items-center justify-end pr-[4px]'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoSearchSharp size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {/* Search End */}
      </div>

      {/* Tabs */}
      <div className='mt-3 flex select-none justify-between gap-x-2 text-[14px] font-semibold'>
        <div
          onClick={() => handleTabClick('home')}
          className={`h-[32px] flex-1 cursor-pointer ${activeTab === 'home' ? 'font-bold text-pink-600' : 'text-white'}`}
        >
          <p className='flex size-full items-center justify-center'>HOME</p>
        </div>
        <div
          onClick={() => handleTabClick('profilePics')}
          className={`h-[32px] flex-1 cursor-pointer ${activeTab === 'profilePics' ? 'font-bold text-pink-600' : 'text-white'}`}
        >
          <p className='flex size-full items-center justify-center'>GALLERY</p>
        </div>
        <div
          onClick={() => handleTabClick('projPics')}
          className={`h-[32px] flex-1 cursor-pointer ${activeTab === 'projPics' ? 'font-bold text-pink-600' : 'text-white'}`}
        >
          <p className='flex size-full items-center justify-center'>PROJECTS</p>
        </div>
        <div
          onClick={() => handleTabClick('experience')}
          className={`h-[32px] flex-1 cursor-pointer ${activeTab === 'experience' ? 'font-bold text-pink-600' : 'text-white'}`}
        >
          <p className='flex size-full items-center justify-center'>EXPERIENCE</p>
        </div>
        <div
          onClick={() => handleTabClick('skills')}
          className={`h-[32px] flex-1 cursor-pointer ${activeTab === 'skills' ? 'font-bold text-pink-600' : 'text-white'}`}
        >
          <p className='flex size-full items-center justify-center'>SKILLS</p>
        </div>
      </div>
      {/* Tabs End */}

      {/* Views */}
      {user && guild && (
        <>
          {/* Gallery */}
          <div className='relative mt-2 h-[89%] w-full overflow-auto py-2'>
            {activeTab === 'home' ? (
              <HomeTabView userData={user} experience={experience} projPics={projPics} setActiveTab={setActiveTab} />
            ) : activeTab === 'projPics' ? (
              <ProjectTabView projPics={projPics} />
            ) : activeTab === 'experience' ? (
              <ExperienceTabView experience={experience} userData={user} handleIsFlip={handleIsFlip} />
            ) : activeTab === 'skills' ? (
              <SkillsTabView skillsData={skillsData} />
            ) : (
              <GalleryTabView userData={user} />
            )}
          </div>
        </>
      )}
      {/* Views End */}
    </div>
  )
}
