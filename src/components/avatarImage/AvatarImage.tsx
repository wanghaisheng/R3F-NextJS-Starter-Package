'use client'
import { motion } from 'framer-motion'

import { Avatar } from 'src/components/Avatar'
// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'

// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider'

import { useCallback, useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import FormModal2 from '../FormModal/Modal2'
import Avatar_creator from '@/components/avatar-creator/avatar' //----------------> module not found error in my branch

export default function AvatarImageComponent() {
  const router = useRouter()
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [avatarUrlId, setAvatarUrlId] = useState('')
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const extractAvatarId = (url) => {
    const filteredElements = url.split('/').pop()
    const avatarUrlId = filteredElements.split('.')[0]
    setAvatarUrlId(avatarUrlId)
  }

  // Fetch avatars data
  useEffect(() => {
    const fetchAvatarsData = () => {
      try {
        setAvatarsData(user.avatar)
      } catch (error) {
        console.error('Error fetching avatars data:', error)
      }
    }

    if (user) {
      fetchAvatarsData() // Fetch data only if user is available
    }
  }, [user])

  return (
    <div className='flex justify-center'>
      <div className='w-[45%] overflow-hidden' ref={emblaRef}>
        <div className='flex items-center gap-x-2 '>
          {avatarsData && avatarsData.length != 0 ? (
            avatarsData.map((avatar) => (
              <div className='shrink-0 grow md:min-w-0' key={avatar}>
                <div>
                  {/* <img src={`${avatar.avatar_url}`} alt='' height='120px' width='120px' /> */}
                  {/* src='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100' */}
                  <Image
                    src={`${avatar.avatar_url.replace('glb', 'png?size=1024?quality=100')}`}
                    alt=''
                    height={120}
                    width={120}
                    loading='lazy'
                  />
                  <DrawOutlineButton
                    onClick={() => {
                      setIsCardModalOpen(true)
                      extractAvatarId(avatar.avatar_url)
                    }}
                  >
                    Edit Avatar &emsp; +
                  </DrawOutlineButton>
                </div>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center'>
              <div className='rounded-lg'>No Avatar to show</div>
            </div>
          )}
        </div>
        <div className='my-4 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
          <button aria-label='Previous Slide' onClick={scrollPrev}>
            <MdNavigateBefore />
          </button>
          <button aria-label='Next Slide' onClick={scrollNext}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
      {isCardModalOpen && (
        <div className='absolute left-0 top-0 z-50 flex size-full items-center justify-center rounded-lg bg-black/80'>
          <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
            <Avatar_creator />
          </FormModal2>
        </div>
      )}
    </div>
  )
}
