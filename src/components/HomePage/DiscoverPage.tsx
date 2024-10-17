'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ExpressionBottomMidHud from '../GGHuds/ExpressionBottomMidHud'
import LeftSideViewComponent from '../PublicProfileViews/LeftSideViewComponent'
import DiscoverRegion from '../Regions/DiscoverRegion'
import RegionHeader from '../Regions/RegionHeader'

const expressions = [
  { label: 'neutral', icon: '/emojis/neutral.svg', bg: '#FFFFFF', animation: '/F_Talking_Variations_001.fbx' },
  { label: 'sad', icon: '/emojis/sad.svg', bg: '#0C2E5C', animation: '/M_Standing_Expressions_011.fbx' },
  { label: 'happy', icon: '/emojis/happy.svg', bg: '#007F13', animation: '/M_Standing_Expressions_012.fbx' },
  { label: 'amazed', icon: '/emojis/amazed.svg', bg: '#F8BF43', animation: '/M_Standing_Expressions_013.fbx' },
  { label: 'angry', icon: '/emojis/angry.svg', bg: '#A20325', animation: '/M_Standing_Expressions_016.fbx' },
]

const getUsers = async () => {
  try {
    const res = await fetch('/api/public/users')
    if (!res.ok) {
      toast.error('Failed to fetch users data')
      return []
    }
    const users = await res.json()

    const filteredUsers = users.filter(
      (user) => user.username && user.email && user.region.ip && user.avatar.length !== 0 && user.guild_id,
    )
    return filteredUsers
  } catch (error) {
    toast.error('Internal Server Error')
    return []
  }
}

const getGuilds = async () => {
  try {
    const res = await fetch('/api/public/guilds')
    if (!res.ok) {
      toast.error('Failed to fetch guilds data')
      return []
    }
    return res.json()
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

const DiscoverPage = ({ facultyTags }) => {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('ASIA') // Using continent asia
  const [selectedGuildFilter, setSelectedGuildFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [publicUsers, setPublicUsers] = useState([])
  const [guildData, setGuildData] = useState([])
  const [guilds, setGuilds] = useState([])
  const [currentEmote, setCurrentEmote] = useState<string | null>(null)
  const [emote, setEmote] = useState('/male-idle-3.fbx')

  const handleEmote = (emote: string) => {
    setCurrentEmote(emote)
    setEmote(emote)
  }

  const handleRegionFilterChange = (filter) => {
    setSelectedRegionFilter(filter)
    setSearchTerm('')
  }

  const handleFilterGuildChange = (filter) => {
    setSelectedGuildFilter(filter)
    setSearchTerm('')
  }

  // Fetch the users data
  useEffect(() => {
    const savePublicUsers = async () => {
      const users = await getUsers()
      setPublicUsers(users)
    }
    savePublicUsers()
  }, [])

  // Fetch the guilds data
  useEffect(() => {
    const saveGuilds = async () => {
      const guild = await getGuilds()
      setGuildData(guild)
    }
    saveGuilds()
  }, [])

  // Map the guilds with the public users
  useEffect(() => {
    const mapGuildInfo = () => {
      const guilds = publicUsers.map((publicUser) => {
        const guild = guildData.find((g) => g.id === publicUser.guild_id)
        const continent = continents.find((continent) => continent.continent_code === publicUser.region.continent_code)
        const avatarUrl = publicUser.avatar.length > 0 ? publicUser.avatar[publicUser.avatar.length - 1].avatar_url : ''
        const userImages = publicUser.image_urls
        const experience = publicUser.experience

        return {
          name: `${publicUser.first_name} ${publicUser.last_name}`,
          username: publicUser.username,
          description: publicUser.description,
          image_urls: userImages,
          guild: guild ? guild.guild_name : 'Unknown Guild',
          avatarimg: avatarUrl.replace('glb', 'png'),
          continent: continent ? continent.continent_name : 'Unknown Continent',
          experience: experience,
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
      <div className='relative h-screen w-full'>
        <div className='flex size-full justify-center'>
          {/* Discover Page Main Content */}
          <DiscoverRegion
            selectedRegionFilter={selectedRegionFilter}
            guilds={guilds}
            selectedGuildFilter={selectedGuildFilter}
            searchTerm={searchTerm}
            handleFilterGuildChange={handleFilterGuildChange}
            setSearchTerm={setSearchTerm}
            facultyTags={facultyTags}
          />
        </div>
        <div className='absolute top-20 flex w-full justify-center lg:top-32 lg:justify-start'>
          {/* Left Sidebar/Header Section to showcase the regions to filter with */}
          <RegionHeader onFilterChange={handleRegionFilterChange} />
        </div>
        <div className='fixed right-[76px] top-1/2 z-20 h-[73%] w-[20%] -translate-y-1/2 rounded-md text-black shadow-lg shadow-black/50 backdrop-blur-md transition-all duration-500 ease-in-out'>
          <LeftSideViewComponent emote={currentEmote} />
        </div>

        <ExpressionBottomMidHud expressions={expressions} handleEmote={handleEmote} />
      </div>
    </>
  )
}

export default DiscoverPage
