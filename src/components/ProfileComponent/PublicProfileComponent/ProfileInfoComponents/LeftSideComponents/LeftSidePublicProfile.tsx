'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AboutUser from './AboutUser'
import CoverPhoto from './CoverPhoto'

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
        <div className='size-full rounded-xl border-2 p-3 backdrop-blur-lg'>
          {/* CoverPicture */}
          <div className='flex w-full items-center justify-center'>
            <CoverPhoto coverPhotoUrl={user.username} height={170} />
          </div>

          {/* Profile Picture And User Info */}
          <div className='mt-[-76px] flex w-full items-center justify-center'>
            <div
              className='relative overflow-hidden rounded-full border-2 border-black'
              style={{
                borderRadius: '50%',
                height: 140,
                width: 140,
              }}
            >
              <Image
                src={user.user_image ? user.user_image : '/card/defaultbuddha.svg'}
                alt='profile-pic'
                fill
                unoptimized
                objectFit='cover'
                className='rounded-full transition-all duration-[2500ms] ease-in-out hover:scale-125'
              />
            </div>
          </div>
          {/* username */}
          <div className='flex w-full justify-center text-xl font-semibold'>
            {user.username.charAt(0).toUpperCase()}
            {user.username.slice(1)}
          </div>
          <div className='z-30 mt-5 grow md:mt-0'>
            <AboutUser userData={user} />
          </div>
        </div>
      ) : (
        <div className='flex size-full items-center justify-center'>
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

// {
//   /* Username */
// }
// {
//   user && (
//     <>
//       <div className='fixed left-6 z-0 flex h-full w-1/4 flex-col items-start justify-center'>
//         <div className=' flex flex-col items-center justify-center pt-4 text-8xl font-extrabold drop-shadow'>
//           {user.username.split('').map((letter, index) => (
//             <span key={index}>{letter.toUpperCase()}</span>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// {
//   /* Avatar */
// }
// ;<div className='fixed flex h-screen w-[25%] items-center justify-center overflow-y-hidden'>
//   {avatar_url && (
//     <div className='z-40 size-full'>
//       <Avatar
//         modelSrc={`${avatar_url}`}
//         animationSrc='/male-spawn-animation.fbx'
//         fov={40}
//         cameraTarget={1.5}
//         cameraInitialDistance={30}
//         effects={{
//           ambientOcclusion: true,
//         }}
//       />
//     </div>
//   )}
// </div>
