'use client'

import { useState } from 'react'
import SignUpComponent from '@/components/SignUp/SignUpComponent'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import SignInComponent from '@/components/SignUp/SignInComponent'
import { useUser } from '@/context/UserContext/UserContext'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { IoIosArrowBack } from 'react-icons/io'

export default function ProfileComponent({ setShowSignUp, setActiveTab }) {
  const { user } = useUser()

  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }

  return (
    <div className='mb-32 flex h-full flex-col'>
      {user ? (
        <div className='flex-1 items-center justify-center rounded-lg bg-black text-white'>
          {/* User is signed in, show a message or other content */}
          <p>
            Welcome, {user.first_name} {user.last_name}!
          </p>
          <div>Avatar</div>
          <p>Other details</p>
          <p>Input to add bio</p>
          <p>Input to take profile picture</p>
        </div>
      ) : (
        <>
          <div>You must signin to view this tab</div>
          <div
            onClick={handleSignUpClick}
            className='mt-2 flex cursor-pointer justify-center rounded border border-purple-700 bg-purple-800/30 p-2 transition-colors hover:bg-purple-800/40 hover:text-purple-200'
          >
            Signup
          </div>
        </>
      )}
    </div>
  )
}
