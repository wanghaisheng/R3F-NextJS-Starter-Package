'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle } from 'react-icons/fi'

const GuildsAndRegionsModal = ({ isOpen, setIsOpen }) => {
  return (
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
                <button className='relative mt-5 size-12 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none'>
                  <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-0 hover:opacity-100'>
                    <a
                      href='/slider'
                      className='mb-2 flex size-10 items-center justify-center rounded-full bg-green-500 text-white'
                    >
                      Slider
                    </a>
                    <div className='mb-2 flex size-10 items-center justify-center rounded-full bg-green-500 text-white'>
                      2
                    </div>
                    <div className='mb-2 flex size-10 items-center justify-center rounded-full bg-green-500 text-white'>
                      3
                    </div>
                    <div className='mb-2 flex size-10 items-center justify-center rounded-full bg-green-500 text-white'>
                      4
                    </div>
                    <div className='mb-2 flex size-10 items-center justify-center rounded-full bg-green-500 text-white'>
                      5
                    </div>
                  </div>
                  {/* Add this div for the hover effect */}
                  <div className='pointer-events-none absolute size-full rounded-full border-4 border-blue-600 opacity-0 hover:opacity-100'></div>
                </button>
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
  )
}

export default GuildsAndRegionsModal
