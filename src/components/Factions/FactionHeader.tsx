'use client'

import { useEffect, useState } from 'react'

import { MdClearAll } from 'react-icons/md'

export default function FactionHeader({
  onFilterChange,
  searchTerm,
  setSearchTerm,
}: {
  onFilterChange: (filter: string) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('')

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
    <div className='container mx-auto mt-7 flex w-full items-center justify-center px-4 py-2 '>
      <div className='flex h-12 w-[80%] items-center justify-between rounded-full border-x-2 border-b-2 border-[#6B37CA] px-5 py-2 shadow-sm shadow-[#6B37CA] backdrop-blur-md  md:gap-14'>
        <div>
          <div className='mx-auto flex max-w-sm items-center'>
            <svg width='27' height='27' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M25 13C25 19.0751 20.0751 24 14 24C7.92487 24 3 19.0751 3 13C3 6.92487 7.92487 2 14 2C20.0751 2 25 6.92487 25 13ZM26 13C26 19.6274 20.6274 25 14 25C10.8685 25 8.01707 23.8005 5.88027 21.8358L1.95431 26.2666C1.77118 26.4733 1.45518 26.4924 1.24849 26.3093C1.04181 26.1261 1.02272 25.8101 1.20585 25.6034L5.17157 21.1278C3.20254 18.9901 2 16.1355 2 13C2 6.37258 7.37258 1 14 1C20.6274 1 26 6.37258 26 13Z'
                fill='white'
              />
              <path
                d='M5.88027 21.8358L6.21868 21.4677L5.84378 21.123L5.50604 21.5042L5.88027 21.8358ZM1.95431 26.2666L2.32854 26.5982L2.32854 26.5982L1.95431 26.2666ZM1.20585 25.6034L0.831623 25.2718L0.831623 25.2718L1.20585 25.6034ZM5.17157 21.1278L5.5458 21.4593L5.84537 21.1212L5.53933 20.789L5.17157 21.1278ZM14 24.5C20.3513 24.5 25.5 19.3513 25.5 13H24.5C24.5 18.799 19.799 23.5 14 23.5V24.5ZM2.5 13C2.5 19.3513 7.64873 24.5 14 24.5V23.5C8.20101 23.5 3.5 18.799 3.5 13H2.5ZM14 1.5C7.64873 1.5 2.5 6.64873 2.5 13H3.5C3.5 7.20101 8.20101 2.5 14 2.5V1.5ZM25.5 13C25.5 6.64873 20.3513 1.5 14 1.5V2.5C19.799 2.5 24.5 7.20101 24.5 13H25.5ZM14 25.5C20.9036 25.5 26.5 19.9036 26.5 13H25.5C25.5 19.3513 20.3513 24.5 14 24.5V25.5ZM5.54185 22.2039C7.7673 24.25 10.7382 25.5 14 25.5V24.5C10.9987 24.5 8.26684 23.3509 6.21868 21.4677L5.54185 22.2039ZM5.50604 21.5042L1.58008 25.935L2.32854 26.5982L6.2545 22.1674L5.50604 21.5042ZM1.58008 25.935L1.58008 25.935L0.916904 26.6835C1.33027 27.0498 1.96228 27.0116 2.32854 26.5982L1.58008 25.935ZM1.58008 25.935L1.58008 25.935L0.831623 25.2718C0.46536 25.6852 0.503541 26.3172 0.916904 26.6835L1.58008 25.935ZM1.58008 25.935L5.5458 21.4593L4.79734 20.7962L0.831623 25.2718L1.58008 25.935ZM1.5 13C1.5 16.2658 2.75309 19.2401 4.80381 21.4665L5.53933 20.789C3.65198 18.74 2.5 16.0051 2.5 13H1.5ZM14 0.5C7.09644 0.5 1.5 6.09644 1.5 13H2.5C2.5 6.64873 7.64873 1.5 14 1.5V0.5ZM26.5 13C26.5 6.09644 20.9036 0.5 14 0.5V1.5C20.3513 1.5 25.5 6.64873 25.5 13H26.5Z'
                fill='white'
              />
            </svg>
            <label htmlFor='simple-search' className='sr-only '>
              Search
            </label>
            <div className='w-full'>
              <input
                type='text'
                id='simple-search'
                className='block w-full bg-transparent pl-5 text-sm text-gray-200 focus:outline-none'
                placeholder={isSmallScreen ? '----' : 'SEARCH'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className='mx-auto flex max-w-sm items-center'>
            <div className='flex w-full cursor-pointer items-center text-3xl' onClick={() => handleFilterClick(null)}>
              <MdClearAll className='hover:text-purple-400' />
            </div>
          </div>
        </div>
      </div>
      <div className='absolute -top-5 flex justify-center gap-x-6 font-semibold md:top-5 '>
        {isSmallScreen ? (
          <>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'PADMA' ? 'text-red-500' : 'text-red-200'}`}
              onClick={() => handleFilterClick('PADMA')}
            >
              P
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'VAJRA' ? 'text-blue-500' : 'text-blue-200'}`}
              onClick={() => handleFilterClick('VAJRA')}
            >
              V
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'RATNA' ? 'text-yellow-500' : 'text-yellow-200'}`}
              onClick={() => handleFilterClick('RATNA')}
            >
              R
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'KARMA' ? 'text-green-500' : 'text-green-200'}`}
              onClick={() => handleFilterClick('KARMA')}
            >
              K
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'BUDDHA' ? 'text-gray-400' : 'text-gray-300'}`}
              onClick={() => handleFilterClick('BUDDHA')}
            >
              B
            </a>
          </>
        ) : (
          <>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'PADMA' ? 'text-red-500' : 'text-red-200'}`}
              onClick={() => handleFilterClick('PADMA')}
            >
              PADMA
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'VAJRA' ? 'text-blue-500' : 'text-blue-200'}`}
              onClick={() => handleFilterClick('VAJRA')}
            >
              SHANTI
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'RATNA' ? 'text-yellow-500' : 'text-yellow-200'}`}
              onClick={() => handleFilterClick('RATNA')}
            >
              RATNA
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'KARMA' ? 'text-green-500' : 'text-green-200'}`}
              onClick={() => handleFilterClick('KARMA')}
            >
              KARMA
            </a>
            <a
              className={`cursor-pointer transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'BUDDHA' ? 'text-gray-400' : 'text-gray-300'}`}
              onClick={() => handleFilterClick('BUDDHA')}
            >
              BUDDHA
            </a>
          </>
        )}
      </div>
    </div>
  )
}
