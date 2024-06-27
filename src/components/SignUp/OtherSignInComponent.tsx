import LogosFacebook from '@/logo/LogosFacebook'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

export default function OtherSignInComponent() {
  return (
    <div className='mx-auto max-w-xs flex-1 p-2'>
      <div className='relative mb-4 flex cursor-default items-center justify-center'>
        <div className='absolute inset-0 flex items-center'>
          <div className='mt-[3px] w-full border border-gray-500'></div>
        </div>
        <div className='relative bg-gray-200 px-3 text-gray-500 dark:bg-black'>or</div>
      </div>
      <div className='mb-2 flex w-full items-center justify-center'>
        <div className='flex justify-center gap-12 p-2 drop-shadow'>
          <a href='#'>
            <FcGoogle className='text-3xl transition-transform hover:scale-125' />
          </a>
          <a href='#'>
            <FaApple className='text-3xl text-white transition-transform hover:scale-125' />
          </a>
          <a href='#'>
            <LogosFacebook className='text-3xl transition-transform hover:scale-125' />
          </a>
        </div>
      </div>
      {/* <div className='mt-4 text-center'>
                <a href='#' className='text-blue-400'>
                  <button
                    className='w-full rounded-full bg-black/10 py-2 text-center text-white shadow-md shadow-purple-700 backdrop-blur-md transition-colors duration-500 hover:bg-purple-800/20'
                    // onClick={toggleSignIn}
                  >
                    Sign In As a Developer
                  </button>
                </a>
              </div> */}
    </div>
  )
}
