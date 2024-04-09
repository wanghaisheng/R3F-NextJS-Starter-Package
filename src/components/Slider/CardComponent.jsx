'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CardComponent() {
  return (
    <div className='relative mx-20 flex flex-col items-center'>
      <div className='flex h-full w-screen rounded-[30px] border-4 border-[#2E2B3C] bg-[#F8F8F8]/10 px-10 py-4'>
        <div className='flex flex-col '>
          <div className='flex justify-center text-7xl drop-shadow'>Card</div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='absolute right-6 top-6 w-1/3 rounded-2xl border-2 p-2 text-white shadow-md '
          >
            Add New Card
          </motion.button>

          <div className='mt-12 flex'>
            <div className='flex flex-col'>
              <div className='flex'>
                <nav className='my-2 flex justify-center'>
                  <p className='mx-2'>Educational</p>
                  <p className='mx-2'>Work</p>
                  <p className='mx-2'>Gym</p>
                </nav>
              </div>

              <div className='rounded-[20px] border-4 border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                <div className='flex px-10 py-4'>
                  <div className='flex flex-col items-center'>
                    <Image className=' rounded-t-lg object-cover' src='/image.png' alt='' width={402} height={268} />
                    <h1 className='mt-4 text-xl font-semibold'>Educational</h1>
                  </div>
                  <div className='ml-10'>
                    <h1 className='text-2xl font-bold'>School/College Name</h1>
                    <p className='mt-4 '>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cum fugit corrupti aperiam saepe
                      fugiat illum ad iure asperiores quod dolores inventore vitae, quasi nulla pariatur, molestiae
                      animi itaque harum.
                    </p>
                    <p className='mt-4'>Date In :</p>
                    <p className='mt-4'>Date Out :</p>
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button className='rounded-xl bg-black p-2'>Read More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
