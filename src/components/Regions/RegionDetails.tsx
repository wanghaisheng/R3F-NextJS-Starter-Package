'use client'

import { useState } from 'react'
import GuildHeader from '@/components/Guilds/GuildHeader'
import ShowGuild from '@/components/Guilds/ShowGuild'

const RegionDetails = ({ continent }: { continent: string }) => {
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const guilds = [
    {
      name: 'Rohit Shrestha',
      description: 'description EA',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/65ef1f0dda9d855fa6c65f91.png',
      continent: 'EAST-ASIA',
    },
    {
      name: 'Ram Kumar',
      description: 'EA description',
      guild: 'KARMA',
      // avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      avatarimg: 'https://i0.wp.com/vrscout.com/wp-content/uploads/2021/10/TimmuToke_4.png?ssl=1',
      continent: 'EAST-ASIA',
    },
    {
      name: 'Siri',
      description: 'description SA',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
      continent: 'SOUTH-ASIA',
    },
    {
      name: 'Alexa',
      description: 'description SA',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
      continent: 'SOUTH-ASIA',
    },
    {
      name: 'Hari Bahadur',
      description: 'description EA',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      continent: 'EAST-ASIA',
    },
    {
      name: 'Rohit Shrestha',
      description: 'description meso MA',
      guild: 'BUDDHA',
      avatarimg: 'https://models.readyplayer.me/66038d9e2aa392635c277ea9.png',
      continent: 'MESO-AMERICA',
    },
    {
      name: 'Ram Kumar',
      description: 'description NAfica',
      guild: 'KARMA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      continent: 'NORTH-AFRICA',
    },
    {
      name: 'Satkar Niraula',
      description: 'description Sub-saharan Africa',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'sub-saharan-africa',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description north africa',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'north-africa',
    },
    {
      name: 'John Doe',
      description: 'description sub-saharan africa',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'sub-saharan-africa',
    },
  ]

  const filteredUser = guilds.filter((user) => user.continent.toLowerCase() === continent)

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter)
    setSearchTerm('')
  }
  return (
    <>
      <GuildHeader onFilterChange={handleFilterChange} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className='flex-col lg:ml-72 lg:flex lg:justify-start'>
        <ShowGuild users={filteredUser} filter={selectedFilter} searchTerm={searchTerm} />
      </div>
    </>
  )
}

export default RegionDetails
