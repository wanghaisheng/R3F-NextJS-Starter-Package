'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { FaArrowUp } from 'react-icons/fa'

import { useState, useEffect } from 'react'

const IframePage = () => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className='container mx-auto'>
      <button
        onClick={handleScrollToTop}
        className={`fixed bottom-10 right-10 z-50 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 ${
          showButton ? 'block' : 'hidden'
        }`}
      >
        Top
      </button>

      <div className='relative size-full'>
        {/* Row 1 */}
        <div className='flex items-center gap-x-3'>
          <h1 className='text-[30px] font-semibold'>aljlskbvnk</h1>
          <p className='-ml-2 text-xs'>
            {/* Tick/Badge of the user membership */}
            aljdnbv
          </p>
          <div>lajdbvjkb</div>
        </div>
        {/* Row 2 */}
        <div>
          <div className='flex w-full flex-wrap items-center gap-x-2'>
            <h1 className='cursor-pointer font-semibold'>
              10 <span className='text-sm font-normal hover:underline'>Followers</span>
            </h1>
            <span className='text-2xl font-extrabold'>‧</span>
            <h1 className='cursor-pointer font-semibold'>
              10 <span className='text-sm font-normal hover:underline'>Following</span>
            </h1>
            <span className='text-2xl font-extrabold'>‧</span>
            <h1 className='cursor-pointer font-semibold'>
              0 <span className='text-sm font-normal hover:underline'>Connections</span>
            </h1>
          </div>
        </div>
        {/* Row 3 */}
        <div>
          <p className='mt-2 text-sm font-light text-gray-200'>kjadbvkja jv</p>
        </div>
        {/* Row 4 */}
        <div className='mt-2 flex items-start'>
          {/* <MdOutlineInsertLink className='mr-1 mt-1 rotate-45 drop-shadow' size={17} /> */}
          <div className='flex w-full flex-wrap gap-x-2 text-sm drop-shadow'>
            {/* {Links.slice(0, 1).map((link, index) => (
              <Link key={index} href={link.url} target='_blank' className='text-blue-300 hover:underline'>
                {link.name}
              </Link>
            ))} */}
            OK
            {/* {expanded &&
              Links.slice(1).map((link, index) => (
                <Link key={index} href={link.url} target='_blank' className='text-blue-300 hover:underline'>
                  {link.name}
                </Link>
              ))} */}
            <button className='text-xs text-gray-200 hover:underline'>
              {/* {expanded ? 'Show Less' : `+ ${Links.length - 1} More`} */}
            </button>
          </div>
        </div>
        {/* Row 5 */}
        <div className='mt-5'>
          <p className='text-xs font-normal text-gray-200'>
            Followed by <span className='font-bold text-white'>Person1</span> and{' '}
            <span className='font-bold text-white'>Person2</span>
          </p>
        </div>
        {/* Row 6 */}
        <div className='sticky top-20 flex gap-x-2'>
          <button className='rounded-lg bg-white/30 px-2 py-1 text-white hover:bg-slate-800'>Follow</button>
          <button className='rounded-lg bg-white/30 px-2 py-1 text-white hover:bg-slate-800'>Interact</button>
          <button className='rounded-lg bg-white/30 px-2 py-1 text-white hover:bg-slate-800'>Message</button>
          <button className='rounded-lg bg-white/30 px-2 py-1 text-white hover:bg-slate-800'>Swipe</button>
        </div>
        <div className='flex size-full items-center justify-center'>
          <iframe
            src='https://www.spatial.io/embed/Buddy-Blitz-654965ac75a12ef6a86cd763?share=7456046816804876294'
            width='800px'
            height='500px'
            allow='camera; fullscreen; autoplay; display-capture; microphone; clipboard-write'
          ></iframe>
        </div>
        <div className='flex size-full items-center justify-center'>
          <iframe
            src='https://www.spatial.io/embed/Racing-Empire-64b570a71c1f96fd5ea6ca36?share=1111938719881275452'
            width='800px'
            height='500px'
            allow='camera; fullscreen; autoplay; display-capture; microphone; clipboard-write'
          ></iframe>
        </div>
        <div className='flex size-full flex-col items-center justify-center'>
          <iframe width='420' height='315' src='https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=0&mute=1'></iframe>
          {/* Playlist */}
          {/* <h1>YouTube Playlist</h1>
        <iframe
          width='720'
          height='405'
          src='https://www.youtube.com/embed/VIDEO_ID?playlist=VIDEOID_1,VIDEOID_2'
          frameborder='0'
          allowfullscreen
        ></iframe> */}
          {/* YT Controls */}
          <iframe width='420' height='315' src='https://www.youtube.com/embed/tgbNymZ7vqY?controls=0'></iframe>
        </div>
        <div className='h-20'></div>
        <Swiper
          className='flex h-[500px] w-full bg-white'
          spaceBetween={50}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          <SwiperSlide className='text-black'>Horizontal Slide 1</SwiperSlide>
          <SwiperSlide>
            <Swiper
              className='flex size-full bg-white'
              direction={'vertical'}
              spaceBetween={50}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              <SwiperSlide className='text-black'>Vertical Slide 1</SwiperSlide>
              <SwiperSlide className='text-black'>Vertical Slide 2</SwiperSlide>
              <SwiperSlide className='text-black'>Vertical Slide 3</SwiperSlide>
              <SwiperSlide className='text-black'>Vertical Slide 4</SwiperSlide>
              <SwiperSlide className='text-black'>Vertical Slide 5</SwiperSlide>
            </Swiper>
          </SwiperSlide>
          <SwiperSlide className='text-black'>Horizontal Slide 3</SwiperSlide>
          <SwiperSlide className='text-black'>Horizontal Slide 4</SwiperSlide>
        </Swiper>

        <div className='h-20'></div>
      </div>

      <div className='bg-black p-10 text-white'>Scroll Down</div>
      <div className='h-screen bg-gray-200 p-10'>
        This example demonstrates how to create a scroll to top button that becomes visible{' '}
        <strong>when the user starts to scroll the page</strong>.
      </div>
    </div>
  )
}

export default IframePage
