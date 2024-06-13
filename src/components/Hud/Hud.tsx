'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { TbSwipe } from 'react-icons/tb'
import { AiFillAlipayCircle, AiFillCheckCircle, AiFillClockCircle, AiFillDribbbleCircle } from 'react-icons/ai'
import Image from 'next/image'

import Lottie from 'lottie-react'
import SpringModal from '../FormModal/SpringModal'
const Hud = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(true)
  const [animations, setAnimations] = useState([])

  useEffect(() => {
    const fetchAnimations = async () => {
      const animation1 = await fetch('/lottieAnimation/circle.json').then((response) => response.json())
      const animation2 = await fetch('/lottieAnimation/slider.json').then((response) => response.json())
      setAnimations([animation1, animation2])
    }

    fetchAnimations()
  }, [])

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
              <div className='flex h-10 items-center justify-center gap-2 rounded-full bg-black/80 px-14 py-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-gray-200 backdrop-blur-md md:gap-7 lg:gap-14 dark:shadow-[#6B37CA]'>
                <Link
                  href='/slider'
                  aria-label='Go to slider'
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  {animations.length > 0 ? (
                    <Lottie
                      animationData={animations[1]}
                      loop={true}
                      autoplay={true}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <TbSwipe />
                  )}
                  <div
                    className={`
          invisible absolute -left-5 top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
                  >
                    Slider
                  </div>
                </Link>
                <Link
                  href='https://ggrelativity.xyz/login'
                  aria-label='gg relativity'
                  target='_blank'
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image
                    src='/logos/relativity.svg'
                    width={45}
                    height={45}
                    alt='GG Logo'
                    className='animate-rotate-y rounded-full p-2 animate-duration-[4000ms] animate-infinite'
                  />
                  <div
                    className={`
          invisible absolute -left-7 top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
          `}
                  >
                    GG Relativity
                  </div>
                </Link>
                <Link
                  href='https://office.goinggenius.com.np/signin'
                  aria-label='GG Office'
                  target='_blank'
                  className='group py-2 text-2xl font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image
                    src='/gglogo.png'
                    width={50}
                    height={50}
                    alt='GG Logo'
                    className='animate-rotate-y rounded-full p-2 animate-duration-[4000ms] animate-infinite'
                  />
                  {animations.length > 0 ? (
                    <Lottie
                      animationData={animations[0]}
                      loop={true}
                      autoplay={true}
                      style={{ width: 50, height: 50 }}
                      className='absolute -top-1'
                    />
                  ) : (
                    <TbSwipe />
                  )}

                  <div
                    className={`
                      invisible absolute -left-5 top-0 -translate-y-8 whitespace-nowrap
                      rounded-md bg-indigo-100 px-2 py-1
                      text-sm text-indigo-800 opacity-20 transition-all
                      group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
                      `}
                  >
                    Going Genius
                  </div>
                </Link>
                <Link
                  href='https://portals.goinggenius.com.np/users/login'
                  aria-label='G'
                  target='_blank'
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image
                    src='/logos/portals.svg'
                    width={45}
                    height={45}
                    alt='GG Logo'
                    className='animate-rotate-y rounded-full p-2 animate-duration-[4000ms] animate-infinite'
                  />
                  <div
                    className={`
          invisible absolute -left-5 top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
                  >
                    GG Portals
                  </div>
                </Link>
                <Link
                  href='#'
                  aria-label=''
                  className='group py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                >
                  <Image
                    src='/logos/lgo.png'
                    width={35}
                    height={35}
                    alt='GG Logo'
                    className='animate-rotate-y rounded-full p-2 animate-duration-[4000ms] animate-infinite'
                  />
                  <div
                    className={`
          invisible absolute -left-5 top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
                  >
                    Coming Soon
                  </div>
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
