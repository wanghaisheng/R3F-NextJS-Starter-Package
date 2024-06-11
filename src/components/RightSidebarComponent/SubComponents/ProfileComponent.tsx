'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })

export default function ProfileComponent({ setShowSignUp, setActiveTab }) {
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])

  console.log('user:', user)

  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }

  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        setAvatarsData(user.avatar)
      } catch (error) {
        console.log('Error fetching avatars data:', error)
      }
    }
    if (user) {
      fetchAvatarsData() // Fetch data only if user is available
    }
  }, [user])

  return (
    <div className='mb-32 flex h-full flex-col'>
      {user ? (
        <div className='flex-1 items-center justify-center rounded-lg bg-black text-white'>
          <p>
            Welcome, {user.first_name} {user.last_name}!
          </p>
          <div>Avatar</div>
          <div className=' h-[360px] w-full '>
            {avatarsData && avatarsData.length !== 0 ? (
              <Avatar
                modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                shadows
                animationSrc='/male-spawn-animation.fbx'
                style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                fov={40}
                cameraTarget={1.5}
                cameraInitialDistance={30}
                effects={{
                  ambientOcclusion: true,
                }}
              />
            ) : (
              <Avatar
                modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=1024&pose=A&useHands=true'
                shadows
                animationSrc='/male-idle-3.fbx'
                style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                fov={40}
                cameraTarget={1.5}
                cameraInitialDistance={30}
                effects={{
                  ambientOcclusion: true,
                }}
              />
            )}
          </div>
          <p>Other details</p>
          <p>Form to add profile pic and bio</p>
        </div>
      ) : (
        <>
          <div>You must sign in to view this tab</div>
          <div
            onClick={handleSignUpClick}
            className='mt-2 flex cursor-pointer justify-center rounded border border-purple-700 bg-purple-800/30 p-2 transition-colors hover:bg-purple-800/40 hover:text-purple-200'
          >
            Signup
          </div>
        </>
      )}
    </div>
  )
}
