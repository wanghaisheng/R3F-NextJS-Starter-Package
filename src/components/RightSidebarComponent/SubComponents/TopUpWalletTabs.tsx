'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function TopUpWalletTabs() {
  const [activeTab, setActiveTab] = useState('redeem')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  // Sample topup methods data
  const topupMethods = [
    {
      id: 1,
      image: '/icons/share.png',
      amount: '$99.99',
      description: 'Premium',
    },
    {
      id: 2,
      image: '/icons/share.png',
      amount: '$49.99',
      description: 'PAA',
    },
    {
      id: 3,
      image: '/icons/share.png',
      amount: '$19.99',
      description: 'NNN',
    },
    {
      id: 4,
      image: '/icons/share.png',
      amount: '$9.99',
      description: 'AFK',
    },
    {
      id: 5,
      image: '/icons/share.png',
      amount: '$4.99',
      description: 'AFM',
    },
  ]

  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <ul className='flex w-full justify-center space-x-2 overflow-auto p-2'>
          <li className='w-full'>
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors duration-300 ${
                activeTab === 'redeem'
                  ? 'bg-gray-300 text-black dark:bg-purple-700/30 dark:text-purple-200'
                  : 'bg-transparent text-white hover:bg-gray-300/30 dark:hover:bg-purple-700/30'
              }`}
              onClick={() => handleTabClick('redeem')}
            >
              REDEEM
            </div>
          </li>
          <li className='w-full'>
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors duration-300 ${
                activeTab === 'topup'
                  ? 'bg-gray-300 text-black dark:bg-purple-700/30 dark:text-purple-200'
                  : 'bg-transparent text-white hover:bg-gray-300/30 dark:hover:bg-purple-700/30'
              }`}
              onClick={() => handleTabClick('topup')}
            >
              TOPUP
            </div>
          </li>
        </ul>
      </div>

      <hr className=' border-t-2 border-black transition-colors  dark:border-purple-700' />

      <div className='h-52 overflow-auto'>
        {activeTab && (
          <div className='flex w-full flex-col p-4'>
            {activeTab === 'redeem' && (
              <div className='w-full'>
                <Formik
                  initialValues={{ redeemCode: '' }}
                  validationSchema={Yup.object().shape({
                    redeemCode: Yup.string()
                      .required('Redeem code is required')
                      .min(5, 'Redeem code must be at least 5 characters')
                      .max(20, 'Redeem code cannot exceed 20 characters')
                      .trim('Redeem code cannot contain only spaces'),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    // Handle redeem code submission
                    console.log('Redeem code submitted:', values.redeemCode)
                    setSubmitting(false)
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className='flex w-full flex-col items-center justify-center'>
                      <label htmlFor='redeemCode' className='mb-2 w-full font-semibold text-white dark:text-violet-300'>
                        Redeem Code:
                      </label>
                      <Field
                        id='redeemCode'
                        type='text'
                        name='redeemCode'
                        placeholder='Enter redeem code'
                        className='w-full rounded-md bg-black/20 px-3 py-2 text-white shadow shadow-white backdrop-blur-sm focus:outline-none dark:shadow-purple-700 '
                      />
                      <ErrorMessage name='redeemCode' component='p' className='mt-1 text-xs text-red-500' />
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='mt-4 w-fit rounded border bg-black px-4 py-2 font-bold text-white transition-colors hover:bg-gray-300/30 hover:text-black focus:outline-none dark:border-purple-800  dark:bg-black/20 dark:hover:bg-purple-700/20'
                      >
                        Redeem
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
            {activeTab === 'topup' && (
              <div>
                <div className='-mt-2 grid grid-cols-2 gap-4'>
                  {topupMethods.map((product) => (
                    <div
                      key={product.id}
                      className='relative overflow-hidden rounded-md bg-white/50 shadow-md dark:bg-purple-800/30'
                    >
                      <div className='h-24 w-full overflow-hidden'>
                        <Image
                          src={product.image}
                          unoptimized
                          alt='buy'
                          width={200}
                          height={100}
                          layout='responsive'
                          className='object-cover'
                        />
                      </div>
                      <div className='h-14 w-full bg-white p-1 backdrop-blur-sm dark:bg-purple-600/40'>
                        <h1 className='font-medium text-black dark:text-white'>{product.amount}</h1>
                        <h2 className='text-sm text-black dark:text-purple-200'>{product.description}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
