'use client'

import { useEffect, useState, useRef } from 'react'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'
import { LuGalleryHorizontal } from 'react-icons/lu'
import { IoBarChartOutline } from 'react-icons/io5'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const HoverGuild = dynamic(() => import('@/components/HoverEffect/HoverGuild'), { ssr: false })
import AchievementsComponent from './RightSideComponents/AchievementsComponent'
import ProfileButtons from './PublicProfileHud/ProfileButtons'
import ExperienceShow from './RightSideComponents/ExperienceShow'

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
  const [visibleSection, setVisibleSection] = useState(null)
  const scrollOffset = 80 // Adjust this value to change the top offset

  const scrollToSection = (sectionRef) => {
    window.scrollTo({
      top: sectionRef.current.offsetTop - scrollOffset,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const sectionRefs = [sectionInfoRef, sectionGalleryRef, sectionExperienceRef]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: `-${scrollOffset}px 0px 0px 0px`,
        threshold: 0.5,
      },
    )

    sectionRefs.forEach((sectionRef) => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current)
      }
    })

    return () => {
      sectionRefs.forEach((sectionRef) => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current)
        }
      })
    }
  }, [])

  return (
    <div
      className={`relative flex size-full flex-col overflow-auto rounded-xl p-3 shadow-xl shadow-black/30 backdrop-blur-lg`}
    >
      {/* <div className={`fixed top-0 z-20 size-full bg-black/50 ${isFlipped ? 'flex' : ' hidden'}`}></div> */}
      {user && guild && (
        <>
          {/* <div className='sticky top-28 z-50 -mt-7 flex w-full justify-center'>
            <ProfileButtons />
          </div> */}
          {/* User's Achievement */}
          <div className='mt-8 flex h-[220px] items-center justify-center px-2'>
            <AchievementsComponent userData={user} />
          </div>

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
                  <GalleryComponent username={user.username} />
                </div>
              )}
            </div>
          </div>
          {/* Experience Card Show */}
          <div className='relative flex size-full px-10 py-3' id='section3' ref={sectionExperienceRef}>
            <ExperienceShow user={user} experience={experience} handleIsFlip={handleIsFlip} />
          </div>
        </>
      )}
    </div>
  )
}
