'use client'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext/UserContext'
import { motion } from 'framer-motion'
import { UserLogoIcon } from '@/logo/UserLogo'
import { PasswordLogoIcon } from '@/logo/PasswordLogo'

const { log } = console
const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { updateUser } = useUser()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const submit = {
      email,
      password,
    }

    log('Submit: ', submit)

    try {
      const { data } = await axios({
        url: '/api/signin',
        method: 'POST',
        data: submit,
      })
      log('Response:', data)
      const token = data.token
      if (token) {
        sessionStorage.setItem('token', token) // Store token in sessionStorage
        updateUser(token)
        router.push('/createavatar')
      }
    } catch (error) {
      log('Error: ', error)
    }
  }
  return (
    <>
      <main className='relative flex min-h-full flex-col items-center justify-around md:flex-row'>
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='hidden items-center justify-center pl-10 sm:flex'
        >
          <CardContainer className='px-10 py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
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
                    {email}
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
          className='signin md:h-2/4py flex flex-1 flex-col items-center justify-center rounded-t-3xl py-10 text-white sm:h-1/4'
        >
          <div className='card flex h-auto flex-col items-center justify-center gap-2 rounded-3xl shadow-md shadow-purple-700 backdrop-blur-sm lg:w-2/4'>
            <div className='card-title m-0 mb-5 rounded-t-3xl p-2 shadow-sm backdrop-blur-3xl'>
              <h2 className='p-2 text-center text-xl text-purple-900'>LOGIN</h2>
            </div>
            <form action='#' className='flex flex-col items-center justify-center gap-2 p-3'>
              <label htmlFor='' className='labels text-xl font-semibold '>
                Email
              </label>
              <div className='input-group m-2 flex rounded-md '>
                <div className='input-icon text-black '>
                  <UserLogoIcon />
                </div>
                <input
                  type='email'
                  name='email'
                  className='rounded-md  p-2 text-black'
                  value={email}
                  placeholder='Email'
                  onChange={({ target }) => setEmail(target?.value)}
                />
              </div>

              <label htmlFor='' className='labels text-xl font-semibold'>
                Password
              </label>
              <div className='input-group m-2 flex rounded-md'>
                <div className='input-icon text-black'>
                  <PasswordLogoIcon />
                </div>
                <input
                  type='password'
                  name='password'
                  className='rounded-md p-2 text-black'
                  placeholder='Password'
                  value={password}
                  onChange={({ target }) => setPassword(target?.value)}
                />
              </div>
              <div className=''>
                <p className='flex justify-between text-sm text-blue-500'>
                  <a href='' className='text-start' style={{ marginRight: '2.75rem' }}>
                    Mobile Sign In
                  </a>
                  <a href='' className='text-end'>
                    Forgot Password?
                  </a>
                </p>
              </div>

              <div className='signup-btn flex w-full items-center justify-center p-5'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className='w-full rounded-2xl bg-purple-200 p-2 px-4 text-black'
                >
                  SignIn
                </motion.button>
              </div>
            </form>

            <div className='flex items-end'>
              <hr className='h-1 w-full border-solid text-black' />
              <p className='px-5 font-semibold'>or</p>
              <hr className='h-px' />
            </div>
            <div className='flex justify-center gap-16 p-5'>
              <a href=''>
                <LogosGoogleIcon className='logos text-2xl' />
              </a>
              <a href=''>
                <LogosApple className='logos text-2xl' />
              </a>
              <a href=''>
                <LogosFacebook className='logos text-2xl' />
              </a>
            </div>
            <div className='m-5 flex items-center justify-center '>
              <p className=' text-sm'>
                Not a Genius User yet?
                <a href='/signup' className='ml-1 text-blue-500'>
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
