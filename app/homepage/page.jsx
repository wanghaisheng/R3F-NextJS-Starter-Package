'use client'
import { useCallback, useEffect, useState } from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'
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
    <div className='relative flex flex-col lg:size-full'>
      <div className='absolute -top-14 z-50 flex w-full justify-start pl-28'>
        <p className='animate-pulse rounded-lg p-2 font-semibold  text-purple-200 shadow shadow-violet-400'>
          BETA TESTING
        </p>
      </div>
      <div className='absolute top-0 flex h-[360px] w-full items-center justify-center lg:relative lg:h-[600px]'></div>
      {/* Carousel */}
      <div className='top-10 flex size-full justify-between px-4 lg:absolute'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {/* Slide 1 */}
            <div className='w-full shrink-0 grow lg:min-w-0'>
              <p>Hel</p>
              <img src='/homepage/image.png' alt='' />
            </div>
            {/* Slide 2 */}
            <div className='w-full shrink-0 grow lg:min-w-0'>
              <p>HI</p>
              <img src='/homepage/image2.png' alt='' />
            </div>
            {/* Slide 3 */}
            <div className='w-full shrink-0 grow lg:min-w-0'>
              <p>HO</p>
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
    </div>
  )
}
