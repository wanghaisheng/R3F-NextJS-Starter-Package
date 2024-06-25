'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Link from 'next/link'
import Image from 'next/image'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { FcLike } from 'react-icons/fc'

export default function ShowGuildDiscover({
  users,
  filterguild,
  selectedRegionFilter,
  searchTerm,
  viewExp,
}: {
  users: any
  filterguild: string
  selectedRegionFilter: string
  searchTerm: string
  viewExp: boolean
}) {
  // Filter based on guild, continent, and search term
  const filteredFactions = users.filter((user) => {
    return (
      (filterguild ? user.guild === filterguild : true) &&
      (selectedRegionFilter ? user.continent === selectedRegionFilter.toUpperCase() : true) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  console.log('asf', filteredFactions)

  return (
    <div className='size-full'>
      {filteredFactions.length > 0 ? (
        <div className='flex size-full justify-center rounded-lg py-4'>
          <Swiper className='flex h-[400px] w-full' spaceBetween={50}>
            {filteredFactions.map((publicUser, index) => (
              <SwiperSlide key={index}>
                <Swiper
                  className='flex size-full'
                  direction={'vertical'}
                  spaceBetween={50}
                  initialSlide={1} // Default slide number 2\
                  navigation={false}
                  loop
                  modules={[Navigation]}
                >
                  <SwiperSlide className='flex items-center justify-center p-6'>
                    {/* Info */}
                    <div
                      className={`
          size-full items-start justify-start
          whitespace-nowrap rounded-md border-2 bg-violet-300
         text-sm text-indigo-800
          transition-all ${publicUser.guild === 'PADMA' ? 'border-red-500' : publicUser.guild === 'VAJRA' ? 'border-blue-500' : publicUser.guild === 'RATNA' ? 'border-yellow-500' : publicUser.guild === 'KARMA' ? 'border-green-500' : 'border-white'}
      `}
                    >
                      <div className='flex w-full flex-col p-4'>
                        <div className='text-center text-lg font-bold md:text-xl lg:text-3xl'>
                          {publicUser ? publicUser.username.toUpperCase() : ''}
                        </div>
                        <div className='flex w-full justify-center'>
                          <Image
                            src={publicUser.avatarimg}
                            height={100}
                            width={200}
                            unoptimized
                            alt={`${publicUser.username}'s avatar pic`}
                          />
                        </div>
                        <div className='flex w-full justify-center text-center font-semibold italic'>
                          {publicUser.description}
                        </div>
                        <p className='text-sm text-indigo-800'>Guild: {publicUser.guild}</p>
                        <p className='text-sm text-indigo-800'>Continent: {publicUser.continent}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div
                      // href={`/public-profile/${publicUser.username}`}
                      className={`group relative ml-6 flex h-[87%] w-[90%] flex-col items-center justify-center rounded-lg border-2 shadow-sm transition duration-500 ease-out hover:scale-105 ${publicUser.guild === 'PADMA' ? 'border-red-500' : publicUser.guild === 'VAJRA' ? 'border-blue-500' : publicUser.guild === 'RATNA' ? 'border-yellow-500' : publicUser.guild === 'KARMA' ? 'border-green-500' : 'border-white'}`}
                    >
                      <Image
                        className='absolute inset-0 rounded-lg transition-all duration-300 ease-in-out'
                        src={publicUser.avatarimg}
                        alt={publicUser.username}
                        fill
                        style={{
                          background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          objectFit: 'cover',
                          filter: `drop-shadow( 0px 0px 3px rgba(${
                            publicUser.guild === 'PADMA'
                              ? '255, 0, 0, 1'
                              : publicUser.guild === 'VAJRA'
                                ? '0, 0, 255, 1'
                                : publicUser.guild === 'RATNA'
                                  ? '255, 255, 0, 1'
                                  : publicUser.guild === 'KARMA'
                                    ? '0, 255, 0, 1'
                                    : '255, 255, 255, 1'
                          }))`,
                        }}
                      />
                    </div>
                    <div className='flex w-full justify-between px-9 py-4'>
                      <div>
                        <FcLike />
                      </div>
                      <div>!</div>
                      <div>!</div>
                    </div>
                  </SwiperSlide>
                  {viewExp && <SwiperSlide>sa</SwiperSlide>}
                </Swiper>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className='flex size-full items-center justify-center p-4'>
          <div className='flex size-[380px] animate-pulse items-center justify-center rounded bg-white/20 text-white'>
            {' '}
            !!!
          </div>
        </div>
      )}
    </div>
  )
}
