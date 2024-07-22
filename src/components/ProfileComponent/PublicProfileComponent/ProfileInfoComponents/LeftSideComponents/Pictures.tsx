'use client'

import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useEffect, useState } from 'react'

export default function Pictures({ user, user_images }) {
  return (
    <>
      <div className='w-full p-2'>
        <Swiper slidesPerView={'auto'} spaceBetween={10} className='flex w-full items-center justify-center'>
          {user_images.map((image, i) => (
            <SwiperSlide key={i} style={{ width: 'auto' }}>
              <div className='size-[100px] rounded-md'>
                <Image src={image} alt='..' fill className='rounded-md object-cover' unoptimized quality={80} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
