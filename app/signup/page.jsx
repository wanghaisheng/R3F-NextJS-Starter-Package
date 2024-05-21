'use client'

import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { UserLogoIcon } from '@/logo/UserLogo'
import { PasswordLogoIcon } from '@/logo/PasswordLogo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'

const { log } = console
export default function Page() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let valid = true

    if (!validateEmail(email)) {
      setEmailError('Invalid email address.')
      valid = false
    } else {
      setEmailError('')
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.')
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
        url: '/api/internal/users',
        method: 'POST',
        data: submit,
      })
      log('Response:', data)
      if (data != null) {
        router.push('/signin')
      }
    } catch (error) {
      log('Error: ', error)
    }
  }

  return (
    <main className='relative mt-10 flex min-h-full flex-col items-center justify-around md:flex-row'>
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='hidden items-center justify-center pl-10 sm:flex'
      >
        <CardContainer className='px-10 py-0 dark:border-none dark:hover:border-none '>
          <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
            <div className='flex'>
              <CardItem className='mt-4 w-full'>
                <Image
                  src='/aa.png'
                  height='1000'
                  width='1000'
                  className='size-full rounded-xl object-cover group-hover/card:shadow-xl'
                  alt='thumbnail'
                />
              </CardItem>
              <div className='flex flex-col'>
                <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                  Genius Card
                </CardItem>
                <CardItem as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
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
        className='signup flex flex-1 flex-col items-center justify-center rounded-t-3xl py-10 text-white sm:h-1/4'
      >
        <div className='card flex h-auto flex-col items-center justify-center gap-2 rounded-3xl shadow-lg shadow-purple-700 backdrop-blur-sm lg:w-3/5'>
          <div className='card-title m-0 mb-5 rounded-t-3xl p-2 shadow-sm  backdrop-blur-3xl'>
            <h2 className='p-2 text-center text-xl text-purple-400'>SIGN UP</h2>
          </div>
          <form action='#' className='flex flex-col items-center justify-center gap-2 p-3'>
            <label htmlFor='' className='text-xl font-semibold'>
              Email
            </label>
            <div className={`input-group m-2 flex rounded-md border-2  ${emailError ? ' border-red-500' : ''}`}>
              <div className='input-icon text-black'>
                <UserLogoIcon />
              </div>
              <input
                type='email'
                name='email'
                className='rounded-md p-2 text-black'
                value={email}
                onChange={({ target }) => setEmail(target?.value)}
              />
            </div>
            {emailError && <p className='-mt-3 text-xs text-red-500'>{emailError}</p>}

            <label htmlFor='' className='text-xl font-semibold'>
              Password
            </label>
            <div className={`input-group m-2 flex rounded-md border-2 ${passwordError ? ' border-red-500' : ''}`}>
              <div className='input-icon text-black'>
                <PasswordLogoIcon />
              </div>
              <input
                type='password'
                name='password'
                className='rounded-md p-2 text-black'
                value={password}
                onChange={({ target }) => setPassword(target?.value)}
              />
            </div>
            {emailError && <p className='-mt-3 text-xs text-red-500'>{passwordError}</p>}

            <div className='flex w-full items-center justify-center p-5'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className='w-full rounded-lg bg-purple-200 p-2 px-4 text-black'
              >
                Signup
              </motion.button>
            </div>
          </form>

          <div className='flex items-end'>
            <hr className='h-1 w-full border-solid text-black' />
            <p className='px-5 font-semibold'>or</p>
            <hr className='h-px' />
          </div>
          <div className='flex justify-center gap-16 p-5'>
            <a href='/api/auth/signin'>
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
            <p className=' text-sm'>
              Already a Genius User?
              <a href='/signin' className='ml-1 text-blue-500 transition-colors hover:text-blue-700'>
                Sign In Here
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
