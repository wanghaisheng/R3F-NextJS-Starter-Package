'use client'

import { useState } from 'react'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'
import { LuGalleryHorizontal } from 'react-icons/lu'
import { IoBarChartOutline } from 'react-icons/io5'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import CoverPhoto from './CoverPhoto'
import ProfilePic from './ProfilePic'
const HoverGuild = dynamic(() => import('@/components/HoverGuild/HoverGuild'))
import AchievementsComponent from './AchievementsComponent'
import AboutUser from './AboutUser'

export default function UserInfoShowcase({ user, skillsData, guild }) {
  const [toggle, setToggle] = useState(false)

  const handletoggle = () => {
    setToggle(!toggle)
  }

  console.log('userImg', user.image_urls.length)

  return (
    <>
      <div className='flex size-full flex-col'>
        {user && guild && (
          <>
            <div className='flex size-full'>
              <div className='flex w-full flex-col flex-wrap rounded-xl bg-violet-300 px-10 py-3 backdrop-blur-md lg:shadow lg:shadow-purple-500 dark:bg-transparent dark:lg:bg-purple-950/20'>
                <div className='flex w-full items-center justify-center'>
                  <CoverPhoto coverPhotoUrl={user.username} height={160} />
                </div>

                <div className='flex w-full items-center gap-x-5 py-8'>
                  <div className=''>
                    <ProfilePic
                      profilePicUrl={
                        user.image_urls.length !== 0
                          ? user.image_urls[user.image_urls.length - 1]
                          : '/card/defaultbuddha.svg'
                      }
                      size={160}
                    />
                  </div>
                  <div className='grow'>
                    <AboutUser userData={user} />
                  </div>
                </div>

                <AchievementsComponent userData={user} />

                <div className='flex flex-col pl-4 '>
                  <div className='group absolute right-5 top-5'>
                    {/* Guild */}
                    <Image
                      src={guild.find((guild) => guild.id === user.guild_id)?.symbol || ''}
                      height={30}
                      width={30}
                      alt='guild'
                      loading='lazy'
                    />
                    <HoverGuild
                      hoveredGuild={guild.find((guild) => guild.id === user.guild_id)?.guild_name.toUpperCase() || ''}
                      top={10}
                      left={-350}
                      translateY={10}
                    />
                  </div>
                </div>

                <div className='flex flex-col flex-wrap items-center justify-center gap-y-4 py-2 lg:flex-row lg:gap-x-4'>
                  <div className='flex size-72 flex-col items-center justify-center rounded-xl px-4 py-2 md:w-96 md:px-8 xl:px-0'>
                    <button
                      className='absolute bottom-14 left-20 animate-pulse rounded-lg bg-purple-700/30 p-2 transition-colors hover:bg-pink-300/40 hover:text-pink-200'
                      aria-label='toggle gallery'
                      onClick={handletoggle}
                    >
                      {toggle ? <LuGalleryHorizontal size={20} /> : <IoBarChartOutline size={20} />}
                    </button>
                    {toggle ? (
                      <>
                        {user && skillsData ? (
                          <SkillsChartComponent skills={skillsData} />
                        ) : (
                          // Render loading indicator or placeholder while data is being fetched
                          <div className='rounded-lg border p-5'>Recommendations for Skills Card</div>
                        )}
                      </>
                    ) : (
                      <GalleryComponent username={user.username} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
