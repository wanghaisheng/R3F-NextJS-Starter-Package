'use client'
import dynamic from 'next/dynamic'

// Import the CesiumMap component dynamically
const CesiumMap = dynamic(() => import('../LeafletMap/CesiumMap'), {
  ssr: false,
})
import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import ShowGuild from '../Guilds/ShowGuild'
import GuildHeader from '../Guilds/GuildHeader'

// Import the LeafletMap component dynamically
const MapComponent = dynamic(() => import('../LeafletMap/LeafletMap'), {
  ssr: false,
})
import { FaEarthAmericas } from 'react-icons/fa6'
import { FaMap } from 'react-icons/fa'

// async function getCountries() {
//   // const response = await fetch('https://restcountries.com/v3.1/all')
//   const response = await fetch('https://restcountries.com/v3.1/region/asia')
//   const data = await response.json()
//   return data
// }

export default function ShowRegionCesium({
  selectedRegionFilter,
  guilds,
  selectedGuildFilter,
  searchTerm,
  handleFilterGuildChange,
  setSearchTerm,
}: {
  selectedRegionFilter: string
  guilds: any
  selectedGuildFilter: string
  searchTerm: string
  handleFilterGuildChange: (event: any) => void
  setSearchTerm: (event: any) => void
}) {
  const [mapChange, setMapChange] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const handleMapChange = () => {
    setMapChange(!mapChange)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <div className='relative flex-1'>
        <div className='flex size-full flex-col justify-center lg:flex-row lg:justify-end lg:pr-5'>
          {/* <div>
            {countries.map((country) => (
              <div key={country.name.common}>
                <h1>{country.name.common}</h1>
              </div>
            ))}
          </div> */}
          <div className='size-full'>
            <Suspense fallback={<div>Loading map...</div>}>
              <div className='absolute top-0 h-screen w-full'>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                  }}
                >
                  {!mapChange ? (
                    <CesiumMap filteredContinent={selectedRegionFilter} />
                  ) : (
                    <MapComponent filteredContinent={selectedRegionFilter} />
                  )}
                </div>
              </div>
            </Suspense>
            {/* Guilds showcase */}
            <button
              className='absolute right-4 top-[350px] z-30 flex cursor-pointer items-center justify-center rounded border border-purple-700 bg-purple-950/20 p-2 transition-all ease-in-out hover:border-purple-500 lg:top-20'
              onClick={handleMapChange}
            >
              {mapChange ? <FaEarthAmericas className='size-6' /> : <FaMap className='size-6' />}
            </button>

            <div
              className={`${selectedGuildFilter ? getBorderColor(selectedGuildFilter) : 'shadow-purple-700'} ${isSmallScreen ? 'absolute top-[300px] h-[36vh] w-full px-4' : 'absolute right-0 top-36 mr-4 h-[57vh]  w-[46vh] rounded-lg bg-gradient-to-t from-white/30 from-10% via-black/20 via-30% to-black/50 to-90%  p-2 shadow-md backdrop-blur-md'}`}
            >
              <GuildHeader
                onFilterChange={handleFilterGuildChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />

              <div className='flex w-full overflow-auto'>
                <ShowGuild
                  users={guilds}
                  selectedRegionFilter={selectedRegionFilter}
                  filterguild={selectedGuildFilter}
                  searchTerm={searchTerm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Function to determine the shadow color based on the guild
function getBorderColor(guild: string): string {
  switch (guild) {
    case 'BUDDHA':
      return 'shadow-white'
    case 'VAJRA':
      return 'shadow-blue-500'
    case 'KARMA':
      return 'shadow-green-500'
    case 'RATNA':
      return 'shadow-yellow-500'
    case 'PADMA':
      return 'shadow-red-500'
    default:
      return 'shadow-purple-700'
  }
}
