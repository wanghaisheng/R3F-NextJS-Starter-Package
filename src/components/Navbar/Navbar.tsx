'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@/context/UserContext/UserContext'
import { LuLogOut } from 'react-icons/lu'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IoMdArrowRoundBack } from 'react-icons/io'
import Hamburger from 'hamburger-react'
import { RiEarthFill } from 'react-icons/ri'
import { GiShipWheel } from 'react-icons/gi'
import { GiBarbedStar } from 'react-icons/gi'

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
  }

  useEffect(() => {
    if (pathname === '/slider') {
      setHideMiddleNav(true)
    } else {
      setHideMiddleNav(false)
    }
  }, [pathname])

  const { user, logout } = useUser()
  // State to hold the current guild color
  const [guildColor, setGuildColor] = useState(null)
  const [animations, setAnimations] = useState([])

  const [profilePic, setProfilePic] = useState('/card/defaultbuddha.svg')

  // Update imageUrl whenever user's image_urls changes
  useEffect(() => {
    if (user && user.image_urls && user.image_urls.length > 0) {
      setProfilePic(user.image_urls[user.image_urls.length - 1])
    }
  }, [user, user?.image_urls?.length])

  useEffect(() => {
    const fetchAnimations = async () => {
      const animation1 = await fetch('/lottieAnimation/animate.json').then((response) => response.json())
      setAnimations([animation1])
    }

    fetchAnimations()
  }, [])

  // Update guildColor whenever user changes
  useEffect(() => {
    if (user && user.guilds && user.guilds.length > 0) {
      setGuildColor(user.guilds[0].color || 'black') // Default to black if no color
    } else {
      setGuildColor('black') // Default to black if no user or guilds
    }
  }, [user])

  return (
    <>
      <nav className={`fixed top-0 z-50 mx-auto flex w-full items-center justify-between`}>
        {/* Logo and Sign In/Sign Out */}
        <div className='fixed inset-x-0 top-0 mx-auto flex h-20 w-full items-center justify-between px-4 py-2'>
          {/* Logo */}
          <Link href='/hud' className='flex items-center justify-center'>
            <Image
              src={'/logos/lgo.png'}
              className='absolute left-4 animate-rotate-y rounded-full p-2 animate-duration-[4000ms] animate-infinite'
              height={60}
              width={60}
              alt='GG Logo'
            />
          </Link>
          {/* SignIn, SignOut and Logout */}
          <div className='flex items-center justify-center text-black dark:text-white'>
            {user ? (
              <>
                <Link href='/my-profile' onClick={closeMenu}>
                  <div
                    className='mr-2 size-[38px] rounded-full bg-pink-400'
                    key={profilePic}
                    style={{
                      backgroundImage: `url(${profilePic})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>
                </Link>
                <div className='flex'>
                  <Link
                    href='/'
                    onClick={logout}
                    className='group z-10 hidden items-center justify-end rounded-full hover:scale-105 focus:outline-none md:flex'
                    id='user-menu-button'
                    aria-label='Sign Out'
                  >
                    <LuLogOut className='mr-4 size-6 text-red-500' />
                  </Link>
                  <div className='-mr-2 flex items-center md:hidden'>
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
                      className='hidden rounded-xl p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900 md:flex'
                    >
                      REGISTER
                    </div>
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
          <div className='mx-auto flex h-20 items-center justify-center px-4 py-2 transition-all duration-300 '>
            <div className='hidden  md:flex'>
              <div className='flex h-12 items-center justify-center gap-2 rounded-full bg-black/20 px-20 shadow-sm shadow-gray-200 backdrop-blur-md  md:gap-7 lg:gap-14 dark:shadow-[#6B37CA]'>
                <Link
                  href='/hud'
                  className={` ${pathname === '/hud' ? 'scale-110 py-2 text-2xl font-bold text-pink-700 drop-shadow' : 'py-2 font-semibold transition-all duration-300 ease-out hover:scale-105 hover:text-purple-600'}`}
                >
                  <GiShipWheel size={25} />
                </Link>

                <Link
                  href='/discover'
                  className={` ${pathname === '/discover' ? 'scale-110 py-2 text-2xl font-bold text-pink-700 drop-shadow' : 'py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'}`}
                >
                  <GiBarbedStar size={30} />
                </Link>

                <Link
                  href='/regions'
                  className={` ${pathname.startsWith('/regions') ? 'scale-110 py-2 text-2xl font-bold text-pink-700 drop-shadow' : 'py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'}`}
                >
                  <RiEarthFill size={25} />
                </Link>
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
            {/* Navbar for Hamburger */}
            {user ? (
              <div className='-mt-6 flex justify-end pb-4'>
                {user.first_name != null && (
                  <div>
                    <Link
                      href='/my-profile'
                      className='flex items-center gap-x-2 text-sm font-medium text-purple-950 dark:text-violet-400 '
                      onClick={closeMenu}
                    >
                      <p>{user.first_name + ' ' + user.last_name}</p>
                      <div
                        className='size-7 rounded-full'
                        style={{
                          backgroundImage: 'url(/image.png)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          borderRadius: '50%',
                          border: `2px solid ${guildColor}`,
                        }}
                      ></div>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className='-mt-6 flex justify-end pb-4'>
                <span className='text-sm font-medium text-purple-950 dark:text-violet-400'>Guest User</span>
              </div>
            )}
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
                  <Link href='/my-profile' className='hover:text-violet-400' onClick={closeMenu}>
                    Profile
                  </Link>
                </li>
              )}
              <li className='fixed bottom-5 left-10 cursor-pointer '>
                {user ? (
                  <Link
                    href='/'
                    onClick={logout}
                    className='py-4 text-red-500 hover:text-fuchsia-300'
                    aria-label='Sign Out'
                  >
                    Logout
                  </Link>
                ) : (
                  <div
                    onClick={toggleSidebar}
                    className='py-4 text-blue-400 hover:text-fuchsia-300'
                    aria-label='Sign In'
                  >
                    REGISTER
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Hamburger */}
      </nav>
    </>
  )
}

export default Navbar
