'use client'

import { useState } from 'react'
import ShopComponent from './ShopComponent'

export default function SubTabs() {
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }
  return (
    <div className='h-80 w-full '>
      <div>
        <ul className='flex w-full justify-between space-x-2  overflow-auto p-2'>
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

      <div className='h-60 overflow-auto'>
        {activeTab && (
          <div className='flex w-full flex-col p-4'>
            {activeTab === 'tab1' && <div>tab1</div>}
            {activeTab === 'tab2' && (
              <div>
                <ShopComponent />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
