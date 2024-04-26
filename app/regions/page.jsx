'use client'

import { useState } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import ShowRegion from '@/components/Regions/ShowRegion'

const Regions = () => {
  const [selectedFilter, setSelectedFilter] = useState(null)

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
  }
  return (
    <>
      <RegionHeader onFilterChange={handleFilterChange} />
      <ShowRegion filter={selectedFilter} />
    </>
  )
}

export default Regions
