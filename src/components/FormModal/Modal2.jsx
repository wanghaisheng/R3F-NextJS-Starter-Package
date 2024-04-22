import { motion } from 'framer-motion'

const FormModal2 = ({ show, onclose, children }) => {
  return (
    <motion.div
      style={{
        transform: show ? 'translateY(0%)' : 'translateY(-1000%)',
      }}
      className='absolute left-0 top-0 z-20 size-full transition-all duration-700'
    >
      <div className='container mx-auto h-auto w-full rounded-3xl p-3 shadow-sm shadow-violet-500 backdrop-blur-md'>
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
        {children}
      </div>
    </motion.div>
  )
}

export default FormModal2
