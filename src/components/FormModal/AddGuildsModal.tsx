'use client'

import { Menu } from '@material-tailwind/react'
import { AnimatePresence, motion } from 'framer-motion'

import { useState, useEffect } from 'react'

import { CircleMenu, CircleMenuItem, TooltipPlacement } from 'react-circular-menu'

// Radial Menu Component
const RadialMenuComponent = (props) => {
  return (
    <CircleMenu
      startAngle={-90}
      rotationAngle={360}
      itemSize={2}
      radius={5}
      /**
       * rotationAngleInclusive (default true)
       * Whether to include the ending angle in rotation because an
       * item at 360deg is the same as an item at 0deg if inclusive.
       * Leave this prop for angles other than 360deg unless otherwise desired.
       */
      rotationAngleInclusive={false}
    >
      <CircleMenuItem
        onClick={() => alert('You clicked on BUDDHA')}
        tooltip='BUDDHA'
        // tooltipPlacement={TooltipPlacement.Right}
        style={{ background: '#FFF', color: '#000' }}
      >
        B
      </CircleMenuItem>
      <CircleMenuItem
        style={{ background: '#007090', color: '#000' }}
        onClick={() => alert('You clicked on VAJRA')}
        tooltip='VAJRA'
      >
        V
      </CircleMenuItem>
      <CircleMenuItem onClick={() => alert('You clicked on KARMA')} tooltip='KARMA'>
        K
      </CircleMenuItem>
      <CircleMenuItem onClick={() => alert('You clicked on RATNA')} tooltip='RATNA'>
        R
      </CircleMenuItem>
      <CircleMenuItem onClick={() => alert('You clicked on PADMA')} tooltip='PADMA'>
        P
      </CircleMenuItem>
    </CircleMenu>
  )
}

const AddGuildsModal = ({ isOpen, setIsOpen }) => {
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
              className='relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-xl'
            >
              <div className='relative z-10 h-96'>
                <div className='my-4 flex flex-col items-center justify-center'>
                  <h1>Do you want to add Regions and Guilds?</h1>
                  {/* Radial Menu */}
                  <div className='mt-20'>
                    <RadialMenuComponent />
                  </div>
                </div>
                <div className='absolute bottom-2 flex w-full gap-2'>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='w-full rounded bg-transparent py-2 font-semibold text-white transition-colors hover:bg-white/10'
                  >
                    Nah, go back
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-90'
                  >
                    Add
                  </button>
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
