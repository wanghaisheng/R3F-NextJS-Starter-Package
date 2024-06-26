'use client'
import ShowGuildDiscover from '../Guilds/ShowGuildDiscover'
import GuildHeader from '../Guilds/GuildHeader'
import { useState } from 'react'

export default function DiscoverRegion({
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
  const [viewBusiness, setViewBusiness] = useState(false)

  const handleBusinessFilterView = () => {
    setViewBusiness(!viewBusiness)
  }

  return (
    <>
      <div className='flex size-full items-center justify-center'>
        {/* Video section */}
        <div className='absolute top-0 h-screen w-full'>
          <video key={selectedGuildFilter} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            {selectedGuildFilter === 'BUDDHA' ? (
              <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'VAJRA' ? (
              <source src='/livewallpapers/vajra.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'PADMA' ? (
              <source src='/livewallpapers/padma.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'KARMA' ? (
              <source src='/livewallpapers/karma.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'RATNA' ? (
              <source src='/livewallpapers/earth.mp4' type='video/mp4' />
            ) : (
              <source src='/livewallpapers/forest.mp4' type='video/mp4' />
            )}
          </video>
        </div>
        <div className='flex size-full flex-col items-center justify-center'>
          <div
            className={`z-10 flex w-[350px] flex-col items-center justify-center rounded-lg p-2 shadow-md backdrop-blur md:w-[400px] lg:w-[473px] ${selectedGuildFilter ? getBorderColor(selectedGuildFilter) : 'shadow-purple-700'}`}
          >
            <div className='relative z-10 w-full '>
              {/* Header to showcase the guilds to filter between */}
              <GuildHeader
                onFilterChange={handleFilterGuildChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className='z-20 size-full'>
              {/* Guilds to display based on the filter */}
              <ShowGuildDiscover
                users={guilds}
                selectedRegionFilter={selectedRegionFilter}
                filterguild={selectedGuildFilter}
                searchTerm={searchTerm}
                viewExp={viewBusiness}
              />
            </div>
          </div>
        </div>
        <div className='absolute right-24 top-36 z-10 flex h-[450px] w-[350px] flex-col gap-y-2'>
          <div className='flex w-full justify-between gap-x-2'>
            <button className='w-full rounded bg-pink-300/20 p-2' onClick={() => handleBusinessFilterView()}>
              BUSINESS
            </button>
            <button className='w-full rounded bg-pink-300/20 p-2'>GIRLS</button>
            <button className='w-full rounded bg-pink-300/20 p-2'>...</button>
          </div>

          <div className='flex size-full flex-col items-center justify-center rounded bg-pink-300/20'>QUESTS</div>
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
