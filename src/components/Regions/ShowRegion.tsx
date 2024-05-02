'use client'

import Image from 'next/image'
import ShowUsers from './ShowUsers'

import { useState } from 'react'

export default function ShowRegion({ filter, searchTerm }: { filter: string; searchTerm: string }) {
  const [subContinent, setSubContinent] = useState('')

  const [isFilteredRegionsVisible, setIsFilteredRegionsVisible] = useState('block')

  const regions = [
    {
      name: 'East Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/15865/15865373.png',
      continent: 'ASIA',
      image:
        'https://imgs.search.brave.com/aSDKpjkUcexmRKTgD4x46WheLrZPpHQzTNQ5uuFYx5k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlnbG9iYWx2aWV3/cG9pbnQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA4/L1BhbGF3YW4tMS5q/cGc',
    },
    {
      name: 'South Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/356/356749.png',
      continent: 'ASIA',
      image:
        'https://imgs.search.brave.com/CHR1lb38tg1-9E8kcVdsTqaK2sEmUZCZo7PSvKWy3tM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXdt/YWxyb2Ftcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDgvMjVEQzg5RTEt/MDA2Mi00NDNFLUFG/MUQtQ0Y1ODAxMzcy/RjI4LTEwMjR4Njg0/LmpwZWc',
    },
    {
      name: 'Meso America',
      icon: 'https://cdn-icons-png.flaticon.com/128/2492/2492046.png',
      continent: 'NORTH AMERICA',
      image:
        'https://imgs.search.brave.com/t4ZToHbheBsGuZBsU4WvRJd7VQmyNn0xtgOon50vsSA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbnRyYXZlbGVy/LmNvbS9waG90b3Mv/NjU0ODVlNTk1M2My/NTc2YTRlMjBmODkz/L21hc3Rlci93XzMy/MCxjX2xpbWl0L0Jp/Zy1TdXItdGhvbWFz/LWNpc3pld3NraS1l/ckFwbWZSWDdlby11/bnNwbGFzaC5qcGc',
    },
    {
      name: 'North Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      continent: 'AFRICA',
      image:
        'https://imgs.search.brave.com/sdPLZjS3Z9AOVh1q6THgtwaL4UU_ug4VwT_dkE3LZRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmFzc2V0cy50aGVk/aXNjb3ZlcmVyLmNv/bS8yMDE5LzA1L2Jl/YXV0aWZ1bC1hZnJp/Y2EuanBn',
    },
    {
      name: 'Sub-Saharan Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      continent: 'AFRICA',
      image:
        'https://imgs.search.brave.com/G7zOwnpcKRoEWw2tPhmfU7pdbPImUNKWtOSH4eNqslY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdW5pdGVjaC1n/bG9iYWwtcmVzb3Vy/Y2UvaW1hZ2UvdXBs/b2FkL3YxNTgyNzAw/NTEwL25hbWliaWEx/X2gzMzFxbi5qcGc',
    },
  ]

  const allUsers = [
    {
      name: 'Rohit Shrestha',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/65ef1f0dda9d855fa6c65f91.png',
      continent: 'EAST ASIA',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      guild: 'KARMA',
      // avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      avatarimg: 'https://i0.wp.com/vrscout.com/wp-content/uploads/2021/10/TimmuToke_4.png?ssl=1',
      continent: 'EAST ASIA',
    },
    {
      name: 'Siri',
      description: 'description',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
      continent: 'SOUTH ASIA',
    },
    {
      name: 'Alexa',
      description: 'description',
      guild: 'RATNA',
      avatarimg: 'https://models.readyplayer.me/6630d82746fb66980728a6c6.png',
      continent: 'SOUTH ASIA',
    },
    {
      name: 'Hari Bahadur',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      continent: 'EAST ASIA',
    },
    {
      name: 'Rohit Shrestha',
      description: 'description',
      guild: 'BUDDHA',
      avatarimg: 'https://models.readyplayer.me/66038d9e2aa392635c277ea9.png',
      continent: 'SOUTH ASIA',
    },
    {
      name: 'Ram Kumar',
      description: 'description',
      guild: 'KARMA',
      avatarimg: 'https://models.readyplayer.me/6630d7f8168713af984b742e.png',
      continent: 'AFRICA',
    },
    {
      name: 'Satkar Niraula',
      description: 'description',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'SOUTH ASIA',
    },
    {
      name: 'Shaligram B.K.',
      description: 'description',
      guild: 'VAJRA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'AFRICA',
    },
    {
      name: 'John Doe',
      description: 'description',
      guild: 'PADMA',
      avatarimg: 'https://models.readyplayer.me/6630d85ee2cc95da16c0484b.png',
      continent: 'AFRICA',
    },
  ]

  const users = allUsers.filter((user) => user.continent === subContinent)

  const filteredRegions = filter ? regions.filter((region) => region.continent === filter) : regions

  const filteredAndSearchedRegions = filteredRegions.filter((region) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <div className='flex justify-center'>
        <div className='mx-10 my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredAndSearchedRegions.map((region, index) => (
            <a
              // onClick={() => setSubContinent(region.name.toUpperCase())}
              onClick={() => {
                setSubContinent(region.name.toUpperCase())
                // setIsFilteredRegionsVisible('hidden') // Hide filtered search regions
              }}
              // className={`relative flex h-[230px] w-[300px] min-w-0 flex-col items-center justify-center rounded-bl-lg rounded-tr-lg bg-purple-900/30 transition duration-500 ease-out hover:scale-105 ${isFilteredRegionsVisible}`}
              className='relative flex h-[230px] w-[300px] min-w-0 flex-col items-center justify-center rounded-bl-lg rounded-tr-lg bg-purple-900/30 transition duration-500 ease-out hover:scale-105'
              key={index}
            >
              <Image
                className='aspect-[300/230] w-[300px] rounded-bl-lg rounded-tr-lg'
                src={region.image}
                alt=''
                width={300}
                height={230}
                style={{ objectFit: 'cover' }}
              />
              {/* Symbol */}
              <span className='absolute top-0 flex size-full items-center justify-center rounded-bl-lg rounded-tr-lg bg-black/80 opacity-100 transition duration-700 ease-out hover:opacity-0'>
                <Image src={region.icon} alt='region icon' height={50} width={50} className='absolute top-[35%] ' />
              </span>
              <span className='absolute bottom-0 flex w-full flex-col items-center rounded-bl-md bg-purple-950 px-3 py-2'>
                <h1>{region.name}</h1>
              </span>
            </a>
          ))}
        </div>
      </div>

      <button
        aria-label='clear button'
        onClick={() => {
          setSubContinent('')
          //  setIsFilteredRegionsVisible('block')
        }}
      >
        CLS
      </button>

      {subContinent === 'EAST ASIA' ? (
        <ShowUsers users={users} filter={filter} searchTerm={searchTerm} />
      ) : subContinent === 'SOUTH ASIA' ? (
        <ShowUsers users={users} filter={filter} searchTerm={searchTerm} />
      ) : subContinent === 'MESO AMERICA' ? (
        <ShowUsers users={users} filter={filter} searchTerm={searchTerm} />
      ) : subContinent === 'NORTH AFRICA' ? (
        <ShowUsers users={users} filter={filter} searchTerm={searchTerm} />
      ) : subContinent === 'SUB-SAHARAN AFRICA' ? (
        <ShowUsers users={users} filter={filter} searchTerm={searchTerm} />
      ) : (
        <></>
      )}
    </>
  )
}
