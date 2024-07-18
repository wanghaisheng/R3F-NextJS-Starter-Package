'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'

export default function AchievementsComponent({ userData }) {
  const val = 20
  return (
    <div className='w-full rounded-lg bg-white/60 p-2'>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={10}
        freeMode={true}
        modules={[FreeMode]}
        className='flex w-full items-center justify-center'
      >
        {Array.from({ length: val }).map((_, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <div className='size-10 rounded-full border border-black bg-white/80'></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
