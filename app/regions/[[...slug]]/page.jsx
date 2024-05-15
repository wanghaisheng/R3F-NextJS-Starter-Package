'use client'

import { useState } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import ShowRegion from '@/components/Regions/ShowRegion'
import RegionDetails from '@/components/Regions/RegionDetails'

import ShowRegion2 from '@/components/Regions/ShowRegion2'
import ShowRegionCesium from '@/components/Regions/ShowRegionCesium'

import Image from 'next/image'
import GetUserLocation from '@/components/Regions/GetUserLocation'

const Regions = ({ params }) => {
  const [selectedFilter, setSelectedFilter] = useState('NORTH AMERICA')

  const [searchTerm, setSearchTerm] = useState('')

  const [backgroundImage, setBackgroundImage] = useState(
    'https://imgs.search.brave.com/UJlFq2-QeOeMj6KkDAOZrJ0dKdwRbCdgP5ts7Ets3RM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90cmF2/ZWxsZXJzd29ybGR3/aWRlLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wNi9z/aHV0dGVyc3RvY2tf/NjMyOTQxMDMxLWUx/Njg2NTk2OTI1OTcy/LnBuZw',
  )

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    setSearchTerm('')
    // Change background image based on filter
    setBackgroundImage(getBackgroundImageForFilter(filter))
  }

  // Function to get background image based on selected filter
  const getBackgroundImageForFilter = (selectedFilter) => {
    if (selectedFilter.toUpperCase() === 'NORTH AMERICA') {
      return 'https://imgs.search.brave.com/UJlFq2-QeOeMj6KkDAOZrJ0dKdwRbCdgP5ts7Ets3RM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90cmF2/ZWxsZXJzd29ybGR3/aWRlLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wNi9z/aHV0dGVyc3RvY2tf/NjMyOTQxMDMxLWUx/Njg2NTk2OTI1OTcy/LnBuZw'
    } else if (selectedFilter.toUpperCase() === 'SOUTH AMERICA') {
      return 'DEFAULT_BACKGROUND_IMAGE_URL'
    } else if (selectedFilter.toUpperCase() === 'EUROPE') {
      return 'DEFAULT_BACKGROUND_IMAGE_URL'
    } else if (selectedFilter.toUpperCase() === 'ASIA') {
      return 'https://imgs.search.brave.com/CHR1lb38tg1-9E8kcVdsTqaK2sEmUZCZo7PSvKWy3tM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXdt/YWxyb2Ftcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDgvMjVEQzg5RTEt/MDA2Mi00NDNFLUFG/MUQtQ0Y1ODAxMzcy/RjI4LTEwMjR4Njg0/LmpwZWc'
    } else if (selectedFilter.toUpperCase() === 'AFRICA') {
      return 'https://imgs.search.brave.com/sdPLZjS3Z9AOVh1q6THgtwaL4UU_ug4VwT_dkE3LZRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmFzc2V0cy50aGVk/aXNjb3ZlcmVyLmNv/bS8yMDE5LzA1L2Jl/YXV0aWZ1bC1hZnJp/Y2EuanBn'
    } else if (selectedFilter.toUpperCase() === 'AUSTRALIA') {
      return 'DEFAULT_BACKGROUND_IMAGE_URL'
    } else {
      return ''
    }
  }

  return (
    <>
      <div className='relative'>
        {/* Render other content over the background */}
        {params.slug?.length === 2 ? (
          <div className='flex justify-center'>
            <GetUserLocation />
          </div>
        ) : params.slug?.length === 1 ? (
          <div>
            {/* Render background image */}
            <div
              style={{
                position: 'absolute',
                top: -110,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
              }}
            ></div>
            <RegionDetails continent={params.slug[0]} />
            <div className='mx-10 flex justify-end'>{params.slug[0].toUpperCase()}</div>
          </div>
        ) : (
          <>
            {/* Render background image */}
            {/* <div
              style={{
                position: 'absolute',
                top: -110,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
              }}
            ></div> */}
            <RegionHeader onFilterChange={handleFilterChange} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className='flex-col lg:ml-72 lg:flex lg:justify-start'>
              {/* Old Component */}
              {/* <ShowRegion filter={selectedFilter} searchTerm={searchTerm} /> */}

              {/* New Component */}
              {/* <ShowRegion2 filter={selectedFilter} /> */}
              <ShowRegionCesium filter={selectedFilter} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Regions
