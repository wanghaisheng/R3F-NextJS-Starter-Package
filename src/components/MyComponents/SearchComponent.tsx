'use client'
import { useState, useEffect, useRef } from 'react'
import DropdownComponent from './DropDownMenu'
import { IoSearch } from 'react-icons/io5'
import { MdClear } from 'react-icons/md'

const continentCountryMap = {
  'North America': ['United States', 'Canada', 'Mexico'],
  Europe: ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy'],
  Asia: ['Japan', 'China', 'India', 'South Korea', 'Thailand'],
  'South America': ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile'],
  Africa: ['South Africa', 'Egypt', 'Nigeria', 'Kenya', 'Morocco'],
  'Australia & Oceania': ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'],
}

export default function SearchComponent({
  onRegionChange,
  onCountryChange,
  onGuildChange,
  searchTerm,
  setSearchTerm,
  guilds,
}: {
  onRegionChange: (region: string) => void
  onCountryChange: (country: string) => void
  onGuildChange: (guild: string) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  guilds: string[]
}) {
  const [selectedContinent, setSelectedContinent] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedGuild, setSelectedGuild] = useState('')
  const [availableCountries, setAvailableCountries] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const continents = ['All', ...Object.keys(continentCountryMap)] // ['All', 'North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']

  // When selectedContinent changes
  useEffect(() => {
    if (selectedContinent) {
      setAvailableCountries(['All', ...continentCountryMap[selectedContinent]])
      setSelectedCountry('')
    } else {
      setAvailableCountries(['All'])
    }
  }, [selectedContinent])

  // When continent is selected
  const handleContinentSelect = (continent: string) => {
    const newContinent = continent === 'All' ? '' : continent
    setSelectedContinent(newContinent)
    onRegionChange(newContinent)
  }

  // When country is selected
  const handleCountrySelect = (country: string) => {
    const newCountry = country === 'All' ? '' : country
    setSelectedCountry(newCountry)
    onCountryChange(newCountry)
  }

  // When guild is selected
  const handleGuildSelect = (guild: string) => {
    const newGuild = guild === 'All' ? '' : guild
    setSelectedGuild(newGuild)
    onGuildChange(newGuild)
  }

  // When search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const clearAll = () => {
    setSelectedContinent('')
    setSelectedCountry('')
    setSelectedGuild('')
    onRegionChange('')
    onCountryChange('')
    onGuildChange('')
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex w-full flex-col items-start transition-all duration-500 ease-in-out`}
    >
      <div className='flex w-full items-center justify-between gap-x-2 rounded-full bg-white p-4'>
        <div className='relative flex w-full max-w-lg items-center'>
          <IoSearch className='absolute left-4 size-5 text-gray-500' />
          <input
            type='search'
            placeholder='Search'
            onChange={handleSearchChange}
            className='w-full rounded-full bg-gray-100 py-2 pl-12 pr-4 text-gray-700'
          />
        </div>
        <div className='flex items-center space-x-2'>
          <DropdownComponent
            data={continents}
            onSelect={handleContinentSelect}
            placeholder='CONTINENTS'
            disabled={false}
            value={selectedContinent}
          />
          <DropdownComponent
            data={availableCountries}
            onSelect={handleCountrySelect}
            placeholder='COUNTRIES'
            disabled={!selectedContinent || selectedContinent === 'All'}
            value={selectedCountry}
          />
          <DropdownComponent
            data={['All', ...guilds]}
            onSelect={handleGuildSelect}
            placeholder='GUILDS'
            disabled={false}
            value={selectedGuild}
          />
        </div>
        {(selectedContinent || selectedCountry || selectedGuild) && (
          <button
            onClick={clearAll}
            className='whitespace-nowrap rounded-full bg-black p-2 text-xs font-bold text-white hover:bg-gray-600'
          >
            <MdClear />
          </button>
        )}
      </div>
    </div>
  )
}
