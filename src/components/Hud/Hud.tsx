'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { MdSwipe } from 'react-icons/md'
import { TbSwipe } from 'react-icons/tb'
import { SiExpertsexchange } from 'react-icons/si'

import SpringModal from '../FormModal/SpringModal'

const Hud = () => {
  const [isOpen, setIsOpen] = useState(false)

  const pathname = usePathname()
  const [hideMiddleNav, setHideMiddleNav] = useState(true)

  useEffect(() => {
    if (
      pathname === '/' ||
      pathname === '/slider' ||
      pathname === '/slider2' ||
      pathname === '/signin' ||
      pathname === '/signup' ||
      pathname === '/guilds' ||
      pathname === '/regions' ||
      pathname === '/adminpage'
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
      <motion.nav className='container fixed bottom-0 z-50 mx-auto flex flex-col items-center justify-center rounded-2xl text-purple-950 dark:text-purple-200 '>
        {/* HUD */}
        {hideMiddleNav ? null : (
          <div className='container mx-auto flex h-16 items-center justify-center px-0 py-2 '>
            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='hidden md:flex'>
              <div className='flex h-10 items-center justify-center gap-2 rounded-full px-14 py-2 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] shadow-[#6B37CA] backdrop-blur-md md:gap-7 lg:gap-14'>
                {pathname === '/slider' ? (
                  <Link href='/slider' aria-label='Go to slider' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    <TbSwipe />
                  </Link>
                ) : (
                  <Link
                    href='/slider'
                    aria-label='Go to slider'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    <TbSwipe />
                  </Link>
                )}
                {pathname === '#' ? (
                  <Link href='#' aria-label='' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    A
                  </Link>
                ) : (
                  <Link
                    href='/#'
                    aria-label=''
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    A
                  </Link>
                )}
                {pathname === '#' ? (
                  <Link href='#' className='py-2 text-2xl font-bold text-[#AD00FF]' aria-label='swipe'>
                    <MdSwipe />
                  </Link>
                ) : (
                  <Link
                    href='#'
                    aria-label='swipe'
                    className='py-2 text-2xl font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    <MdSwipe />
                  </Link>
                )}
                {pathname === '#' ? (
                  <Link href='#' aria-label='' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    <SiExpertsexchange onClick={() => setIsOpen(true)} />
                  </Link>
                ) : (
                  <Link
                    href='#'
                    aria-label='G'
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    <SiExpertsexchange onClick={() => setIsOpen(true)} />
                  </Link>
                )}
                {pathname === '#' ? (
                  <Link href='#' aria-label='' className='py-2 text-2xl font-bold text-[#AD00FF]'>
                    D
                  </Link>
                ) : (
                  <Link
                    href='#'
                    aria-label=''
                    className='py-2 font-semibold transition duration-300 ease-out hover:scale-105 hover:text-purple-600'
                  >
                    D
                  </Link>
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
