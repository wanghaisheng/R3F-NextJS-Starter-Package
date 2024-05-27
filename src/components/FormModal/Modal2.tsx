import { motion } from 'framer-motion'

import { IoMdArrowRoundBack } from 'react-icons/io'

const FormModal2 = ({ show, onclose, children }) => {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: show ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
        className='absolute left-0 top-0 z-20 size-full'
      >
        <div className='container mx-auto h-screen w-full backdrop-blur-md lg:h-auto lg:rounded-3xl lg:p-3 lg:shadow-sm lg:shadow-violet-500'>
          {children}
          <div className='my-2 flex justify-between'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                onclose(false)
              }}
              className='flex size-10 items-center justify-center rounded-full bg-violet-400 backdrop-blur-sm'
            >
              <IoMdArrowRoundBack />
            </motion.button>
            <button
              onClick={() => {
                onclose(false)
              }}
              className=' rounded-lg bg-violet-400 p-1'
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default FormModal2
