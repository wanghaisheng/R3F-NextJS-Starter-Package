'use client'

import { useState } from 'react'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'
import { LuGalleryHorizontal } from 'react-icons/lu'
import { IoBarChartOutline } from 'react-icons/io5'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const HoverGuild = dynamic(() => import('@/components/HoverGuild/HoverGuild'))

export default function UserInfoShowcase({ user, skillsData, guild }) {
  const [toggle, setToggle] = useState(false)

  const handletoggle = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <div className='flex size-full flex-col'>
        {user && guild && (
          <>
            <div className='mt-10 flex size-full px-24 '>
              <div className='flex h-[520px] w-full flex-col flex-wrap justify-start rounded-xl bg-[#f5f5f5] px-10 py-3 backdrop-blur-md lg:shadow lg:shadow-purple-500 dark:bg-transparent dark:lg:bg-purple-950/20'>
                <div>
                  <div className='flex items-center justify-start'>
                    <div
                      className='size-12 rounded-full'
                      style={{
                        backgroundImage: `url(${user.image_urls[user.image_urls.length - 1]}/image.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '50%',
                      }}
                    ></div>
                    <div className='flex flex-col pl-4 '>
                      <div className='text-lg font-bold lg:text-2xl'>
                        {user.first_name} {user.last_name}
                      </div>
                      <div className='group absolute right-5 top-5'>
                        <Image
                          src={guild.find((guild) => guild.id === user.guild_id)?.symbol || ''}
                          height={30}
                          width={30}
                          alt='guild'
                          loading='lazy'
                        />
                        <HoverGuild
                          hoveredGuild={guild.find((guild) => guild.id === user.guild_id)?.guild_name}
                          top={10}
                          left={-350}
                          translateY={10}
                        />
                      </div>

                      <div className='mt-2'>Bio: {user.description}</div>
                      <div className='mt-2'>Age: {user.age}</div>
                    </div>
                  </div>
                </div>
                <div className='my-4 flex items-center justify-center gap-x-5'>
                  <h1>
                    <span className='text-lg font-semibold'>10</span> Followers
                  </h1>
                  <h1>
                    <span className='text-lg font-semibold'>0</span> Following
                  </h1>
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

                  <div className='h-60 w-72 rounded-xl px-4 py-2 lg:w-80'>
                    <h1 className='flex justify-center font-semibold'>BADGES</h1>
                    <div className='flex flex-col items-center justify-center'>
                      <p>!</p>
                      <p>!</p>
                      <p>!</p>
                      <p>!</p>
                    </div>
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
