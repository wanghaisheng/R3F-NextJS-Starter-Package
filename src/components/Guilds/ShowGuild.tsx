'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import HoverDescription from '../HoverEffect/HoverDescription'
import Image from 'next/image'
import { CiCircleMore } from 'react-icons/ci'
import { useState } from 'react'

export default function ShowGuild({
  users,
  filterguild,
  selectedRegionFilter,
  searchTerm,
}: {
  users: any
  filterguild: string
  selectedRegionFilter: string
  searchTerm: string
}) {
  const [changedPics, setChangedPics] = useState<{ [key: number]: boolean }>({})
  const [showInfos, setShowInfos] = useState<{ [key: number]: boolean }>({})

  // Change Pic
  const handlePicChange = (index: number) => {
    setChangedPics((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  // Show Info
  const handleShowInfo = (index: number) => {
    setShowInfos((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  // Filter based on guild, continent, and search term
  const filteredFactions = users.filter((user) => {
    return (
      (filterguild ? user.guild === filterguild : true) &&
      (selectedRegionFilter ? user.continent === selectedRegionFilter.toUpperCase() : true) &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className='h-[300px] w-full pt-3'>
      {filteredFactions.length > 0 ? (
        <Swiper spaceBetween={2} slidesPerView={1} className='h-[300px] w-full'>
          {filteredFactions.map((user, index) => (
            <SwiperSlide key={index}>
              <button className='absolute right-8 top-2 z-40 cursor-crosshair' onClick={() => handlePicChange(index)}>
                change
              </button>
              <div
                onClick={() => handleShowInfo(index)}
                className='relative ml-4 flex h-[260px] w-[283px] cursor-pointer flex-col items-center justify-center rounded-lg shadow-sm transition duration-500 ease-out'
              >
                <div
                  className='absolute inset-0 rounded-lg'
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: `drop-shadow( 0px 0px 3px rgba(${
                      user.guild === 'PADMA'
                        ? '255, 0, 0, 1'
                        : user.guild === 'VAJRA'
                          ? '0, 0, 255, 1'
                          : user.guild === 'RATNA'
                            ? '255, 255, 0, 1'
                            : user.guild === 'KARMA'
                              ? '0, 255, 0, 1'
                              : '255, 255, 255, 1'
                    }))`,
                  }}
                >
                  {/* Image */}
                  <div className='relative size-full overflow-hidden rounded-lg'>
                    {!changedPics[index] ? (
                      <Image
                        src={user.user_image}
                        alt={user.username}
                        layout='fill'
                        objectFit='cover'
                        className='rounded-lg transition-all duration-1000 ease-in-out hover:scale-125'
                        unoptimized
                        loading='lazy'
                      />
                    ) : (
                      <Image
                        src={user.avatarimg}
                        alt={user.username}
                        layout='fill'
                        objectFit='cover'
                        className='transition-all duration-1000 ease-in-out hover:scale-105'
                      />
                    )}
                    {/* Username */}
                    <div
                      className={`absolute left-0 top-0 flex h-full items-center pl-4 transition duration-500 ease-out hover:text-purple-300 `}
                    >
                      <div className='flex flex-col items-center justify-center text-base font-extrabold drop-shadow'>
                        {user.username.split('').map((letter, index) => (
                          <span key={index}>{letter.toUpperCase()}</span>
                        ))}
                      </div>
                    </div>
                    {/* Description */}
                    <div
                      className={`absolute z-40 flex size-full justify-center transition-all duration-300 ease-in-out ${showInfos[index] ? 'top-[40%]' : 'top-[500px] '}`}
                    >
                      <div className='flex h-[67%] w-[90%] flex-col items-center rounded-lg bg-white/80 shadow backdrop-blur-md transition-all duration-300 ease-in-out'>
                        <div className='text-black'>
                          <div>{user.description}</div>
                        </div>
                        <Link
                          className='absolute bottom-5 text-blue-500 hover:text-blue-700 hover:underline'
                          href={`/public-profile/${user.username}`}
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='flex size-full items-center justify-center text-white'>...</div>
      )}
    </div>
  )
}
