'use client'
import { motion } from 'framer-motion'

import { Avatar } from 'src/components/Avatar'

import { useUser } from '@/context/UserContext/UserContext'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

async function getAvatarById(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/avatar/${id}`)
    if (!res.ok) {
      throw new Error('failed to fetch the avatars')
    }
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export default function AvatarImageComponent() {
  const router = useRouter()
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])

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
    <div>
      {avatarsData && avatarsData.length != 0 ? (
        avatarsData.map((avatar) => (
          <div className='rounded-lg bg-white/20' key={avatar}>
            {/* <img src={`${avatar.avatar_url}`} alt='' height='120px' width='120px' /> */}
            {/* src='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100' */}
            <img
              src={`${avatar.avatar_url.replace('glb', 'png?size=1024?quality=100')}`}
              alt=''
              height='120px'
              width='120px'
            />
          </div>
        ))
      ) : (
        <div className='grid h-fit gap-4'>
          <div className='rounded-lg'>No Avatar to show</div>
        </div>
      )}
    </div>
  )
}
