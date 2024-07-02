'use client'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'
import Image from 'next/image'

const getUserByUsername = async (username) => {
  try {
    const res = await fetch(`/api/public/users/${username}`)
    if (!res.ok) {
      return toast.error('Failed to get the user')
    }
    return res.json()
  } catch (error) {
    toast.error('Internal server error')
  }
}

export default function GalleryComponent({ username }) {
  const [user, setUser] = useState(null)
  const [profilePics, setProfilePics] = useState([])
  const [projPics, setProjPics] = useState([])
  const [certificates, setCertificates] = useState([])

  const [showMoreProfilePics, setShowMoreProfilePics] = useState(false)
  const [showMoreProjPics, setShowMoreProjPics] = useState(false)
  const [showMoreCertificates, setShowMoreCertificates] = useState(false)

  //get user
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByUsername(username)
      setUser(user)
      if (user.image_urls?.length > 0) {
        const profilePics = user.image_urls
        setProfilePics(profilePics)
      }
    }
    getUser()
  }, [username])

  // Get project pictures
  useEffect(() => {
    const getProjPics = () => {
      if (user?.experience) {
        const projPics = user.experience
          .filter((exp) => exp.project_pictures && exp.project_pictures.length > 0)
          .flatMap((exp) => exp.project_pictures)
        setProjPics(projPics)
      }
    }
    if (user) {
      getProjPics()
    }
  }, [user])

  // Get certificates
  useEffect(() => {
    const getCertificates = () => {
      if (user?.skills) {
        const certificates = user.skills
          .filter((skill) => skill.certifications && skill.certifications.length > 0)
          .flatMap((skill) => skill.certifications)
        setCertificates(certificates)
      }
    }
    if (user) {
      getCertificates()
    }
  }, [user])

  const [activeTab, setActiveTab] = useState('profilePics') //active tab state

  const handleTabClick = (tab: string) => {
    //function to handle tab click
    setActiveTab(tab)
  }

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
                <Image src={pic} alt='profile pictures' fill unoptimized className='rounded-lg' objectFit='cover' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )
    } else {
      // Grid View
      const picturesToShow = showMore ? pictures : pictures.slice(0, 20)
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
                  className='rounded transition-all duration-[2500ms] ease-in-out hover:scale-125'
                  objectFit='cover'
                />
              </div>
            ))}
          </div>
          <div className='flex w-full justify-center'>
            {pictures.length > 20 && (
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
      <div className='flex w-full justify-between px-10 transition-all duration-300 ease-in-out'>
        <div
          onClick={() => handleTabClick('profilePics')}
          className={`${activeTab === 'profilePics' ? 'font-bold text-pink-300' : 'text-white'} cursor-pointer hover:text-violet-300`}
        >
          Profile
        </div>
        <div
          onClick={() => handleTabClick('projPics')}
          className={`${activeTab === 'projPics' ? 'font-bold text-pink-300' : 'text-white'} cursor-pointer  hover:text-violet-300`}
        >
          Projects
        </div>
        <div
          onClick={() => handleTabClick('certificates')}
          className={`${activeTab === 'certificates' ? 'font-bold text-pink-300' : 'text-white'} cursor-pointer  hover:text-violet-300`}
        >
          Skills
        </div>
      </div>

      <div className='flex size-full flex-col items-center justify-center'>
        {activeTab === 'profilePics' && (
          <div className='flex size-full justify-center overflow-hidden p-4'>
            {user && profilePics.length > 0 ? (
              renderPictures(profilePics, showMoreProfilePics, setShowMoreProfilePics)
            ) : (
              <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
                <p>No profile pictures to show</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'projPics' && (
          <div className='flex size-full justify-center overflow-hidden p-4'>
            {user && projPics.length > 0 ? (
              renderPictures(projPics, showMoreProjPics, setShowMoreProjPics)
            ) : (
              <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
                <p>No projects to show</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className='flex size-full justify-center overflow-hidden p-4'>
            {user && certificates.length > 0 ? (
              renderPictures(certificates, showMoreCertificates, setShowMoreCertificates)
            ) : (
              <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
                <p>No certificates to show</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
