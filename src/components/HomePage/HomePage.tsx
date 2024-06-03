'use client'
import { useCallback, useEffect, useState } from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'
import { GoArrowDown } from 'react-icons/go'
import Link from 'next/link'

export default function HomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

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
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext()
      }, 8000)
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
      <div className='h-full overflow-hidden' ref={emblaRef}>
        <div className='flex h-full'>
          {/* Slide 1 */}
          <div className='relative flex size-full shrink-0 grow items-center justify-center lg:min-w-0'>
            <div
              className='size-full lg:ml-auto lg:w-[50%]'
              style={{
                backgroundImage: 'url(/homepage/image.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <div className='w-[800px]'>
                <h1 className='text-center text-2xl font-bold leading-10 text-white lg:text-6xl'>
                  One Genius ID for every
                  <br />
                  <p className='mt-4'>Genius Tech</p>
                </h1>
                <p className='mt-10 text-center text-sm text-white lg:text-2xl'>
                  Keep all your Genius Services secured with 1 Genius ID <br /> Developer Features Coming Soon
                </p>
                <div className='flex justify-center'>
                  <Link
                    className='relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 '
                    href='/slider'
                  >
                    Get Started
                    <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className='relative flex h-auto w-full shrink-0 grow flex-col items-center justify-center lg:min-w-0'>
            <div
              className='size-full lg:ml-auto'
              style={{
                backgroundImage: 'url(/homepage/image2.png)', // Updated background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className='absolute inset-0 bg-black/65'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <h1 className='bg-custom-gradient bg-clip-text text-center text-lg font-extrabold text-transparent drop-shadow-sm lg:text-6xl'>
                Customized Avatar For
                <br />
                <p className='mt-4'>3d WEB</p>
              </h1>
              <p className='mt-7 text-center text-white lg:text-lg '>
                3d Web made more accessible with 3d Avatar to travel in 3d WEB
              </p>
              <Link
                className='relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 '
                href='/slider'
              >
                Get Started
                <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
              </Link>
              <div className='absolute bottom-10 text-white'>
                <button
                  className='animate-bounce rounded-full border border-white p-3 hover:bg-purple-400'
                  aria-label='down button'
                >
                  <GoArrowDown />
                </button>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className='relative flex h-auto w-full shrink-0 grow flex-col items-center justify-center lg:min-w-0'>
            <div
              className='size-full lg:ml-auto'
              style={{
                backgroundImage: 'url(/homepage/img2.png)', // Updated background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <div className='absolute inset-0 bg-black/65'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <h1 className='bg-custom-gradient-two bg-clip-text text-center text-lg font-extrabold text-transparent drop-shadow-sm lg:text-6xl'>
                Find Genius People
                <br />
                <p className='mt-4'>Around the Universe</p>
              </h1>
              <p className='mt-7 text-center text-white lg:text-2xl '>
                Hidden in Different dimension on the basis of Guild Theory
              </p>
              <div className='flex justify-center gap-x-4'>
                <Link
                  className='relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 '
                  href='/guilds'
                >
                  Guilds
                  <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
                </Link>
                <Link
                  className='relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 '
                  href='/regions'
                >
                  Regions
                  <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
                </Link>
              </div>
              <div className='absolute bottom-10 text-white'>
                <button
                  className='animate-bounce rounded-full border border-white p-3 hover:bg-purple-400'
                  aria-label='down button'
                >
                  <GoArrowDown />
                </button>
              </div>
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
