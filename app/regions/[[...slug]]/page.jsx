'use client'

import { useState, useEffect } from 'react'
import RegionHeader from '@/components/Regions/RegionHeader'
import ShowRegion from '@/components/Regions/ShowRegion'
import RegionDetails from '@/components/Regions/RegionDetails'

import toast from 'react-hot-toast'
import axios from 'axios'

import GuildHeader from '@/components/Guilds/GuildHeader'
import ShowGuild from '@/components/Guilds/ShowGuild'

import ShowRegion2 from '@/components/Regions/ShowRegion2'
import ShowRegionCesium from '@/components/Regions/ShowRegionCesium'

import Image from 'next/image'
import GetUserLocation from '@/components/Regions/GetUserLocation'

const getUsers = async () => {
  try {
    const res = await axios.get('/api/public/users')
    if (res.status !== 200) {
      toast.error('Failed to fetch users data')
    }
    const users = res.data.filter(
      (user) =>
        user.first_name &&
        user.last_name &&
        user.email &&
        user.description &&
        user.region.ip &&
        user.avatar.length !== 0 &&
        user.guild_id,
    )
    return users
  } catch (error) {
    toast.error('Internal Server Error')
  }
}

const getGuilds = async () => {
  try {
    const res = await axios.get('/api/public/guilds')
    if (res.status !== 200) {
      toast.error('Failed to fetch guilds data')
    }
    return res.data
  } catch (error) {
    toast.error('Internal Server Error')
  }
}

const continents = [
  {
    continent_name: 'africa',
    continent_code: 'af',
  },
  {
    continent_name: 'antartica',
    continent_code: 'an',
  },
  {
    continent_name: 'asia',
    continent_code: 'as',
  },
  {
    continent_name: 'europe',
    continent_code: 'eu',
  },
  {
    continent_name: 'north america',
    continent_code: 'na',
  },
  {
    continent_name: 'oceania',
    continent_code: 'oc',
  },
  {
    continent_name: 'south and central america',
    continent_code: 'sa',
  },
]

const Regions = ({ params }) => {
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('NORTH AMERICA')

  const [selectedGuildFilter, setSelectedGuildFilter] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const [publicUsers, setPublicUsers] = useState([])
  const [guildData, setGuildData] = useState([])
  const [guilds, setGuilds] = useState([
    {
      name: 'Rohit Shrestha',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/65ef1f0dda9d855fa6c65f91.png',
      continent: 'EAST-ASIA',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      guild: 'KARMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      // avatarimg: 'https://i0.wp.com/vrscout.com/wp-content/uploads/2021/10/TimmuToke_4.png?ssl=1',
      continent: 'EAST-ASIA',
    },
    {
      name: 'Siri',
      description: 'description',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
      continent: 'SOUTH-ASIA',
    },
    {
      name: 'Alexa',
      description: 'description',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
      continent: 'SOUTH-ASIA',
    },
    {
      name: 'Hari Bahadur',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      continent: 'EAST-ASIA',
    },
    {
      name: 'Rohit Shrestha',
      description: 'description',
      guild: 'BUDDHA',
      avatarimg: 'https://models.readyplayer.me/66038d9e2aa392635c277ea9.png',
      continent: 'NORTH-AMERICA',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      guild: 'KARMA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      continent: 'NORTH-AFRICA',
    },
    {
      name: 'Satkar Niraula',
      description: 'description',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'NORTH-AFRICA',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'SUB-SAHARAN-AFRICA',
    },
    {
      name: 'John Doe',
      description: 'description',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'SUB-SAHARAN-AFRICA',
    },
  ])

  const [backgroundImage, setBackgroundImage] = useState(
    'https://imgs.search.brave.com/UJlFq2-QeOeMj6KkDAOZrJ0dKdwRbCdgP5ts7Ets3RM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90cmF2/ZWxsZXJzd29ybGR3/aWRlLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wNi9z/aHV0dGVyc3RvY2tf/NjMyOTQxMDMxLWUx/Njg2NTk2OTI1OTcy/LnBuZw',
  )

  const handleRegionFilterChange = (filter) => {
    setSelectedRegionFilter(filter)
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
        const guild = guildData.find((guild) => guild.id === publicUser.guild_id)
        const continent = continents.find(
          (continent) => continent.continent_code.toUpperCase() === publicUser.region.continent_code,
        )
        const avatarUrl = publicUser.avatar.length > 0 ? publicUser.avatar[0].avatar_url : ''

        return {
          name: publicUser.first_name + ' ' + publicUser.last_name,
          description: publicUser.description,
          guild: guild ? guild.guild_name : 'Unknown Guild',
          avatarimg: avatarUrl.replace('glb', 'png'),
          continent: continent ? continent.continent_name : 'Unknown Continent',
        }
      })
      setGuilds(guilds)
    }

    if (publicUsers.length !== 0 && guildData.length !== 0) {
      mapGuildInfo()
    }
  }, [publicUsers, guildData])

  return (
    <>
      <div className='relative'>
        <a
          href='https://r3-f-next-js-starter-package-git-mainproduction-going-genius.vercel.app/guilds/feedback'
          className='absolute left-2 top-14 z-50 animate-pulse rounded-lg p-2 font-semibold  text-purple-200 shadow shadow-violet-400 lg:top-2'
        >
          Give Feedback
        </a>
        {/* Render other content over the background */}
        {params.slug?.length === 2 ? (
          <div className='flex justify-center'>
            <GetUserLocation />
          </div>
        ) : params.slug?.length === 1 ? ( // regions/something
          <div>
            <div className='relative h-[80vh] flex-1 items-center justify-center'>
              <div className='mx-10 flex justify-start font-semibold'>{params.slug[0].toUpperCase()}</div>

              <div className='mt-6 flex animate-pulse flex-col items-center justify-center lg:mt-10'>
                <h1 className='text-center text-3xl font-bold text-white'>
                  Developers are working on this page. <br />
                  Any feedback will be helpful.
                </h1>
              </div>
              <div className='absolute bottom-0 flex h-[48vh] w-full px-10 lg:bottom-10 '>
                <iframe
                  className='w-full rounded'
                  src='https://ggrelativity.xyz/ticket-form/c4ca4238a0b923820dcc509a6f75849b'
                ></iframe>
              </div>
            </div>
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
            <div className='flex flex-col justify-center lg:justify-start'>
              {/* Old Component */}
              {/* <ShowRegion filter={selectedFilter} searchTerm={searchTerm} /> */}
              {/* New Component */}
              {/* <ShowRegion2 filter={selectedFilter} /> */}

              <ShowRegionCesium
                filter={selectedRegionFilter}
                guilds={guilds}
                selectedGuildFilter={selectedGuildFilter}
                searchTerm={searchTerm}
                handleFilterGuildChange={handleFilterGuildChange}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <RegionHeader
              onFilterChange={handleRegionFilterChange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Regions
