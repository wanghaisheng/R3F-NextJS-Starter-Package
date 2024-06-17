'use client'
import { useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination } from 'swiper/modules'

export default function HomePage({ users, guilds }) {
  const [currentGuild, setCurrentGuild] = useState('') //current guild state
  const [activeFilter, setActiveFilter] = useState('BUDDHA')
  const handleGuildChange = (guild_name: string) => {
    setCurrentGuild(guild_name.toLowerCase())
    setActiveFilter(guild_name.toUpperCase())
  }

  // console.log('users', users)
  return (
    <div className='relative h-screen'>
      <video key={currentGuild} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
        {currentGuild === 'buddha' ? (
          <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
        ) : currentGuild === 'vajra' ? (
          <source src='/livewallpapers/candles.mp4' type='video/mp4' />
        ) : currentGuild === 'padma' ? (
          <source src='/livewallpapers/fire.mp4' type='video/mp4' />
        ) : currentGuild === 'karma' ? (
          <source src='/livewallpapers/karma.mp4' type='video/mp4' />
        ) : (
          <source src='/livewallpapers/forest.mp4' type='video/mp4' />
        )}
      </video>

      {/* Nav */}
      <div className='absolute top-20 z-10 w-full'>
        <div className='absolute top-0 flex w-full justify-center gap-x-6 font-semibold'>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'BUDDHA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleGuildChange('buddha')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='white' />
              <path
                d='M6.17881 4.75887L10.8764 5.64775M6.17881 4.75887L3 10.0544M6.17881 4.75887L8.29801 3H14.2848L15.5916 4.75887M10.8764 5.64775V11.1891M10.8764 5.64775L15.5916 4.75887M10.8764 11.1891L6.17881 13.8369M10.8764 11.1891L15.5916 13.8369M6.17881 13.8369L3 10.0544M6.17881 13.8369L7.69757 19M3 10.0544V12.4563L5.47241 17.7329L7.69757 19M15.5916 4.75887L18.3996 10.0544M18.3996 10.0544L15.5916 13.8369M18.3996 10.0544L19 12.4563L16.2804 17.7329L14.2848 19M15.5916 13.8369L14.2848 19M7.69757 19H14.2848'
                stroke='black'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'VAJRA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleGuildChange('vajra')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#4A9BD5' />
              <path
                d='M10.6428 3L3 7.00455M10.6428 3L19 7.00455M10.6428 3V6.27645M3 7.00455V15.0137M3 7.00455L10.6428 6.27645M3 7.00455L5.87957 13.3026M3 15.0137L10.6428 19M3 15.0137L5.87957 13.3026M10.6428 19L19 15.0137M10.6428 19L5.87957 13.3026M10.6428 19L15.2544 13.3026M19 15.0137V7.00455M19 15.0137L15.2544 13.3026M19 7.00455L10.6428 6.27645M19 7.00455L15.2544 13.3026M10.6428 6.27645L5.87957 13.3026M10.6428 6.27645L15.2544 13.3026M5.87957 13.3026H15.2544'
                stroke='#030303'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'KARMA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleGuildChange('karma')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#46B58F' />
              <path
                d='M3 7.02733L10.9046 3L19 7.02733M3 7.02733L10.9046 10.7995M3 7.02733V15.0638L10.9046 19M19 7.02733L10.9046 10.7995M19 7.02733V15.0638L10.9046 19M10.9046 10.7995V19'
                stroke='black'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out  ${activeFilter === 'RATNA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleGuildChange('ratna')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#F0BE65' />
              <path
                d='M3 6.87713H19M3 6.87713L11.0758 3L19 6.87713M3 6.87713V15.3595L11.0758 19M3 6.87713L11.0758 19M19 6.87713L11.0758 19M19 6.87713V15.3595L11.0758 19'
                stroke='black'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'PADMA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleGuildChange('padma')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#DA4C5C' />
              <path d='M4 17L10.9521 3L18 17M4 17H18M4 17L10.9521 12.5073L18 17' stroke='black' />
              <path d='M11 12.7351V3' stroke='black' />
            </svg>
          </a>
        </div>
      </div>

      {/* Carousel */}
      <div className='absolute top-32 z-10 flex w-full items-center justify-center'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className='h-[530px] w-[400px] animate-pulse rounded-lg bg-white/20'
        >
          <SwiperSlide className=' bg-cover bg-center p-4'>
            <div className='flex size-full items-center justify-center text-xl font-semibold text-purple-200'>
              Comming Soon!!!
            </div>
          </SwiperSlide>
          <SwiperSlide className='bg-cover bg-center p-4'>
            <div className='flex size-full items-center justify-center text-xl font-semibold text-purple-200'>
              Comming Soon!!!
            </div>
          </SwiperSlide>
          <SwiperSlide className='bg-cover bg-center p-4'>
            <div className='flex size-full items-center justify-center text-xl font-semibold text-purple-200'>
              Comming Soon!!!
            </div>
          </SwiperSlide>
          <SwiperSlide className='bg-cover bg-center p-4'>
            <div className='flex size-full items-center justify-center text-xl font-semibold text-purple-200'>
              Comming Soon!!!
            </div>
          </SwiperSlide>
          <SwiperSlide className='bg-cover bg-center p-4'>
            <div className='flex size-full items-center justify-center text-xl font-semibold text-purple-200'>
              Comming Soon!!!
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
