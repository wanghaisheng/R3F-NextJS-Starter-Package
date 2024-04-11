import { motion } from 'framer-motion'

const FormModal2 = ({ show, onclose, children }) => {
  return (
    <div className={`size-full ${show ? 'block' : 'hidden'} transition-all duration-700`}>
      <div className='container mx-auto h-auto max-w-2xl rounded-3xl bg-black p-3 shadow-sm shadow-violet-500 backdrop-blur-md'>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            onclose(false)
          }}
          className='flex size-10 items-center justify-center rounded-full bg-violet-400 backdrop-blur-sm'
        >
          <img src='https://api.iconify.design/material-symbols:cancel-rounded.svg' className='h-6' />
        </motion.button>
        {show && children}
      </div>
    </div>
  )
}

export default FormModal2
