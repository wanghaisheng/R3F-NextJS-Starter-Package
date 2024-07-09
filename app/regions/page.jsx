'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import useUserAndGuildData from '@/components/CustomHooks/useUserAndGuildData'
import SearchComponent from '@/components/MyComponents/SearchComponent'

const ShowRegionCesium = dynamic(() => import('@/components/Regions/ShowRegionCesium'), { ssr: false })

const continents = [
  {
    continent_name: 'AFRICA',
    continent_code: 'AF',
  },
  {
    continent_name: 'ANTARCTICA',
    continent_code: 'AN',
  },
  {
    continent_name: 'ASIA',
    continent_code: 'AS',
  },
  {
    continent_name: 'EUROPE',
    continent_code: 'EU',
  },
  {
    continent_name: 'NORTH AMERICA',
    continent_code: 'NA',
  },
  {
    continent_name: 'OCEANIA',
    continent_code: 'OC',
  },
  {
    continent_name: 'SOUTH AMERICA',
    continent_code: 'SA',
  },
]

const Regions = () => {
  const { users, guilds } = useUserAndGuildData()
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('ASIA')
  const [selectedGuildFilter, setSelectedGuildFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [mappedGuilds, setMappedGuilds] = useState([])

  const handleRegionFilterChange = (filter) => {
    setSelectedRegionFilter(filter)
    setSearchTerm('')
  }

  const handleFilterGuildChange = (filter) => {
    setSelectedGuildFilter(filter)
    setSearchTerm('')
  }

  // Map the user data to the format needed for the Cesium component
  useEffect(() => {
    if (users.length && guilds.length) {
      const mappedData = users.map((user) => {
        const guild = guilds.find((g) => g.id === user.guild_id)
        const continent = continents.find((continent) => continent.continent_code === user.region.continent_code)
        const avatarUrl = user.avatar.length > 0 ? user.avatar[0].avatar_url : ''

        return {
          name: `${user.first_name} ${user.last_name}`,
          username: user.username,
          user_image:
            user.image_urls.length > 0 ? user.image_urls[user.image_urls.length - 1] : '/card/defaultbuddha.svg',
          description: user.description,
          guild: guild ? guild.guild_name : 'Unknown Guild',
          avatarimg: avatarUrl.replace('glb', 'png'),
          continent: continent ? continent.continent_name : 'Unknown Continent',
        }
      })
      setMappedGuilds(mappedData)
    }
  }, [users, guilds])

  return (
    <>
      <div className='relative'>
        <div className='absolute top-28 flex w-full justify-center'>
          <SearchComponent />
        </div>
        <div className='flex flex-col justify-center lg:justify-start'>
          <ShowRegionCesium
            selectedRegionFilter={selectedRegionFilter}
            guilds={mappedGuilds}
            selectedGuildFilter={selectedGuildFilter}
            searchTerm={searchTerm}
            handleFilterGuildChange={handleFilterGuildChange}
            setSearchTerm={setSearchTerm}
          />
        </div>
        {/* <div className='mt-24 lg:mt-0'>
          <RegionHeader onFilterChange={handleRegionFilterChange} />
        </div> */}
      </div>
    </>
  )
}

export default Regions
