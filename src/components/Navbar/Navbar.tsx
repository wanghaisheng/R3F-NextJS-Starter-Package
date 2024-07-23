'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@/UserClientProvider'
import { LuLogOut } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Hamburger from 'hamburger-react'
import { RiEarthFill } from 'react-icons/ri'
import { GiShipWheel } from 'react-icons/gi'
import { GiBarbedStar } from 'react-icons/gi'
import CustomToolTip from '../MyComponents/CustomToolTip'

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, showSignIn, showSignUp, setShowSignIn, setShowSignUp }) => {
  const [isOpen, setOpen] = useState(false)
  const closeMenu = () => {
    setOpen(false)
  }

  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(true)
  const [hideTopRightNav, setHideTopRightNav] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setShowSignUp(true)
    setShowSignIn(false)
    setOpen(false)
  }

  useEffect(() => {
    if (pathname === '/slider') {
      setHideMiddleNav(true)
    } else {
      setHideMiddleNav(false)
    }
  }, [pathname])

  const { user, logout } = useUser()

  const logoutAndToggleSidebar = () => {
    logout()
    setIsSidebarOpen(true) // Opens the sidebar
  }

  return (
    <>
      <div className={`fixed right-0 top-3 z-50 flex items-center rounded-full`}>
        {/* SignIn, SignOut and Logout */}
        <div className='flex items-center justify-center text-black dark:text-white'>
          {user ? (
            <>
              <div className='flex'>
                <Link
                  href='/'
                  onClick={logoutAndToggleSidebar}
                  className='group z-10 hidden items-center justify-end rounded-full hover:scale-105 focus:outline-none lg:flex'
                  id='user-menu-button'
                  aria-label='Sign Out'
                >
                  <LuLogOut className='mr-4 size-6 text-red-500' />
                </Link>
                <div className='-mr-2 flex items-center lg:hidden'>
                  <Hamburger toggled={isOpen} toggle={setOpen} color='#4FD1C5' />
                </div>
              </div>
            </>
          ) : (
            <>
              {hideTopRightNav ? null : (
                <div className='text-black dark:text-white'>
                  <div
                    onClick={toggleSidebar}
                    className='hidden rounded-xl p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900 lg:flex'
                  >
                    REGISTER
                  </div>
                  <div className='-mr-2 flex items-center lg:hidden'>
                    <Hamburger toggled={isOpen} toggle={setOpen} color='#4FD1C5' />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* For desktop view nav bar */}
      {hideMiddleNav ? null : (
        <div
          className={`fixed left-1/2 top-0 z-50 mx-auto flex -translate-x-1/2 items-center justify-between rounded-full px-6 py-3`}
        >
          <div className='hidden text-black/70 lg:flex'>
            <div className='flex h-10 items-center justify-center gap-2 rounded-full bg-white px-12 shadow-lg backdrop-blur-md  md:gap-x-7 lg:gap-x-14'>
              <Link
                href='/hud'
                className={`group ${pathname === '/hud' ? 'scale-110 py-2 text-2xl font-bold text-pink-700' : 'py-2 font-semibold transition-all duration-300 ease-out hover:scale-105 hover:text-purple-600'}`}
              >
                <GiShipWheel size={25} className='drop-shadow' />
                <CustomToolTip content='HUD' top='10' left='-9' translateY='30' />
              </Link>

              <Link
                href='/discover'
                className={`group ${pathname === '/discover' ? 'scale-110 py-2 text-2xl font-bold  text-pink-700 drop-shadow' : 'py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'}`}
              >
                <GiBarbedStar size={30} className='drop-shadow' />
                <CustomToolTip content='DISCOVER' top='10' left='-24' translateY='30' />
              </Link>

              <Link
                href='/regions'
                className={`group ${pathname.startsWith('/regions') ? 'scale-110 py-2 text-2xl font-bold text-pink-700 drop-shadow' : 'py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'}`}
              >
                <RiEarthFill size={25} className='drop-shadow' />
                <CustomToolTip content='REGIONS' top='10' left='-20' translateY='30' />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hamburger */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'bg-black/30 opacity-100' : 'pointer-events-none opacity-0 '}`}
        onClick={closeMenu}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-200 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex w-[75%] flex-col bg-slate-800 shadow-xl dark:bg-black`}
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
        <div className='px-4 py-6 '>
          <ul className='flex flex-col gap-y-4'>
            <li>
              {/* avatar and exp */}
              <Link href='/discover' className='hover:text-violet-400' onClick={closeMenu}>
                DISCOVER
              </Link>
            </li>
            <li>
              <Link href='/hud' className='hover:text-violet-400' onClick={closeMenu}>
                HUD
              </Link>
            </li>
            <li>
              <Link href='/regions' className='hover:text-violet-400' onClick={closeMenu}>
                REGIONS
              </Link>
            </li>

            {user && (
              <li>
                <p className='hover:text-violet-400' onClick={toggleSidebar}>
                  PROFILE
                </p>
              </li>
            )}
            <li className='fixed bottom-5 left-10 cursor-pointer '>
              {user ? (
                <Link
                  href='/'
                  onClick={logoutAndToggleSidebar}
                  className='py-4 text-red-500 hover:text-fuchsia-300'
                  aria-label='Sign Out'
                >
                  Logout
                </Link>
              ) : (
                <div onClick={toggleSidebar} className='py-4 text-blue-400 hover:text-fuchsia-300' aria-label='Sign In'>
                  REGISTER
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Hamburger */}
    </>
  )
}

export default Navbar
