'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { TbCards } from 'react-icons/tb'
import Image from 'next/image'
import CustomToolTip from './CustomToolTip'
import SpringModal from '../FormModal/SpringModal'
import { useUser } from '@/UserClientProvider'
import { useSidebar } from '../dom/SidebarProvider'

const Hud = () => {
  const user = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(true)
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/slider' ||
      pathname === '/slider2' ||
      pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/guilds' ||
      pathname === '/adminpage' ||
      pathname === '/homepage-bg'
      // ||
      // pathname.match(/^\/regions\/.*/)
    ) {
      setHideMiddleNav(true)
    } else {
      setHideMiddleNav(false)
    }
  }, [pathname])
  return (
    <>
      <motion.nav className='container fixed bottom-0 z-20 mx-auto flex flex-col items-center justify-center rounded-2xl text-gray-200 dark:text-purple-200 '>
        {/* HUD */}
        {hideMiddleNav ? null : (
          <div className='container mx-auto flex h-16 items-center justify-center px-0 py-2 '>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='hidden md:flex'>
              <div className='flex h-10 items-center justify-center gap-2 rounded-full bg-black/30 px-14 py-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-gray-200 backdrop-blur-md md:gap-7 dark:shadow-[#6B37CA]'>
                <Link
                  href={user ? '/slider' : '/#'}
                  aria-label='Go to slider'
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault()
                    }
                    setIsSidebarOpen(!isSidebarOpen)
                  }}
                >
                  <TbCards className='size-6' />
                  <CustomToolTip content='Slider' top='-7' left='-13' translateY='-20' />
                </Link>
                <Link
                  href='https://ggrelativity.xyz/login'
                  aria-label='gg relativity'
                  target='_blank'
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image src='/logos/relativity.svg' width={45} height={45} alt='GG Logo' className='p-2' />
                  <CustomToolTip content='GG Relativity' top='-7' left='-20' translateY='-10' />
                </Link>
                <Link
                  href='https://office.goinggenius.com.np/signin'
                  aria-label='GG Office'
                  target='_blank'
                  className='group py-2 text-2xl font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image src='/gglogo.svg' width={50} height={50} alt='GG Logo' className='p-2' />
                  <CustomToolTip content='Going Genius' top='-7' left='-22' translateY='-10' />
                </Link>
                <Link
                  href='https://portals.goinggenius.com.np/users/login'
                  aria-label='G'
                  target='_blank'
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image src='/logos/portals.svg' width={45} height={45} alt='GG Logo' className='p-2' />
                  <CustomToolTip content='GG Protals' top='-7' left='-19' translateY='-10' />
                </Link>
                <Link
                  href='#'
                  aria-label=''
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image src='/logos/lgo.png' width={35} height={35} alt='GG Logo' className='p-2' />
                  <CustomToolTip content='Coming Soon' top='-7' left='-24' translateY='-10' />
                </Link>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </>
  )
}

export default Hud
