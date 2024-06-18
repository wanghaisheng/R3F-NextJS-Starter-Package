'use client'
import { useState } from 'react'
import ShowGuildDiscover from '../Guilds/ShowGuildDiscover'
import GuildHeader from '../Guilds/GuildHeader'

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
  return (
    <>
      <div className='relative flex-1'>
        <div className='flex w-full flex-col justify-center lg:flex-row lg:justify-end lg:pr-5'>
          <div className='size-full'>
            {/* Video section */}
            <div className='absolute top-0 h-screen w-full'>
              <video key={selectedGuildFilter} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
                {selectedGuildFilter === 'BUDDHA' ? (
                  <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
                ) : selectedGuildFilter === 'VAJRA' ? (
                  <source src='/livewallpapers/candles.mp4' type='video/mp4' />
                ) : selectedGuildFilter === 'PADMA' ? (
                  <source src='/livewallpapers/fire.mp4' type='video/mp4' />
                ) : selectedGuildFilter === 'KARMA' ? (
                  <source src='/livewallpapers/karma.mp4' type='video/mp4' />
                ) : selectedGuildFilter === 'RATNA' ? (
                  <source src='/livewallpapers/earth.mp4' type='video/mp4' />
                ) : (
                  <source src='/livewallpapers/forest.mp4' type='video/mp4' />
                )}
              </video>
            </div>

            <div className='relative top-20 flex w-full items-center justify-center'>
              <div
                className={`z-10 h-[80vh] w-[66vh] rounded-lg bg-gradient-to-t from-white/30 from-10% via-black/20 via-30% to-black/50 to-90% p-2 shadow-md backdrop-blur-md ${selectedGuildFilter ? getBorderColor(selectedGuildFilter) : 'shadow-purple-700'}`}
              >
                <GuildHeader
                  onFilterChange={handleFilterGuildChange}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                <div className='flex h-[466px] w-full overflow-auto'>
                  <ShowGuildDiscover
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
