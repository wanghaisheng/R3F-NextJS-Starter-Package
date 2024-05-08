'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { Planet } from 'react-planet'

import { useState, useEffect } from 'react'

// Radial Menu Component
const RadialMenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Planet
        centerContent={
          <div
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              backgroundColor: '#1da8a4',
            }}
          />
        }
        open
        autoClose
        orbitRadius={150}
        rotation={30}
        mass={4}
        tension={500}
        friction={19}
        hideOrbit
      >
        <div className='group relative flex size-5 items-center justify-center rounded-full bg-purple-600'>
          <span className='invisible absolute -left-1/2 bottom-full -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:visible'>
            BUDDHA
          </span>
          <p>B</p>
        </div>

        <div
          style={{
            height: 20,
            width: 20,
            borderRadius: '50%',
            backgroundColor: '#9257ad',
          }}
        />
        <div
          style={{
            height: 20,
            width: 20,
            borderRadius: '50%',
            backgroundColor: '#9257ad',
          }}
        />

        <Planet
          centerContent={
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: '50%',
                backgroundColor: '#1da8a4',
              }}
            />
          }
          autoClose
          orbitRadius={60}
          rotation={60}
          mass={4}
          tension={500}
          friction={19}
          hideOrbit
        >
          <div
            style={{
              height: 20,
              width: 20,
              borderRadius: '50%',
              backgroundColor: '#9257ad',
            }}
          />
          <div
            style={{
              height: 20,
              width: 20,
              borderRadius: '50%',
              backgroundColor: '#9257ad',
            }}
          />
          <div
            style={{
              height: 20,
              width: 20,
              borderRadius: '50%',
              backgroundColor: '#9257ad',
            }}
          />
        </Planet>

        <Planet
          centerContent={
            <div
              style={{
                height: 20,
                width: 20,
                borderRadius: '50%',
                // backgroundColor: isOpen ? 'black' : 'yellow',
              }}
              className={`bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
              onClick={() => setIsOpen(!isOpen)}
            />
          }
          autoClose
          orbitRadius={60}
          rotation={60}
          mass={4}
          tension={500}
          friction={19}
          hideOrbit
        >
          <div
            style={{
              height: 20,
              width: 20,
              borderRadius: '50%',
              backgroundColor: '#9257ad',
            }}
          />
          <div
            style={{
              height: 20,
              width: 20,
              borderRadius: '50%',
              backgroundColor: '#9257ad',
            }}
          />
          <div
            style={{
              height: 20,
              width: 20,
              borderRadius: '50%',
              backgroundColor: '#9257ad',
            }}
          />
        </Planet>
      </Planet>
    </div>
  )
}

const AddRegionsModal = ({ regionIsOpen, setRegionIsOpen }) => {
  const [close, setClose] = useState(false)

  const handleClose = () => {
    setClose(!close)
  }

  return (
    <>
      <AnimatePresence>
        {regionIsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRegionIsOpen(false)}
            className='fixed inset-0 z-50 grid cursor-pointer place-items-center p-8'
          >
            <motion.div
              initial={{ scale: 0, rotate: '12.5deg' }}
              animate={{ scale: 1, rotate: '0deg' }}
              exit={{ scale: 0, rotate: '0deg' }}
              onClick={(e) => e.stopPropagation()}
              className='relative size-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gradient-to-br from-black to-purple-600/50 p-6 text-white shadow-xl'
            >
              <div className='relative z-10 h-96'>
                <div className='my-4 flex flex-col items-center justify-center'>
                  <h1>Do you want to add Regions?</h1>
                  {/* Radial Menu */}
                  <div className='mt-36'>
                    <RadialMenuComponent />
                  </div>
                </div>
                {/* <div className='absolute bottom-2 flex w-full gap-2'>
                  <button
                    onClick={() => setRegionIsOpen(false)}
                    className='w-full rounded bg-transparent py-2 font-semibold text-white transition-colors hover:bg-white/10'
                  >
                    Nah, go back
                  </button>
                  <button
                    onClick={() => setRegionIsOpen(false)}
                    className='w-full rounded bg-white py-2 font-semibold text-indigo-600 transition-opacity hover:opacity-90'
                  >
                    Add
                  </button>
                </div> */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AddRegionsModal
