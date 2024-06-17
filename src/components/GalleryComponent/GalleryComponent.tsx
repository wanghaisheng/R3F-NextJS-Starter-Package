'use client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'

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
  const [activeTab, setActiveTab] = useState('') //active tab state

  const handleTabClick = (tab: string) => {
    //function to handle tab click
    setActiveTab(tab)
  }

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

  return (
    <>
      {activeTab !== '' && (
        <div className='flex size-full flex-col overflow-y-auto px-4 pb-24 pt-4'>
          {activeTab === 'profilePics' ? (
            <div className='mb-24 flex size-full flex-row overflow-hidden px-4'>
              {user && profilePics.length > 0 ? (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className='flex size-72 h-[550px] w-[800px] items-center justify-center rounded-lg'
                >
                  {profilePics.map((profilePic, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex justify-center'>
                        <img src={profilePic} alt='' />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='flex justify-center'>no profile pictures to show</div>
              )}
            </div>
          ) : activeTab === 'projPics' ? (
            <div className='mb-24 flex size-full flex-row overflow-hidden px-4'>
              {user && projPics.length > 0 ? (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className='flex size-72 h-[550px] w-[800px] items-center justify-center rounded-lg'
                >
                  {projPics.map((projPic, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex justify-center'>
                        <img src={projPic} alt='' />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='flex justify-center'>no project pictures to show</div>
              )}
            </div>
          ) : activeTab === 'certificates' ? (
            <div className='mb-24 flex size-full flex-row overflow-hidden px-4'>
              {user && certificates.length > 0 ? (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className='flex size-72 h-[550px] w-[800px] items-center justify-center rounded-lg'
                >
                  {certificates.map((cert, index) => (
                    <SwiperSlide key={index}>
                      <div className='flex justify-center'>
                        <img src={cert} alt='' />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='flex justify-center'>no project pictures to show</div>
              )}
            </div>
          ) : (
            <div>........</div>
          )}
        </div>
      )}

      <div className='flex size-full flex-col overflow-y-auto px-4 pb-24 pt-4'>
        <a href='#' onClick={() => handleTabClick('profilePics')}>
          <button>ProfilePics</button>
        </a>
        <a href='#' onClick={() => handleTabClick('projPics')}>
          <button>ProjPics</button>
        </a>
        <a href='#' onClick={() => handleTabClick('certificates')}>
          <button>Certificates</button>
        </a>
      </div>
    </>
  )
}
