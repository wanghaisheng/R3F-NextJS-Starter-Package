'use client'

import { useState, useEffect } from 'react'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const CreateAvatar = () => {
  const [avatars, setAvatars] = useState([])
  const router = useRouter()
  const { user } = useUser()
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/internal/avatar')
        if (!res.ok) {
          throw new Error('Failed to fetch avatars')
        }
        const data = await res.json()
        setAvatars(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  if (user) {
    function checkUserInAvatar(element) {
      return element.gg_id === user.gg_id
    }
    const userHasAvatar = avatars.some(checkUserInAvatar) // check whether at least one element in the array passes the condition or not returns boolean value
    if (!userHasAvatar) {
      return (
        <div className='flex size-full flex-col items-center justify-center'>
          <p className='mb-8 text-5xl text-white'>Create Your Avatar</p>
          <div className='flex'>
            <button className='mr-4 inline-block rounded-lg bg-white px-6 py-2 font-bold text-black'>
              <a href='/avatar'>Create Avatar</a>
            </button>
            <button className='inline-block rounded-lg bg-[#E5FF25] px-6 py-2 font-bold text-black'>
              <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
            </button>
          </div>
        </div>
      )
    } else {
      return router.push('/slider')
      // return <SliderPage />
    }
  }
  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <p className='mb-8 text-5xl text-white'>Create Your Avatar</p>
      <div className='flex'>
        <button className='mr-4 inline-block rounded-lg bg-white px-6 py-2 font-bold text-black'>
          <a href='/avatar'>Create Avatar</a>
        </button>
        <button className='inline-block rounded-lg bg-[#E5FF25] px-6 py-2 font-bold text-black'>
          <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
        </button>
      </div>
    </div>
  )
}

export default CreateAvatar
