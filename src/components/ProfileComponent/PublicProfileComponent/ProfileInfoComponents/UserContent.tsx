'use client'

import { useEffect, useState, useRef } from 'react'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'
import { LuGalleryHorizontal } from 'react-icons/lu'
import { IoBarChartOutline } from 'react-icons/io5'
import { FaAnglesUp } from 'react-icons/fa6'

export default function UserContent({ user, skillsData, guild, experience }) {
  const [toggle, setToggle] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  // Check if flipped or not
  const handleIsFlip = (newState) => {
    setIsFlipped(newState)
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false)

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
      className={`relative flex size-full flex-col overflow-auto rounded-xl bg-custom-gradient-purple p-3 shadow-xl shadow-black/30 backdrop-blur-lg`}
    >
      {/* <div className={`fixed top-0 z-20 size-full bg-black/50 ${isFlipped ? 'flex' : ' hidden'}`}></div> */}
      {user && guild && (
        <>
          {/* Skills Chart and Gallery */}
          <div
            className='relative mt-6 flex flex-col flex-wrap items-center justify-center gap-y-4 py-2 lg:flex-row lg:gap-x-4'
            id='section2'
            ref={sectionGalleryRef}
          >
            <div className='flex w-[90%] flex-col items-center justify-center rounded-xl px-4 py-2'>
              {user && skillsData && (
                <button
                  className='absolute right-2 top-2 rounded-lg bg-purple-700/30 p-2 transition-colors hover:bg-pink-300/40 hover:text-pink-200'
                  aria-label='toggle gallery'
                  onClick={handletoggle}
                >
                  {toggle ? <LuGalleryHorizontal size={20} /> : <IoBarChartOutline size={20} />}
                </button>
              )}
              {toggle ? (
                <>{user && skillsData && <SkillsChartComponent skills={skillsData} />}</>
              ) : (
                <div className='w-full'>
                  <GalleryComponent userData={user} experience={experience} handleIsFlip={handleIsFlip} />
                </div>
              )}
            </div>
          </div>

          {/* Scroll to top button */}
          <button
            className={`fixed bottom-10 right-10 z-50 ${
              showScrollToTop ? 'translate-y-0' : 'translate-y-[-100rem]'
            } rounded-full bg-purple-700/30 p-3 text-white transition-all duration-500 hover:bg-pink-300/40 hover:text-pink-200`}
            onClick={scrollToTop}
          >
            <FaAnglesUp size={24} />
          </button>
        </>
      )}
    </div>
  )
}
