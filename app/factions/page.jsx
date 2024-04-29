'use client'

import { useState } from 'react'
import FactionHeader from '@/components/Factions/FactionHeader'
import ShowFaction from '@/components/Factions/ShowFaction'

const Factions = () => {
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    setSearchTerm('')
  }
  return (
    <>
      <FactionHeader onFilterChange={handleFilterChange} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ShowFaction filter={selectedFilter} searchTerm={searchTerm} />
    </>
  )
}

export default Factions
