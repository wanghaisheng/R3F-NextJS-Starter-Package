'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Link from 'next/link'
import Image from 'next/image'

import { useUser } from '@/context/UserContext/UserContext'

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
    <div className='w-full lg:h-[560px]'>
      {filteredFactions.length > 0 ? (
        <div className='flex flex-wrap justify-center rounded-lg py-4 lg:h-[460px] lg:w-[470px] lg:pr-6'>
          {filteredFactions.map((publicUser, index) => (
            <div className='group' key={index}>
              <Link
                href={`/public-profile/${publicUser.username}`}
                className='group relative mx-1 flex h-[200px] w-[140px] flex-col items-center justify-center rounded-lg shadow-sm transition duration-500 ease-out hover:scale-105'
              >
                <Image
                  className='absolute inset-0 rounded-lg transition-all duration-300 ease-in-out'
                  src={publicUser.avatarimg}
                  alt={publicUser.username}
                  width={240}
                  height={280}
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
                  className={`absolute bottom-7 flex w-full items-center rounded-b-md bg-purple-950 px-3 py-2 shadow transition duration-500 ease-out hover:bg-purple-900 hover:text-purple-300 `}
                >
                  <h1 className='flex w-full items-center justify-center gap-x-4 text-sm font-bold transition duration-300 ease-in-out'>
                    {publicUser.username.toUpperCase()}
                  </h1>
                </span>
              </Link>
              {/* Left */}
              <div
                className='
          invisible absolute left-[-450px] top-[55px] hidden h-[490px] w-[400px] items-start justify-start
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
            </div>
          ))}
        </div>
      ) : (
        <div className='flex size-full items-center justify-center text-white'>!!!</div>
      )}
      {/* Right */}
      <div className='absolute right-[-450px] top-[55px] z-10 hidden h-[490px] w-[400px] items-start justify-start rounded-lg bg-pink-300/20 lg:flex'>
        <div className='flex w-full flex-col justify-center p-4'>
          <div className='text-center text-3xl font-bold'>{user ? user.username.toUpperCase() : ''}</div>
          <div className='my-4 flex h-[180px] w-full justify-center'>
            {user ? (
              <Image
                src={user ? user.image_urls[user.image_urls.length - 1] : '/card/defaultbuddha.svg'}
                alt={`${user.username} photo`}
                height={200}
                width={300}
                objectFit='cover'
                className='rounded-lg shadow-md'
                unoptimized
              />
            ) : (
              <p>Hello User</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
