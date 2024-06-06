'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function VideoHome() {
  const progressCircle = useRef(null)
  const progressContent = useRef(null)
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }

  const guild = 'buddha'

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className='absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-lg'
      >
        <SwiperSlide className='bg-cover bg-center'>
          <div className='absolute left-20 z-20 hidden w-1/4 items-center justify-center lg:flex lg:flex-col'>
            <div className=' flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8'>
              {guild.split('').map((letter, index) => (
                <span key={index}>{letter.toUpperCase()}</span>
              ))}
            </div>
          </div>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/candles.mp4' type='video/mp4' />
          </video>
        </SwiperSlide>
        <SwiperSlide className='bg-cover bg-center'>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
          </video>
        </SwiperSlide>
        <SwiperSlide className='bg-cover bg-center'>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/fire.mp4' type='video/mp4' />
          </video>
        </SwiperSlide>
        <SwiperSlide className='bg-cover bg-center'>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/karma.mp4' type='video/mp4' />
          </video>
        </SwiperSlide>
        <SwiperSlide className='bg-cover bg-center'>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/earth.mp4' type='video/mp4' />
          </video>
        </SwiperSlide>
        <SwiperSlide className='bg-cover bg-center'>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/forest.mp4' type='video/mp4' />
          </video>
        </SwiperSlide>
        <div
          className='absolute bottom-4 right-4 z-10 flex size-12 items-center justify-center font-bold'
          slot='container-end'
        >
          <svg viewBox='0 0 48 48' ref={progressCircle}>
            <circle cx='24' cy='24' r='20'></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  )
}
