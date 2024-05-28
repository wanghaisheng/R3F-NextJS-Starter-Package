import { motion } from 'framer-motion'

import { IoMdArrowRoundDown } from 'react-icons/io'

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
        <div className='container z-50 mx-auto size-full backdrop-blur-md lg:h-full lg:rounded-3xl lg:p-3 lg:shadow-sm lg:shadow-violet-500'>
          <div className='-mb-10 ml-14 flex justify-between'>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                onclose(false)
              }}
              className='flex size-9 items-center justify-center rounded-full bg-violet-400 backdrop-blur-sm'
            >
              <IoMdArrowRoundDown />
            </motion.button>
          </div>
          {children}
        </div>
      </motion.div>
    </>
  )
}

export default FormModal2
