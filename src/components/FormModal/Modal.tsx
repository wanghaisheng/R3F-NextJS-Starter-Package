import { motion } from 'framer-motion'
import Image from 'next/image'

const FormModal = ({ show, onclose, children }) => {
  return (
    <motion.div
      style={{
        transform: show ? 'translateX(0%)' : 'translateX(-500%)',
      }}
      className='absolute left-0 top-5 z-20 size-full transition-all duration-700'
    >
      <div className='container mx-auto h-auto max-w-2xl rounded-3xl p-3 shadow-sm shadow-violet-500 backdrop-blur-md'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            onclose(false)
          }}
          className='flex size-10 items-center justify-center rounded-full bg-violet-400 backdrop-blur-sm'
        >
          <Image
            src='https://api.iconify.design/material-symbols:cancel-rounded.svg'
            alt='form modal img'
            height={24}
            width={24}
          />
        </motion.button>
        {children}
      </div>
    </motion.div>
  )
}

export default FormModal
