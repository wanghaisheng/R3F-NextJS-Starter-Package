'use client'

import { useState } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import ShowRegion from '@/components/Regions/ShowRegion'
import RegionDetails from '@/components/Regions/RegionDetails'

const Regions = ({ params }) => {
  const [selectedFilter, setSelectedFilter] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    setSearchTerm('')
  }

  return (
    <>
      {params.slug?.length === 2 ? (
        <div>
          View of region {params.slug[0]} and Concept {params.slug[1]}
        </div>
      ) : params.slug?.length === 1 ? (
        <div>
          <RegionDetails continent={params.slug[0]} />
          <div className='mx-10 flex justify-end'>{params.slug[0].toUpperCase()}</div>
        </div>
      ) : (
        <>
          <RegionHeader onFilterChange={handleFilterChange} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className='flex-col lg:ml-72 lg:flex lg:justify-start'>
            <ShowRegion filter={selectedFilter} searchTerm={searchTerm} />
          </div>
        </>
      )}
    </>
  )
}

export default Regions
