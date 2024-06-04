'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { PiCardsFill } from 'react-icons/pi'
import { FaOpencart } from 'react-icons/fa'

import WalletComponent from './SubComponents/WalletComponent'
import SearchComponent from './SubComponents/SearchComponent'
import ShopComponent from './SubComponents/ShopComponent'

const RightSidebar2 = () => {
  const [activeTab, setActiveTab] = useState('search')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setActiveTab('search')
  }

  return (
    <>
      {!isSidebarOpen && (
        <button className='fixed right-0 top-0 z-50 size-10 bg-white/20 shadow-lg' onClick={toggleSidebar}>
          OPEN
        </button>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-80 bg-white/20 shadow-lg transition-transform duration-300 ease-in-out${
          isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-6'>
          <h2 className='text-xl font-bold'>{activeTab.toUpperCase()}</h2>
          <button className='text-blue-600 hover:text-white/60' onClick={toggleSidebar}>
            <svg xmlns='http://www.w3.org/2000/svg' className='size-6' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        <div className='flex h-screen justify-between'>
          {activeTab && (
            <div className='flex size-full flex-col overflow-y-auto p-4 pb-24'>
              {activeTab === 'search' && <SearchComponent />}
              {activeTab === 'cards' && <WalletComponent />}
              {activeTab === 'shop' && <ShopComponent />}
            </div>
          )}

          <ul className='flex flex-col space-y-2 p-2'>
            <li>
              <a
                href='#'
                className={`flex items-center rounded-md p-2 ${
                  activeTab === 'search'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleTabClick('search')}
              >
                <FaSearch />
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`flex items-center rounded-md p-2 ${
                  activeTab === 'cards'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleTabClick('cards')}
              >
                <PiCardsFill />
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`flex items-center rounded-md p-2 ${
                  activeTab === 'shop'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleTabClick('shop')}
              >
                <FaOpencart />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default RightSidebar2
