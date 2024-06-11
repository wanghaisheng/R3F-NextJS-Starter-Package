'use client'
import { LiaSignInAltSolid } from 'react-icons/lia'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const { log } = console

export default function SignUpComponent({ toggleSignUp, toggleSignIn, setShowSignIn }) {
  const router = useRouter()
  const [generalError, setGeneralError] = useState('')

  const changetoSignIn = () => {
    toggleSignUp()
    setShowSignIn(true)
  }
  return (
    <div className='flex h-auto flex-col items-center justify-center rounded-3xl bg-violet-300 backdrop-blur-sm  dark:bg-black/30'>
      <div className='m-0 mb-5 rounded-t-3xl p-2 font-bold'>
        <h2 className='p-2 text-center text-xl text-purple-950 dark:text-purple-400'>SIGN UP</h2>
      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email format').required('Email is required'),
          password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          log('Submit: ', values)
          try {
            const { data } = await axios({
              url: '/api/internal/users',
              method: 'POST',
              data: values,
            })
            log('Response:', data)
            if (data != null) {
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
        {({ isSubmitting }) => (
          <Form className='flex w-full flex-col items-center justify-center gap-2 px-2'>
            <div className='m-2 flex w-full rounded-md border-2 border-violet-400'>
              <div className={`flex items-center justify-center px-1 text-2xl text-purple-600 dark:text-purple-200`}>
                <LiaSignInAltSolid />
              </div>
              <Field
                type='email'
                name='email'
                className='w-full rounded-md bg-transparent p-2 text-purple-950 focus:outline-none dark:text-purple-200'
                placeholder='Email'
              />
            </div>
            <ErrorMessage name='email' component='p' className='-mt-3 text-xs text-red-500' />

            <div className='m-2 flex w-full rounded-md border-2 border-violet-400'>
              <div className={`flex items-center justify-center px-1 text-2xl text-purple-600 dark:text-purple-200`}>
                <RiLockPasswordLine />
              </div>
              <Field
                type='password'
                name='password'
                className='w-full rounded-md bg-transparent p-2 text-purple-950 focus:outline-none dark:text-purple-200'
                placeholder='Password'
              />
            </div>
            <ErrorMessage name='password' component='p' className='-mt-3 text-xs text-red-500' />

            {generalError && <p className='-mt-3 text-xs text-red-500'>{generalError}</p>}

            <div className='flex w-full items-center justify-center p-5'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type='submit'
                disabled={isSubmitting}
                className='w-full rounded-lg bg-purple-950 p-2 px-4 text-purple-200 dark:bg-purple-200 dark:text-purple-950'
              >
                Signup
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>

      <div className='m-5 flex flex-col items-center justify-center '>
        <p className='text-sm text-purple-950 dark:text-purple-200'>Already a Genius User?</p>
        <div onClick={changetoSignIn} className='ml-1 text-blue-500 transition-colors hover:text-blue-700'>
          Sign In Here
        </div>
      </div>
    </div>
  )
}
