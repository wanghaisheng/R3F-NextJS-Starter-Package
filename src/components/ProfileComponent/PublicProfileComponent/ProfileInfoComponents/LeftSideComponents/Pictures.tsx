'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useEffect, useState } from 'react'

export default function Pictures({ user, user_images }) {
  return (
    <>
      <div className='w-full p-2'>
        <Swiper slidesPerView={3} spaceBetween={10} className='flex w-full items-center justify-center'>
          {user_images.map((image, i) => (
            <SwiperSlide key={i} style={{ width: 'auto' }}>
              <div className='relative size-[110px] overflow-hidden rounded-md'>
                <Image
                  src={image}
                  alt='..'
                  fill
                  className='rounded-md object-cover transition-all duration-300 ease-in-out hover:scale-125'
                  unoptimized
                  quality={80}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
