'use client'

import { Menu } from '@material-tailwind/react'
import { AnimatePresence, motion } from 'framer-motion'

import { useState, useEffect } from 'react'

import { IoTriangleSharp, IoCubeSharp } from 'react-icons/io5'
import { FaDiamond } from 'react-icons/fa6'
import { BsOctagonFill } from 'react-icons/bs'
import { MdHexagon } from 'react-icons/md'

const AddGuildsModal = ({ isOpen, setIsOpen }) => {
  const data = [
    {
      imgelink:
        'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      guildName: 'BUDDHA',
      guildSymbol: <MdHexagon />,
    },
    {
      imgelink:
        'https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
      guildName: 'VAJRA',
      guildSymbol: <BsOctagonFill />,
    },
    {
      imgelink:
        'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
      guildName: 'KARMA',
      guildSymbol: <FaDiamond />,
    },
    {
      imgelink:
        'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
      guildName: 'RATNA',
      guildSymbol: <IoCubeSharp />,
    },
    {
      imgelink:
        'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
      guildName: 'PADMA',
      guildSymbol: <IoTriangleSharp />,
    },
  ]

  const [active, setActive] = useState(
    'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className='fixed inset-0 z-50 grid cursor-pointer place-items-center p-8'
          >
            <motion.div
              initial={{ scale: 0, rotate: '12.5deg' }}
              animate={{ scale: 1, rotate: '0deg' }}
              exit={{ scale: 0, rotate: '0deg' }}
              onClick={(e) => e.stopPropagation()}
              className='relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-black p-6 text-white shadow-xl'
            >
              <div className='relative z-10'>
                <div className='my-4 flex flex-col items-center justify-center'>
                  <div className='grid gap-4'>
                    <div>
                      <img
                        className='h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[280px]'
                        src={active}
                        alt=''
                      />
                    </div>
                    <div className='grid grid-cols-5 gap-4'>
                      {data.map(({ imgelink, guildName, guildSymbol }, index) => (
                        <div key={index}>
                          <div
                            onClick={() => setActive(imgelink)}
                            className='flex h-20 max-w-full cursor-pointer items-center justify-center rounded-lg object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105'
                          >
                            <p>{guildSymbol}</p>
                          </div>
                          <p className='flex justify-center'>{guildName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AddGuildsModal
