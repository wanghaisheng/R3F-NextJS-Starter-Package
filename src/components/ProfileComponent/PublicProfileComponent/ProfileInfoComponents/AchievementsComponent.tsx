'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'

export default function AchievementsComponent({ userData }) {
  const val = 20
  return (
    <Swiper
      spaceBetween={20}
      freeMode={true}
      modules={[FreeMode]}
      breakpoints={{
        // When window width is >= 320px
        320: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        // When window width is >= 480px
        480: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        // When window width is >= 640px
        640: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        // When window width is >= 768px
        768: {
          slidesPerView: 6,
          spaceBetween: 15,
        },
        // When window width is >= 1024px
        1024: {
          slidesPerView: 7,
          spaceBetween: 20,
        },
        // When window width is >= 1280px
        1280: {
          slidesPerView: 8,
          spaceBetween: 20,
        },
      }}
      className='flex w-full items-center justify-center'
    >
      {Array.from({ length: val }).map((_, i) => (
        <SwiperSlide key={i}>
          <div className='size-16 rounded-full border bg-white/20'></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
