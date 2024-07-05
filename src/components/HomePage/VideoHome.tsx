'use client'

import toast from 'react-hot-toast'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'
import { motion } from 'framer-motion'
import DiscoverSlideLast from './SlidesHomePage/DiscoverSlideLast'
import GgOne from './SlidesHomePage/GGOne'
import GuildsSlide from './SlidesHomePage/GuildsSlide'
import AvatarSlideHome from './SlidesHomePage/AvatarSlideHome'
import HomeSlide from './SlidesHomePage/HomeSlide'

//static data
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

const getUsers = async () => {
  try {
    const res = await fetch('/api/public/users')
    if (!res.ok) {
      toast.error('Failed to fetch users data')
      return []
    }
    const users = await res.json()

    const filteredUsers = users.filter(
      (user) =>
        user.first_name &&
        user.last_name &&
        user.username &&
        user.email &&
        user.description &&
        user.region.ip &&
        user.avatar.length !== 0 &&
        user.guild_id,
    )
    return filteredUsers
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

const getGuilds = async () => {
  try {
    const res = await fetch('/api/public/guilds')
    if (!res.ok) {
      toast.error('Failed to fetch guilds data')
      return []
    }
    return res.json()
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

export default function VideoHome() {
  const paginationLabels = ['HOME', 'AVATAR', 'BUDDHA', 'VAJRA', 'KARMA', 'RATNA', 'PADMA', 'GGONE', 'DISCOVER']
  const swiperRefs = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const [publicUsers, setPublicUsers] = useState([])
  const [guildData, setGuildData] = useState([])
  const [guilds, setGuilds] = useState([])

  // Fetch the public users
  useEffect(() => {
    const savePublicUsers = async () => {
      const users = await getUsers()
      setPublicUsers(users)
    }
    savePublicUsers()
  }, [])

  // Fetch the guilds
  useEffect(() => {
    const saveGuilds = async () => {
      const guild = await getGuilds()
      setGuildData(guild)
    }
    saveGuilds()
  }, [])

  // Map the guilds with the public users
  useEffect(() => {
    const mapGuildInfo = () => {
      const guilds = publicUsers.map((publicUser) => {
        const guild = guildData.find((g) => g.id === publicUser.guild_id)
        const avatarUrl = publicUser.avatar.length > 0 ? publicUser.avatar[publicUser.avatar.length - 1].avatar_url : ''
        const userImages = publicUser.image_urls
        const experience = publicUser.experience

        return {
          name: `${publicUser.first_name} ${publicUser.last_name}`,
          username: publicUser.username,
          description: publicUser.description,
          image_urls: userImages,
          guild: guild ? guild.guild_name : 'Unknown Guild',
          avatarimg: avatarUrl.replace('glb', 'png'),
          experience: experience,
        }
      })
      setGuilds(guilds)
    }

    if (Array.isArray(publicUsers) && publicUsers.length !== 0 && Array.isArray(guildData) && guildData.length !== 0) {
      mapGuildInfo()
    }
  }, [publicUsers, guildData])

  // Handle the click on the HUD on the bottom of the screen | HUD as an bottom nav bar
  const handleHudClick = (index) => {
    setCurrentSlide(index)
    swiperRefs.current?.slideTo(index, 0)
  }

  // Check if the screen is small
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className='absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2'
        onSwiper={(swiper) => {
          swiperRefs.current = swiper // Store the Swiper instance in a ref
        }}
        onSlideChange={(e) => {
          setCurrentSlide(e.activeIndex) // Update the state when slide changes
        }}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide className='bg-cover bg-center'>
          <HomeSlide />
        </SwiperSlide>

        {/* Avatar Slide */}
        <SwiperSlide className='bg-cover bg-center'>
          <AvatarSlideHome />
        </SwiperSlide>

        {/* Guilds Slide */}
        {guildData.map((guild, index) => (
          <SwiperSlide key={index} className='bg-cover bg-center'>
            <GuildsSlide guild={guild} guilds={guilds} />
          </SwiperSlide>
        ))}

        {/* GG One */}
        <SwiperSlide className='bg-cover bg-center'>
          <GgOne />
        </SwiperSlide>
        {/* Discover */}
        <SwiperSlide className='bg-cover bg-center'>
          <DiscoverSlideLast />
        </SwiperSlide>

        {/* HUD at the bottom */}
        <div className='absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 rounded-full px-2 py-1 shadow shadow-white dark:shadow-purple-700'>
          {paginationLabels.map((label, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`size-4 cursor-pointer rounded-full border-b border-white text-center text-xs font-semibold backdrop-blur-lg lg:size-fit lg:px-4 lg:py-2 dark:border-violet-700 ${
                currentSlide === index ? 'bg-pink-300 text-black' : 'text-white'
              }`}
              onClick={() => handleHudClick(index)}
            >
              {isSmallScreen ? label.substring(0, 1) : label}
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div
          className={`absolute left-0 top-0 h-full items-center text-purple-200 ${currentSlide === 0 ? 'hidden' : 'flex'}`}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className='z-20 ml-5'
            onClick={() => swiperRefs.current?.slidePrev()}
          >
            <MdOutlineNavigateBefore size={30} />
          </motion.div>
        </div>
        <div
          className={`absolute right-0 top-0 flex h-full items-center text-purple-200 ${currentSlide === 8 ? 'hidden' : 'flex'}`}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className='z-20 mr-5'
            onClick={() => swiperRefs.current?.slideNext()}
          >
            <MdOutlineNavigateNext size={30} />
          </motion.div>
        </div>
      </Swiper>
    </div>
  )
}
