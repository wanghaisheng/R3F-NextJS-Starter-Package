'use client'

import { useState } from 'react'
import SignUpComponent from '@/components/SignUp/SignUpComponent'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import SignInComponent from '@/components/SignUp/SignInComponent'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { IoIosArrowBack } from 'react-icons/io'
import ProfileComponent from '../SubComponents/ProfileComponent'
import GallerySidebar from '@/components/GalleryComponent/GallerySidebar'
import { RiGalleryFill } from 'react-icons/ri'
import { GiRamProfile } from 'react-icons/gi'
import CustomToolTip from '@/components/Hud/CustomToolTip'
import Link from 'next/link'

export default function SideProfile({ showSignUp, setShowSignUp, showSignIn, setShowSignIn, setActiveTab }) {
  const { user } = useUser()

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp)
  }

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn)
  }
  return (
    <div className='flex h-full flex-col'>
      <div className='flex-1'>
        {user && (
          <div className='mb-32 flex w-full flex-col'>
            <div className='absolute right-8 top-14 z-20'>
              <Link
                href={`/public-profile/${user.username}`}
                className='group relative mt-2 flex w-fit items-center justify-center rounded border border-purple-700 bg-purple-950/20 p-2 font-semibold
              transition-all ease-in-out hover:border-purple-500'
              >
                <GiRamProfile />
                <CustomToolTip content='View Public Profile' top={7} left={-137} translateY={-4} />
              </Link>
            </div>
            <ProfileComponent setShowSignUp={setShowSignUp} setActiveTab={setActiveTab} />
            <GallerySidebar username={user ? user.username : ''} />
          </div>
        )}
      </div>

      {/* Show Signup and signin of user is not logged in */}
      {!user && (
        <div className='flex size-full items-center justify-center rounded-lg bg-black text-white'>
          {!showSignUp && !showSignIn ? (
            <div className='mx-auto max-w-xs flex-1 p-4'>
              <div className='mt-4'>
                <button
                  className='w-full rounded-full bg-black/10 py-2 text-center text-white shadow-md shadow-purple-700 backdrop-blur-md transition-colors duration-500 hover:bg-purple-800/20'
                  onClick={toggleSignUp}
                >
                  Create account
                </button>
              </div>
              <div className='mt-4 text-center text-xs text-gray-500'>
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
