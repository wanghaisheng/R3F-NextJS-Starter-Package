'use client'

import { useUser } from '@/UserClientProvider'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IoCart, IoDiamondSharp } from 'react-icons/io5'
import { FaCreditCard } from 'react-icons/fa6'
import { HiMiniWallet } from 'react-icons/hi2'
import Link from 'next/link'
import { MdOutlineDarkMode } from 'react-icons/md'
import { GiCash } from 'react-icons/gi'

const tabs = ['.', 'sn', 'Cart', 'Edit', 'Wallet']

export default function UserProfileHud() {
  const pathname = usePathname()
  const [selectedTab, setSelectedTab] = useState('Cart')
  const { user } = useUser()
  const [profilePic, setProfilePic] = useState('/card/defaultbuddha.svg')

  const handleTabClick = (tab) => {
    if (tab === selectedTab) {
      // If the tab is already selected minimize the view
      setSelectedTab('')
    } else {
      setSelectedTab(tab)
    }
  }

  const username = user?.username

  const getIcon = (tab) => {
    switch (tab) {
      case 'Cart':
        return <IoCart className='text-blue-500' size={17} />
      case 'Edit':
        return <FaCreditCard className='text-blue-500' size={17} />
      case 'Wallet':
        return <HiMiniWallet className='text-blue-500' size={17} />
      default:
        return null
    }
  }

  // Theme changer
  const [theme, setTheme] = useState('light')

  // handle theme change
  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  // Update imageUrl whenever user's image_urls changes
  useEffect(() => {
    if (user && user.image_urls && user.image_urls.length > 0) {
      setProfilePic(user.image_urls[user.image_urls.length - 1])
    }
  }, [user, user?.image_urls?.length])

  return (
    <div
      className={` bottom-[20px] right-[32px] z-50 flex h-[33px] select-none items-center space-x-[6px] rounded-full bg-gray-200 py-[6px] pl-[0px] pr-[50px] shadow-lg shadow-black/50 ${user ? 'fixed' : 'hidden'}`}
    >
      <Link
        href={`/public-profile/${username}`}
        className='absolute -right-3 -top-9 size-[62px] overflow-hidden rounded-full border-2 bg-black/60'
      >
        <Image
          src={profilePic}
          alt='profile pic'
          fill={true}
          unoptimized
          className='select-none object-cover transition-transform duration-300 ease-in-out hover:scale-125'
        />
      </Link>

      {/* Top */}
      <div className='absolute -top-6 flex h-[20px] w-[78%] select-none justify-between'>
        <div className='flex gap-x-1 text-xs'>
          <div className='flex size-[19px] items-center justify-center rounded-full border-2 border-green-500 text-green-500'>
            <GiCash />
          </div>
          <p
            style={{
              color: '#ffffff',
              textShadow: '1px 1px 2px #00FF00',
            }}
          >
            13,789
          </p>
        </div>
        <div className='flex gap-x-1 text-xs'>
          <div className='flex size-[19px] items-center justify-center  rounded-full border-2 border-yellow-500 text-yellow-500'>
            <IoDiamondSharp />
          </div>
          <p
            style={{
              color: '#ffffff',
              textShadow: '1px 1px 2px #FFFF00',
            }}
          >
            97,869
          </p>
        </div>

        <div
          className={`size-[19px] rounded-full border-2  ${theme === 'light' ? 'border-white bg-black text-white' : 'border-black bg-white text-black'} transition-all duration-300 ease-in-out`}
          onClick={handleThemeChange}
        >
          <MdOutlineDarkMode />
        </div>
      </div>

      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => handleTabClick(tab)}
          className={`flex size-[26px] items-center justify-center rounded-full shadow-black drop-shadow-lg hover:bg-blue-100 ${
            selectedTab === tab ? 'bg-blue-100' : 'bg-white'
          }`}
        >
          {getIcon(tab)}
        </div>
      ))}
    </div>
  )
}
