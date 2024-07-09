'use client'
import { useState, useEffect, useRef } from 'react'
import DropdownComponent from './DropDownMenu'

const continentCountryMap = {
  'North America': ['United States', 'Canada', 'Mexico'],
  Europe: ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy'],
  Asia: ['Japan', 'China', 'India', 'South Korea', 'Thailand'],
  'South America': ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile'],
  Africa: ['South Africa', 'Egypt', 'Nigeria', 'Kenya', 'Morocco'],
  Oceania: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'],
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
    setSearchTerm('')
    onRegionChange('')
    onCountryChange('')
    onGuildChange('')
  }

  return (
    <div
      ref={containerRef}
      className={`flex w-full flex-col items-start rounded-2xl bg-white p-2 text-black transition-all duration-500 ease-in-out`}
    >
      <div className='flex w-full'>
        <input className='mr-2 grow' placeholder='SEARCH' value={searchTerm} onChange={handleSearchChange} />
        <DropdownComponent
          data={continents}
          onSelect={handleContinentSelect}
          placeholder='Select a continent'
          disabled={false}
          value={selectedContinent}
        />
        <DropdownComponent
          data={availableCountries}
          onSelect={handleCountrySelect}
          placeholder='Select a country'
          disabled={!selectedContinent || selectedContinent === 'All'}
          value={selectedCountry}
        />
        <DropdownComponent
          data={['All', ...guilds]}
          onSelect={handleGuildSelect}
          placeholder='Select guilds'
          disabled={false}
          value={selectedGuild}
        />
        <button
          onClick={clearAll}
          className='whitespace-nowrap rounded bg-gray-200 px-4 py-2 text-xs font-bold text-gray-800 hover:bg-gray-300'
        >
          Clear All
        </button>
      </div>
    </div>
  )
}
