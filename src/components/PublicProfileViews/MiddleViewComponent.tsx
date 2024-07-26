'use client'

import { useEffect, useState, useRef } from 'react'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'
import Image from 'next/image'
import { LuGalleryHorizontal } from 'react-icons/lu'
import { IoBarChartOutline } from 'react-icons/io5'
import { FaAnglesUp } from 'react-icons/fa6'
import CustomSwiper from '../MyComponents/CustomSwiper'

export default function MiddleViewComponent({ user, skillsData, guild, experience }) {
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
      className={`relative flex size-full flex-col overflow-auto rounded-xl bg-custom-gradient-purple p-4 shadow-xl shadow-black/30 backdrop-blur-lg`}
    >
      <div className='flex w-full flex-col gap-y-2'>
        <div className='flex w-full'>
          {/* Profile Picture */}
          {user && (
            <div className='flex w-full select-none items-center gap-x-2'>
              <div
                className='relative overflow-hidden rounded-full border-[2px]'
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
              <div className='h-[40px] flex-1 rounded-full bg-white/50'></div>
            </div>
          )}
        </div>
        <div className='mt-1 flex justify-between text-[12px] font-semibold'>
          <div className='flex h-[32px] w-[156px] items-center justify-center rounded-full bg-white/80 shadow-md shadow-black/50'>
            GALLERY
          </div>
          <div className='flex h-[32px] w-[156px] items-center justify-center rounded-full bg-white/80 shadow-md shadow-black/50'>
            PROJECTS
          </div>
          <div className='flex h-[32px] w-[156px] items-center justify-center rounded-full bg-white/80 shadow-md shadow-black/50'>
            EXPERIENCE
          </div>
          <div className='flex h-[32px] w-[156px] items-center justify-center rounded-full bg-white/80 shadow-md shadow-black/50'>
            SKILLS
          </div>
        </div>
      </div>

      {/* <div className={`fixed top-0 z-20 size-full bg-black/50 ${isFlipped ? 'flex' : ' hidden'}`}></div> */}
      {user && guild && (
        <>
          {/* Skills Chart and Gallery */}
          <div
            className='relative mt-6 flex flex-col flex-wrap items-center justify-center gap-y-4 py-2 lg:flex-row lg:gap-x-4'
            id='section2'
            ref={sectionGalleryRef}
          >
            <div className='mt-5 w-full px-2'>
              <CustomSwiper>
                <div className='h-[200px] w-[250px] rounded-[7.35039px] bg-yellow-500'></div>
                <div className='h-[200px] w-[250px] rounded-[7.35039px] bg-gradient-to-r from-purple-700 to-purple-500'></div>
                <div className='h-[200px] w-[250px] rounded-[7.35039px] bg-gradient-to-r from-purple-700 to-purple-500'></div>
                <div className='h-[200px] w-[250px] rounded-[7.35039px] bg-gradient-to-r from-purple-700 to-purple-500'></div>
                <div className='h-[200px] w-[250px] rounded-[7.35039px] bg-gradient-to-r from-purple-700 to-purple-500'></div>
                <div className='h-[200px] w-[250px] rounded-[7.35039px] bg-gradient-to-r from-purple-700 to-purple-500'></div>
                <div className='h-[200px] w-[250px] rounded-[7.35039px] bg-gradient-to-r from-purple-700 to-purple-500'></div>
                {/* Add more SwiperSlide elements as needed */}
              </CustomSwiper>
            </div>
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
