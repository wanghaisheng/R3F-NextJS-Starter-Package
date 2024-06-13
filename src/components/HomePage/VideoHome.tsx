'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { GoArrowDown } from 'react-icons/go'

const guildData = [
  {
    guild_name: 'BUDDHA',
    symbol: '/guild/buddha.png',
    color: 'white',
    element: 'Space',
    guild_video: '/livewallpapers/buddha.mp4',
    description: 'Development, Engineering & ITAI Services',
    skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
    alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
    additionalSkills: ['Innovation', 'data analysis', 'research'],
  },
  {
    guild_name: 'VAJRA',
    symbol: '/guild/vajra.png',
    color: 'blue',
    element: 'Water',
    guild_video: '/livewallpapers/candles.mp4',
    description: 'All Departments & ITAI Services',
    skills: ['Wisdom', 'clarity', 'calmness', 'emotional intelligence'],
    alignment: ['Leadership across departments', 'conflict resolution', 'team building'],
    additionalSkills: ['Active listening', 'problem-solving from multiple perspectives'],
  },
  {
    guild_name: 'KARMA',
    symbol: '/guild/karma.png',
    color: 'green',
    element: 'Wind',
    guild_video: '/livewallpapers/karma.mp4',
    description: 'Sales & Marketing',
    skills: ['Action-oriented', 'perseverance', 'resourcefulness', 'decisiveness'],
    alignment: ['Sales strategy', 'negotiation', 'marketing campaigns', 'lead generation'],
    additionalSkills: ['Public speaking', 'persuasion', 'social media expertise'],
  },
  {
    guild_name: 'RATNA',
    symbol: '/guild/ratna.png',
    color: 'yellow',
    element: 'Earth',
    guild_video: '/livewallpapers/earth.mp4',
    description: 'Admin & Customer Support',
    skills: ['Stability', 'reliability', 'patience', 'empathy'],
    alignment: ['Operations management', 'customer service', 'finance', 'human resources'],
    additionalSkills: ['Organization', 'detail-orientation', 'conflict resolution'],
  },
  {
    guild_name: 'PADMA',
    symbol: '/guild/padma.png',
    color: 'red',
    element: 'Fire',
    guild_video: '/livewallpapers/fire.mp4',

    description: 'Design & Creative (Working Class)',
    skills: ['Creativity', 'passion', 'discernment', 'inspiration'],
    alignment: ['Product design', 'brand development', 'content creation', 'innovation'],
    additionalSkills: ['Storytelling', 'user experience (UX) design', 'trend analysis'],
  },
]

export default function VideoHome() {
  const progressCircle = useRef(null)
  const progressContent = useRef(null)
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress)
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
  }

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
                  href='/hero'
                  aria-label='get started button'
                >
                  Get Started
                  <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='bg-cover bg-center'>
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
              href='/hero'
              aria-label='get started button'
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
        </SwiperSlide>

        {guildData.map((guild, index) => (
          <SwiperSlide key={index} className='bg-cover bg-center'>
            <div className='absolute top-20 z-20 flex w-full items-center justify-center overflow-hidden text-6xl font-extrabold md:text-9xl lg:hidden'>
              {guild.guild_name.toUpperCase()}
            </div>
            <div className='absolute left-20 z-20 hidden h-full items-center justify-center lg:flex lg:flex-col'>
              <div className=' flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8'>
                {guild.guild_name.split('').map((letter, index) => (
                  <span key={index}>{letter.toUpperCase()}</span>
                ))}
              </div>
            </div>
            <div className='absolute z-20 flex size-full flex-col items-center justify-center'>
              <p className='text-3xl font-bold'>{guild.description}</p>
              <p>{guild.skills.join(', ')}</p>
              <p>{guild.additionalSkills.join(', ')}</p>
              <p>{guild.alignment.join(', ')}</p>
            </div>
            <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
              <source src={guild.guild_video} type='video/mp4' />
            </video>
            <div className='absolute z-20 flex h-full items-end lg:right-20 lg:items-center'>
              <Image src={guild.symbol} height={200} width={200} alt='guild symbol' />
            </div>
          </SwiperSlide>
        ))}

        <SwiperSlide className='bg-cover bg-center'>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/forest.mp4' type='video/mp4' />
          </video>
        </SwiperSlide>
        <SwiperSlide className='bg-cover bg-center'>
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
            <div className='flex justify-center'>
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
        </SwiperSlide>
        <div
          className='absolute bottom-4 right-4 z-10 flex size-12 items-center justify-center font-bold'
          slot='container-end'
        >
          <svg viewBox='0 0 48 48' ref={progressCircle}>
            <circle cx='24' cy='24' r='20'></circle>
          </svg>
          <span className='absolute' ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  )
}
