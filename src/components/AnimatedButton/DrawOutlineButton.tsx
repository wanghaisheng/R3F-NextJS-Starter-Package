// Animated Button
const DrawOutlineButton = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className='group relative rounded-md bg-black px-4 py-2 font-medium text-white transition-colors duration-[400ms]  dark:bg-purple-400/20 dark:text-slate-100 hover:dark:text-purple-300'
    >
      <span>{children}</span>

      {/* TOP */}
      <span className='absolute left-0 top-0 h-[2px] w-0 bg-purple-700 transition-all duration-100 group-hover:w-full dark:bg-purple-300' />

      {/* RIGHT */}
      <span className='absolute right-0 top-0 h-0 w-[2px] bg-purple-700 transition-all delay-100 duration-100 group-hover:h-full dark:bg-purple-300' />

      {/* BOTTOM */}
      <span className='absolute bottom-0 right-0 h-[2px] w-0 bg-purple-700 transition-all delay-200 duration-100 group-hover:w-full dark:bg-purple-300' />

      {/* LEFT */}
      <span className='absolute bottom-0 left-0 h-0 w-[2px] bg-purple-700 transition-all delay-300 duration-100 group-hover:h-full dark:bg-purple-300' />
    </button>
  )
}

export default DrawOutlineButton
