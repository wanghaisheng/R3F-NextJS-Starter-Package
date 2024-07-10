'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { TbCards } from 'react-icons/tb'
import Image from 'next/image'
import CustomToolTip from '../MyComponents/CustomToolTip'
import SpringModal from '../FormModal/SpringModal'
import { useUser } from '@/UserClientProvider'
import { useSidebar } from '../dom/SidebarProvider'
import Cookies from 'js-cookie'

const Hud = () => {
  const user = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(true)
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
  const token = Cookies.get('token')

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
      <motion.nav className='container fixed bottom-0 z-40 mx-auto flex flex-col items-center justify-center rounded-2xl text-gray-200 dark:text-purple-200 '>
        {/* HUD */}
        {hideMiddleNav ? null : (
          <div className='container mx-auto flex h-16 items-center justify-center px-0 py-2 '>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='hidden md:flex'>
              <div className='flex h-10 items-center justify-center gap-2 rounded-full bg-white/10 px-12 shadow-lg backdrop-blur-md md:gap-x-5 '>
                {token ? (
                  <Link
                    href='/slider'
                    aria-label='Go to slider'
                    className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-violet-300'
                  >
                    <TbCards className='size-6 text-white drop-shadow' />
                    <CustomToolTip content='Slider' top='-7' left='-13' translateY='-20' />
                  </Link>
                ) : (
                  <button
                    aria-label='Go to slider'
                    className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-violet-300'
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <TbCards className='size-6 text-white drop-shadow' />
                    <CustomToolTip content='Slider' top='-7' left='-13' translateY='-20' />
                  </button>
                )}

                <Link
                  href='https://ggrelativity.xyz/login'
                  aria-label='gg relativity'
                  target='_blank'
                  className='group py-2 font-semibold  transition duration-300 ease-out hover:scale-105'
                >
                  <Image src='/logos/relativity.svg' width={47} height={47} alt='GG Logo' className='p-2' />
                  <CustomToolTip content='GG Relativity' top='-7' left='-20' translateY='-10' />
                </Link>
                <Link
                  href='https://www.goinggenius.com.np/'
                  aria-label='GG Office'
                  target='_blank'
                  className='group py-2 font-semibold  transition duration-300 ease-out hover:scale-105'
                >
                  <Image src='/gglogo.svg' width={42} height={42} alt='GG Logo' className='p-2' />
                  <CustomToolTip content='Going Genius' top='-7' left='-22' translateY='-10' />
                </Link>
                <Link
                  href='https://portals.goinggenius.com.np/users/login'
                  aria-label='G'
                  target='_blank'
                  className='group py-2 font-semibold  transition duration-300 ease-out hover:scale-105'
                >
                  <Image src='/logos/portals.svg' width={48} height={48} alt='GG Logo' className='p-2' />
                  <CustomToolTip content='GG Protals' top='-7' left='-19' translateY='-10' />
                </Link>

                {token ? (
                  <Link
                    href={`/public-profile/${user && user.user.username}`}
                    aria-label=''
                    className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105'
                  >
                    <Image src='/logos/lgo.png' width={38} height={38} alt='GG Logo' className='p-2' />
                    <CustomToolTip content='Public Profile' top='-7' left='-24' translateY='-10' />
                  </Link>
                ) : (
                  <button
                    aria-label='Go to slider'
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105'
                  >
                    <Image src='/logos/lgo.png' width={38} height={38} alt='GG Logo' className='p-2' />
                    <CustomToolTip content='Public Profile' top='-7' left='-24' translateY='-10' />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </>
  )
}

export default Hud
