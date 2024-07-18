'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'

export default function AchievementsComponent({ userData }) {
  const val = 20
  return (
    <Swiper
      slidesPerView={'auto'}
      spaceBetween={20}
      freeMode={true}
      modules={[FreeMode]}
      className='flex w-full items-center justify-center'
    >
      {Array.from({ length: val }).map((_, i) => (
        <SwiperSlide key={i} style={{ width: 'auto' }}>
          <div className='size-16 rounded-full border bg-white/20'></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
