'use client'

import { useState } from 'react'
import SignUpComponent from '@/components/SignUp/SignUpComponent'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import SignInComponent from '@/components/SignUp/SignInComponent'

export default function SearchComponent() {
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp)
  }

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn)
  }
  return (
    <div className='mb-32 flex h-full flex-col'>
      <div className='flex-1 p-4'>
        <h2>Search tab</h2>
      </div>

      <div className='flex-1 items-center justify-center rounded-lg bg-black text-white'>
        {!showSignUp && !showSignIn ? (
          <div className='mx-auto max-w-xs flex-1 p-4'>
            <div className='mb-4'>
              <button className='mb-2 flex w-full items-center justify-center rounded-full bg-white py-2 text-black shadow'>
                Sign up with
              </button>
              <button className='mb-2 flex w-full items-center justify-center rounded-full bg-white py-2 text-black shadow'>
                <FcGoogle />
                <FaApple />
              </button>
            </div>
            <div className='relative mb-4 flex items-center justify-center'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-500'></div>
              </div>
              <div className='relative bg-black px-3 text-gray-500'>or</div>
            </div>
            <div className='mt-4'>
              <button className='w-full rounded-full bg-blue-500 py-2 text-center text-white' onClick={toggleSignUp}>
                Create account
              </button>
            </div>
            <div className='mt-4 text-xs text-gray-500'>
              By signing up, you agree to the{' '}
              <a href='#' className='text-blue-400'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='#' className='text-blue-400'>
                Privacy Policy
              </a>
              , including{' '}
              <a href='#' className='text-blue-400'>
                Cookie Use
              </a>
              .
            </div>
            <div className='mt-4 text-center'>
              <p className='text-sm'>Already have an account?</p>
              <a href='#' className='text-blue-400'>
                <button className='w-full rounded-full bg-blue-500 py-2 text-center text-white' onClick={toggleSignIn}>
                  Sign In
                </button>
              </a>
            </div>
          </div>
        ) : (
          <>
            {showSignUp && (
              <div className='mt-4'>
                <div onClick={toggleSignUp}>Back</div>
                <SignUpComponent toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp} />
              </div>
            )}
            {showSignIn && (
              <div className='mt-4'>
                <div onClick={toggleSignIn}>Back SignIn</div>
                <SignInComponent toggleSignIn={toggleSignIn} toggleSignUp={toggleSignUp} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
