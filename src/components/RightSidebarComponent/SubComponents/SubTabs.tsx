'use client'

import { useState } from 'react'
import ShopComponent from './ShopComponent'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/scrollbar'

export default function SubTabs() {
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
              BUY
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
              BUY
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
              BUY
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
              BUY
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
                <ShopComponent />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
