import Image from 'next/image'
import { motion } from 'framer-motion'

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
        className='relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg bg-white p-4'
        onClick={(e) => e.stopPropagation()}
      >
        <button className='absolute right-2 top-2 text-2xl text-white' onClick={onClose}>
          ×
        </button>
        <Image
          src={image}
          alt='Selected picture'
          width={1000}
          height={1000}
          className='max-h-[80vh] w-auto object-contain'
          unoptimized
        />
        <div className='mt-4 flex justify-between'>
          <div className='flex space-x-4'>
            <button className='text-red-500'>♥ 276</button>
            <button className='text-purple-500'>💬 240</button>
            <button className='text-blue-500'>↗ 130</button>
          </div>
          <button className='text-yellow-500'>⭐ 4</button>
        </div>
      </div>
    </motion.div>
  )
}

export default ImagePopUp
