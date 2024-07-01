'use client'

import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { PiCardsFill } from 'react-icons/pi'
import { TbEmergencyBed } from 'react-icons/tb'
import { FaOpencart } from 'react-icons/fa'
import Image from 'next/image'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider' //----------------> module not found error in my branch
import WalletComponent from './SubComponents/WalletComponent'
import SearchComponent from './SubComponents/SearchComponent'
import ShopComponent from './SubComponents/ShopComponent'
import EmergencyComponent from './SubComponents/EmergencyComponent'
import { CgProfile, CgPhotoscan } from 'react-icons/cg'
import SideProfile from './Tabs/SideProfile'
import { Toaster } from 'react-hot-toast'
import CustomToolTip from '../Hud/CustomToolTip'

const RightSidebar2 = ({ isSidebarOpen, setIsSidebarOpen, showSignIn, showSignUp, setShowSignIn, setShowSignUp }) => {
  const [activeTab, setActiveTab] = useState('profile') //active tab state
  const { user } = useUser()

  const handleTabClick = (tab: string) => {
    //function to handle tab click
    setActiveTab(tab)
  }

  const toggleSidebar = () => {
    //function to toggle sidebar
    setIsSidebarOpen(!isSidebarOpen)
    setShowSignUp(true)
    setShowSignIn(false)
    setActiveTab('profile')
  }

  return (
    <>
      <Toaster />
      {/* if sidebar is open, show a backdrop */}
      {isSidebarOpen && (
        <div
          className='absolute top-0 z-50 h-screen w-full bg-black/30 transition-all duration-300'
          onClick={toggleSidebar}
        ></div>
      )}

      {/* if sidebar is closed, show a button */}
      {!isSidebarOpen && (
        <button
          className='fixed right-0 top-36 z-50 size-10 rounded-l-md border-y border-l border-pink-300 bg-gray-300 dark:bg-black/50'
          onClick={toggleSidebar}
        >
          <Image src='/gglogo.svg' alt='sidebar' height={28} width={28}></Image>
        </button>
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-96 rounded-l-md bg-white/30 backdrop-blur-md transition-transform duration-300 ease-in-out dark:bg-black/5 ${
          isSidebarOpen ? 'w-72 translate-x-0 shadow-lg shadow-white dark:shadow-purple-500' : 'w-0 translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-6'>
          <div className='flex w-full justify-center'>
            {activeTab === 'profile' ? (
              <>
                {!user ? (
                  <h2 className='text-xl font-bold text-black dark:text-white'>SIGNUP | SIGNIN</h2>
                ) : (
                  <h2 className='text-xl font-bold'>PROFILE</h2>
                )}
              </>
            ) : (
              <h2 className='text-xl font-bold text-black dark:text-white'>{activeTab.toUpperCase()}</h2>
            )}
          </div>

          <button className='z-50 text-violet-600 hover:text-white/60' onClick={toggleSidebar}>
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
              {activeTab === 'profile' && (
                <SideProfile
                  showSignUp={showSignUp}
                  setShowSignUp={setShowSignUp}
                  showSignIn={showSignIn}
                  setShowSignIn={setShowSignIn}
                  setActiveTab={setActiveTab}
                />
              )}
              {activeTab === 'wallet' && <WalletComponent setActiveTab={setActiveTab} setShowSignUp={setShowSignUp} />}
              {activeTab === 'shop' && <ShopComponent />}
              {activeTab === 'emergency' && (
                <EmergencyComponent setActiveTab={setActiveTab} setShowSignUp={setShowSignUp} />
              )}
              {activeTab === 'search' && <SearchComponent />}
            </div>
          )}

          <ul className='fixed bottom-0 z-30 flex w-full flex-row space-x-2 space-y-0 bg-gray-300 p-2 font-medium dark:bg-black'>
            <li
              className={`group flex items-center rounded-md p-2 ${
                activeTab === 'profile'
                  ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'text-black hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200'
              }`}
              onClick={() => handleTabClick('profile')}
            >
              <CgProfile />
              {user ? (
                <CustomToolTip content='Profile' top={0} translateY={-28} left={-3} />
              ) : (
                <CustomToolTip content='SignUp' top={0} translateY={-28} left={-3} />
              )}
            </li>
            <li
              className={`group flex items-center rounded-md p-2 ${
                activeTab === 'wallet'
                  ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'text-black hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200'
              }`}
              onClick={() => handleTabClick('wallet')}
            >
              <PiCardsFill />
              <CustomToolTip content='Wallet' top={0} translateY={-28} left={37} />
            </li>
            <li
              className={`group flex items-center rounded-md p-2 ${
                activeTab === 'shop'
                  ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'text-black hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200'
              }`}
              onClick={() => handleTabClick('shop')}
            >
              <FaOpencart />
              <CustomToolTip content='Shop' top={0} translateY={-28} left={80} />
            </li>
            <li
              className={`group flex items-center rounded-md p-2 ${
                activeTab === 'emergency'
                  ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'text-black hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200'
              }`}
              onClick={() => handleTabClick('emergency')}
            >
              <TbEmergencyBed />
              <CustomToolTip content='Emergency' top={0} translateY={-28} left={106} />
            </li>
            <li
              className={`group flex items-center rounded-md p-2 ${
                activeTab === 'search'
                  ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
                  : 'text-black hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200'
              }`}
              onClick={() => handleTabClick('search')}
            >
              <FaSearch />
              <CustomToolTip content='Search' top={0} translateY={-28} left={158} />
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default RightSidebar2
