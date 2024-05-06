'use client'

import { useEffect, useState } from 'react'

import { MdClearAll } from 'react-icons/md'
import { FaDiamond } from 'react-icons/fa6'

export default function RegionHeader({
  onFilterChange,
  searchTerm,
  setSearchTerm,
}: {
  onFilterChange: (filter: string) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('NORTH AMERICA') // Default filter

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
      <div className='container mx-auto mt-7 flex w-full items-center justify-center px-4 py-2 '>
        {isSmallScreen && (
          <div className='absolute -top-5 flex justify-center gap-x-6 font-semibold'>
            <a
              className={`cursor-pointer text-pink-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'NORTH AMERICA' && 'text-pink-500'}`}
              onClick={() => handleFilterClick('NORTH AMERICA')}
            >
              NA
            </a>
            <a
              className={`cursor-pointer text-blue-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'SOUTH AMERICA' && 'text-blue-500'}`}
              onClick={() => handleFilterClick('SOUTH AMERICA')}
            >
              SA
            </a>
            <a
              className={`cursor-pointer text-green-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AFRICA' && 'text-green-700'}`}
              onClick={() => handleFilterClick('AFRICA')}
            >
              AF
            </a>
            <a
              className={`cursor-pointer text-red-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'EUROPE' && 'text-red-500'}`}
              onClick={() => handleFilterClick('EUROPE')}
            >
              E
            </a>
            <a
              className={`cursor-pointer text-yellow-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ASIA' && 'text-yellow-500'}`}
              onClick={() => handleFilterClick('ASIA')}
            >
              A
            </a>
            <a
              className={`cursor-pointer text-emerald-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AUSTRALIA & OCEANIA' && 'text-emerald-500'}`}
              onClick={() => handleFilterClick('AUSTRALIA & OCEANIA')}
            >
              AU
            </a>
            <a
              className={`cursor-pointer text-gray-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ANTARCTICA' && 'text-gray-500'}`}
              onClick={() => handleFilterClick('ANTARCTICA')}
            >
              AN
            </a>
          </div>
        )}
      </div>
      {/* Sidebar */}
      <div className='fixed top-0 hidden items-center justify-start font-semibold md:top-5 lg:flex'>
        <ul className='mt-[40%] flex h-[800px] w-[330px] flex-col gap-y-7'>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'NORTH AMERICA' ? 'bg-gradient-to-r from-pink-300 text-pink-900' : 'text-pink-300'}`}
              onClick={() => handleFilterClick('NORTH AMERICA')}
            >
              <FaDiamond />
              NORTH AMERICA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'SOUTH AMERICA' ? 'bg-gradient-to-r from-blue-300 text-blue-900' : 'text-blue-300'}`}
              onClick={() => handleFilterClick('SOUTH AMERICA')}
            >
              <FaDiamond />
              SOUTH AMERICA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AFRICA' ? 'bg-gradient-to-r from-green-300 text-green-900' : 'text-green-300'}`}
              onClick={() => handleFilterClick('AFRICA')}
            >
              <FaDiamond />
              AFRICA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'EUROPE' ? 'bg-gradient-to-r from-red-300 text-red-900' : 'text-red-300'}`}
              onClick={() => handleFilterClick('EUROPE')}
            >
              <FaDiamond />
              EUROPE
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ASIA' ? 'bg-gradient-to-r from-yellow-300 text-yellow-900' : 'text-yellow-300'}`}
              onClick={() => handleFilterClick('ASIA')}
            >
              <FaDiamond />
              ASIA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AUSTRALIA & OCEANIA' ? 'bg-gradient-to-r from-emerald-300 text-emerald-900' : 'text-emerald-300'}`}
              onClick={() => handleFilterClick('AUSTRALIA & OCEANIA')}
            >
              <FaDiamond />
              AUSTRALIA & OCEANIA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ANTARCTICA' ? 'bg-gradient-to-r from-gray-300 text-gray-900' : 'text-gray-300'}`}
              onClick={() => handleFilterClick('ANTARCTICA')}
            >
              <FaDiamond />
              ANTARCTICA
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
