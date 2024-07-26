import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { EffectCoverflow } from 'swiper/modules'
import { Children } from 'react'

const CustomSwiper = ({ children }) => {
  return (
    <Swiper
      speed={500}
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3}
      coverflowEffect={{
        rotate: 0,
        stretch: 50,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      modules={[EffectCoverflow]}
      style={{
        width: '100%',
      }}
    >
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}

export default CustomSwiper
