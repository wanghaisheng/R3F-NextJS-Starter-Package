'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'

export default function AchievementsComponent({ userData }) {
  const val = 20
  return (
    <div className='flex w-full flex-nowrap gap-x-5 whitespace-nowrap'>
      <Swiper
        slidesPerView={8}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode]}
        className='flex size-full items-center justify-center'
      >
        {Array.from({ length: val }).map((_, i) => (
          <SwiperSlide key={i}>
            <div className='size-16 rounded-full bg-pink-300'></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
