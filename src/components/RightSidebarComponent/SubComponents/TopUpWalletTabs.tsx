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
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors duration-300 ${
                activeTab === 'tab1'
                  ? 'bg-purple-700/30 text-purple-200'
                  : 'bg-transparent text-gray-200 hover:bg-purple-700/30'
              }`}
              onClick={() => handleTabClick('tab1')}
            >
              REDEEM
            </div>
          </li>
          <li className='w-full'>
            <div
              className={`flex w-full cursor-pointer items-center justify-center rounded-md py-2 transition-colors duration-300 ${
                activeTab === 'tab2'
                  ? 'bg-purple-700/30 text-purple-200'
                  : 'bg-transparent text-gray-200 hover:bg-purple-700/30'
              }`}
              onClick={() => handleTabClick('tab2')}
            >
              TOPUP
            </div>
          </li>
        </ul>
      </div>

      <hr className=' border-t-2 border-purple-700 transition-colors hover:border-purple-400' />

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
                      <label htmlFor='redeemCode' className='mb-2 w-full font-semibold text-violet-300'>
                        Redeem Code:
                      </label>
                      <Field
                        id='redeemCode'
                        type='text'
                        name='redeemCode'
                        placeholder='Enter redeem code'
                        className='w-full rounded-md bg-black/20 px-3 py-2 text-white shadow shadow-purple-700 backdrop-blur-sm focus:outline-none '
                      />
                      <ErrorMessage name='redeemCode' component='p' className='mt-1 text-xs text-red-500' />
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='mt-4 w-fit rounded border border-purple-800 bg-black/20 px-4 py-2 font-bold text-white transition-colors  hover:bg-purple-700/20 focus:outline-none'
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
