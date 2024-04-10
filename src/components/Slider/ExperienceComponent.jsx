'use client'

import { motion } from 'framer-motion'

export default function ExperienceComponent() {
  return (
    <div className=' mt-10 flex size-full flex-col items-center'>
      <div className='relative flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex flex-col '>
          <div className='flex justify-center text-7xl drop-shadow'>Experience</div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='absolute right-6 top-6 w-56 rounded-2xl border p-2 text-white shadow-md '
          >
            Add New Project
          </motion.button>

          <div className='mt-12 flex'>
            <nav className='my-2 flex justify-center'>
              <p className='mx-2'>Project 1</p>
              <p className='mx-2'>Project 2</p>
              <p className='mx-2'>Project 3</p>
              <p className='mx-2'>Project 4</p>
            </nav>
          </div>

          <div className='rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
            <div className='flex justify-between gap-x-5'>
              <div className='flex items-center'>
                <img className=' rounded-t-lg object-cover' src='/image.png' alt='' />
              </div>
              <div>
                <div className='flex items-center justify-between'>
                  <h1 className='text-2xl font-bold'>Project Name</h1>

                  <h1 className='text-xl font-semibold'>Educational</h1>
                </div>
                <p className='mt-4 '>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum fugit corrupti aperiam saepe fugiat
                  illum ad iure asperiores quod dolores inventore vitae, quasi nulla pariatur, molestiae animi itaque
                  harum.
                </p>
                <p className='mt-4'>Skills : HTML, CSS, NEXT.JS</p>
                <p className='mt-4'>Tools and Tech : VSCODE, FIGMA</p>
              </div>
            </div>
            <div className='flex justify-end'>
              <button className='rounded-xl bg-black p-2 hover:bg-white/20'>Read More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
