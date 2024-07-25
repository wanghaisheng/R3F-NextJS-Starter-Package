// components/CustomSwiper.js
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

const CustomSwiper = ({ children }) => {
  const swiperStyles = {
    width: '100%',
  }

  const slideStyles = {
    borderRadius: '7.35039px',
    background:
      'linear-gradient(180deg, #AA14F0 -42.59%, rgba(0, 0, 0, 0) -42.59%, #AA14F0 -42.58%, rgba(170, 20, 240, 0.18) 4.35%, rgba(151, 60, 68, 0.055) 99.99%, rgba(185, 54, 245, 0) 100%)',
  }

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[EffectCoverflow, Pagination, Navigation]}
      style={swiperStyles}
    >
      {React.Children.map(children, (child) => (
        <SwiperSlide style={slideStyles}>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomSwiper
