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
    const res = await axios.get(`/api/internal/avatar/${id}`)
    if (res.status !== 200) {
      throw new Error('failed to fetch the avatars')
    }
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export default function AvatarComponent({ onNextButtonClick, onPrevButtonClick }) {
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
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0'>
      <div
        id='My Avatar'
        className='relative flex h-[900px] w-[300px] flex-col py-4 md:w-[600px] md:rounded-3xl  md:border  md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:px-10 md:shadow-inner md:shadow-purple-700/70 md:backdrop-blur-md lg:h-[550px] lg:w-[800px]'
        // style={{ minHeight: '300px' }} //Reserve space for dynamic content
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-5 lg:text-7xl'>My Avatars</div>

          <div className='mt-5 rounded-[20px] '>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              {/* Card Image / Container */}
              <div className='flex flex-col items-center justify-center'>
                {memoizedAvatarsData && memoizedAvatarsData.length != 0 ? (
                  <div className='mt-8 flex flex-col justify-center lg:mt-3 lg:flex-row lg:justify-between lg:gap-x-4'>
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
                    <div className='w-full lg:w-[50%]'>
                      <AvatarImageComponent />
                    </div>
                  </div>
                ) : (
                  <div className='mt-8 flex flex-col justify-center lg:mt-3 lg:flex-row lg:justify-between lg:gap-x-4'>
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
                    <div className='w-full lg:w-[50%]'>
                      <AvatarImageComponent />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <div className='mt-5 flex justify-center gap-x-2'>
              <DrawOutlineButton onClick={onNextButtonClick}>Next</DrawOutlineButton>
            </div> */}
            <div className='absolute bottom-4 right-4 mt-4 flex justify-center gap-x-2 '>
              <DrawOutlineButton
                onClick={() => {
                  setIsCardModalOpen(true)
                }}
              >
                Create Avatar &emsp; +
              </DrawOutlineButton>
              <DrawOutlineButton onClick={onNextButtonClick}>Next</DrawOutlineButton>
            </div>

            {isCardModalOpen && (
              <div className='absolute left-0 top-0 flex size-full items-center justify-center'>
                <FormModal2 show={isCardModalOpen} onclose={setIsCardModalOpen}>
                  <Avatar_creator />
                </FormModal2>
              </div>
            )}
            <div className='absolute bottom-4 left-4 mt-4'>
              <DrawOutlineButton onClick={onPrevButtonClick} aria-label='prev'>
                <p className='px-4'>Back</p>
              </DrawOutlineButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
