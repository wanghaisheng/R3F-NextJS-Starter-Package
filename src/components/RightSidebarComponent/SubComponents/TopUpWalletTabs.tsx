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
    <div className='size-full'>
      <div className='flex w-full items-center justify-center'>
        <ul className='flex w-full justify-center space-x-2 overflow-auto'>
          <li className='w-full'>
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors duration-300 ${
                activeTab === 'redeem'
                  ? 'bg-gray-300 text-black dark:bg-white dark:font-semibold dark:text-black'
                  : 'bg-white/40 text-black hover:bg-white/70'
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
                  ? 'bg-gray-300 text-black dark:bg-white dark:font-semibold dark:text-black'
                  : 'bg-white/40 text-black hover:bg-white/70'
              }`}
              onClick={() => handleTabClick('topup')}
            >
              TOPUP
            </div>
          </li>
        </ul>
      </div>

      <div className='mt-2 h-[226px] overflow-auto'>
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
                      <label htmlFor='redeemCode' className='mb-2 w-full font-semibold text-white dark:text-black'>
                        Redeem Code:
                      </label>
                      <Field
                        id='redeemCode'
                        type='text'
                        name='redeemCode'
                        placeholder='Enter redeem code'
                        className='w-full rounded-md bg-black/20 px-3 py-2 text-black shadow shadow-black/50 backdrop-blur-sm placeholder:text-black focus:outline-none'
                      />
                      <ErrorMessage name='redeemCode' component='p' className='mt-1 text-xs text-red-500' />
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='mt-4 w-fit rounded-lg bg-black px-4 py-2 font-bold text-white transition-colors hover:bg-white/80 hover:text-black focus:outline-none'
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
                    <div key={product.id} className='relative overflow-hidden rounded-md bg-white/50 shadow-md'>
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
                      <div className='relative h-10 w-full bg-white p-1'>
                        <h1 className='font-medium text-black '>{product.amount}</h1>
                        <h2 className='absolute bottom-1 right-1 text-xs font-semibold uppercase text-black'>
                          {product.description}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
