'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { Planet } from 'react-planet'

import { useState, useEffect } from 'react'

// Radial Menu Component
const RadialMenuComponent = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      {isSmallScreen ? (
        <Planet
          centerContent={
            <div
              style={{
                height: 60,
                width: 60,
                borderRadius: '50%',
                backgroundColor: '#1da8a4',
              }}
            />
          }
          autoClose
          orbitRadius={90}
          rotation={30}
          hideOrbit
        >
          {/* <div className='group relative flex size-5 items-center justify-center rounded-full bg-purple-600'>
          <span className='invisible absolute -left-1/2 bottom-full -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:visible'>
            BUDDHA
          </span>
          <p>B</p>
        </div> */}

          <Planet
            centerContent={
              <div
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-green-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-green-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  backgroundColor: '#1da8a4',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-pink-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-pink-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
      ) : (
        <Planet
          centerContent={
            <div
              style={{
                height: 60,
                width: 60,
                borderRadius: '50%',
                backgroundColor: '#1da8a4',
              }}
            />
          }
          // open
          autoClose
          orbitRadius={150}
          rotation={30}
          hideOrbit
        >
          {/* <div className='group relative flex size-5 items-center justify-center rounded-full bg-purple-600'>
          <span className='invisible absolute -left-1/2 bottom-full -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:visible'>
            BUDDHA
          </span>
          <p>B</p>
        </div> */}

          <Planet
            centerContent={
              <div
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-green-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-green-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  backgroundColor: '#1da8a4',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-blue-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-blue-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  // backgroundColor: isOpen ? 'black' : 'yellow',
                }}
                className={`absolute left-[-15px] top-[-15px] bg-pink-300 hover:bg-white active:bg-blue-800 ${isOpen ? 'bg-yellow-400' : 'bg-pink-300'}`}
                onClick={() => setIsOpen(!isOpen)}
              />
            }
            autoClose
            orbitRadius={60}
            rotation={60}
            // mass={4}
            // tension={500}
            // friction={19}
            // hideOrbit
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
      )}
    </div>
  )
}

const AddRegionsModal = ({ regionIsOpen, setRegionIsOpen }) => {
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
              className='relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-xl'
            >
              <div className='relative z-10'>
                <div className='mb-60 ml-[-50px] mt-48 flex justify-center'>
                  <RadialMenuComponent />
                </div>
                {/* <div className='mt-36 flex gap-2'>
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
                    Understood!
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
