'use client'
import { useState, useEffect, useRef } from 'react'
import DropdownComponent from './DropDownMenu'
import { IoSearch } from 'react-icons/io5'
import { MdClear } from 'react-icons/md'

interface CountryData {
  name: string
  code: string
}

const continentCountryMap: { [key: string]: CountryData[] } = {
  'North America': [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'Mexico', code: 'MX' },
  ],
  Europe: [
    { name: 'United Kingdom', code: 'GB' },
    { name: 'Germany', code: 'DE' },
    { name: 'France', code: 'FR' },
    { name: 'Spain', code: 'ES' },
    { name: 'Italy', code: 'IT' },
  ],
  Asia: [
    { name: 'Japan', code: 'JP' },
    { name: 'China', code: 'CN' },
    { name: 'India', code: 'IN' },
    { name: 'South Korea', code: 'KR' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Nepal', code: 'NP' },
  ],
  'South America': [
    { name: 'Brazil', code: 'BR' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Peru', code: 'PE' },
    { name: 'Chile', code: 'CL' },
  ],
  Africa: [
    { name: 'South Africa', code: 'ZA' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Morocco', code: 'MA' },
  ],
  'Australia & Oceania': [
    { name: 'Australia', code: 'AU' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Papua New Guinea', code: 'PG' },
  ],
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
  const [availableCountries, setAvailableCountries] = useState<CountryData[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const continents = ['All', ...Object.keys(continentCountryMap)] // ['All', 'North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']

  // When selectedContinent changes
  useEffect(() => {
    if (selectedContinent && selectedContinent !== 'All') {
      setAvailableCountries([{ name: 'All', code: '' }, ...continentCountryMap[selectedContinent]])
    } else {
      setAvailableCountries([{ name: 'All', code: '' }])
    }
  }, [selectedContinent])

  // When continent is selected
  const handleContinentSelect = (continent: string) => {
    const newContinent = continent === 'All' ? '' : continent
    setSelectedContinent(newContinent)
    onRegionChange(newContinent)
  }

  // When country is selected
  const handleCountrySelect = (country: CountryData) => {
    const newCountry = country.name === 'All' ? '' : country.name
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
      <div className='flex w-full items-center justify-between gap-x-2 rounded-full bg-white/20 p-2 shadow-xl backdrop-blur-lg'>
        <div className='relative flex w-full max-w-lg items-center'>
          <IoSearch className='absolute left-4 z-10 size-5 text-black drop-shadow' />
          <input
            type='search'
            placeholder='SEARCH'
            onChange={handleSearchChange}
            className='w-full rounded-full bg-white/20 py-2 pl-12 pr-4 text-white shadow backdrop-blur-sm transition-all duration-300 ease-in-out placeholder:text-black hover:bg-white/30 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/50'
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
            displayProperty='name'
            flagProperty='code'
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
