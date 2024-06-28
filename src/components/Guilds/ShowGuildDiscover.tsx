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
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { MdArrowUpward } from 'react-icons/md'
import { MdOutlineChangeCircle } from 'react-icons/md'
import { FaChevronDown } from 'react-icons/fa'

const ExpCardShowVertical = dynamic(() =>
  import('../ProfileComponent/PublicProfileComponent/ExpCardShowVeritcal').then((mod) => mod.default),
)

export default function ShowGuildDiscover({
  users,
  filterguild,
  selectedRegionFilter,
  searchTerm,
  viewExp,
  viewMates,
}: {
  users: any
  filterguild: string
  selectedRegionFilter: string
  searchTerm: string
  viewExp: boolean
  viewMates: boolean
}) {
  const swiperRefs = useRef([])
  const [changePosture, setChangePosture] = useState(false)

  const handlePostureChange = () => {
    setChangePosture(!changePosture)
  }

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
          <Swiper className='flex h-[400px] w-full' spaceBetween={50}>
            {filteredFactions.map((publicUser, index) => (
              <SwiperSlide key={index}>
                {viewMates && (
                  <Swiper
                    className='flex size-full'
                    direction={'vertical'}
                    spaceBetween={50}
                    initialSlide={0} // Default slide number 1\
                    navigation={false}
                    loop
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                      swiperRefs.current[index] = swiper
                    }}
                  >
                    <SwiperSlide>
                      <div
                        className={`group relative mx-auto flex h-[87%] w-[90%] flex-col items-center justify-center rounded-lg border-2 shadow-sm transition duration-500 ease-out ${publicUser.guild === 'PADMA' ? 'border-red-500' : publicUser.guild === 'VAJRA' ? 'border-blue-500' : publicUser.guild === 'RATNA' ? 'border-yellow-500' : publicUser.guild === 'KARMA' ? 'border-green-500' : 'border-white'}`}
                      >
                        <div
                          className='relative size-full rounded-lg'
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
                        >
                          {changePosture ? (
                            <Image
                              className='z-10 transition-all duration-300 ease-in-out hover:mt-[2px] hover:-translate-y-3 hover:scale-105'
                              src={publicUser.avatarimg}
                              alt={publicUser.username}
                              loading='lazy'
                              fill
                              onClick={() => swiperRefs.current[index]?.slideNext()}
                            />
                          ) : (
                            <div className='flex size-full items-center justify-center'>Different posture</div>
                          )}
                          <button
                            className={`absolute bottom-2 right-2 z-20 transition-all duration-300 ${changePosture ? 'rotate-180' : 'rotate-0'}`}
                            onClick={handlePostureChange}
                          >
                            <MdOutlineChangeCircle size={20} />
                          </button>
                        </div>
                      </div>
                      <div className='flex w-full justify-between px-9 py-4'>
                        <div>
                          <FcLike />
                        </div>
                        <div>
                          <p
                            onClick={() => swiperRefs.current[index]?.slideNext()}
                            className='animate-bounce cursor-pointer transition-all duration-300 ease-in-out hover:text-purple-400'
                          >
                            <FaChevronDown />
                          </p>
                        </div>
                        <div>!</div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className='flex items-center justify-center p-6'>
                      {/* Info */}
                      <div
                        className={`
          size-full items-start justify-start
          whitespace-nowrap rounded-md border-2 bg-violet-300 text-sm
         text-indigo-800 backdrop-blur-lg
          transition-all ${publicUser.guild === 'PADMA' ? 'border-red-500' : publicUser.guild === 'VAJRA' ? 'border-blue-500' : publicUser.guild === 'RATNA' ? 'border-yellow-500' : publicUser.guild === 'KARMA' ? 'border-green-500' : 'border-white'}
      `}
                      >
                        <button
                          aria-label='Go up'
                          onClick={() => swiperRefs.current[index]?.slidePrev()}
                          className='ml-2 mt-2 cursor-pointer rounded-full bg-purple-800 p-2 text-white transition-all duration-300 ease-in-out hover:bg-violet-500 hover:text-indigo-900'
                        >
                          <MdArrowUpward />
                        </button>
                        <div className='flex w-full flex-col'>
                          <div className='text-center text-lg font-bold md:text-xl lg:text-3xl'>
                            {publicUser ? publicUser.username.toUpperCase() : ''}
                          </div>

                          <Link
                            href={`/public-profile/${publicUser.username}`}
                            className='absolute right-7 top-7 flex size-12 justify-center rounded-full'
                          >
                            <Image
                              src={
                                publicUser.image_urls
                                  ? publicUser.image_urls[publicUser.image_urls.length - 1]
                                  : '/card/abstract3.webp'
                              } // if no image, show image of their guild -- can be done
                              height={80}
                              width={80}
                              loading='lazy'
                              unoptimized
                              className='rounded-full'
                              alt={`${publicUser.username}'s pic`}
                            />
                          </Link>

                          <div className='flex w-full justify-center text-center font-semibold italic'>
                            {publicUser.description}
                          </div>
                          <Link
                            className='fixed bottom-2 w-full text-center font-semibold text-purple-950'
                            href={`/public-profile/${publicUser.username}`}
                          >
                            View {publicUser.username}s Profile
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                )}
                {viewExp && (
                  <SwiperSlide>
                    <div className='flex size-full items-center justify-center'>
                      <div className='mx-2 size-full'>
                        <p className='text-center'>{publicUser.username && publicUser.username}</p>
                        <ExpCardShowVertical experience={publicUser.experience} user={publicUser} pagination={true} />
                      </div>
                    </div>
                  </SwiperSlide>
                )}
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
