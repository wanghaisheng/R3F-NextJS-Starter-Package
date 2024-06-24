'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Pagination, Scrollbar } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'

// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider' //----------------> module not found error in my branch

export default function ShowGuildDiscover({
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
  const { user } = useUser()

  // Filter based on guild, continent, and search term
  const filteredFactions = users.filter((user) => {
    return (
      (filterguild ? user.guild === filterguild : true) &&
      (selectedRegionFilter ? user.continent === selectedRegionFilter.toUpperCase() : true) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className='size-full'>
      {filteredFactions.length > 0 ? (
        <div className='flex size-full justify-center rounded-lg py-4'>
          <Swiper
            modules={[Pagination, Scrollbar]}
            scrollbar={{ draggable: true, hide: false }}
            pagination={{ clickable: true }}
            spaceBetween={2}
            slidesPerView={1}
            className='size-full'
          >
            {filteredFactions.map((publicUser, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={`/public-profile/${publicUser.username}`}
                  className='group relative ml-6 flex h-[87%] w-[90%] flex-col items-center justify-center rounded-lg shadow-sm transition duration-500 ease-out hover:scale-105'
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
                  <span
                    className={`group absolute bottom-0 flex w-full items-center rounded-b-md bg-purple-950/60 px-3 py-2 shadow transition duration-500 ease-out hover:bg-purple-900/80 hover:text-purple-300 `}
                  >
                    <h1 className='flex w-full items-center justify-center gap-x-4 text-sm font-bold transition duration-300 ease-in-out'>
                      {publicUser.username.toUpperCase()}
                    </h1>
                  </span>
                </Link>
                {/* Left */}
                <div
                  className='
          invisible absolute left-[-450px] top-[0px] hidden h-[490px] w-[400px] items-start justify-start
          whitespace-nowrap rounded-md bg-indigo-200 px-2 py-1
          text-sm text-indigo-800 opacity-20
          transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 lg:block
      '
                >
                  <div className='flex w-full flex-col p-4'>
                    <div className='text-center text-3xl font-bold'>
                      {publicUser ? publicUser.username.toUpperCase() : ''}
                    </div>
                    <div className='my-4 flex w-full justify-center'>
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
            ))}
          </Swiper>
        </div>
      ) : (
        <div className='flex size-full items-center justify-center text-white'>!!!</div>
      )}
    </div>
  )
}
