'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Pagination, Scrollbar } from 'swiper/modules'
import Link from 'next/link'

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

  return (
    <div className='h-[300px] w-full'>
      {filteredFactions.length > 0 ? (
        <Swiper
          modules={[Pagination, Scrollbar]}
          scrollbar={{ draggable: true, hide: false }}
          pagination={{ clickable: true }}
          spaceBetween={2}
          slidesPerView={1}
          className='h-[300px] w-full'
        >
          {filteredFactions.map((user, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/public-profile/${user.username}`}
                className='relative ml-4 flex h-[260px] w-[283px] flex-col items-center justify-center rounded-lg shadow-sm transition duration-500 ease-out hover:scale-105'
              >
                <div
                  className='absolute inset-0 rounded-lg'
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%), url(${user.avatarimg})`,
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
                ></div>
                <div
                  className={`group absolute bottom-0 flex w-full items-center rounded-b-md bg-purple-950/60 px-3 py-2 shadow transition duration-500 ease-out hover:bg-purple-900/80 hover:text-purple-300 `}
                >
                  <h1 className='flex w-full items-center justify-center gap-x-4 text-sm font-bold transition duration-300 ease-in-out'>
                    {user.username.toUpperCase()}
                  </h1>
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
