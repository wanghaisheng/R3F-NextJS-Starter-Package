'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

const guildData = [
  {
    guild_name: 'BUDDHA',
    symbol: '/homepage/Buddha.svg',
    color: 'white',
    element: 'Space',
    guild_video: '/livewallpapers/buddha.mp4',
    description: 'Research, Development, Philosophy',
    skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
    alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
    additionalSkills: ['Innovation', 'data analysis', 'research'],
  },
  {
    guild_name: 'VAJRA',
    symbol: '/homepage/Vajra.svg',
    color: 'blue',
    element: 'Water',
    guild_video: '/livewallpapers/vajra.mp4',
    description: 'Arts, Education , Law, Teaching',
    skills: ['Wisdom', 'clarity', 'calmness', 'emotional intelligence'],
    alignment: ['Leadership across departments', 'conflict resolution', 'team building'],
    additionalSkills: ['Active listening', 'problem-solving from multiple perspectives'],
  },
  {
    guild_name: 'KARMA',
    symbol: '/homepage/Karma.svg',
    color: 'green',
    element: 'Wind',
    guild_video: '/livewallpapers/karma.mp4',
    description: 'IT, Engineering, Computer, Gamer',
    skills: ['Action-oriented', 'perseverance', 'resourcefulness', 'decisiveness'],
    alignment: ['Sales strategy', 'negotiation', 'marketing campaigns', 'lead generation'],
    additionalSkills: ['Public speaking', 'persuasion', 'social media expertise'],
  },
  {
    guild_name: 'RATNA',
    symbol: '/homepage/Ratna.svg',
    color: 'yellow',
    element: 'Earth',
    guild_video: '/livewallpapers/earth.mp4',
    description: 'Management, Finance, Health',
    skills: ['Stability', 'reliability', 'patience', 'empathy'],
    alignment: ['Operations management', 'customer service', 'finance', 'human resources'],
    additionalSkills: ['Organization', 'detail-orientation', 'conflict resolution'],
  },
  {
    guild_name: 'PADMA',
    symbol: '/homepage/Padma.svg',
    color: 'red',
    element: 'Fire',
    guild_video: '/livewallpapers/padma.mp4',

    description: 'Marketing, Designer, Content Creator',
    skills: ['Creativity', 'passion', 'discernment', 'inspiration'],
    alignment: ['Product design', 'brand development', 'content creation', 'innovation'],
    additionalSkills: ['Storytelling', 'user experience (UX) design', 'trend analysis'],
  },
]

export default function VideoHome() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    },
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
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
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
                  href='/hud'
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
              href='/hud'
              aria-label='get started button'
            >
              Get Started
              <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
            </Link>
          </div>
        </SwiperSlide>

        {guildData.map((guild, index) => (
          <SwiperSlide key={index} className='bg-cover bg-center'>
            {guild.guild_name === 'VAJRA' ? (
              <div className='absolute z-20 h-screen w-full bg-[#0C2E5C]/20'></div>
            ) : guild.guild_name === 'BUDDHA' ? (
              <div className='absolute z-20 h-screen w-full bg-white/20'></div>
            ) : guild.guild_name === 'KARMA' ? (
              <div className='absolute z-20 h-screen w-full bg-[#007F13]/20'></div>
            ) : guild.guild_name === 'RATNA' ? (
              <div className='absolute z-20 h-screen w-full bg-[#F8BF43]/20'></div>
            ) : guild.guild_name === 'PADMA' ? (
              <div className='absolute z-20 h-screen w-full bg-[#9E021E]/20'></div>
            ) : null}

            <div
              className={`absolute top-20 z-20 flex w-full items-center justify-center overflow-hidden text-6xl font-extrabold md:text-9xl lg:hidden  ${
                guild.guild_name === 'VAJRA'
                  ? 'text-[#498cff]'
                  : guild.guild_name === 'BUDDHA'
                    ? 'text-white'
                    : guild.guild_name === 'KARMA'
                      ? 'text-[#51fd6b]'
                      : guild.guild_name === 'RATNA'
                        ? 'text-[#ffd372]'
                        : 'text-[#ff627f]'
              }`}
            >
              {guild.guild_name.toUpperCase()}
            </div>
            <div className='absolute left-36 z-20 hidden h-full items-center justify-center lg:flex lg:flex-col'>
              <div
                className={`flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8  ${
                  guild.guild_name === 'VAJRA'
                    ? 'text-[#498cff]'
                    : guild.guild_name === 'BUDDHA'
                      ? 'text-white'
                      : guild.guild_name === 'KARMA'
                        ? 'text-[#51fd6b]'
                        : guild.guild_name === 'RATNA'
                          ? 'text-[#ffd372]'
                          : 'text-[#ff627f]'
                }`}
              >
                {guild.guild_name.split('').map((letter, index) => (
                  <span key={index}>{letter.toUpperCase()}</span>
                ))}
              </div>
            </div>
            <div className='absolute top-36 z-30 mt-20 flex w-full flex-col justify-center lg:mt-0'>
              <div className='flex size-full justify-center'>
                <p className={`text-2xl font-bold lg:text-4xl`}>{guild.description}</p>
              </div>
              <div className='mt-10 flex size-full w-full flex-col items-center justify-center'>
                <h1 className='text-2xl font-bold'>Skills</h1>
                <p className='text-lg font-semibold'>{guild.skills.join(', ')}</p>
              </div>
              <div className='flex w-full items-center justify-center'>
                <div className='flex h-[400px] w-[550px] animate-pulse items-center justify-center rounded-xl bg-black/20'>
                  <p className='text-2xl font-semibold '>
                    Genius Profiles <br /> Comming Soon!!!
                  </p>
                </div>
              </div>
            </div>
            <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
              <source src={guild.guild_video} type='video/mp4' />
            </video>
            <div className='absolute z-30 hidden h-full lg:right-20 lg:flex lg:items-center'>
              <Image src={guild.symbol} height={250} width={250} alt='guild symbol' />
            </div>
            <div className='absolute bottom-0 z-30 flex justify-center lg:hidden'>
              <Image src={guild.symbol} height={80} width={80} alt='guild symbol' />
            </div>
            <div className='absolute right-36 z-20 flex h-[700px] w-[1000px]'>
              {guild.guild_name === 'VAJRA' && (
                <Image
                  src='/homepage/VajraSplash.svg'
                  height={700}
                  width={1000}
                  alt='guild symbol'
                  className='rotate-12'
                />
              )}
            </div>
          </SwiperSlide>
        ))}

        <SwiperSlide className='bg-cover bg-center'>
          <div className='absolute top-20 z-20 flex w-full flex-col items-center justify-center overflow-hidden font-extrabold text-[#FFE400] md:top-36 md:ml-48 md:justify-start'>
            <div className='flex w-full items-center justify-center overflow-hidden text-6xl font-extrabold md:top-36 md:justify-start md:text-7xl'>
              GG ONE
            </div>

            <div className='mt-10 flex w-full flex-col justify-center gap-y-2 text-xl font-semibold lg:justify-start lg:text-3xl'>
              <div className='flex w-full flex-col items-center justify-center lg:items-start lg:justify-start'>
                <p>One ID for Genius Services</p>
                <p>3d Body for Web 3 Family</p>
                <p>
                  Genius Membership for <br />
                  Health, Knowledge and Business
                </p>
                <p>Expertise with experience</p>
                <p>Bring Powerful Skill to Light</p>
                <p>Slider Sub Tagling</p>
                <p>Open Source</p>
                <p className='mt-10 text-2xl font-bold lg:text-4xl'>Get Yours Now</p>
              </div>
            </div>
          </div>

          <div className='absolute z-20 size-96 ' style={{ backgroundImage: '/homepage/VajraSplash.svg' }}></div>
          <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            <source src='/livewallpapers/forest.mp4' type='video/mp4' />
          </video>
          <div className='absolute z-30 hidden h-full lg:right-20 lg:flex lg:items-center'>
            <Image src='/homepage/GGONE.png' height={300} width={300} alt='guild symbol' />
          </div>
          <div className='absolute bottom-0 z-30 flex justify-center lg:hidden'>
            <Image src='/homepage/GGONE.png' height={80} width={80} alt='guild symbol' />
          </div>
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
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
