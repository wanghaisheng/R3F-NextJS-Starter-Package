'use client'

import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { PiCardsFill } from 'react-icons/pi'
import { TbEmergencyBed } from 'react-icons/tb'
import { FaOpencart } from 'react-icons/fa'
import Image from 'next/image'
import { useUser } from '@/context/UserContext/UserContext'
import WalletComponent from './SubComponents/WalletComponent'
import SearchComponent from './SubComponents/SearchComponent'
import ShopComponent from './SubComponents/ShopComponent'
import EmergencyComponent from './SubComponents/EmergencyComponent'

const RightSidebar2 = ({ isSidebarOpen, setIsSidebarOpen, showSignIn, showSignUp, setShowSignIn, setShowSignUp }) => {
  const [activeTab, setActiveTab] = useState('search')
  const { user } = useUser()

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setShowSignUp(false)
    setShowSignIn(false)
    setActiveTab('search')
  }

  return (
    <>
      {isSidebarOpen && (
        <div
          className='absolute top-0 z-50 h-screen w-full bg-black/30 transition-all duration-300'
          onClick={toggleSidebar}
        ></div>
      )}
      {!isSidebarOpen && (
        <button
          className='fixed right-0 top-32 z-50 size-10 rounded-l-md bg-black/20 p-1 shadow-lg'
          onClick={toggleSidebar}
        >
          <Image src='/GGlogo.png' alt='sidebar' height={30} width={30}></Image>
        </button>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-96 rounded-l-md bg-black/5 backdrop-blur-md transition-transform duration-300 ease-in-out${
          isSidebarOpen ? 'w-72 translate-x-0 shadow-lg shadow-purple-500' : 'w-0 translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-6'>
          {activeTab === 'search' ? (
            <>
              {!user ? (
                <h2 className='text-xl font-bold'>SIGNUP | SIGNIN | SEARCH </h2>
              ) : (
                <h2 className='text-xl font-bold'>SEARCH</h2>
              )}
            </>
          ) : (
            <h2 className='text-xl font-bold'>{activeTab.toUpperCase()}</h2>
          )}
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

        <div className='flex flex-col md:h-screen md:flex-row md:justify-between'>
          {activeTab && (
            <div className='flex size-full flex-col overflow-y-auto px-4 pb-24 pt-4'>
              {activeTab === 'search' && (
                <SearchComponent
                  showSignUp={showSignUp}
                  setShowSignUp={setShowSignUp}
                  showSignIn={showSignIn}
                  setShowSignIn={setShowSignIn}
                />
              )}
              {activeTab === 'wallet' && <WalletComponent setActiveTab={setActiveTab} setShowSignUp={setShowSignUp} />}
              {activeTab === 'shop' && <ShopComponent />}
              {activeTab === 'emergency' && (
                <EmergencyComponent setActiveTab={setActiveTab} setShowSignUp={setShowSignUp} />
              )}
            </div>
          )}

          <ul className='fixed bottom-0 flex w-full flex-row space-x-2 space-y-0 bg-black p-2'>
            <li>
              <a
                href='#'
                className={`group flex items-center rounded-md p-2 ${
                  activeTab === 'search'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleTabClick('search')}
              >
                <FaSearch />
                <div
                  className={`
          invisible absolute top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm font-medium text-slate-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
                >
                  Search
                </div>
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`group flex items-center rounded-md p-2 ${
                  activeTab === 'wallet'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleTabClick('wallet')}
              >
                <PiCardsFill />
                <div
                  className={`
          invisible absolute top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm font-medium text-slate-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
                >
                  Wallet
                </div>
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`group flex items-center rounded-md p-2 ${
                  activeTab === 'shop'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleTabClick('shop')}
              >
                <FaOpencart />
                <div
                  className={`
          invisible absolute top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm font-medium text-slate-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
                >
                  Shop
                </div>
              </a>
            </li>
            <li>
              <a
                href='#'
                className={`group flex items-center rounded-md p-2 ${
                  activeTab === 'emergency'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-200 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => handleTabClick('emergency')}
              >
                <TbEmergencyBed />
                <div
                  className={`
          invisible absolute top-0 -translate-y-8 whitespace-nowrap
          rounded-md bg-indigo-100 px-2 py-1
          text-sm font-medium text-slate-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
                >
                  Emergency
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default RightSidebar2
