'use client'

import { useEffect, useState, useRef, useLayoutEffect } from 'react'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'
import { LuGalleryHorizontal } from 'react-icons/lu'
import { IoBarChartOutline } from 'react-icons/io5'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import CoverPhoto from './ProfileInfoComponents/CoverPhoto'
import ProfilePic from './ProfileInfoComponents/ProfilePic'
const HoverGuild = dynamic(() => import('@/components/HoverGuild/HoverGuild'))
import AchievementsComponent from './ProfileInfoComponents/AchievementsComponent'
import AboutUser from './ProfileInfoComponents/AboutUser'
import ProfileButtons from './ProfileInfoComponents/ProfileButtons'
import ExperienceShow from './ExperienceShow'

export default function UserContent({ user, skillsData, guild, experience }) {
  const [toggle, setToggle] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  // Check if flipped or not
  const handleIsFlip = (newState) => {
    setIsFlipped(newState)
  }

  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [activeTarget, setActiveTarget] = useState(null) // Track the active target
  const targetRefs = useRef([]) // Store refs for all target sections

  const handleClick = (index) => {
    setActiveTarget(index) // Set the active target index
    // Adjust scroll position to leave space at the top
    const scrollTop = index === 0 ? 0 : 20 // Set the scroll position
    targetRefs.current[index].scrollIntoView({ behavior: 'smooth', top: scrollTop }) // Scroll to the target
  }

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

  return (
    <>
      <div
        className={`relative flex size-full flex-col items-center justify-center ${isSmallScreen ? 'mt-[600px]' : 'mt-20'}`}
      >
        <div className={`fixed top-0 z-20 h-screen w-full bg-black/50 ${isFlipped ? 'flex' : ' hidden'}`}></div>
        {user && guild && (
          <>
            <div className='flex size-full flex-col rounded-xl  bg-violet-300/30 lg:w-[50%] dark:bg-black/20'>
              <div className='flex w-full flex-col flex-wrap  px-10 py-3'>
                <div className='flex'>
                  <button onClick={() => handleClick(0)}>Uoknfo</button>
                  <button onClick={() => handleClick(1)}>Achievement</button>
                </div>

                {/* CoverPicture */}
                <div className='flex w-full items-center justify-center'>
                  <CoverPhoto coverPhotoUrl={user.username} height={160} />
                </div>
                {/* Profile Picture And User Info */}
                <div
                  className='flex w-full flex-col items-center gap-x-5 py-8 md:flex-row'
                  ref={(el) => (targetRefs.current[0] = el)}
                  id='aboutUser'
                >
                  <div className='-mt-20 md:mt-0'>
                    <ProfilePic
                      profilePicUrl={
                        user.image_urls.length !== 0
                          ? user.image_urls[user.image_urls.length - 1]
                          : '/card/defaultbuddha.svg'
                      }
                      size={isSmallScreen ? 90 : 160}
                    />
                  </div>
                  <div className='mt-5 grow md:mt-0'>
                    <AboutUser userData={user} />
                  </div>
                </div>
                {/* interaction Buttons */}
                <div className='sticky top-20 z-50 -mt-7 flex w-full justify-center'>
                  <ProfileButtons />
                </div>
                {/* User's Achievement */}
                <div
                  className='mt-5 flex w-full overflow-hidden'
                  ref={(el) => (targetRefs.current[1] = el)}
                  id='achievements'
                >
                  <AchievementsComponent userData={user} />
                </div>
                {/* Guild */}
                <div className='flex flex-col pl-4 '>
                  <div className='group absolute right-5 top-5'>
                    <Image
                      src={guild.find((guild) => guild.id === user.guild_id)?.symbol || ''}
                      height={30}
                      width={30}
                      alt='guild'
                      loading='lazy'
                    />
                    <HoverGuild
                      hoveredGuild={guild.find((guild) => guild.id === user.guild_id)?.guild_name.toUpperCase() || ''}
                      top={10}
                      left={-350}
                      translateY={10}
                    />
                  </div>
                </div>
                {/* Skills Chart and Gallery */}
                <div className='relative mt-6 flex flex-col flex-wrap items-center justify-center gap-y-4 py-2 lg:flex-row lg:gap-x-4'>
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
              </div>
              <div className='relative flex size-full px-10 py-3'>
                <ExperienceShow user={user} experience={experience} handleIsFlip={handleIsFlip} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
