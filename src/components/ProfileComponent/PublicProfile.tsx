'use client'

import { useEffect, useState } from 'react'

import useUserAndGuildData from '@/components/CustomHooks/useUserAndGuildData'
import UserContent from './PublicProfileComponent/ProfileInfoComponents/UserContent'
import LeftSideViewComponent from '../PublicProfileViews/LeftSideViewComponent'
import RightSideViewComponent from '../PublicProfileViews/RightSideViewComponent'

export default function PublicProfile({ username }) {
  const { users, guilds } = useUserAndGuildData()
  const [fetchedData, setFetchedData] = useState([])
  const [skills, setSkills] = useState([])

  // Map the user data to the format needed
  useEffect(() => {
    if (users.length && guilds.length) {
      const filteredData = users
        .filter((user) => user.username === username) // Filter by username
        .map((user) => {
          const guild = guilds.find((g) => g.id === user.guild_id)
          const avatarUrl = user.avatar.length > 0 ? user.avatar[0].avatar_url : ''

          return {
            name: `${user.first_name} ${user.last_name}`,
            username: user.username,
            age: user.age,
            user_image:
              user.image_urls.length > 0 ? user.image_urls[user.image_urls.length - 1] : '/card/defaultbuddha.svg',
            description: user.description,
            guild: guild ? guild.guild_name : 'Unknown Guild',
            avatarurl: avatarUrl,
            country: user.region.country, // country as country code
            city: user.region.city,
            skillsData: user.skills,
            experienceData: user.experience,
            faculties: user.faculty,
            overall_user_image: user.image_urls,
          }
        })
      setFetchedData(filteredData)
    }
  }, [users, guilds, username])

  // Extract skills from fetchedData (Modified to match the format for skillsChart component)
  useEffect(() => {
    if (fetchedData[0]?.skillsData) {
      const skillsData = fetchedData[0].skillsData
      const newSkills = skillsData.map((data) => ({
        skill_name: data.skill[0].skill_name, // Access the skill name
        percentage: data.skill[0].percentage, // Access the percentage
      }))
      setSkills(newSkills)
    }
  }, [fetchedData]) // Only re-run when fetchedData changes

  // selected user guild
  const userGuild = fetchedData[0]?.guild

  return (
    <>
      {/* Video BG */}
      <div className='fixed top-0 h-screen w-full'>
        {userGuild && (
          <video key={userGuild} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            {userGuild === 'BUDDHA' ? (
              <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
            ) : userGuild === 'VAJRA' ? (
              <source src='/livewallpapers/vajra.mp4' type='video/mp4' />
            ) : userGuild === 'PADMA' ? (
              <source src='/livewallpapers/padma.mp4' type='video/mp4' />
            ) : userGuild === 'KARMA' ? (
              <source src='/livewallpapers/karma.mp4' type='video/mp4' />
            ) : userGuild === 'RATNA' ? (
              <source src='/livewallpapers/earth.mp4' type='video/mp4' />
            ) : (
              <source src='/livewallpapers/forest.mp4' type='video/mp4' />
            )}
          </video>
        )}
      </div>

      {users ? (
        <>
          {/* LeftPart */}
          <div className='fixed left-[76px] top-1/2 z-20 h-[73%] w-[20%] -translate-y-1/2 overflow-hidden rounded-md bg-custom-gradient-purple text-black shadow-lg shadow-black/50 transition-all duration-500 ease-in-out'>
            <LeftSideViewComponent />
          </div>

          {/* Mid Part */}
          <div className='fixed left-1/2 top-1/2 z-20 h-[73%] w-[47%] -translate-x-1/2 -translate-y-1/2 overflow-hidden text-black shadow-lg shadow-black/50 transition-all duration-500 ease-in-out'>
            <UserContent
              user={fetchedData[0]}
              skillsData={skills}
              guild={guilds}
              experience={fetchedData[0]?.experienceData}
            />
          </div>

          {/* Right Part */}
          <div className='fixed right-[76px] top-1/2 z-20 h-[73%] w-[20%] -translate-y-1/2 overflow-hidden rounded-md bg-custom-gradient-purple text-black shadow-lg shadow-black/50 transition-all duration-500 ease-in-out'>
            <RightSideViewComponent user={fetchedData[0]} guild={guilds} />
          </div>
        </>
      ) : (
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='text-center text-2xl font-bold'>Loading...</div>
        </div>
      )}
    </>
  )
}
