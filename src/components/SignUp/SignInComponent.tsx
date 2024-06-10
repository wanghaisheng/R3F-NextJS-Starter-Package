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
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup' // For validation schema

const { log } = console

const SignInComponent = ({ toggleSignUp, toggleSignIn }) => {
  const router = useRouter()
  const { updateUser } = useUser()

  const changetoSignUp = () => {
    toggleSignUp()
    toggleSignIn()
  }

  return (
    <>
      <div className='flex h-auto flex-col items-center justify-center rounded-3xl bg-violet-300 backdrop-blur-sm  dark:bg-black/30'>
        <div className='m-0 mb-5 rounded-t-3xl p-2 font-bold'>
          <h2 className='p-2 text-center text-xl text-purple-950 dark:text-purple-400'>SIGN IN</h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            log('Submit: ', values)
            try {
              const { data } = await axios({
                url: '/api/internal/signin',
                method: 'POST',
                data: values,
              })
              log('Response:', data)
              const token = data.token
              if (token) {
                Cookies.set('token', token)
                updateUser(token)
                router.push('/navigateuser')
              }
            } catch (error) {
              log('Error: ', error)
              log('Error Response: ', error.response.status)
            }
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex w-full flex-col items-center justify-center gap-2 px-2'>
              <div className={`m-2 flex w-full rounded-md border-2 border-violet-400`}>
                <div className={`flex items-center justify-center px-1 text-2xl text-purple-600 dark:text-purple-200`}>
                  <LiaSignInAltSolid />
                </div>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  className='w-full rounded-md bg-transparent p-2 text-purple-950 focus:outline-none dark:text-purple-200'
                  placeholder='Email'
                />
              </div>
              <ErrorMessage name='email' component='p' className='-mt-3 text-xs text-red-500' />

              <div className={`input-group m-2 flex w-full rounded-md border-2 border-violet-400`}>
                <div className={`darK:text-purple-200 flex items-center justify-center px-1 text-2xl text-purple-600`}>
                  <RiLockPasswordLine />
                </div>
                <Field
                  type='password'
                  id='password'
                  name='password'
                  className='w-full rounded-md bg-transparent p-2 text-purple-950 focus:outline-none dark:text-purple-200'
                  placeholder='Password'
                />
              </div>
              <ErrorMessage name='password' component='p' className='-mt-3 text-xs text-red-500' />

              <div className=''>
                <p className='flex justify-between text-sm text-blue-500'>
                  <a href='' className='text-end transition-colors hover:text-blue-700'>
                    Forgot Password?
                  </a>
                </p>
              </div>
              <div className='flex w-full items-center justify-center'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type='submit'
                  disabled={isSubmitting}
                  className='rounded-lg bg-purple-950 p-2 px-4 text-purple-200 dark:bg-purple-200 dark:text-purple-950'
                >
                  Sign In
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
        {/* <div className='flex items-end'>
              <hr className='h-1 w-full border-solid text-black' />
              <p className='px-5 font-semibold text-purple-950 dark:text-purple-200'>or</p>
              <hr className='h-px' />
            </div> */}
        {/* <div className='flex justify-center gap-16 p-5'> */}
        {/* <a href='/api/internal/auth/signin'> */}
        {/* <a href='#'>
                <FcGoogle className='text-3xl transition-transform hover:scale-125' />
              </a>
              <a href='#'>
                <FaApple className='text-3xl transition-transform hover:scale-125' />
              </a>
              <a href='#'>
                <LogosFacebook className='text-3xl transition-transform hover:scale-125' />
              </a>
            </div> */}
        <div className='m-5 flex items-center justify-center '>
          <p className=' text-sm text-purple-950 dark:text-purple-200'>
            Not a Genius User yet?
            <div onClick={changetoSignUp} className='ml-1 text-blue-500 transition-colors hover:text-blue-700'>
              Sign Up Now
            </div>
          </p>
        </div>
      </div>
    </>
  )
}
export default SignInComponent
