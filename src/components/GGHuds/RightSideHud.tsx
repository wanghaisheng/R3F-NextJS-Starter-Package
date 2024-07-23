'use client'

import { FaBell, FaBriefcase, FaStore, FaUserCircle, FaUsers } from 'react-icons/fa'

export default function RightSideHud() {
  return (
    <div className='fixed right-[21px] top-1/2 z-50 flex w-[38px] -translate-y-1/2 flex-col items-center space-y-[6px] rounded-full bg-gray-200 px-[6px] py-[4px] shadow-lg shadow-black/50'>
      <div className='flex size-[32px] items-center justify-center rounded-full bg-white shadow-black drop-shadow-lg hover:bg-blue-100'>
        <FaUserCircle className='text-blue-500' size={21} />
      </div>
      <div className='flex size-[32px] items-center justify-center rounded-full bg-white shadow-black drop-shadow-lg hover:bg-blue-100'>
        <FaBriefcase className='text-blue-500' size={21} />
      </div>
      <div className='flex size-[32px] items-center justify-center rounded-full bg-white shadow-black drop-shadow-lg hover:bg-blue-100'>
        <FaStore className='text-blue-500' size={21} />
      </div>
      <div className='flex size-[32px] items-center justify-center rounded-full bg-white shadow-black drop-shadow-lg hover:bg-blue-100'>
        <FaUsers className='text-blue-500' size={21} />
      </div>
      <div className='flex size-[32px] items-center justify-center rounded-full bg-white shadow-black drop-shadow-lg hover:bg-blue-100'>
        <FaBell className='text-blue-500' size={21} />
      </div>
    </div>
  )
}
