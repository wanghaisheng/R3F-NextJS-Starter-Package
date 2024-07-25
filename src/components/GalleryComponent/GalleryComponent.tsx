'use client'
import toast from 'react-hot-toast'
import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'
import Image from 'next/image'
import ExperienceShow from '../ProfileComponent/PublicProfileComponent/ProfileInfoComponents/RightSideComponents/ExperienceShow'

export default function GalleryComponent({
  userData,
  handleIsFlip,
  experience,
}: {
  userData: any
  handleIsFlip: (newState: boolean) => void
  experience: any[]
}) {
  const [projPics, setProjPics] = useState([])
  const [showMoreProjPics, setShowMoreProjPics] = useState(false)

  const [activeTab, setActiveTab] = useState('profilePics') //active tab state
  const [lineStyle, setLineStyle] = useState({})
  const projectsRef = useRef(null)
  const experienceRef = useRef(null)

  const handleTabClick = (tab: string) => {
    //function to handle tab click
    setActiveTab(tab)
  }

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

  // Dynamic Line Slide under the active tab style
  useEffect(() => {
    const updateLineStyle = () => {
      let ref
      switch (activeTab) {
        case 'projPics':
          ref = projectsRef.current
          break
        case 'experience':
          ref = experienceRef.current
          break
        default:
          ref = projectsRef.current
      }
      if (ref) {
        setLineStyle({
          width: ref.offsetWidth,
          left: ref.offsetLeft,
        })
      }
    }

    updateLineStyle()
    window.addEventListener('resize', updateLineStyle)
    return () => window.removeEventListener('resize', updateLineStyle)
  }, [activeTab])

  // Function to render pictures
  const renderPictures = (pictures, showMore, setShowMore) => {
    if (pictures.length < 6) {
      return (
        // Card View
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className='flex h-[200px] w-[300px] items-center justify-center rounded-lg'
        >
          {pictures.map((pic, index) => (
            <SwiperSlide key={index}>
              <div className='relative h-[190px] w-[280px] rounded-lg border border-violet-600'>
                <Image src={pic} alt='profile pictures' fill unoptimized className='rounded-lg object-cover' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )
    } else {
      // Grid View
      const picturesToShow = showMore ? pictures : pictures.slice(0, 10)
      return (
        <div className='flex w-full flex-col'>
          <div className='flex size-full flex-wrap justify-center gap-3'>
            {picturesToShow.map((pic, index) => (
              <div
                key={index}
                className='relative flex h-[200px] w-[250px] justify-center overflow-hidden rounded border-2'
              >
                <Image
                  src={pic}
                  alt='pictures'
                  fill
                  unoptimized
                  className='rounded object-cover transition-all duration-[2500ms] ease-in-out hover:scale-125'
                />
              </div>
            ))}
          </div>
          <div className='flex w-full justify-center'>
            {pictures.length > 10 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className='mt-4 rounded bg-violet-600 p-2 text-white hover:bg-violet-800'
              >
                {showMore ? 'Show Less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <div className='relative'>
        <div className='flex w-full justify-between px-10 transition-all duration-300 ease-in-out'>
          <div
            ref={projectsRef}
            onClick={() => handleTabClick('projPics')}
            className={`${activeTab === 'projPics' ? 'font-bold text-pink-300' : 'text-white'} cursor-pointer  hover:text-violet-300`}
          >
            Projects
          </div>
          <div
            ref={experienceRef}
            onClick={() => handleTabClick('experience')}
            className={`${activeTab === 'experience' ? 'font-bold text-pink-300' : 'text-white'} cursor-pointer  hover:text-violet-300`}
          >
            Experience
          </div>
        </div>
        <div
          className='absolute bottom-0 h-1 bg-purple-200 transition-all duration-300 ease-in-out'
          style={lineStyle}
        ></div>
        <hr className='mt-2 border border-gray-700' />
      </div>

      <div className='flex size-full flex-col items-center justify-center'>
        {activeTab === 'projPics' && (
          <div className='flex size-full justify-center overflow-hidden p-4'>
            {userData && projPics.length > 0 ? (
              renderPictures(projPics, showMoreProjPics, setShowMoreProjPics)
            ) : (
              <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
                <p>No projects to show</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className='flex size-full justify-center overflow-hidden p-4'>
            {/* Experience Card Show */}
            {userData && experience.length > 0 ? (
              <div className='relative flex size-full px-10 py-3'>
                <ExperienceShow user={userData} experience={experience} handleIsFlip={handleIsFlip} />
              </div>
            ) : (
              <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
                <p>No experience to show</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
