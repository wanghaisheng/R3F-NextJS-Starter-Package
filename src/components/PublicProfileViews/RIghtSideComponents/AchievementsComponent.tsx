'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'

export default function AchievementsComponent({ userData }) {
  const val = 20
  return (
    <div className='w-full'>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={6}
        freeMode={true}
        modules={[FreeMode]}
        className='flex w-full items-center justify-center'
      >
        {Array.from({ length: val }).map((_, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <div className='size-[58px] rounded-lg  bg-white/80 shadow-inner shadow-black/20'></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
