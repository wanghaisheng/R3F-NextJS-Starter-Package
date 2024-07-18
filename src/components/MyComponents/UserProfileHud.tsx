'use client'

import { useUser } from '@/UserClientProvider'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MdOutlineDarkMode } from 'react-icons/md'
import { GiCash } from 'react-icons/gi'
import { IoDiamondSharp } from 'react-icons/io5'

export default function UserProfileHud({
  isSidebarOpen,
  setIsSidebarOpen,
  showSignIn,
  showSignUp,
  setShowSignIn,
  setShowSignUp,
}: {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
  showSignIn: boolean
  showSignUp: boolean
  setShowSignIn: (value: boolean) => void
  setShowSignUp: (value: boolean) => void
}) {
  const { user } = useUser()
  const [profilePic, setProfilePic] = useState('/card/defaultbuddha.svg')

  const [theme, setTheme] = useState('light')

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setShowSignUp(true)
    setShowSignIn(false)
  }

  // Update imageUrl whenever user's image_urls changes
  useEffect(() => {
    if (user && user.image_urls && user.image_urls.length > 0) {
      setProfilePic(user.image_urls[user.image_urls.length - 1])
    }
  }, [user, user?.image_urls?.length])

  return (
    <div className='relative h-[30px] w-[200px] rounded-full border-2 bg-white/20'>
      <div
        className='absolute -right-3 -top-9 size-[54px] overflow-hidden rounded-full border-2 bg-black/60'
        onClick={toggleSidebar}
      >
        <Image
          src={profilePic}
          alt='profile pic'
          fill={true}
          unoptimized
          objectFit='cover'
          className='select-none transition-transform duration-300 ease-in-out hover:scale-125'
        />
      </div>
      {/* Top */}
      <div className='absolute -top-6 flex h-[20px] w-[78%] select-none justify-between'>
        <div className='flex gap-x-1 text-xs'>
          <div className='flex size-[19px] items-center justify-center rounded-full border-2 border-green-500 text-green-500'>
            <GiCash />
          </div>
          <p>13,789</p>
        </div>
        <div className='flex gap-x-1 text-xs'>
          <div className='flex size-[19px] items-center justify-center  rounded-full border-2 border-yellow-500 text-yellow-500'>
            <IoDiamondSharp />
          </div>
          <p>97,869</p>
        </div>

        <div
          className={`size-[19px] rounded-full border-2  ${theme === 'light' ? 'border-white bg-black text-white' : 'border-black bg-white text-black'} transition-all duration-300 ease-in-out`}
          onClick={handleThemeChange}
        >
          <MdOutlineDarkMode />
        </div>
      </div>
    </div>
  )
}
