'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer2 = () => {
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='container sticky top-0 z-50 mx-auto flex flex-col items-center justify-between rounded-2xl text-slate-50 '
      >
        {/* For desktop view nav bar */}
        <div className='container mx-auto flex h-20 items-center justify-center px-4 py-2 '>
          <div className='hidden md:flex'>
            <div className='flex h-16 items-center justify-center gap-2 rounded-full border-x-2 border-[#6B37CA] px-20 py-2 shadow-md shadow-[#6B37CA] backdrop-blur-md  md:gap-14'>
              <Link href='#avatar' className='py-2 font-semibold hover:border-b-2 hover:text-sky-600'>
                Avatar
              </Link>
              <Link href='#geniusId' className='py-2 font-semibold hover:border-b-2 hover:text-sky-600'>
                Genius
              </Link>
              <Link href='#card' className='py-2 font-semibold hover:border-b-2 hover:text-sky-600'>
                Card
              </Link>
              <Link href='#experience' className='py-2 font-semibold hover:border-b-2 hover:text-sky-600'>
                Experience
              </Link>
              <Link href='#skills' className='py-2 font-semibold hover:border-b-2 hover:text-sky-600'>
                Skills
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Footer2
