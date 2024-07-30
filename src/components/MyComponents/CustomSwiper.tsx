'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'
import { Children } from 'react'

const CustomSwiper = ({ children }) => {
  return (
    <div className='container mx-auto px-4'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow]}
        className='relative h-36 py-4'
      >
        {Children.map(children, (child) => (
          <SwiperSlide className='size-full rounded-2xl'>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CustomSwiper
