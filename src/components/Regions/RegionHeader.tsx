'use client'

import { useEffect, useState } from 'react'
import { FaGlobeAfrica, FaGlobeEurope, FaGlobeAmericas, FaGlobeAsia } from 'react-icons/fa'
import { FaEarthOceania } from 'react-icons/fa6'
import { BsGlobeCentralSouthAsia } from 'react-icons/bs'

export default function RegionHeader({ onFilterChange }: { onFilterChange: (filter: string) => void }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('ASIA') // Default filter

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFilterClick = (filter) => {
    onFilterChange(filter)
    setActiveFilter(filter)
  }

  return (
    <div className='relative'>
      {isSmallScreen ? (
        <div className='fixed left-0 top-0 items-center justify-start font-semibold'>
          <ul className='flex h-screen w-[33px] flex-col gap-y-7 overflow-hidden bg-gradient-to-r from-black/80 px-2 text-white'>
            <li
              className={`mt-[200px] cursor-pointer text-yellow-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ASIA' && 'text-yellow-500'}`}
              onClick={() => handleFilterClick('ASIA')}
            >
              <FaGlobeAsia
                className={`size-5 rounded-full ${activeFilter === 'ASIA' && 'scale-110 bg-gradient-to-r from-[#FFD700] to-[#544a7d] text-[#000046]'} transition-all duration-300`}
              />
            </li>
            <li
              className={`cursor-pointer text-pink-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'NORTH AMERICA' && 'text-pink-500'}`}
              onClick={() => handleFilterClick('NORTH AMERICA')}
            >
              <FaGlobeAmericas
                className={`size-5 rounded-full ${activeFilter === 'NORTH AMERICA' && 'scale-110 bg-gradient-to-r from-[#52c234] to-[#061700] text-[#000046]'} transition-all duration-300`}
              />
            </li>
            <li
              className={`cursor-pointer text-blue-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'SOUTH AMERICA' && 'text-blue-500'}`}
              onClick={() => handleFilterClick('SOUTH AMERICA')}
            >
              <FaGlobeAmericas
                className={`size-5 rounded-full ${activeFilter === 'SOUTH AMERICA' && 'scale-110 bg-gradient-to-r from-[#FF0099] to-[#493240] text-[#000046]'} transition-all duration-300`}
              />
            </li>
            <li
              className={`cursor-pointer text-green-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AFRICA' && 'text-green-700'}`}
              onClick={() => handleFilterClick('AFRICA')}
            >
              <FaGlobeAfrica
                className={`size-5 rounded-full ${activeFilter === 'AFRICA' && 'scale-110 bg-gradient-to-r from-[#f12711] to-[#f5af19] text-[#000046]'} transition-all duration-300`}
              />
            </li>
            <li
              className={`cursor-pointer text-red-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'EUROPE' && 'text-red-500'}`}
              onClick={() => handleFilterClick('EUROPE')}
            >
              <FaGlobeEurope
                className={`size-5 rounded-full ${activeFilter === 'EUROPE' && 'scale-110  bg-gradient-to-r from-[#1488CC] to-[#2B32B2] text-[#000046]'} transition-all duration-300`}
              />
            </li>
            <li
              className={`cursor-pointer text-emerald-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AUSTRALIA & OCEANIA' && 'text-emerald-500'}`}
              onClick={() => handleFilterClick('AUSTRALIA & OCEANIA')}
            >
              <FaEarthOceania
                className={`size-5 rounded-full ${activeFilter === 'AUSTRALIA & OCEANIA' && 'scale-110 bg-gradient-to-r from-[#c31432] to-[#240b36] text-[#000046]'} transition-all duration-300`}
              />
            </li>
            <li
              className={`cursor-pointer text-gray-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ANTARCTICA' && 'text-gray-500'}`}
              onClick={() => handleFilterClick('ANTARCTICA')}
            >
              <BsGlobeCentralSouthAsia
                className={`size-5 rounded-full ${activeFilter === 'ANTARCTICA' && 'scale-110  bg-gradient-to-r from-[#6DD5FA] to-[#FFFFFF] text-[#000046]'} transition-all duration-300`}
              />
            </li>
          </ul>
        </div>
      ) : (
        <div className='fixed top-0 items-center justify-start font-semibold'>
          <ul className='flex h-screen w-[330px] flex-col gap-y-2 overflow-hidden bg-gradient-to-r from-black/80 text-white'>
            <li
              className={`mt-[40%] flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition-all duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ASIA' && 'gap-x-9 bg-gradient-to-r from-purple-700/30 text-purple-200'}`}
              onClick={() => handleFilterClick('ASIA')}
            >
              <FaGlobeAsia
                className={`size-7 rounded-full ${activeFilter === 'ASIA' && 'scale-110 bg-gradient-to-r from-[#FFD700] to-[#544a7d] text-[#000046]'} transition-all duration-300`}
              />
              ASIA
            </li>

            <li
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition-all duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'NORTH AMERICA' && 'gap-x-9 bg-gradient-to-r from-purple-700/30 text-purple-200'}`}
              onClick={() => handleFilterClick('NORTH AMERICA')}
            >
              <FaGlobeAmericas
                className={`size-7 rounded-full ${activeFilter === 'NORTH AMERICA' && 'scale-110 bg-gradient-to-r from-[#52c234] to-[#061700] text-[#000046]'} transition-all duration-300`}
              />
              NORTH AMERICA
            </li>
            <li
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition-all duration-300 ease-out hover:scale-105 hover:text-purple-300  ${activeFilter === 'SOUTH AMERICA' && 'gap-x-9 bg-gradient-to-r from-purple-700/30 text-purple-200'}`}
              onClick={() => handleFilterClick('SOUTH AMERICA')}
            >
              <FaGlobeAmericas
                className={`size-7 rounded-full ${activeFilter === 'SOUTH AMERICA' && 'scale-110 bg-gradient-to-r from-[#FF0099] to-[#493240] text-[#000046]'} transition-all duration-300`}
              />
              SOUTH AMERICA
            </li>
            <li
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition-all duration-300 ease-out hover:scale-105 hover:text-purple-300  ${activeFilter === 'AFRICA' && 'gap-x-9 bg-gradient-to-r from-purple-700/30 text-purple-200'}`}
              onClick={() => handleFilterClick('AFRICA')}
            >
              <FaGlobeAfrica
                className={`size-7 rounded-full ${activeFilter === 'AFRICA' && 'scale-110 bg-gradient-to-r from-[#f12711] to-[#f5af19] text-[#000046]'} transition-all duration-300`}
              />
              AFRICA
            </li>
            <li
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition-all duration-300 ease-in-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'EUROPE' && 'gap-x-9  bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('EUROPE')}
            >
              <FaGlobeEurope
                className={`size-7 rounded-full ${activeFilter === 'EUROPE' && 'scale-110  bg-gradient-to-r from-[#1488CC] to-[#2B32B2] text-[#000046]'} transition-all duration-300`}
              />
              EUROPE
            </li>
            <li
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition-all duration-300 ease-out hover:scale-105 hover:text-purple-300  ${activeFilter === 'AUSTRALIA & OCEANIA' && 'gap-x-9 bg-gradient-to-r from-purple-700/30 text-purple-200'}`}
              onClick={() => handleFilterClick('AUSTRALIA & OCEANIA')}
            >
              <FaEarthOceania
                className={`size-7 rounded-full ${activeFilter === 'AUSTRALIA & OCEANIA' && 'scale-110 bg-gradient-to-r from-[#c31432] to-[#240b36] text-[#000046]'} transition-all duration-300`}
              />
              AUSTRALIA & OCEANIA
            </li>
            <li
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition-all duration-300 ease-out hover:scale-105 hover:text-purple-300  ${activeFilter === 'ANTARCTICA' && 'gap-x-9 bg-gradient-to-r from-purple-700/30 text-purple-200'}`}
              onClick={() => handleFilterClick('ANTARCTICA')}
            >
              <BsGlobeCentralSouthAsia
                className={`size-7 rounded-full ${activeFilter === 'ANTARCTICA' && 'scale-110  bg-gradient-to-r from-[#6DD5FA] to-[#FFFFFF] text-[#000046]'} transition-all duration-300`}
              />
              ANTARCTICA
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
