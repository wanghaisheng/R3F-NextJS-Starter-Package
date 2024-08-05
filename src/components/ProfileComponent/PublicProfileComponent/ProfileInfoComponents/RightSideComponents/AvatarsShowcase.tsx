'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'

import { FreeMode } from 'swiper/modules'
import Image from 'next/image'

export default function AvatarsShowcase({ userData }) {
  console.log('ud', userData)

  const avatar_images = userData.avatar_images

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
        {avatar_images.map((img, i) => (
          <SwiperSlide key={i} style={{ width: 'auto' }}>
            <div className='relative size-[44px] overflow-hidden rounded-full bg-white/80 p-1'>
              <Image
                src={img.replace('glb', 'png')}
                alt={i}
                fill
                className='translate-y-3 scale-150 object-cover'
                quality={80}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
