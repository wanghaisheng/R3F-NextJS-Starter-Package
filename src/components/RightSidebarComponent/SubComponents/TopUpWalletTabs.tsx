'use client'

import { useState } from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

export default function TopUpWalletTabs() {
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <>
      <div className='w-full rounded'>
        {/* <Swiper spaceBetween={10} slidesPerView={3} scrollbar={{ draggable: true, hide: false }} modules={[Scrollbar]}>
          <SwiperSlide className='shrink-0 pb-4'>
            <button
              className={`w-full justify-center rounded-md p-2 ${
                selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </button>
          </SwiperSlide>
        </Swiper> */}
        <ul className='flex w-full justify-between space-x-2 overflow-auto p-2'>
          <li>
            <a
              href='#'
              className={`flex items-center rounded-md p-2 ${
                activeTab === 'tab1'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => handleTabClick('tab1')}
            >
              REDEEM
            </a>
          </li>
          <li>
            <a
              href='#'
              className={`flex items-center rounded-md p-2 ${
                activeTab === 'tab2'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => handleTabClick('tab2')}
            >
              TOPUP
            </a>
          </li>
        </ul>
      </div>

      <div className='h-52 overflow-auto'>
        {activeTab && (
          <div className='flex w-full flex-col p-4'>
            {activeTab === 'tab1' && <div>Redeem Card Code Enter</div>}
            {activeTab === 'tab2' && (
              <div>
                <div className='-mt-2 grid grid-cols-2 gap-4'>
                  {/* {topupMethods.map((product) => ( */}
                  <div className='relative overflow-hidden rounded-md bg-white shadow-md'>
                    <div className='h-24 w-full overflow-hidden'>
                      <Image
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s'
                        unoptimized
                        alt='buy'
                        width={200}
                        height={100}
                        layout='responsive'
                        className='object-cover'
                      />
                    </div>
                    <div className='h-14 w-full bg-gray-300 p-1'>
                      <h1 className='font-medium text-black'>$5</h1>
                      <h2 className='text-sm text-black'>DFGH</h2>
                      {/* <p className='mt-1 text-sm text-gray-600'>{product.description.slice(0, 22)}...</p> */}
                    </div>
                  </div>
                  {/* ))} */}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
