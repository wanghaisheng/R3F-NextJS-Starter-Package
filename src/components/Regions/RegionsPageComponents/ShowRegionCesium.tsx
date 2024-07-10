'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, Suspense } from 'react'
import ShowGuild from '../../Guilds/ShowGuild'
import Image from 'next/image'

// Import the CesiumMap component dynamically
const CesiumMap = dynamic(() => import('../../LeafletMap/CesiumMap'), {
  ssr: false,
})

// Import the LeafletMap component dynamically
const MapComponent = dynamic(() => import('../../LeafletMap/LeafletMap'), {
  ssr: false,
})

interface Guild {
  name: string
  username: string
  user_image: string
  description: string
  guild: string
  avatarimg: string
  continent: string
  country: string
}

export default function ShowRegionCesium({
  selectedRegionFilter,
  guilds,
  selectedGuildFilter,
  searchTerm,
}: {
  selectedRegionFilter: string
  guilds: Guild[]
  selectedGuildFilter: string
  searchTerm: string
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
      <div className='relative h-screen w-full'>
        {/* Guilds showcase */}
        <div className='absolute bottom-3 left-8 z-50 size-16 rounded-lg border border-white '>
          <div className='relative size-full overflow-hidden rounded-lg ' onClick={handleMapChange}>
            <Image
              src={` ${mapChange ? '/img/earth.png' : '/img/worldmap.png'}`}
              alt={` ${mapChange ? 'cesium' : 'world map'}`}
              fill
              objectFit='cover'
              unoptimized
              loading='lazy'
              className='rounded-lg transition-all duration-300 ease-in-out hover:scale-110'
            />
            <div className='absolute top-0 flex size-full items-center justify-center bg-black/40'>
              <p className='text-[8px] font-semibold'>{mapChange ? 'SATELLITE' : 'DEFAULT'}</p>
            </div>
          </div>
        </div>

        {/* Map and Cesium */}
        <Suspense fallback={<div>Loading map...</div>}>
          <div className='fixed top-0 size-full'>
            {!mapChange ? (
              <CesiumMap filteredContinent={selectedRegionFilter} />
            ) : (
              <MapComponent filteredContinent={selectedRegionFilter} />
            )}
          </div>
        </Suspense>

        <div className='flex size-full items-center justify-end overflow-hidden'>
          <div
            className={`${selectedGuildFilter ? getBorderColor(selectedGuildFilter) : 'shadow-purple-700'} ${
              isSmallScreen
                ? 'h-[36vh] w-full px-4'
                : 'mr-4 flex w-[22%] items-center justify-center rounded-lg bg-gradient-to-t from-white/30 from-10% via-black/20 via-30% to-black/50 to-90% shadow-md backdrop-blur-md'
            }`}
          >
            <div className='flex w-full'>
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
