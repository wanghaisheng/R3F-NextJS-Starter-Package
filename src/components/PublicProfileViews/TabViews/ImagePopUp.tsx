import Image from 'next/image'
import { motion } from 'framer-motion'
import { RxCross2 } from 'react-icons/rx'
import { AiFillHeart, AiFillStar } from 'react-icons/ai'
import { FaComment, FaShare } from 'react-icons/fa'

const ImagePopUp = ({ image, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/75'
      onClick={onClose}
    >
      <div
        className='relative flex h-[80vh] w-[90vw] flex-col rounded-lg bg-[#D9D9D9] p-4 lg:flex-row lg:gap-x-4'
        onClick={(e) => e.stopPropagation()}
      >
        <button className='absolute -right-3 -top-3 rounded-full bg-white/80 p-1 text-black' onClick={onClose}>
          <RxCross2 size={24} />
        </button>

        {/* Left side - Image */}
        <div className='size-full lg:w-[65%]'>
          <div className='relative h-[80%] w-full overflow-hidden rounded-lg shadow-lg shadow-black/20'>
            <Image src={image} alt='Selected picture' fill className='object-cover' unoptimized />
          </div>

          {/* Bottom bar */}
          <div className='flex h-[20%] w-full items-center justify-center'>
            <div className='mt-4 flex w-[90%] justify-between rounded-full bg-white px-16 py-2 shadow-lg shadow-black/50'>
              <button className='flex items-center text-red-500'>
                <AiFillHeart size={24} />
                <span className='ml-1'>876</span>
              </button>
              <button className='flex items-center text-purple-500'>
                <FaComment size={22} />
                <span className='ml-1'>400</span>
              </button>
              <button className='flex items-center text-blue-500'>
                <FaShare size={22} />
                <span className='ml-1'>130</span>
              </button>
              <button className='flex items-center text-yellow-500'>
                <AiFillStar size={24} />
                <span className='ml-1'>4.0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Comments */}
        <div className='relative mt-4 size-full rounded-lg bg-white lg:mt-0 lg:w-[35%]'>
          {/* Add comment components here */}
          <div className='h-full overflow-y-auto p-4 text-black'>
            {/* Placeholder for comments */}
            COMMENT HERE
          </div>
          <div className='absolute bottom-2 flex w-full items-center gap-x-2 px-4'>
            <div
              className='size-[48px] rounded-full bg-gray-600'
              style={{
                borderRadius: '50%',
              }}
            ></div>
            <div className='h-[25px] grow rounded-full bg-gray-300 text-black'>Comment Here</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ImagePopUp
