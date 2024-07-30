'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { LiaSignInAltSolid } from 'react-icons/lia'
import { RiLockPasswordLine } from 'react-icons/ri'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'; // Import useState
import toast from 'react-hot-toast'
import { IoEyeOffOutline, IoEyeOutline, IoQrCodeOutline } from 'react-icons/io5'
import * as Yup from 'yup'
import OtherSignInComponent from './OtherSignInComponent'

const { log } = console

const SignInComponent = ({ toggleSignUp, toggleSignIn }) => {
  const router = useRouter()
  const { updateUser } = useUser()
  const [generalError, setGeneralError] = useState('') // State for managing error messages
  const [showPassword, setShowPassword] = useState(false) // State for managing password visibility

  const changetoSignUp = () => {
    toggleSignUp()
    toggleSignIn()
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <>
      <div className='flex h-auto flex-col items-center justify-center dark:bg-black/30'>
        <Image src='/gglogo.svg' alt='sidebar' height={28} width={28} className='absolute right-5 top-24' />

        <div className='m-0 mb-2 flex w-full items-center justify-between rounded-t-3xl py-3 font-bold'>
          <div className='text-center text-xl text-black dark:text-purple-400'>SIGN IN</div>
          <div className='transition-all duration-300 hover:scale-110'>
            <IoQrCodeOutline size={25} />
          </div>
        </div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().required('Password is required').min(3, 'Password must be at least 3 characters'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            log('Submit: ', values)
            setGeneralError('')
            try {
              const { data } = await axios({
                url: '/api/internal/signin',
                method: 'POST',
                data: values,
              })
              const token = data.token
              if (token) {
                Cookies.set('token', token)
                updateUser(token)
                toast.success('Sign in successful')

                router.push('/discover')
                router.refresh()
              }
            } catch (error) {
              log('Error: ', error)
              if (error.response && error.response.status === 404) {
                setGeneralError('User does not exist')
              } else if (error.response && error.response.status === 401) {
                setGeneralError('Password do not match')
              } else {
                setGeneralError('An error occurred. Please try again.')
              }
            }
            setSubmitting(false)
          }}
        >
          {({ isSubmitting, errors, touched, handleChange }) => (
            <Form className='flex w-full flex-col items-center justify-center'>
              <p className='-mb-2 flex w-full cursor-pointer items-center justify-start text-sm text-black dark:text-violet-400'>
                Email <span className='pl-1 text-base text-red-500'>*</span>
              </p>
              <div
                className={`m-2 flex w-full rounded-md border-2 ${errors.email && touched.email ? 'border-red-500' : 'border-black dark:border-violet-400'}`}
              >
                <div className={`flex items-center justify-center px-1 text-2xl text-black dark:text-purple-200`}>
                  <LiaSignInAltSolid />
                </div>
                <Field
                  type='email'
                  id='email'
                  name='email'
                  className='w-full rounded-md bg-transparent p-2 text-black focus:outline-none dark:text-purple-200'
                  placeholder='Email'
                  onChange={(e) => {
                    handleChange(e)
                    setGeneralError('') // Clear general error on typing
                  }}
                />
              </div>
              <ErrorMessage name='email' component='p' className='-mt-2 text-xs text-red-500' />
              <p className='-mb-2 flex w-full cursor-pointer items-center justify-start text-sm text-black dark:text-violet-400'>
                Password <span className='pl-1 text-base text-red-500'>*</span>
              </p>
              <div
                className={`group m-2 flex w-full items-center rounded-md border-2  ${errors.password && touched.password ? 'border-red-500' : 'border-black dark:border-violet-400'}`}
              >
                <div className={`flex items-center justify-center px-1 text-2xl text-black dark:text-purple-200`}>
                  <RiLockPasswordLine />
                </div>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  className='w-full rounded-md bg-transparent p-2 text-black focus:outline-none dark:text-purple-200'
                  placeholder='Password'
                  onChange={(e) => {
                    handleChange(e)
                    setGeneralError('') // Clear general error on typing
                  }}
                />
                <button type='button' onClick={handleShowPassword} className='pr-2 text-black dark:text-purple-200'>
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>
              <ErrorMessage name='password' component='p' className='-mt-1 text-xs text-red-500' />
              {generalError && <p className='-mt-1 text-xs text-red-500'>{generalError}</p>}{' '}
              {/* Display general error message */}
              <Link
                href='#'
                className='flex w-full justify-end text-[10px] font-medium text-black transition-colors hover:text-blue-700 dark:text-blue-500'
              >
                Forgot Password?
              </Link>
              <div className='flex w-full items-center justify-center p-2'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-lg bg-black p-2 px-4 text-white dark:bg-purple-200 dark:text-purple-950'
                >
                  Sign In
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
        <OtherSignInComponent />
        <div className='mb-5 flex flex-col items-center justify-center '>
          <p className='cursor-default text-xs font-medium text-purple-950 dark:text-purple-200'>
            Not a Genius User yet?
          </p>
          <div
            onClick={changetoSignUp}
            className='cursor-pointer text-xs font-semibold text-black underline transition-colors hover:text-blue-700 dark:text-violet-400'
          >
            SignUp
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInComponent
