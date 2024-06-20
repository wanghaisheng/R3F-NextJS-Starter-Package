'use client'

import { useState, useEffect } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import toast from 'react-hot-toast'
import axios from 'axios'
import DiscoverRegion from '../Regions/DiscoverRegion'

const getUsers = async () => {
  try {
    const res = await axios.get('/api/public/users')
    if (res.status !== 200) {
      toast.error('Failed to fetch users data')
      return []
    }
    const users = res.data.filter(
      (user) =>
        user.first_name &&
        user.last_name &&
        user.username &&
        user.email &&
        user.region.ip &&
        user.avatar.length !== 0 &&
        user.guild_id,
    )
    return users
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

const getGuilds = async () => {
  try {
    const res = await axios.get('/api/public/guilds')
    if (res.status !== 200) {
      toast.error('Failed to fetch guilds data')
      return []
    }
    return res.data
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

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

const HomePage2 = () => {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('ASIA') // Using continent asia
  const [selectedGuildFilter, setSelectedGuildFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [publicUsers, setPublicUsers] = useState([])
  const [guildData, setGuildData] = useState([])
  const [guilds, setGuilds] = useState([])

  const handleRegionFilterChange = (filter) => {
    setSelectedRegionFilter(filter)
    setSearchTerm('')
  }

  const handleFilterGuildChange = (filter) => {
    setSelectedGuildFilter(filter)
    setSearchTerm('')
  }

  useEffect(() => {
    const savePublicUsers = async () => {
      const users = await getUsers()
      setPublicUsers(users)
    }
    savePublicUsers()
  }, [])

  useEffect(() => {
    const saveGuilds = async () => {
      const guild = await getGuilds()
      setGuildData(guild)
    }
    saveGuilds()
  }, [])

  useEffect(() => {
    const mapGuildInfo = () => {
      const guilds = publicUsers.map((publicUser) => {
        const guild = guildData.find((g) => g.id === publicUser.guild_id)
        const continent = continents.find((continent) => continent.continent_code === publicUser.region.continent_code)
        const avatarUrl = publicUser.avatar.length > 0 ? publicUser.avatar[0].avatar_url : ''

        return {
          name: `${publicUser.first_name} ${publicUser.last_name}`,
          username: publicUser.username,
          description: publicUser.description,
          guild: guild ? guild.guild_name : 'Unknown Guild',
          avatarimg: avatarUrl.replace('glb', 'png'),
          continent: continent ? continent.continent_name : 'Unknown Continent',
        }
      })
      setGuilds(guilds)
    }

    if (Array.isArray(publicUsers) && publicUsers.length !== 0 && Array.isArray(guildData) && guildData.length !== 0) {
      mapGuildInfo()
    }
  }, [publicUsers, guildData])

  return (
    <>
      <div className='relative'>
        <div className='flex flex-col justify-center lg:justify-start'>
          <DiscoverRegion
            selectedRegionFilter={selectedRegionFilter}
            guilds={guilds}
            selectedGuildFilter={selectedGuildFilter}
            searchTerm={searchTerm}
            handleFilterGuildChange={handleFilterGuildChange}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <div className='absolute top-20 flex w-full justify-center lg:top-32 lg:justify-start'>
          <RegionHeader onFilterChange={handleRegionFilterChange} />
        </div>
      </div>
    </>
  )
}

export default HomePage2
