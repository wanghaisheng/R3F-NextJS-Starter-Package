'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useUser } from '@/context/UserContext/UserContext'

import { LuLogOut } from 'react-icons/lu'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isToggled, setToggle] = useState(false)

  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(true)

  useEffect(() => {
    if (pathname === '/' || pathname === '/slider' || pathname === '/signin' || pathname === '/signup') {
      setHideMiddleNav(true)
    } else {
      setHideMiddleNav(false)
    }
  }, [pathname])

  const { user, logout } = useUser()
  const navAnimate = {
    hidden: {
      scaleX: 0,
    },
    show: {
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      width: 0,
      transition: {
        delay: 0.4,
      },
    },
  }

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
              user.first_name != null ? (
                <div className='flex'>
                  <span className='px-2 text-sm font-medium'>{user.first_name + ' ' + user.last_name}</span>
                  <Link
                    href='/signin'
                    onClick={logout}
                    className='group z-10 hidden items-center justify-end rounded-full hover:scale-105 focus:outline-none md:flex'
                    id='user-menu-button'
                  >
                    <LuLogOut className='mr-4 size-6 text-red-500' />
                  </Link>
                  <button className='md:hidden' id='nav-hamburger' onClick={() => setToggle(!isToggled)}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
                      <path
                        fill='currentColor'
                        d='M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22'
                        opacity='.5'
                      />
                      <path
                        fill='currentColor'
                        d='M18.75 8a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75'
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className='flex'>
                  <Link
                    href='/signin'
                    onClick={logout}
                    className='group z-10 hidden items-center justify-end rounded-full hover:scale-105  focus:outline-none md:flex'
                    id='user-menu-button'
                  >
                    <LuLogOut className='mr-4 size-6 text-red-500' />
                  </Link>
                  <button className='md:hidden' id='nav-hamburger' onClick={() => setToggle(!isToggled)}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
                      <path
                        fill='currentColor'
                        d='M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22'
                        opacity='.5'
                      />
                      <path
                        fill='currentColor'
                        d='M18.75 8a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75'
                      />
                    </svg>
                  </button>
                </div>
              )
            ) : (
              <div>
                <Link
                  href='/signin'
                  className='rounded-2xl p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900  '
                >
                  Sign-In
                </Link>
                <button className='md:hidden' id='nav-hamburger' onClick={() => setToggle(!isToggled)}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22'
                      opacity='.5'
                    />
                    <path
                      fill='currentColor'
                      d='M18.75 8a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75m0 4a.75.75 0 0 1-.75.75H6a.75.75 0 0 1 0-1.5h12a.75.75 0 0 1 .75.75'
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* For desktop view nav bar */}
        {hideMiddleNav ? null : (
          <div className='container mx-auto flex h-20 items-center justify-center px-4 py-2 '>
            <div className='hidden md:flex'>
              <div className='flex h-16 items-center justify-center gap-2 rounded-full px-20 py-2 shadow-md shadow-[#6B37CA] backdrop-blur-md md:gap-7 lg:gap-14'>
                {pathname === '/maps' ? (
                  <Link href='/maps' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    MAPS
                  </Link>
                ) : (
                  <Link
                    href='/maps'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    MAPS
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
                {pathname === '/hero3' ? (
                  <Link href='/hero3' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    HOME
                  </Link>
                ) : (
                  <Link
                    href='/hero3'
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

        {/* For mobile view nav bar */}
        {isToggled && (
          <motion.div className='w-full md:hidden' variants={navAnimate} initial='hidden' animate='show' exit='exit'>
            <div className='z-10 flex flex-col items-center justify-center gap-4 rounded-b-3xl bg-black/85 shadow-md shadow-violet-600 md:gap-8'>
              <Link
                href='/maps'
                className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
              >
                MAPS
              </Link>
              <Link
                href='/guilds'
                className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
              >
                GUILDS
              </Link>
              <Link
                href='hero3'
                className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
              >
                HOME
              </Link>
              <Link
                href='regions'
                className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
              >
                REGIONS
              </Link>
              <Link
                href='experience'
                className='w-full rounded-b-2xl border-violet-500 py-4 text-center font-semibold hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
              >
                EXP
              </Link>
              <Link
                href='/signin'
                onClick={logout}
                className='flex w-full items-center justify-center rounded-b-2xl border-violet-500 py-4 hover:border-b-2 hover:text-lg hover:text-fuchsia-300'
              >
                <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    fillRule='evenodd'
                    d='M3.5 9.568v4.864c0 2.294 0 3.44.722 4.153c.655.647 1.674.706 3.596.712c-.101-.675-.122-1.48-.128-2.428a.734.734 0 0 1 .735-.734a.735.735 0 0 1 .744.726c.006 1.064.033 1.818.14 2.39c.103.552.267.87.507 1.108c.273.27.656.445 1.38.54c.744.1 1.73.101 3.145.101h.985c1.415 0 2.401-.002 3.146-.1c.723-.096 1.106-.272 1.378-.541c.273-.27.451-.648.548-1.362c.1-.734.102-1.709.102-3.105V8.108c0-1.397-.002-2.37-.102-3.105c-.097-.714-.275-1.093-.547-1.362c-.273-.27-.656-.445-1.38-.54C17.728 3 16.742 3 15.327 3h-.985c-1.415 0-2.401.002-3.146.1c-.723.096-1.106.272-1.379.541c-.24.237-.404.556-.507 1.108c-.107.572-.134 1.326-.14 2.39a.735.735 0 0 1-.744.726a.734.734 0 0 1-.735-.734c.006-.948.027-1.753.128-2.428c-1.922.006-2.94.065-3.596.712c-.722.713-.722 1.86-.722 4.153m2.434 2.948a.723.723 0 0 1 0-1.032l1.97-1.946a.746.746 0 0 1 1.046 0a.723.723 0 0 1 0 1.032l-.71.7h7.086c.408 0 .74.327.74.73c0 .403-.332.73-.74.73H8.24l.71.7a.723.723 0 0 1 0 1.032a.746.746 0 0 1-1.046 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}

export default Navbar
