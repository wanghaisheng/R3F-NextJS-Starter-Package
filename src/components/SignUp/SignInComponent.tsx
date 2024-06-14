'use client'
import { LiaSignInAltSolid } from 'react-icons/lia'
import { RiLockPasswordLine } from 'react-icons/ri'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext/UserContext'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react' // Import useState
import toast from 'react-hot-toast'

const { log } = console

const SignInComponent = ({ toggleSignUp, toggleSignIn }) => {
  const router = useRouter()
  const { updateUser } = useUser()
  const [generalError, setGeneralError] = useState('') // State for managing error messages

  const changetoSignUp = () => {
    toggleSignUp()
    toggleSignIn()
  }

  return (
    <>
      <div className='flex h-auto flex-col items-center justify-center rounded-3xl bg-violet-300 backdrop-blur-sm dark:bg-black/30'>
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
            setGeneralError('')
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
                toast.success('Sign in successful')
                router.push('/navigateuser')
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
              <div className={`group m-2 flex w-full rounded-md border-2 border-violet-400`}>
                <div className={`flex items-center justify-center px-1 text-2xl text-purple-600 dark:text-purple-200`}>
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
              {generalError && <p className='-mt-3 text-xs text-red-500'>{generalError}</p>}{' '}
              {/* Display general error message */}
              <div className='flex w-full justify-center px-4 text-sm text-blue-500'>
                <a href='' className='transition-colors hover:text-blue-700'>
                  Forgot Password?
                </a>
              </div>
              <div className='flex w-full items-center justify-center p-5'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full rounded-lg bg-purple-950 p-2 px-4 text-purple-200 dark:bg-purple-200 dark:text-purple-950'
                >
                  Sign In
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
        <div className='m-5 flex flex-col items-center justify-center '>
          <p className=' text-sm text-purple-950 dark:text-purple-200'>Not a Genius User yet?</p>
          <div onClick={changetoSignUp} className='text-blue-500 transition-colors hover:text-blue-700'>
            Sign Up Now
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInComponent
