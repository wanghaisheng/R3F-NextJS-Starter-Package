'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

import { LiaSignInAltSolid } from 'react-icons/lia'
import { RiLockPasswordLine } from 'react-icons/ri'

import { LogosFacebook } from '@/logo/LogosFacebook'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext/UserContext'
import { motion } from 'framer-motion'

import Cookies from 'js-cookie'

const { log } = console
const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { updateUser } = useUser()

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // const validateEmail = (email) => {
  //   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  //   return re.test(String(email).toLowerCase())
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let valid = true

    // if (!validateEmail(email)) {
    //   setEmailError('Invalid email address.')
    //   valid = false
    // } else {
    //   setEmailError('')
    // }

    if (password.length < 3) {
      setPasswordError('Password must be at least 3 characters long.')
      valid = false
    } else {
      setPasswordError('')
    }

    if (!valid) return

    const submit = {
      email,
      password,
    }

    log('Submit: ', submit)

    try {
      const { data } = await axios({
        url: '/api/internal/signin',
        method: 'POST',
        data: submit,
      })
      log('Response:', data)
      const token = data.token
      if (token) {
        Cookies.set('token', token)
        updateUser(token)
        router.push('/slider')
      }
    } catch (error) {
      log('Error: ', error)
    }
  }

  return (
    <>
      <main className='relative mt-10 flex min-h-full flex-col items-center justify-around md:flex-row'>
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='hidden items-center justify-center pl-10 lg:flex'
        >
          <CardContainer className='border-none px-10 py-0'>
            <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-violet-400 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
              <div className='flex'>
                <CardItem className='mt-4 w-full'>
                  <Image
                    src='/aa.png'
                    height='1000'
                    width='1000'
                    className='size-full rounded-xl object-cover'
                    alt='thumbnail'
                  />
                </CardItem>
                <div className='flex flex-col'>
                  <CardItem translateZ='50' className='text-2xl font-bold text-purple-600 dark:text-white'>
                    {email}
                  </CardItem>
                  <CardItem
                    as='p'
                    translateZ='60'
                    className='mt-2 max-w-sm text-lg text-purple-950 dark:text-[#39ff14]'
                  >
                    Coming Soon!
                  </CardItem>
                  <div className='mt-20 flex items-center justify-between'></div>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='signin flex flex-1 flex-col items-center justify-center rounded-t-3xl py-10 text-white sm:h-1/4'
        >
          <div className='card flex h-auto  flex-col items-center justify-center gap-2 rounded-3xl bg-violet-300 shadow-lg shadow-purple-700 backdrop-blur-sm md:w-3/5 lg:w-4/5 dark:bg-black/30'>
            <div className='m-0 mb-5 rounded-t-3xl p-2 font-bold'>
              <h2 className='p-2 text-center text-xl text-purple-950 dark:text-purple-400'>SIGN IN</h2>
            </div>
            <form action='#' className='flex flex-col items-center justify-center gap-2 p-3'>
              <label htmlFor='email' className='text-xl font-semibold text-purple-950 dark:text-purple-200'>
                Email
              </label>

              <div
                className={`input-group m-2 flex rounded-md border-2 dark:bg-black ${emailError ? ' border-red-500' : 'border-violet-400'}`}
              >
                <div
                  className={`flex items-center justify-center px-1 text-2xl ${emailError ? ' text-red-300' : 'darK:text-purple-200 text-purple-600'}`}
                >
                  <LiaSignInAltSolid />
                </div>

                <input
                  type='email'
                  id='email'
                  name='email'
                  className='rounded-md bg-transparent  p-2 text-purple-950 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 '
                  value={email}
                  placeholder='Email'
                  onChange={({ target }) => setEmail(target.value)}
                />
              </div>

              <label htmlFor='password' className='text-xl font-semibold text-purple-950 dark:text-purple-200'>
                Password
              </label>
              <div
                className={`input-group m-2 flex rounded-md border-2  ${passwordError ? ' border-red-500' : 'border-violet-400'}`}
              >
                <div
                  className={`flex items-center justify-center px-1 text-2xl  ${passwordError ? ' text-red-300' : 'darK:text-purple-200 text-purple-600'}`}
                >
                  <RiLockPasswordLine />
                </div>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className='rounded-md bg-transparent p-2 text-purple-950 '
                  placeholder='Password'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>

              <div className=''>
                <p className='flex justify-between text-sm text-blue-500'>
                  <a
                    href=''
                    className='text-start transition-colors hover:text-blue-700'
                    style={{ marginRight: '2.75rem' }}
                  >
                    Mobile Sign In
                  </a>
                  <a href='' className='text-end transition-colors hover:text-blue-700'>
                    Forgot Password?
                  </a>
                </p>
              </div>

              <div className='flex w-full items-center justify-center p-5'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className='w-full rounded-lg bg-purple-950 p-2 px-4 text-purple-200 dark:bg-purple-200 dark:text-purple-950'
                >
                  Sign In
                </motion.button>
              </div>
            </form>

            <div className='flex items-end'>
              <hr className='h-1 w-full border-solid text-black' />
              <p className='px-5 font-semibold text-purple-950 dark:text-purple-200'>or</p>
              <hr className='h-px' />
            </div>
            <div className='flex justify-center gap-16 p-5'>
              <a href='/api/internal/auth/signin'>
                <FcGoogle className='text-3xl transition-transform hover:scale-125' />
              </a>
              <a href=''>
                <FaApple className='text-3xl transition-transform hover:scale-125' />
              </a>
              <a href=''>
                <LogosFacebook className='text-3xl transition-transform hover:scale-125' />
              </a>
            </div>
            <div className='m-5 flex items-center justify-center '>
              <p className=' text-sm text-purple-950 dark:text-purple-200'>
                Not a Genius User yet?
                <a href='/signup' className='ml-1 text-blue-500 transition-colors hover:text-blue-700'>
                  Sign Up Now
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}
export default SignIn
