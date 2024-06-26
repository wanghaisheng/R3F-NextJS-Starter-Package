'use client'
import { LiaSignInAltSolid } from 'react-icons/lia'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import LogosFacebook from '@/logo/LogosFacebook'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const { log } = console

export default function SignUpComponent({ toggleSignUp, toggleSignIn, setShowSignIn }) {
  const [generalError, setGeneralError] = useState('') // State for managing error messages
  const [showPassword, setShowPassword] = useState(false) // State for managing password visibility

  const changetoSignIn = () => {
    toggleSignUp()
    setShowSignIn(true)
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='flex h-auto flex-col items-center justify-center rounded-3xl bg-violet-300 backdrop-blur-sm  dark:bg-black/30'>
      <div className='m-0 mb-2 flex w-full items-center justify-center rounded-t-3xl py-3 font-bold'>
        <h2 className='text-center text-xl text-purple-950 dark:text-purple-400'>SIGN UP</h2>
      </div>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required').min(5, 'Password must be at least 5 characters'),
          email: Yup.string().email('Invalid email format').required('Email is required'),
          password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          log('Submit: ', values)
          setGeneralError('')
          try {
            const { data } = await axios({
              url: '/api/internal/users',
              method: 'POST',
              data: values,
            })
            log('Response:', data)
            if (data != null) {
              toast.success('Sign up successful')
              changetoSignIn()
            }
          } catch (error) {
            log('Error: ', error)
            if (error.response) {
              if (error.response.status === 409) {
                setGeneralError('Account already exists with this email.')
              } else {
                setGeneralError('An error occurred. Please try again.')
              }
            }
          }
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form className='flex w-full flex-col items-center justify-center'>
            <p className='-mb-2 flex w-full cursor-pointer items-center justify-start text-sm text-violet-400'>
              Username <span className='pl-1 text-base text-red-500'>*</span>
            </p>
            <div
              className={`m-2 flex w-full rounded-md border-2 ${errors.username && touched.username ? 'border-red-500' : 'border-violet-400'}`}
            >
              <div className={`flex items-center justify-center px-1 text-2xl text-purple-600 dark:text-purple-200`}>
                <LiaSignInAltSolid />
              </div>
              <Field
                type='text'
                name='username'
                className='w-full rounded-md bg-transparent p-2 text-purple-950 focus:outline-none dark:text-purple-200'
                placeholder='Username'
                onChange={(e) => {
                  handleChange(e)
                  setGeneralError('') // Clear general error on typing
                }}
              />
            </div>
            <ErrorMessage name='username' component='p' className='-mt-2 text-xs text-red-500' />

            <p className='-mb-2 flex w-full cursor-pointer items-center justify-start text-sm text-violet-400'>
              Email <span className='pl-1 text-base text-red-500'>*</span>
            </p>
            <div
              className={`m-2 flex w-full rounded-md border-2 ${errors.email && touched.email ? 'border-red-500' : 'border-violet-400'}`}
            >
              <div className={`flex items-center justify-center px-1 text-2xl text-purple-600 dark:text-purple-200`}>
                <LiaSignInAltSolid />
              </div>
              <Field
                type='email'
                name='email'
                className='w-full rounded-md bg-transparent p-2 text-purple-950 focus:outline-none dark:text-purple-200'
                placeholder='Email'
                onChange={(e) => {
                  handleChange(e)
                  setGeneralError('') // Clear general error on typing
                }}
              />
            </div>
            <ErrorMessage name='email' component='p' className='-mt-2 text-xs text-red-500' />
            <p className='-mb-2 flex w-full cursor-pointer items-center justify-start text-sm text-violet-400'>
              Password <span className='pl-1 text-base text-red-500'>*</span>
            </p>
            <div
              className={`group m-2 flex w-full items-center rounded-md border-2  ${errors.password && touched.password ? 'border-red-500' : 'border-violet-400'}`}
            >
              <div className={`flex items-center justify-center px-1 text-2xl text-purple-600 dark:text-purple-200`}>
                <RiLockPasswordLine />
              </div>
              <Field
                type={showPassword ? 'text' : 'password'}
                name='password'
                className='w-full rounded-md bg-transparent p-2 text-purple-950 focus:outline-none dark:text-purple-200'
                placeholder='Password'
                onChange={(e) => {
                  handleChange(e)
                  setGeneralError('') // Clear general error on typing
                }}
              />
              <button type='button' onClick={handleShowPassword} className='pr-2 text-purple-950 dark:text-purple-200'>
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            <ErrorMessage name='password' component='p' className='-mt-1 text-xs text-red-500' />

            {generalError && <p className='-mt-1 text-xs text-red-500'>{generalError}</p>}

            <div className='flex w-full items-center justify-center p-2 py-4'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                disabled={isSubmitting}
                className='w-full rounded-lg bg-purple-950 p-2 px-4 font-semibold text-purple-200 dark:bg-purple-200 dark:text-purple-950'
              >
                Create a Genius Account
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>

      <div className='mx-auto max-w-xs flex-1 p-2'>
        <div className='relative mb-4 flex cursor-default items-center justify-center'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-500'></div>
          </div>
          <div className='relative bg-black px-3 text-gray-500'>or</div>
        </div>
        <div className='mb-2 flex w-full items-center justify-center'>
          <div className='flex justify-center gap-12 p-2'>
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
                    Sign Un As a Developer
                  </button>
                </a>
              </div> */}
      </div>

      <div className='mb-5 flex flex-col items-center justify-center '>
        <p className='cursor-default text-xs text-purple-950 dark:text-purple-200'>Already a Genius User?</p>
        <div
          onClick={changetoSignIn}
          className='cursor-pointer text-xs text-violet-400 transition-colors hover:text-blue-700'
        >
          Sign In Here
        </div>
      </div>
    </div>
  )
}
