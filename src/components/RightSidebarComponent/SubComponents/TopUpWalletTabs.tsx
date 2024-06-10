'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export default function TopUpWalletTabs() {
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  // Sample topup methods data
  const topupMethods = [
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s',
      amount: '$5',
      description: 'DFGH',
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s',
      amount: '$10',
      description: 'Another top-up option',
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s',
      amount: '$10',
      description: 'Another top-up option',
    },
    {
      id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s',
      amount: '$10',
      description: 'Another top-up option',
    },
    {
      id: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s',
      amount: '$10',
      description: 'Another top-up option',
    },
  ]

  return (
    <>
      <div className='flex w-full items-center justify-center'>
        <ul className='flex w-full justify-center space-x-2 overflow-auto p-2'>
          <li className='w-full'>
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 ${
                activeTab === 'tab1'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => handleTabClick('tab1')}
            >
              REDEEM
            </div>
          </li>
          <li className='w-full'>
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2  ${
                activeTab === 'tab2'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => handleTabClick('tab2')}
            >
              TOPUP
            </div>
          </li>
        </ul>
      </div>

      <hr />

      <div className='h-52 overflow-auto'>
        {activeTab && (
          <div className='flex w-full flex-col p-4'>
            {activeTab === 'tab1' && (
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
                      <label htmlFor='redeemCode' className='mb-2 w-full font-semibold'>
                        Redeem Code:
                      </label>
                      <Field
                        id='redeemCode'
                        type='text'
                        name='redeemCode'
                        placeholder='Enter redeem code'
                        className='w-full rounded-md border px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                      />
                      <ErrorMessage name='redeemCode' component='p' className='mt-1 text-xs text-red-500' />
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='mt-4 w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
                      >
                        Redeem
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
            {activeTab === 'tab2' && (
              <div>
                <div className='-mt-2 grid grid-cols-2 gap-4'>
                  {topupMethods.map((product) => (
                    <div key={product.id} className='relative overflow-hidden rounded-md bg-white shadow-md'>
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
                      <div className='h-14 w-full bg-gray-300 p-1'>
                        <h1 className='font-medium text-black'>{product.amount}</h1>
                        <h2 className='text-sm text-black'>{product.description}</h2>
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
