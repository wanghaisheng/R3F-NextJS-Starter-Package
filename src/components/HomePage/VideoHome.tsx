'use client'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Image from 'next/image'

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
