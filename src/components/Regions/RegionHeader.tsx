'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function RegionHeader({ onFilterChange }: { onFilterChange: (filter: string) => void }) {
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
              EU
            </a>
            <a
              className={`cursor-pointer text-yellow-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ASIA' && 'text-yellow-500'}`}
              onClick={() => handleFilterClick('ASIA')}
            >
              AS
            </a>
            <a
              className={`cursor-pointer text-emerald-300 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AUSTRALIA & OCEANIA' && 'text-emerald-500'}`}
              onClick={() => handleFilterClick('AUSTRALIA & OCEANIA')}
            >
              OC
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
      <div className='fixed top-0 hidden items-center justify-start  font-semibold lg:flex'>
        <ul className='flex h-[800px] w-[330px] flex-col gap-y-7 bg-gradient-to-r from-black/80 from-40% text-white'>
          <li className='mt-[40%]'>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'NORTH AMERICA' && 'gap-x-12 bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('NORTH AMERICA')}
            >
              <Image src='/continents/na.png' height={20} width={20} alt='na' />
              NORTH AMERICA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'SOUTH AMERICA' && 'gap-x-12 bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('SOUTH AMERICA')}
            >
              <Image src='/continents/sa.png' height={20} width={20} alt='na' />
              SOUTH AMERICA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AFRICA' && 'gap-x-12 bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('AFRICA')}
            >
              <Image src='/continents/af.png' height={20} width={20} alt='na' />
              AFRICA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'EUROPE' && 'gap-x-12 bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('EUROPE')}
            >
              <Image src='/continents/eu.png' height={20} width={20} alt='na' />
              EUROPE
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ASIA' && 'gap-x-12 bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('ASIA')}
            >
              <Image src='/continents/eu.png' height={20} width={20} alt='na' />
              ASIA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'AUSTRALIA & OCEANIA' && 'gap-x-12 bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('AUSTRALIA & OCEANIA')}
            >
              <Image src='/continents/oc.png' height={20} width={20} alt='na' />
              AUSTRALIA & OCEANIA
            </a>
          </li>
          <li>
            <a
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'ANTARCTICA' && 'gap-x-12 bg-gradient-to-r from-purple-400/50 text-purple-400'}`}
              onClick={() => handleFilterClick('ANTARCTICA')}
            >
              <Image src='/continents/na.png' height={20} width={20} alt='na' />
              ANTARCTICA
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
