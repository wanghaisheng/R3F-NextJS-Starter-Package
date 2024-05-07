'use client'

import { Avatar } from 'src/components/Avatar'
import { useUser } from '@/context/UserContext/UserContext'
import { useState, useEffect, useMemo } from 'react'
import AvatarImageComponent from '../avatarImage/page'
import FormModal2 from '../FormModal/Modal2'
import Avatar_creator from '@/components/avatar-creator/avatar'

import axios from 'axios'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

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

export default function AvatarComponent({ onNextButtonClick }) {
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])

  const [isCardModalOpen, setIsCardModalOpen] = useState(false)

  const openCardModal = () => {
    setIsCardModalOpen(true)
  }

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
      fetchAvatarsData() // Fetch data only if user is available and avatarsData is empty
    }
  }, [user])

  const memoizedAvatarsData = useMemo(() => avatarsData, [avatarsData]) // Memoize the avatars data to prevent re-rendering

  return (
    <div className='mt-2 flex items-center justify-center'>
      <div
        id='Avatar'
        className='relative flex w-[68%] flex-col items-center justify-center px-10 py-4  md:rounded-3xl md:border md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md'
        style={{ minHeight: '300px' }} //Reserve space for dynamic content
      >
        <div className='relative my-3 flex justify-center text-2xl md:text-4xl lg:my-5 lg:text-7xl'>My Avatars</div>

        {memoizedAvatarsData && memoizedAvatarsData.length != 0 ? (
          <div className='mt-8 flex flex-col justify-center md:mt-3 md:flex-row md:justify-between md:gap-x-4'>
            <Avatar
              modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
              // shadows
              animationSrc='/male-idle-3.fbx'
              style={{ background: 'rgb(9,20,26)', width: '400px', height: '400px', pointerEvents: 'none' }}
              fov={40}
              cameraTarget={1.5}
              cameraInitialDistance={30}
              effects={{
                ambientOcclusion: true,
              }}
            />
            <AvatarImageComponent />
          </div>
        ) : (
          <div className='mt-8 flex flex-col justify-center md:mt-3 md:flex-row md:justify-between md:gap-x-4'>
            <Avatar
              modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
              // shadows
              animationSrc='/male-idle-3.fbx'
              style={{ background: 'rgb(9,20,26)', width: '400px', height: '400px', pointerEvents: 'none' }}
              fov={40}
              cameraTarget={1.5}
              cameraInitialDistance={30}
              effects={{
                ambientOcclusion: true,
              }}
            />
            <AvatarImageComponent />
          </div>
        )}

        <div className='mt-4 flex justify-center gap-x-2 md:absolute md:bottom-4 md:right-4 md:justify-end'>
          <DrawOutlineButton
            onClick={() => {
              setIsCardModalOpen(true)
            }}
          >
            Create Avatar &emsp; +
          </DrawOutlineButton>
          <DrawOutlineButton onClick={onNextButtonClick}>Next</DrawOutlineButton>
        </div>

        {/* facing problem cuz of this */}
        {isCardModalOpen && (
          <div className='absolute left-0 top-0 flex size-full items-center justify-center'>
            <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
              <Avatar_creator />
            </FormModal2>
          </div>
        )}
      </div>
    </div>
  )
}
