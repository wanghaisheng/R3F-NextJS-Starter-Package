'use client'
import { useCallback, useEffect, useState } from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
export default function HomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  // const handleChangeSlide = (index) => {
  //   if (emblaApi) emblaApi.scrollTo(index)
  // }
  const handleScroll = useCallback(
    (event) => {
      if (!emblaApi) return
      const deltaY = event.deltaY
      if (deltaY > 0) {
        emblaApi.scrollNext()
      } else if (deltaY < 0) {
        emblaApi.scrollPrev()
      }
    },
    [emblaApi],
  )
  useEffect(() => {
    window.addEventListener('wheel', handleScroll)
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll])
  // Main Carousel

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext()
      }, 5000)

      return () => clearInterval(autoplay)
    }
  }, [emblaApi])
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <div className='size-full overflow-hidden' ref={emblaRef}>
        <div className='flex size-full'>
          {/* Slide 1 */}
          <div className='relative flex w-full shrink-0 grow items-center justify-center lg:min-w-0'>
            <Image src='/homepage/image.png' alt='' layout='fill' objectFit='cover' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-2xl text-white lg:text-5xl'>Text for Slide 1</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className='relative flex w-full shrink-0 grow items-center justify-center lg:min-w-0'>
            <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
              <p className='text-2xl text-white lg:text-5xl'>HO</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className='relative flex w-full shrink-0 grow items-center justify-center lg:min-w-0'>
            <Image src='/homepage/image2.png' alt='' layout='fill' objectFit='cover' />
            <div className='absolute inset-0 flex items-center justify-center'>
              <p className='text-2xl text-white lg:text-5xl'>Text for Slide 3</p>
            </div>
          </div>
        </div>
        <button
          className='absolute hidden lg:left-10 lg:top-[45%] lg:block lg:text-5xl'
          onClick={scrollPrev}
          aria-label='Previous Slide'
        >
          <MdNavigateBefore />
        </button>
        <button
          className='absolute hidden lg:right-10 lg:top-[45%] lg:block lg:text-5xl'
          onClick={scrollNext}
          aria-label='Next Slide'
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  )
}
