'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import AboutUser from './AboutUser'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import HoverGuild from '@/components/HoverEffect/HoverGuild'
import AchievementsComponent from '../RightSideComponents/AchievementsComponent'
import Pictures from './Pictures'

const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })

export default function LeftSidePublicProfile({ user, guild }) {
  const [switchProfile, setSwitchProfile] = useState(false)

  const handleSwitchProfile = () => {
    setSwitchProfile(!switchProfile)
  }

  console.log('guild', guild)

  const avatar_url = user?.avatarurl

  return (
    <>
      {user ? (
        <div className='relative size-full rounded-xl bg-white/50 p-3 shadow-xl shadow-black/30 backdrop-blur-md'>
          {/* CoverPicture */}
          {/* <div className='flex w-full items-center justify-center'>
            <CoverPhoto coverPhotoUrl={user.username} height={178} />
          </div> */}

          {/* USERNAME and description */}
          <div className='absolute -top-10 left-0 flex w-full flex-col items-center justify-center'>
            <div
              className='text-4xl font-bold uppercase text-black/50'
              style={{
                filter: `drop-shadow(0px 0px 2px ${guild.find((guild) => guild.guild_name === user.guild)?.color || 'white'})`,
              }}
            >
              {user.username}
            </div>
            <div className='group flex w-1/2 justify-center overflow-hidden text-center'>
              {/* not hovered */}
              <div className='cursor-pointer text-sm font-light text-black'>
                {user.description.length > 10 ? `${user.description.substring(0, 10)}...` : user.description}
              </div>

              {/* pop up when hovered */}
              <div className='invisible absolute top-[-80px] h-[100px] w-[200px] rounded-lg border bg-white/40 text-start text-sm font-semibold text-black group-hover:visible'>
                {user.description}
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className='absolute -left-6 top-[-128px] h-[127px] w-[170px] overflow-hidden'>
            {avatar_url && (
              <div className='size-full'>
                <Avatar
                  modelSrc={`${avatar_url}?quality=low`}
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

          {/* Profile Picture */}
          <div className='-mt-12 flex w-full select-none items-center justify-end'>
            <div
              className='relative overflow-hidden rounded-full border-[3px]'
              style={{
                borderRadius: '50%',
                height: 65,
                width: 65,
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
                  className='rounded-full object-cover transition-all duration-500 ease-in-out hover:scale-125'
                />
              ) : (
                <>
                  <Image
                    src={'/card/defaultbuddha.svg'}
                    alt='profile-pic'
                    fill
                    unoptimized
                    quality={60}
                    className='rounded-full object-cover transition-all duration-500 ease-in-out hover:scale-125'
                  />
                </>
              )}
            </div>
          </div>

          {/* About User */}
          <div className='flex w-full justify-center p-2 text-black'>
            <AboutUser userData={user} />
          </div>

          {/* User's Achievement */}
          <div className='flex w-full p-2'>
            <AchievementsComponent userData={user} />
          </div>

          {/* Pictures */}
          <div className='h-[310px] w-full p-2'>
            <div className='flex size-full flex-col overflow-auto rounded-lg bg-white/60'>
              {/* Gallery */}
              <section>
                <div className='sticky top-0 z-10 flex w-fit items-center gap-x-1 rounded-br-lg bg-white px-2'>
                  <h2 className='text-lg font-semibold text-black'>Gallery</h2>
                  <IoMdInformationCircleOutline size={22} className='text-blue-400 drop-shadow' />
                </div>
                <div className='w-full rounded-lg'>
                  <Pictures user={user} user_images={user.overall_user_image} />
                </div>
              </section>

              {/* Skills */}
              <section>
                <div className='sticky top-0 z-10 flex w-fit items-center gap-x-1 rounded-r-lg bg-white px-2'>
                  <h2 className='text-lg font-semibold text-black'>Skills</h2>
                  <IoMdInformationCircleOutline size={22} className='text-blue-400 drop-shadow' />
                </div>
                <div className='w-full rounded-lg'>
                  <Pictures user={user} user_images={user.overall_user_image} />
                </div>
              </section>

              {/* Additional Skills or Content */}
              <section>
                <div className='sticky top-0 z-10 flex w-fit items-center gap-x-1 rounded-r-lg bg-white px-2'>
                  <h2 className='text-lg font-semibold text-black'>Additional Skills</h2>
                  <IoMdInformationCircleOutline size={22} className='text-blue-400 drop-shadow' />
                </div>
                <div className='w-full rounded-lg '>
                  <Pictures user={user} user_images={user.overall_user_image} />
                </div>
              </section>
            </div>
          </div>

          {/* Guild */}
          <div className='flex flex-col pl-4 '>
            <div className='group absolute left-0 top-0'>
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
