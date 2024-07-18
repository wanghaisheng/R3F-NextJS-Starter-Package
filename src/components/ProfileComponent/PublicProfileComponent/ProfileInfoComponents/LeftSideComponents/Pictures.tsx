'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useEffect, useState } from 'react'

export default function Pictures({ user, user_images }) {
  return (
    <>
      <div className='w-full rounded-lg bg-white/60 p-2'>
        <div className='w-full rounded-lg bg-white/60 p-2'>
          <Swiper slidesPerView={'auto'} spaceBetween={10} className='flex w-full items-center justify-center'>
            {user_images.map((image, i) => (
              <SwiperSlide key={i} style={{ width: 'auto' }}>
                <Image src={image} alt='..' width={100} height={100} unoptimized quality={80} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}
