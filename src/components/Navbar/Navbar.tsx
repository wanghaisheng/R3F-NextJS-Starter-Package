'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useUser } from '@/context/UserContext/UserContext'
import { LuLogOut } from 'react-icons/lu'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Hamburger from 'hamburger-react'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const closeMenu = () => {
    setOpen(false)
  }

  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(true)
  const [hideTopRightNav, setHideTopRightNav] = useState(false)

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/slider' ||
      pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/public-profile'
    ) {
      setHideMiddleNav(true)
    } else {
      setHideMiddleNav(false)
    }

    if (pathname === '/signin' || pathname === '/signup') {
      setHideTopRightNav(true)
    } else {
      setHideTopRightNav(false)
    }
  }, [pathname])

  const { user, logout } = useUser()

  return (
    <>
      <motion.nav className='container sticky top-0 z-50 mx-auto flex flex-col items-center justify-between rounded-2xl text-slate-50 '>
        {/* Logo and Sign In/Sign Out */}
        <div className='container absolute mx-auto flex h-20 items-center justify-between px-4 py-2 '>
          {/* Logo */}
          <Link href='' className='flex items-center justify-center pl-1 '>
            <Image
              src='/GGlogo.png'
              className='animate-rotate-y rounded-full p-2 animate-duration-[4000ms] animate-infinite'
              height={85}
              width={85}
              alt='GG Logo'
            />
          </Link>
          {/* SignIn, SignOut and Logout */}
          <div className='flex items-center justify-center'>
            {user ? (
              <>
                {user.first_name != null && (
                  <span className='px-2 text-sm font-medium'>{user.first_name + ' ' + user.last_name}</span>
                )}
                <div className='flex'>
                  <Link
                    href='/signin'
                    onClick={logout}
                    className='group z-10 hidden items-center justify-end rounded-full hover:scale-105 focus:outline-none md:flex'
                    id='user-menu-button'
                    aria-label='Sign Out'
                  >
                    <LuLogOut className='mr-4 size-6 text-red-500' />
                  </Link>
                  <div className='-mr-2 flex items-center md:hidden'>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                  </div>
                </div>
              </>
            ) : (
              <>
                {hideTopRightNav ? null : (
                  <div>
                    <Link
                      href='/signin'
                      className='hidden rounded-2xl p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900 md:flex'
                    >
                      Sign-In
                    </Link>
                    <div className='-mr-2 flex items-center md:hidden'>
                      <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* For desktop view nav bar */}
        {hideMiddleNav ? null : (
          <div className='container mx-auto flex h-20 items-center justify-center px-4 py-2 '>
            <div className='hidden md:flex'>
              <div className='flex h-16 items-center justify-center gap-2 rounded-full px-20 py-2 shadow-md shadow-[#6B37CA] backdrop-blur-md md:gap-7 lg:gap-14'>
                {pathname === '/maps' ? (
                  <Link href='/avatars' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    AVATARS
                  </Link>
                ) : (
                  <Link
                    href='/avatars'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    AVATARS
                  </Link>
                )}
                {pathname === '/guilds' ? (
                  <Link href='/guilds' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    GUILDS
                  </Link>
                ) : (
                  <Link
                    href='/guilds'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    GUILDS
                  </Link>
                )}
                {pathname === '/hero' ? (
                  <Link href='/hero' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    HOME
                  </Link>
                ) : (
                  <Link
                    href='/hero'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    HOME
                  </Link>
                )}
                {pathname.startsWith('/regions') ? (
                  <Link href='/regions' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    REGIONS
                  </Link>
                ) : (
                  <Link
                    href='/regions'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    REGIONS
                  </Link>
                )}
                {pathname === '/experience' ? (
                  <Link href='/experience' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    EXP
                  </Link>
                ) : (
                  <Link
                    href='/experience'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    EXP
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hamburger */}

        <div
          className={`fixed inset-0 md:hidden ${isOpen ? 'bg-black/30 opacity-100' : 'pointer-events-none opacity-0 '}`}
          onClick={closeMenu}
        ></div>
        <div
          className={`fixed inset-y-0 left-0 z-30 transition-all duration-200 md:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } flex w-[75%] flex-col bg-violet-400 shadow-xl dark:bg-black`}
        >
          <div className='p-4 '>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='rounded-md text-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white'
              aria-label='Close panel'
            >
              <span className='sr-only'>Close panel</span>

              <IoMdArrowRoundBack className='text-white dark:text-purple-200' />
            </button>
          </div>
          <div className=' px-4 py-6 '>
            {/* Navbar for Hamburger */}
            <ul className='flex flex-col gap-y-4'>
              <li>
                <Link href='/avatars' className='hover:text-violet-400'>
                  AVATARS
                </Link>
              </li>
              <li>
                <Link href='/guilds' className='hover:text-violet-400'>
                  GUILDS
                </Link>
              </li>
              <li>
                <Link href='hero' className='hover:text-violet-400'>
                  HOME
                </Link>
              </li>
              <li>
                <Link href='regions' className='hover:text-violet-400'>
                  REGIONS
                </Link>
              </li>
              <li>
                <Link href='experience' className='hover:text-violet-400'>
                  EXP
                </Link>
              </li>
              <li>
                {user ? (
                  <Link
                    href='/signin'
                    onClick={logout}
                    className='flex w-full items-center justify-center py-4 hover:text-fuchsia-300'
                    aria-label='Sign Out'
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    href='/signin'
                    className='flex w-full items-center justify-center py-4 hover:text-fuchsia-300'
                    aria-label='Sign In'
                  >
                    Sign-In
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Hamburger */}
      </motion.nav>
    </>
  )
}

export default Navbar
