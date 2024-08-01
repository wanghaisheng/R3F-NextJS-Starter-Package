'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-cards'

import { EffectCards } from 'swiper/modules'
import { Children, ReactNode } from 'react'

interface CustomCardStackProps {
  children: ReactNode
  height: number
  width: number
  initialSlide: number
  speed: number
  perSlideOffset: number
  slideShadows: boolean
  perSlideRotate: number
}

const CustomCardStack = ({
  children,
  height,
  width,
  speed,
  initialSlide,
  perSlideOffset,
  slideShadows,
  perSlideRotate,
}: CustomCardStackProps) => {
  return (
    <div className='relative p-2'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        speed={speed}
        mousewheel={{
          invert: false,
        }}
        initialSlide={initialSlide}
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
        className='flex items-center justify-center'
        cardsEffect={{
          slideShadows: slideShadows,
          perSlideOffset: perSlideOffset,
          perSlideRotate: perSlideRotate,
        }}
      >
        {Children.map(children, (child, index) => (
          <SwiperSlide key={index} className='overflow-hidden rounded-lg'>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CustomCardStack
