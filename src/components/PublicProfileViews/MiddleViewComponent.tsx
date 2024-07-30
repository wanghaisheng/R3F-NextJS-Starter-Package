'use client'

import { useEffect, useState, useRef } from 'react'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'
import Image from 'next/image'
import { LuGalleryHorizontal } from 'react-icons/lu'
import { IoBarChartOutline } from 'react-icons/io5'
import { FaAnglesUp } from 'react-icons/fa6'
import CustomSwiper from '../MyComponents/CustomSwiper'
import HomeTabView from './TabViews/HomeTabView'
import ProjectTabView from './TabViews/ProjectTabView'

export default function MiddleViewComponent({ user, skillsData, guild, experience }) {
  const [toggle, setToggle] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  // Check if flipped or not
  const handleIsFlip = (newState) => {
    setIsFlipped(newState)
  }

  const [activeTab, setActiveTab] = useState('home')
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [projPics, setProjPics] = useState([])

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

  const sectionInfoRef = useRef(null)
  const sectionGalleryRef = useRef(null)
  const sectionExperienceRef = useRef(null)

  // Scroll to top button
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // Show the button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 200) // Show the button after scrolling 200px down
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    })
  }

  return (
    <div
      className={`relative flex size-full select-none flex-col overflow-auto rounded-xl bg-custom-gradient-purple p-4 shadow-xl shadow-black/30 backdrop-blur-md`}
    >
      <div className='flex w-full flex-col gap-y-2'>
        <div className='flex w-full'>
          {/* Profile Picture and Search*/}
          {user && (
            <div className='flex w-full select-none items-center gap-x-2'>
              <div
                className='relative overflow-hidden rounded-full border-[2px] shadow-lg shadow-black/30'
                style={{
                  borderRadius: '50%',
                  height: 50,
                  width: 50,
                }}
              >
                <Image
                  src={user.user_image ? user.user_image : '/card/defaultbuddha.svg'}
                  alt='profile-pic'
                  fill
                  unoptimized
                  quality={60}
                  className='rounded-full object-cover transition-all duration-500 ease-in-out hover:scale-125'
                />
              </div>
              <div className='h-[40px] flex-1 rounded-full bg-white/50 shadow-lg shadow-black/30'></div>
            </div>
          )}
        </div>
        {/* Tabs */}
        <div className='mt-1 flex select-none justify-between gap-x-2 text-[12px] font-semibold'>
          <div
            onClick={() => handleTabClick('home')}
            className={`h-[32px] flex-1 cursor-pointer rounded-full bg-white/80 shadow-md shadow-black/50 ${activeTab === 'home' ? 'font-bold text-pink-600' : 'text-black'}`}
          >
            <p className='flex size-full items-center justify-center'>HOME</p>
          </div>
          <div
            onClick={() => handleTabClick('profilePics')}
            className={`h-[32px] flex-1 cursor-pointer rounded-full bg-white/80 shadow-md shadow-black/50 ${activeTab === 'profilePics' ? 'font-bold text-pink-600' : 'text-black'}`}
          >
            <p className='flex size-full items-center justify-center'>GALLERY</p>
          </div>
          <div
            onClick={() => handleTabClick('projPics')}
            className={`h-[32px] flex-1 cursor-pointer rounded-full bg-white/80 shadow-md shadow-black/50 ${activeTab === 'projPics' ? 'font-bold text-pink-600' : 'text-black'}`}
          >
            <p className='flex size-full items-center justify-center'>PROJECTS</p>
          </div>
          <div
            onClick={() => handleTabClick('experience')}
            className={`h-[32px] flex-1 cursor-pointer rounded-full bg-white/80 shadow-md shadow-black/50 ${activeTab === 'experience' ? 'font-bold text-pink-600' : 'text-black'}`}
          >
            <p className='flex size-full items-center justify-center'>EXPERIENCE</p>
          </div>
          <div
            onClick={() => handleTabClick('skills')}
            className={`h-[32px] flex-1 cursor-pointer rounded-full bg-white/80 shadow-md shadow-black/50 ${activeTab === 'skills' ? 'font-bold text-pink-600' : 'text-black'}`}
          >
            <p className='flex size-full items-center justify-center'>SKILLS</p>
          </div>
        </div>
      </div>

      {user && guild && (
        <>
          {/* Gallery */}
          <div className='relative mt-2 h-[89%] w-full overflow-auto py-2' id='section2' ref={sectionGalleryRef}>
            {activeTab === 'home' ? (
              <HomeTabView userData={user} experience={experience} handleIsFlip={handleIsFlip} projPics={projPics} />
            ) : activeTab === 'projPics' ? (
              <ProjectTabView projPics={projPics} />
            ) : (
              <GalleryComponent
                userData={user}
                experience={experience}
                skillsData={skillsData}
                handleIsFlip={handleIsFlip}
                activeTab={activeTab}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
