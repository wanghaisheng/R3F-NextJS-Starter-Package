'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'

export default function SocialMedias({ userData }) {
  const val = 20
  return (
    <div className='w-full'>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={5}
        freeMode={true}
        modules={[FreeMode]}
        className='flex w-full items-center justify-center'
      >
        {Array.from({ length: val }).map((_, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <div className='size-[44px] rounded-full bg-white/80'></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
