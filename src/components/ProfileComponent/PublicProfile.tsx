'use client'

import { useEffect, useState } from 'react'

import { useUser } from '@/UserClientProvider'
import useUserAndGuildData from '@/components/CustomHooks/useUserAndGuildData'
import LeftSideViewComponent from '../PublicProfileViews/LeftSideViewComponent'
import RightSideViewComponent from '../PublicProfileViews/RightSideViewComponent'
import { Avatar } from '../Avatar'
import MiddleViewComponent from '../PublicProfileViews/MiddleViewComponent'
import ExpressionBottomMidHud from '../GGHuds/ExpressionBottomMidHud'

// Expressions
const expressions = [
  { label: 'neutral', icon: '/emojis/neutral.svg', bg: '#FFFFFF', animation: '/F_Talking_Variations_001.fbx' },
  { label: 'sad', icon: '/emojis/sad.svg', bg: '#0C2E5C', animation: '/M_Standing_Expressions_011.fbx' },
  { label: 'happy', icon: '/emojis/happy.svg', bg: '#007F13', animation: '/M_Standing_Expressions_012.fbx' },
  { label: 'amazed', icon: '/emojis/amazed.svg', bg: '#F8BF43', animation: '/M_Standing_Expressions_013.fbx' },
  { label: 'angry', icon: '/emojis/angry.svg', bg: '#A20325', animation: '/M_Standing_Expressions_016.fbx' },
]

export default function PublicProfile({ username }) {
  const { user } = useUser()
  const { users, guilds } = useUserAndGuildData()
  const [fetchedData, setFetchedData] = useState([])
  const [skills, setSkills] = useState([])
  const [emote, setEmote] = useState('/male-idle-3.fbx')

  const handleEmote = (emote) => {
    setEmote(emote)
  }

  // Map the publicUser data to the format needed
  useEffect(() => {
    if (users.length && guilds.length) {
      const filteredData = users
        .filter((publicUser) => publicUser.username === username) // Filter by username
        .map((publicUser) => {
          const guild = guilds.find((g) => g.id === publicUser.guild_id)
          const avatarUrl = publicUser.avatar.length > 0 ? publicUser.avatar[0].avatar_url : ''

          return {
            name: `${publicUser.first_name} ${publicUser.last_name}`,
            username: publicUser.username,
            age: publicUser.age,
            user_image:
              publicUser.image_urls.length > 0
                ? publicUser.image_urls[publicUser.image_urls.length - 1]
                : '/card/defaultbuddha.svg',
            description: publicUser.description,
            guild: guild ? guild.guild_name : 'Unknown Guild',
            avatarurl: avatarUrl,
            country: publicUser.region.country, // country as country code
            city: publicUser.region.city,
            skillsData: publicUser.skills,
            experienceData: publicUser.experience,
            faculties: publicUser.faculty,
            overall_user_image: publicUser.image_urls,
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

  // selected publicUser guild
  const userGuild = fetchedData[0]?.guild

  const avatar_url = fetchedData[0]?.avatarurl

  const loggedin_user_avatar = user?.avatar.length > 0 ? user.avatar[user.avatar.length - 1].avatar_url : ''

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
          {/* Expression Bottom Mid Hud */}
          <ExpressionBottomMidHud expressions={expressions} handleEmote={handleEmote} />

          {/* LeftPart */}
          <div className='fixed left-[76px] top-1/2 z-20 h-[73%] w-[20%] -translate-y-1/2 overflow-hidden rounded-md bg-custom-gradient-purple text-black shadow-lg shadow-black/50 transition-all duration-500 ease-in-out'>
            <LeftSideViewComponent />
          </div>

          {/* Mid Part */}
          <div className='fixed left-1/2 top-1/2 z-20 h-[73%] w-[47%] -translate-x-1/2 -translate-y-1/2 overflow-hidden text-black shadow-lg shadow-black/50 transition-all duration-500 ease-in-out'>
            <MiddleViewComponent
              user={fetchedData[0]}
              skillsData={skills}
              guild={guilds}
              experience={fetchedData[0]?.experienceData}
            />
          </div>

          {/* Right Part */}

          <div className='fixed right-[76px] top-1/2 z-20 h-[73%] w-[20%] -translate-y-1/2 rounded-md bg-custom-gradient-purple text-black shadow-lg shadow-black/50 backdrop-blur-lg transition-all duration-500 ease-in-out'>
            <div className='size-full overflow-hidden p-2'>
              <RightSideViewComponent user={fetchedData[0]} guild={guilds} />
            </div>

            {/* Viewer's Avatar */}
            <div className='absolute -left-6 top-[-96px] z-30 h-[96px] w-[130px] overflow-hidden bg-transparent'>
              {user?.username !== fetchedData[0]?.username && (
                <>
                  {loggedin_user_avatar && (
                    <div className='size-full'>
                      <Avatar
                        modelSrc={`${loggedin_user_avatar}?quality=low`}
                        animationSrc={emote}
                        fov={20}
                        cameraTarget={2}
                        cameraInitialDistance={2.5}
                        effects={{
                          ambientOcclusion: true,
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            {/* Profile owner's Avatar */}
            <div className='absolute -right-6 top-[-100px] z-30 h-[100px] w-[150px] overflow-hidden bg-transparent'>
              {avatar_url && (
                <div className='size-full'>
                  <Avatar
                    modelSrc={`${avatar_url}?quality=low`}
                    animationSrc='/male-spawn-animation.fbx'
                    fov={20}
                    cameraTarget={2}
                    cameraInitialDistance={2.5}
                    effects={{
                      ambientOcclusion: true,
                    }}
                  />
                </div>
              )}
            </div>
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
