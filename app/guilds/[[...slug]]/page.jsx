'use client'
import { useState } from 'react'
import GuildHeader from '@/components/Guilds/GuildHeader'
import ShowGuild from '@/components/Guilds/ShowGuild'
const Factions = ({ params }) => {
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const guilds = [
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
  ]
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
          {/* <RegionDetails continent={params.slug[0]} /> */}
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
          <GuildHeader onFilterChange={handleFilterChange} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className='flex-col lg:ml-72 lg:flex lg:justify-start'>
            <ShowGuild users={guilds} filter={selectedFilter} searchTerm={searchTerm} />
          </div>
        </>
      )}
    </>
  )
}

export default Factions
