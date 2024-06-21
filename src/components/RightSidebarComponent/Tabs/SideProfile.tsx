'use client'

import { useState } from 'react'
import SignUpComponent from '@/components/SignUp/SignUpComponent'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import SignInComponent from '@/components/SignUp/SignInComponent'
import { useUser } from '@/context/UserContext/UserContext'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { IoIosArrowBack } from 'react-icons/io'
import ProfileComponent from '../SubComponents/ProfileComponent'

export default function SideProfile({ showSignUp, setShowSignUp, showSignIn, setShowSignIn, setActiveTab }) {
  const { user } = useUser()

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp)
  }

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn)
  }
  return (
    <div className='mb-12 flex h-full flex-col'>
      <div className='flex-1 px-4'>
        {user && (
          <div className='mb-20 flex w-full'>
            <ProfileComponent setShowSignUp={setShowSignUp} setActiveTab={setActiveTab} />
          </div>
        )}
      </div>

      {!user && (
        <div className='flex-1 items-center justify-center rounded-lg bg-black text-white'>
          {!showSignUp && !showSignIn ? (
            <div className='mx-auto max-w-xs flex-1 p-4'>
              {/* <div className='mb-4'>
                <div className='mb-2 flex w-full items-center justify-center rounded-full bg-white/10 py-2 text-white shadow transition-all duration-500 hover:bg-blue-300/10 hover:text-purple-200 hover:backdrop-blur-md'>
                  Sign up with
                </div>
                <div className='mb-2 flex w-full items-center justify-center'>
                  <div className='flex justify-center gap-12 p-5'>
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
              </div> */}
              {/* <div className='relative mb-4 flex cursor-default items-center justify-center'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-500'></div>
                </div>
                <div className='relative bg-black px-3 text-gray-500'>or</div>
              </div> */}
              <div className='mt-4'>
                <button
                  className='w-full rounded-full bg-black/10 py-2 text-center text-white shadow-md shadow-purple-700 backdrop-blur-md transition-colors duration-500 hover:bg-purple-800/20'
                  onClick={toggleSignUp}
                >
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
                <p className='mb-2 text-sm'>Already have an account?</p>
                <a href='#' className='text-blue-400'>
                  <button
                    className='w-full rounded-full bg-black/10 py-2 text-center text-white shadow-md shadow-purple-700 backdrop-blur-md transition-colors duration-500 hover:bg-purple-800/20'
                    onClick={toggleSignIn}
                  >
                    Sign In
                  </button>
                </a>
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
          ) : (
            <>
              {showSignUp && (
                <div className='mt-4'>
                  <div onClick={toggleSignUp} className='px-2'>
                    <IoIosArrowBack />
                  </div>
                  <SignUpComponent
                    toggleSignIn={toggleSignIn}
                    toggleSignUp={toggleSignUp}
                    setShowSignIn={setShowSignIn}
                  />
                </div>
              )}
              {showSignIn && (
                <div className='mt-4'>
                  <div onClick={toggleSignIn} className='px-2'>
                    <IoIosArrowBack />
                  </div>
                  <SignInComponent
                    toggleSignIn={toggleSignIn}
                    toggleSignUp={toggleSignUp}
                    setActiveTab={setActiveTab}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
