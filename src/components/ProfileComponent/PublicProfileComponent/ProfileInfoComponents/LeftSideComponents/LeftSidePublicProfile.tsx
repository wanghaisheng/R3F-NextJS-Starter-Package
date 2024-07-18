'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import AboutUser from './AboutUser'
import CoverPhoto from './CoverPhoto'
import HoverGuild from '@/components/HoverEffect/HoverGuild'
import AchievementsComponent from '../RightSideComponents/AchievementsComponent'

const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })

export default function LeftSidePublicProfile({ user, guild }) {
  const [switchProfile, setSwitchProfile] = useState(false)

  const handleSwitchProfile = () => {
    setSwitchProfile(!switchProfile)
  }

  const avatar_url = user?.avatarurl

  return (
    <>
      {user ? (
        <div className='relative size-full rounded-xl bg-white/40 p-3 shadow-xl shadow-black/30 backdrop-blur-lg'>
          {/* CoverPicture */}
          {/* <div className='flex w-full items-center justify-center'>
            <CoverPhoto coverPhotoUrl={user.username} height={178} />
          </div> */}

          <div className='absolute -left-6 top-[-128px] h-[127px] w-[170px] overflow-hidden'>
            {avatar_url && (
              <div className='size-full'>
                <Avatar
                  modelSrc={`${avatar_url}`}
                  animationSrc='/male-spawn-animation.fbx'
                  fov={20}
                  cameraTarget={2}
                  cameraInitialDistance={3}
                  effects={{
                    ambientOcclusion: true,
                  }}
                />
              </div>
            )}
          </div>

          {/* Profile Picture And User Info */}
          <div className='-mt-9 flex w-full select-none items-center justify-end'>
            <div
              className='relative overflow-hidden rounded-full border-[3px]'
              style={{
                borderRadius: '50%',
                height: 50,
                width: 50,
              }}
              onClick={handleSwitchProfile}
            >
              {!switchProfile ? (
                <Image
                  src={user.user_image ? user.user_image : '/card/defaultbuddha.svg'}
                  alt='profile-pic'
                  fill
                  unoptimized
                  quality={60}
                  objectFit='cover'
                  className='rounded-full transition-all duration-500 ease-in-out hover:scale-125'
                />
              ) : (
                <>
                  <Image
                    src={'/card/defaultbuddha.svg'}
                    alt='profile-pic'
                    fill
                    unoptimized
                    quality={60}
                    objectFit='cover'
                    className='rounded-full transition-all duration-500 ease-in-out hover:scale-125'
                  />
                </>
              )}
              <div className='z-20 size-full bg-white/40'></div>
            </div>
          </div>

          {/* About User */}
          <div className='flex w-full justify-center p-2 text-black'>
            <AboutUser userData={user} />
          </div>

          {/* User's Achievement */}
          <div className='my-4 flex w-full rounded-lg bg-white/60 py-2 shadow-md shadow-black/40'>
            <AchievementsComponent userData={user} />
          </div>

          <div className='absolute right-6 top-36'>...</div>

          {/* Guild */}
          <div className='flex flex-col pl-4 '>
            <div className='group absolute left-4 top-4'>
              <Image
                src={guild.find((guild) => guild.guild_name === user.guild)?.symbol || ''}
                height={30}
                width={30}
                alt='guild'
                loading='lazy'
                className='rounded-full border-2 border-white/50 transition-all duration-300 ease-in-out hover:rotate-180 group-hover:border-white/100'
              />

              <HoverGuild
                hoveredGuild={guild.find((guild) => guild.guild_name === user.guild)?.guild_name.toUpperCase() || ''}
                top={10}
                left={50}
                translateY={10}
              />
            </div>
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
