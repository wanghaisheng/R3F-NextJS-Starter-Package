'use client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'
import Image from 'next/image'

const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`/api/public/users/${username}`)
    if (res.status !== 200) {
      return toast.error('Failed to get the user')
    }
    return res.data
  } catch (error) {
    toast.error('Internal server error')
  }
}

export default function GalleryComponent({ username }) {
  const [user, setUser] = useState(null)
  const [profilePics, setProfilePics] = useState([])
  const [projPics, setProjPics] = useState([])
  const [certificates, setCertificates] = useState([])

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
  }, [])

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

  const [activeTab, setActiveTab] = useState('') //active tab state

  const handleTabClick = (tab: string) => {
    //function to handle tab click
    setActiveTab(tab)
  }

  return (
    <>
      {activeTab !== '' && (
        <div className='flex size-full flex-col overflow-y-auto px-4 pb-24 pt-4'>
          {activeTab === 'profilePics' ? (
            <div className='flex size-full flex-row overflow-hidden px-4'>
              {user && profilePics.length > 0 ? (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className='flex h-[160px] w-[260px] items-center justify-center rounded-lg'
                >
                  {profilePics.map((profilePic, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex h-[150px] w-[250px] justify-center rounded-lg border border-violet-600'>
                        <Image
                          src={profilePic}
                          alt='profile pictures'
                          height={150}
                          width={250}
                          unoptimized
                          className='rounded-lg'
                          objectFit='cover'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='flex justify-center'>
                  <p>No profile pictures to show</p>
                </div>
              )}
            </div>
          ) : activeTab === 'projPics' ? (
            <div className='flex size-full flex-row overflow-hidden px-4'>
              {user && projPics.length > 0 ? (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className='flex h-[160px] w-[260px] items-center justify-center rounded-lg'
                >
                  {projPics.map((projPic, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex h-[150px] w-[250px] justify-center rounded-lg border border-violet-600'>
                        <Image
                          src={projPic}
                          alt='project pictures'
                          height={150}
                          width={250}
                          unoptimized
                          className='rounded-lg'
                          objectFit='cover'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='flex justify-center'>
                  <p>No projects to show</p>
                </div>
              )}
            </div>
          ) : activeTab === 'certificates' ? (
            <div className='mb-24 flex size-full flex-row overflow-hidden px-4'>
              {user && certificates.length > 0 ? (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className='flex h-[160px] w-[260px] items-center justify-center rounded-lg'
                >
                  {certificates.map((cert, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex h-[150px] w-[250px] justify-center rounded-lg border border-violet-600'>
                        <Image
                          src={cert}
                          alt='Certificates pictures'
                          height={150}
                          width={250}
                          unoptimized
                          className='rounded-lg'
                          objectFit='cover'
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='flex justify-center'>
                  <p>No Certificates to show</p>
                </div>
              )}
            </div>
          ) : (
            <div>........</div>
          )}
        </div>
      )}

      <div className='absolute top-16 flex w-full cursor-pointer justify-center gap-x-3 overflow-y-auto pr-4'>
        <div
          onClick={() => handleTabClick('profilePics')}
          className={`${activeTab === 'profilePics' ? 'font-bold text-purple-600' : 'text-white'} hover:text-violet-300`}
        >
          Profile
        </div>
        <div
          onClick={() => handleTabClick('projPics')}
          className={`${activeTab === 'projPics' ? 'font-bold text-purple-600' : 'text-white'} hover:text-violet-300`}
        >
          ProjPics
        </div>
        <div
          onClick={() => handleTabClick('certificates')}
          className={`${activeTab === 'certificates' ? 'font-bold text-purple-600' : 'text-white'} hover:text-violet-300`}
        >
          Certificates
        </div>
      </div>
    </>
  )
}
