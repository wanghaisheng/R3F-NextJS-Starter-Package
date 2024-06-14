'use client'

import { useEffect, useState } from 'react'

import { MdClearAll } from 'react-icons/md'

export default function GuildHeader({
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
    <div className='relative'>
      <div className='container mx-auto mt-7 flex w-full items-center justify-center px-4 py-2 '>
        {/* <div className='flex h-12 w-[80%] items-center justify-between px-5 py-2 md:gap-14 lg:w-full'> */}
        <div className='flex h-12 items-center justify-between px-5 py-2 md:gap-14'>
          {/* search */}
          {/* <div className='mx-auto flex max-w-sm items-center lg:pl-32'> */}
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
                placeholder='SEARCH'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* filter */}
          <div className='mx-auto flex max-w-sm items-center'>
            <div
              className='flex w-full cursor-pointer items-center text-3xl hover:text-purple-400'
              onClick={() => handleFilterClick(null)}
            >
              <p className='mr-1 text-sm'>ALL</p>
              <MdClearAll />
            </div>
          </div>
        </div>

        <div className='absolute -top-5 flex justify-center gap-x-6 font-semibold'>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'BUDDHA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleFilterClick('BUDDHA')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='white' />
              <path
                d='M6.17881 4.75887L10.8764 5.64775M6.17881 4.75887L3 10.0544M6.17881 4.75887L8.29801 3H14.2848L15.5916 4.75887M10.8764 5.64775V11.1891M10.8764 5.64775L15.5916 4.75887M10.8764 11.1891L6.17881 13.8369M10.8764 11.1891L15.5916 13.8369M6.17881 13.8369L3 10.0544M6.17881 13.8369L7.69757 19M3 10.0544V12.4563L5.47241 17.7329L7.69757 19M15.5916 4.75887L18.3996 10.0544M18.3996 10.0544L15.5916 13.8369M18.3996 10.0544L19 12.4563L16.2804 17.7329L14.2848 19M15.5916 13.8369L14.2848 19M7.69757 19H14.2848'
                stroke='black'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'VAJRA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleFilterClick('VAJRA')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#4A9BD5' />
              <path
                d='M10.6428 3L3 7.00455M10.6428 3L19 7.00455M10.6428 3V6.27645M3 7.00455V15.0137M3 7.00455L10.6428 6.27645M3 7.00455L5.87957 13.3026M3 15.0137L10.6428 19M3 15.0137L5.87957 13.3026M10.6428 19L19 15.0137M10.6428 19L5.87957 13.3026M10.6428 19L15.2544 13.3026M19 15.0137V7.00455M19 15.0137L15.2544 13.3026M19 7.00455L10.6428 6.27645M19 7.00455L15.2544 13.3026M10.6428 6.27645L5.87957 13.3026M10.6428 6.27645L15.2544 13.3026M5.87957 13.3026H15.2544'
                stroke='#030303'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'KARMA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleFilterClick('KARMA')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#46B58F' />
              <path
                d='M3 7.02733L10.9046 3L19 7.02733M3 7.02733L10.9046 10.7995M3 7.02733V15.0638L10.9046 19M19 7.02733L10.9046 10.7995M19 7.02733V15.0638L10.9046 19M10.9046 10.7995V19'
                stroke='black'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out  ${activeFilter === 'RATNA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleFilterClick('RATNA')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#F0BE65' />
              <path
                d='M3 6.87713H19M3 6.87713L11.0758 3L19 6.87713M3 6.87713V15.3595L11.0758 19M3 6.87713L11.0758 19M19 6.87713L11.0758 19M19 6.87713V15.3595L11.0758 19'
                stroke='black'
              />
            </svg>
          </a>
          <a
            href='#'
            className={`cursor-pointer transition duration-300 ease-out ${activeFilter === 'PADMA' ? 'rotate-180 scale-125' : 'scale-100'}`}
            onClick={() => handleFilterClick('PADMA')}
          >
            <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='11' cy='11' r='11' fill='#DA4C5C' />
              <path d='M4 17L10.9521 3L18 17M4 17H18M4 17L10.9521 12.5073L18 17' stroke='black' />
              <path d='M11 12.7351V3' stroke='black' />
            </svg>
          </a>
        </div>
      </div>

      {/* Sidebar */}
      {/* <div className='fixed top-0 hidden items-center justify-start font-semibold lg:hidden'>
        <ul className='flex h-[800px] w-[310px] flex-col gap-y-7 bg-gradient-to-r from-black/80 from-40%'>
          <li className='mt-[60%]'>
            <a
              href='#'
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'BUDDHA' ? 'bg-gradient-to-r from-white/70' : 'text-gray-300'}`}
              onClick={() => handleFilterClick('BUDDHA')}
            >
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M4.57616 2.97872L9.86093 3.97872M4.57616 2.97872L1 8.93617M4.57616 2.97872L6.96027 1H13.6954L15.1656 2.97872M9.86093 3.97872V10.2128M9.86093 3.97872L15.1656 2.97872M9.86093 10.2128L4.57616 13.1915M9.86093 10.2128L15.1656 13.1915M4.57616 13.1915L1 8.93617M4.57616 13.1915L6.28477 19M1 8.93617V11.6383L3.78146 17.5745L6.28477 19M15.1656 2.97872L18.3245 8.93617M18.3245 8.93617L15.1656 13.1915M18.3245 8.93617L19 11.6383L15.9404 17.5745L13.6954 19M15.1656 13.1915L13.6954 19M6.28477 19H13.6954'
                  stroke='white'
                />
              </svg>
              BUDDHA
            </a>
          </li>
          <li>
            <a
              href='#'
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'VAJRA' ? 'bg-gradient-to-r from-blue-500/70' : 'text-blue-200'}`}
              onClick={() => handleFilterClick('VAJRA')}
            >
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9.59811 1L1 5.50512M9.59811 1L19 5.50512M9.59811 1V4.68601M1 5.50512V14.5154M1 5.50512L9.59811 4.68601M1 5.50512L4.23951 12.5904M1 14.5154L9.59811 19M1 14.5154L4.23951 12.5904M9.59811 19L19 14.5154M9.59811 19L4.23951 12.5904M9.59811 19L14.7862 12.5904M19 14.5154V5.50512M19 14.5154L14.7862 12.5904M19 5.50512L9.59811 4.68601M19 5.50512L14.7862 12.5904M9.59811 4.68601L4.23951 12.5904M9.59811 4.68601L14.7862 12.5904M4.23951 12.5904H14.7862'
                  stroke='#4A9BD5'
                />
              </svg>
              VAJRA
            </a>
          </li>
          <li>
            <a
              href='#'
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'KARMA' ? 'bg-gradient-to-r from-green-500/70' : 'text-green-200'}`}
              onClick={() => handleFilterClick('KARMA')}
            >
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 5.53075L9.89271 1L19 5.53075M1 5.53075L9.89271 9.77449M1 5.53075V14.5718L9.89271 19M19 5.53075L9.89271 9.77449M19 5.53075V14.5718L9.89271 19M9.89271 9.77449V19'
                  stroke='#46B58F'
                />
              </svg>
              KARMA
            </a>
          </li>
          <li>
            <a
              href='#'
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'RATNA' ? 'bg-gradient-to-r from-yellow-500/70' : 'text-yellow-200'}`}
              onClick={() => handleFilterClick('RATNA')}
            >
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 5.36177H19M1 5.36177L10.0853 1L19 5.36177M1 5.36177V14.9044L10.0853 19M1 5.36177L10.0853 19M19 5.36177L10.0853 19M19 5.36177V14.9044L10.0853 19'
                  stroke='#F0BE65'
                />
              </svg>
              RATNA
            </a>
          </li>
          <li>
            <a
              href='#'
              className={`flex cursor-pointer items-center gap-x-7 py-3 pl-10 transition duration-300 ease-out hover:scale-105 hover:text-purple-300 ${activeFilter === 'PADMA' ? 'bg-gradient-to-r from-red-500/70' : 'text-red-200'}`}
              onClick={() => handleFilterClick('PADMA')}
            >
              <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M1 20L9.93836 2L19 20M1 20H19M1 20L9.93836 14.2237L19 20' stroke='#DA4C5C' />
                <path d='M10 14.5166V2' stroke='#DA4C5C' />
              </svg>
              PADMA
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  )
}
