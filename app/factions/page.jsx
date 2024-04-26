'use client'

import { useState } from 'react'
import FactionHeader from '@/components/Factions/FactionHeader'
import ShowFaction from '@/components/Factions/ShowFaction'

const Factions = () => {
  const [selectedFilter, setSelectedFilter] = useState(null)

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
  }
  return (
    <>
      <FactionHeader onFilterChange={handleFilterChange} />
      <ShowFaction filter={selectedFilter} />
    </>
  )
}

export default Factions
