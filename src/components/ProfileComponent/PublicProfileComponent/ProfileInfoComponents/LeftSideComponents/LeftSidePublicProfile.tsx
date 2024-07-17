'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import AboutUser from './AboutUser'
import CoverPhoto from './CoverPhoto'
import HoverGuild from '@/components/HoverEffect/HoverGuild'

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
        <div className='relative size-full rounded-xl p-3 shadow-xl shadow-black/30 backdrop-blur-lg'>
          {/* CoverPicture */}
          <div className='flex w-full items-center justify-center'>
            <CoverPhoto coverPhotoUrl={user.username} height={178} />
          </div>

          {/* Profile Picture And User Info */}
          <div className='mt-[-76px] flex w-full items-center justify-center'>
            <div
              className='relative overflow-hidden rounded-full border-2'
              style={{
                borderRadius: '50%',
                height: 140,
                width: 140,
              }}
            >
              {!switchProfile ? (
                <Image
                  src={user.user_image ? user.user_image : '/card/defaultbuddha.svg'}
                  alt='profile-pic'
                  fill
                  unoptimized
                  objectFit='cover'
                  className='rounded-full transition-all duration-[2500ms] ease-in-out hover:scale-125'
                />
              ) : (
                <>
                  {avatar_url && (
                    <div className='size-full bg-white/20 backdrop-blur-3xl'>
                      <Avatar
                        modelSrc={`${avatar_url}`}
                        animationSrc='/male-spawn-animation.fbx'
                        fov={15}
                        cameraTarget={2}
                        cameraInitialDistance={3}
                        effects={{
                          ambientOcclusion: true,
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Switch to toggle profile pic */}
          <div className='absolute left-4 top-3' onClick={handleSwitchProfile}>
            SWITCH
          </div>
          {/* USERNAME */}
          <div className='my-2 flex w-full justify-center text-xl font-semibold'>
            {user.username.charAt(0).toUpperCase()}
            {user.username.slice(1)}
          </div>
          {/* About User */}
          <div className='flex w-full justify-center rounded-lg bg-black/20 p-2 shadow'>
            <AboutUser userData={user} />
          </div>

          <div className='absolute right-6 top-36'>...</div>

          {/* Guild */}
          <div className='flex flex-col pl-4 '>
            <div className='group absolute right-4 top-4'>
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
