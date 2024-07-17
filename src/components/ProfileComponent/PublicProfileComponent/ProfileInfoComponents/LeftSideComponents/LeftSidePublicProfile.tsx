'use client'

import dynamic from 'next/dynamic'

import { useEffect, useState } from 'react'
import AboutUser from './AboutUser'
import CoverPhoto from './CoverPhoto'
import ProfilePic from './ProfilePic'

const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })

export default function LeftSidePublicProfile({ user, guild }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const avatar_url = user?.avatarurl

  return (
    <>
      {user ? (
        <div>
          {/* Avatar and Username */}
          {!isSmallScreen ? (
            <div className='fixed flex h-screen w-[25%] items-center justify-center overflow-y-hidden'>
              {user && (
                <>
                  <div className='fixed left-6 z-0 flex h-full w-1/4 flex-col items-start justify-center'>
                    <div className=' flex flex-col items-center justify-center pt-4 text-8xl font-extrabold drop-shadow'>
                      {user.username.split('').map((letter, index) => (
                        <span key={index}>{letter.toUpperCase()}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {avatar_url && (
                <div className='z-40 size-full'>
                  <Avatar
                    modelSrc={`${avatar_url}`}
                    animationSrc='/male-spawn-animation.fbx'
                    // style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                    fov={40}
                    cameraTarget={1.5}
                    cameraInitialDistance={30}
                    effects={{
                      ambientOcclusion: true,
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              {avatar_url && (
                <div className='fixed top-7 h-[700px] w-full'>
                  <Avatar
                    modelSrc={`${avatar_url}`}
                    animationSrc='/male-spawn-animation.fbx'
                    style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                    fov={40}
                    cameraTarget={1.5}
                    cameraInitialDistance={30}
                    effects={{
                      ambientOcclusion: true,
                    }}
                  />
                </div>
              )}
            </>
          )}

          {/* CoverPicture */}
          <div className='mt-3 flex w-full items-center justify-center' id='section0'>
            <CoverPhoto coverPhotoUrl={user.username} height={160} />
          </div>
          {/* Profile Picture And User Info */}
          <div className='flex w-full flex-col items-center gap-x-5 py-8 md:flex-row'>
            <div className='-mt-20 md:mt-0'>
              <ProfilePic
                profilePicUrl={user.user_image ? user.user_image : '/card/defaultbuddha.svg'}
                size={isSmallScreen ? 90 : 160}
              />
            </div>
            <div className='z-30 mt-5 grow md:mt-0'>
              <AboutUser userData={user} />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
