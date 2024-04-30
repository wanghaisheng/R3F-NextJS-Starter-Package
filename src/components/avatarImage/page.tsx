'use client'
import { motion } from 'framer-motion'

import { Avatar } from 'src/components/Avatar'
// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'

import { useUser } from '@/context/UserContext/UserContext'

import { useCallback, useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import axios from 'axios'

async function getAvatarById(id: string) {
  try {
    const res = await axios.get(`/api/avatar/${id}`)
    if (res.status !== 200) {
      throw new Error('failed to fetch the avatars')
    }
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default function AvatarImageComponent() {
  const router = useRouter()
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])

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

  // Fetch avatars data
  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        const testData = await getAvatarById(user.gg_id)
        setAvatarsData(testData)
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
      <div className='overflow-hidden lg:w-full' ref={emblaRef}>
        <div className='flex items-center gap-x-2 '>
          {avatarsData && avatarsData.length != 0 ? (
            avatarsData.map((avatar) => (
              <div className='w-[50%] shrink-0 grow md:min-w-0' key={avatar}>
                <div className='rounded-lg bg-purple-900/20'>
                  {/* <img src={`${avatar.avatar_url}`} alt='' height='120px' width='120px' /> */}
                  {/* src='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100' */}
                  <Image
                    src={`${avatar.avatar_url.replace('glb', 'png?size=1024?quality=100')}`}
                    alt=''
                    height={120}
                    width={120}
                    loading='lazy'
                  />
                </div>
              </div>
            ))
          ) : (
            <div className='grid gap-4'>
              <div className='rounded-lg'>No Avatar to show</div>
            </div>
          )}
        </div>
        <div className='my-4 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
          <button className='' onClick={scrollPrev}>
            <MdNavigateBefore />
          </button>
          <button className='' onClick={scrollNext}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  )
}
