'use client'

import { useState, useEffect } from 'react'
import Hero from '@/hero/page'
import { useUser } from '@/context/UserContext/UserContext'
import { useRouter } from 'next/navigation'
import styles from './createavatar.module.css'

const CreateAvatar = () => {
  const [avatars, setAvatars] = useState([])
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:3000/api/avatar')
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
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <p className='text-white text-5xl mb-8'>Create Your Avatar</p>
          <div className='flex'>
            <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4'>
              <a href='/avatar'>Create Avatar</a>
            </button>
            <button className='inline-block bg-[#E5FF25] text-black font-bold rounded-lg px-6 py-2'>
              <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
            </button>
          </div>
        </div>
      )
    } else {
      return router.push('/hero3')
    }
  } else {
    return (
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <p className='text-white text-5xl mb-8'>Create Your Avatar</p>
        <div className='flex'>
          <button className='inline-block bg-white text-black font-bold rounded-lg px-6 py-2 mr-4'>
            <a href='/avatar'>Create Avatar</a>
          </button>
          <button className='inline-block bg-[#E5FF25] text-black font-bold rounded-lg px-6 py-2'>
            <a href='https://gguser.readyplayer.me/avatar?frameApi'>Edit Avatar</a>
          </button>
        </div>
      </div>
    )
  }
}

export default CreateAvatar
