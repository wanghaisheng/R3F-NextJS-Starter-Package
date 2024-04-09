'use client'

import { motion } from 'framer-motion'

export default function WelcomeComponent() {
  return (
    <div className='mx-20 flex items-center'>
      <div className='flex h-screen w-fit rounded-[30px] border-4 border-[#2E2B3C] bg-[#F8F8F8]/10 px-10 py-4'>
        <div className='flex flex-col'>
          <div className='flex justify-center text-7xl drop-shadow'>WELCOME</div>
          <div>User</div>

          <div>Hello</div>
          <div>Hello</div>
          <div className='flex justify-end'>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='rounded-2xl border-2 p-2 text-white shadow-md '
              href='#'
            >
              Create New Avatar &emsp;&emsp; +
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}
