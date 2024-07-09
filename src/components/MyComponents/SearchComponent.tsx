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

export default function SearchComponent() {
  const [focus, setFocus] = useState(false)
  const [selectedContinent, setSelectedContinent] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [availableCountries, setAvailableCountries] = useState([])
  const containerRef = useRef(null)

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
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
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

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent)
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div
      ref={containerRef}
      className={`z-40 flex w-[35%] flex-col items-start rounded-2xl bg-white text-black ${
        focus ? 'p-5' : 'p-2'
      } transition-all duration-500 ease-in-out`}
      onClick={handleFocus}
    >
      <div className='flex w-full'>
        <input className='mr-2 grow' placeholder='SEARCH' />
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
        <DropdownComponent
          data={availableCountries}
          onSelect={handleCountrySelect}
          placeholder='Select guilds'
          disabled={!selectedContinent}
        />
      </div>

      {focus && (
        <div className='mt-4 w-full'>
          {selectedContinent && <p className='text-sm'>Selected continent: {selectedContinent}</p>}
          {selectedCountry && <p className='mt-2 text-sm'>Selected country: {selectedCountry}</p>}
        </div>
      )}
    </div>
  )
}
