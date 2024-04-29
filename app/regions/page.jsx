'use client'

import { useState } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import ShowRegion from '@/components/Regions/ShowRegion'

const Regions = () => {
  const [selectedFilter, setSelectedFilter] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    setSearchTerm('')
  }
  return (
    <>
      <RegionHeader onFilterChange={handleFilterChange} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ShowRegion filter={selectedFilter} searchTerm={searchTerm} />
    </>
  )
}

export default Regions
