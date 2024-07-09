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
  const [focus, setFocus] = useState(false)
  const [selectedContinent, setSelectedContinent] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [availableCountries, setAvailableCountries] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const continents = Object.keys(continentCountryMap)

  useEffect(() => {
    if (selectedContinent) {
      setAvailableCountries(continentCountryMap[selectedContinent])
      setSelectedCountry('')
    } else {
      setAvailableCountries([])
    }
  }, [selectedContinent])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocus(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleFocus = () => {
    setFocus(true)
  }

  const handleContinentSelect = (continent: string) => {
    setSelectedContinent(continent)
    onRegionChange(continent)
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    onCountryChange(country)
  }

  const handleGuildSelect = (guild: string) => {
    onGuildChange(guild)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div
      ref={containerRef}
      className={`flex w-full flex-col items-start rounded-2xl bg-white text-black ${
        focus ? 'p-5' : 'p-2'
      } transition-all duration-500 ease-in-out`}
      onClick={handleFocus}
    >
      <div className='flex w-full'>
        <input className='mr-2 grow' placeholder='SEARCH' value={searchTerm} onChange={handleSearchChange} />
        <DropdownComponent
          data={continents}
          onSelect={handleContinentSelect}
          placeholder='Select a continent'
          disabled={false}
        />
        <DropdownComponent
          data={availableCountries}
          onSelect={handleCountrySelect}
          placeholder='Select a country'
          disabled={!selectedContinent}
        />
        <DropdownComponent data={guilds} onSelect={handleGuildSelect} placeholder='Select guilds' disabled={false} />
      </div>
    </div>
  )
}
