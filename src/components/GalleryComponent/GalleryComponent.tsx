'use client'
import toast from 'react-hot-toast'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import Image from 'next/image'
import ExperienceShow from '../ProfileComponent/PublicProfileComponent/ProfileInfoComponents/RightSideComponents/ExperienceShow'
import SkillsChartComponent from '../SliderComponent/SkillsChartComponent'

export default function GalleryComponent({
  userData,
  handleIsFlip,
  skillsData,
  experience,
  activeTab,
}: {
  userData: any
  handleIsFlip: (newState: boolean) => void
  skillsData: any[]
  experience: any[]
  activeTab: string
}) {
  const [profilePics, setProfilePics] = useState([])
  const [projPics, setProjPics] = useState([])
  const [showMorePics, setShowMorePics] = useState(false)

  const handleShowMorePics = () => {
    setShowMorePics(!showMorePics)
  }

  // get user
  useEffect(() => {
    const getProfilePics = () => {
      if (userData?.overall_user_image) {
        const profilePics = userData.overall_user_image

        setProfilePics(profilePics)
      }
    }
    if (userData) {
      getProfilePics()
    }
  }, [userData])

  // Get project pictures
  useEffect(() => {
    const getProjPics = () => {
      if (userData?.experienceData) {
        const projPics = userData.experienceData
          .filter((exp) => exp.project_pictures && exp.project_pictures.length > 0)
          .flatMap((exp) => exp.project_pictures)
        setProjPics(projPics)
      }
    }
    if (userData) {
      getProjPics()
    }
  }, [userData])

  // Function to render pictures
  const renderPictures = (pictures, showMore) => {
    // Grid View
    const picturesToShow = showMore ? pictures : pictures.slice(0, 9)
    return (
      <div className='size-full overflow-auto'>
        <div className='flex size-full flex-wrap justify-center gap-x-7 gap-y-5'>
          {picturesToShow.map((pic, index) => (
            <div
              key={index}
              className='relative flex h-[272px] w-[192px] justify-center overflow-hidden rounded border-2 shadow-lg shadow-black/40'
            >
              <Image
                src={pic}
                alt='pictures'
                fill
                unoptimized
                className='rounded object-cover transition-all duration-1000 ease-in-out hover:scale-125'
              />
            </div>
          ))}
          <div className='flex w-full justify-center'>
            {pictures.length > 9 && (
              <button onClick={handleShowMorePics} className='rounded bg-violet-600 p-2 text-white hover:bg-violet-800'>
                {showMorePics ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Define a helper function to check the activeTab
  const isActiveTab = (tab: string) => activeTab === tab

  return (
    <>
      <div className='flex size-full flex-col items-center justify-center'>
        {activeTab === 'profilePics' && (
          <>
            {userData && profilePics.length > 0 ? (
              renderPictures(profilePics, showMorePics)
            ) : (
              <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
                <p>No profile pictures to show</p>
              </div>
            )}
          </>
        )}

        {isActiveTab('skills') && (
          <div className='w-[75%] justify-center text-xl font-semibold text-white'>
            {skillsData ? <SkillsChartComponent skills={skillsData} /> : 'Skills are shown here'}
          </div>
        )}
      </div>
    </>
  )
}
