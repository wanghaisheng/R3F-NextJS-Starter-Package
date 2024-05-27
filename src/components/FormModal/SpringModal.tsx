'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle } from 'react-icons/fi'

const SpringModal = ({ isOpen, setIsOpen }) => {
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
            <FiAlertCircle className='absolute -left-24 -top-24 z-0 rotate-12 text-[250px] text-white/10' />
            <div className='relative z-10'>
              <div className='mx-auto mb-2 grid size-16 place-items-center rounded-full bg-white text-3xl text-indigo-600'>
                <FiAlertCircle />
              </div>
              <h3 className='mb-2 text-center text-3xl font-bold'>Comming Soon!</h3>

              <div className='flex gap-2'>
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
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SpringModal
