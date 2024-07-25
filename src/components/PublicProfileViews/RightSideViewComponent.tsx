'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import AboutUser from '../ProfileComponent/PublicProfileComponent/ProfileInfoComponents/LeftSideComponents/AboutUser'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import HoverGuild from '@/components/HoverEffect/HoverGuild'
import AchievementsComponent from '../ProfileComponent/PublicProfileComponent/ProfileInfoComponents/RightSideComponents/AchievementsComponent'
import Pictures from '../ProfileComponent/PublicProfileComponent/ProfileInfoComponents/LeftSideComponents/Pictures'
import GGCard from '../GGFlipCards/GGCard'
import CustomSwiper from '../MyComponents/CustomSwiper'

export default function RightSideViewComponent({ user, guild }) {
  return (
    <>
      {user ? (
        <div className='relative p-2'>
          {/* Card */}
          <div className=' h-[200px] w-full rounded-[7.35039px] '>
            <GGCard userData={user} />
          </div>

          <div className='mt-2 w-full rounded-md bg-white/60 px-2 py-1 text-black'>
            <h1 className='text-[16px] font-bold '>BIO</h1>
            <p className='text-[12px] font-semibold'>{user.description}</p>
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
          {/* <div className='flex flex-col pl-4 '>
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
          </div> */}
        </div>
      ) : (
        <div className='flex size-full items-center justify-center'>
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}
