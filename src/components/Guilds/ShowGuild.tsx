'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Link from 'next/link'
import HoverDescription from '../HoverEffect/HoverDescription'
import Image from 'next/image'
import { CiCircleMore } from 'react-icons/ci'

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
  // Filter based on guild, continent, and search term
  const filteredFactions = users.filter((user) => {
    return (
      (filterguild ? user.guild === filterguild : true) &&
      (selectedRegionFilter ? user.continent === selectedRegionFilter.toUpperCase() : true) &&
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  console.log('users', users)

  return (
    <div className='h-[300px] w-full'>
      {filteredFactions.length > 0 ? (
        <Swiper spaceBetween={2} slidesPerView={1} className='h-[300px] w-full'>
          {filteredFactions.map((user, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/public-profile/${user.username}`}
                className='relative ml-4 flex h-[260px] w-[283px] flex-col items-center justify-center rounded-lg shadow-sm transition duration-500 ease-out'
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
                  <Image
                    src={user.avatarimg}
                    alt={user.username}
                    layout='fill'
                    objectFit='cover'
                    className='hover:scale-105'
                  />
                </div>
                <div
                  className={`group absolute left-0 top-0 flex size-full items-center rounded-lg pl-4 shadow transition duration-500 ease-out hover:text-purple-300 `}
                >
                  <div className='flex flex-col items-center justify-center text-base font-extrabold drop-shadow'>
                    {user.username.split('').map((letter, index) => (
                      <span key={index}>{letter.toUpperCase()}</span>
                    ))}
                  </div>
                </div>

                <div className='group absolute right-0 top-0'>
                  <div>
                    <CiCircleMore />
                  </div>
                  <HoverDescription top={10} left={-180} translateY={20}>
                    <div className='size-[200px] rounded bg-white text-black'>
                      <div>{user.description}</div>
                    </div>
                  </HoverDescription>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='flex size-full items-center justify-center text-white'>...</div>
      )}
    </div>
  )
}
