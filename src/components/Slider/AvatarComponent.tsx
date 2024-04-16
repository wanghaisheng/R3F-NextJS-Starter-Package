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

export default function AvatarComponent() {
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
    <div className='mt-2 flex flex-col items-center justify-center'>
      <div
        id='avatar'
        className='relative flex h-fit w-[68%] items-center justify-center rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex flex-col'>
          <div className='relative my-8 flex justify-center text-7xl drop-shadow'>My Avatars</div>

          {avatarsData && avatarsData.length != 0 ? (
            <div className='mt-7 flex justify-between'>
              <div>
                <Avatar
                  modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                  // shadows
                  animationSrc='/male-idle-3.fbx'
                  style={{ background: 'rgb(9,20,26)', width: '300px', height: '300px' }}
                  fov={40}
                  cameraTarget={1.5}
                  cameraInitialDistance={30}
                  effects={{
                    ambientOcclusion: true,
                  }}
                />
              </div>
              <div className='grid h-fit w-[50%] grid-cols-3 gap-4'>
                {avatarsData.map((avatar) => (
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
                ))}
              </div>
            </div>
          ) : (
            <div className='mt-7 flex justify-between'>
              <Avatar
                modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
                // shadows
                animationSrc='/male-idle-3.fbx'
                style={{ background: 'rgb(9,20,26)', width: '400px', height: '300px' }}
                fov={40}
                cameraTarget={1.5}
                cameraInitialDistance={30}
                effects={{
                  ambientOcclusion: true,
                }}
              />
              <div className='grid h-fit grid-cols-3 gap-4'>
                <div className='rounded-lg'>...loading</div>
              </div>
            </div>
          )}

          <div className='absolute bottom-6 right-4'>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='rounded-2xl border-2 p-2 text-white shadow-md '
              href='/avatar'
            >
              Create New Avatar &emsp;&emsp; +
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}
