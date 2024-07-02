'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'
import UserInfoShowcase from './PublicProfileComponent/ProfileInfoComponents/UserInfoShowcase'
import toast from 'react-hot-toast'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar))
const ExperienceShowcase = dynamic(() =>
  import('./PublicProfileComponent/ExperienceShowcase').then((mod) => mod.default),
)

const getSelectedPublicUser = async (username) => {
  try {
    const res = await fetch(`/api/public/users/${username}`)
    if (!res.ok) {
      return toast.error('Failed to get the user')
    }
    // console.log('user', res.data)
    return res.json()
  } catch (error) {
    toast.error('Internal server error')
  }
}

const getGuilds = async () => {
  try {
    const res = await fetch(`/api/public/guilds`)
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

export default function PublicProfile({ username }) {
  const [user, setUser] = useState(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const [guilds, setGuilds] = useState([])
  const [skillsData, setSkillsData] = useState([])
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [experience, setExperience] = useState([])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025) // Adjust the breakpoint as needed
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedGuilds = await getGuilds()
      setGuilds(fetchedGuilds)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const getPublicUser = async () => {
      const publicUser = await getSelectedPublicUser(username)
      setUser(publicUser)
    }
    getPublicUser()
  }, [])

  // Experience data
  useEffect(() => {
    const fetchExpData = async () => {
      try {
        setExperience(user.experience)
      } catch (error) {
        console.log('Error fetching experience data:', error)
      }
    }
    if (user) {
      fetchExpData() // Fetch data only if user is available
    }
  }, [user])

  // Fetch skills data
  function checkExistingSkills(skill, exp_skills) {
    for (let i = 0; i < exp_skills.length; i++) {
      if (exp_skills[i].includes(skill)) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const skillsSet = new Set() // Create a Set to store unique JSON strings

        if (experience.length !== 0) {
          const exp_skill_obj = {}
          const exp_skills = []

          user.skills.forEach((skillObj) => {
            // Add the skillObj to skillsSet
            skillsSet.add(
              JSON.stringify({
                skill_name: skillObj.skill[0].skill_name,
                percentage: skillObj.skill[0].percentage,
              }),
            )
            // Iterate over each skill element in skillObj.skill array
            skillObj.skill.forEach((element) => {
              // Add the skill name to exp_skills array
              exp_skills.push(element.skill_name)
              // Create an entry in exp_skill_obj for the skill percentage
              exp_skill_obj[element.skill_name] = element.percentage
              // Create an entry in exp_skill_obj for the skill_id
              exp_skill_obj[element.skill_name + '_id'] = skillObj.skill_id
            })
          })

          user.experience.forEach((element) => {
            if (element.project_skills.length !== 0) {
              element.project_skills.forEach((skill) => {
                if (!checkExistingSkills(skill, exp_skills)) {
                  skillsSet.add(
                    JSON.stringify({
                      skill_name: skill,
                      percentage: 0,
                    }),
                  ) // Add each object to the Set after converting it to a string
                } else {
                  skillsSet.add(
                    JSON.stringify({
                      skill_name: skill,
                      percentage: exp_skill_obj[`${skill}`],
                    }),
                  )
                }
              })
            }
          })
        }

        // Convert the Set back to an array of objects
        if (skillsSet.size !== 0) {
          const skillsArray = Array.from(skillsSet).map((strObj: string) => JSON.parse(strObj))
          setSkillsData(skillsArray)
        }
      } catch (error) {
        console.log('failed to fetch the skills data')
      }
    }

    if (user) {
      fetchSkillsData() // Fetch data only if user is available
    }
  }, [user, experience])

  // Cards data
  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        setCardsData(user.cards)
      } catch (error) {
        console.log('Error fetching skills data:', error)
      }
    }
    if (user) {
      fetchCardsData() // Fetch data only if user is available
    }
  }, [user])
  // Flip Card QR
  const [isFlipped, setIsFlipped] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end
  // Flip Card QR
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  // Avatar
  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        setAvatarsData(user.avatar)
      } catch (error) {
        console.log('Error fetching avatars data:', error)
      }
    }
    if (user) {
      fetchAvatarsData() // Fetch data only if user is available
    }
  }, [user])

  return (
    <div>
      <div className='fixed top-0 h-screen w-full'>
        {user && (
          <video key={user.guild_id} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            {user?.guild_id === guilds.find((guild) => guild.guild_name === 'BUDDHA')?.id ? (
              <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'VAJRA')?.id ? (
              <source src='/livewallpapers/vajra.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'PADMA')?.id ? (
              <source src='/livewallpapers/padma.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'KARMA')?.id ? (
              <source src='/livewallpapers/karma.mp4' type='video/mp4' />
            ) : user?.guild_id === guilds.find((guild) => guild.guild_name === 'RATNA')?.id ? (
              <source src='/livewallpapers/earth.mp4' type='video/mp4' />
            ) : (
              <source src='/livewallpapers/forest.mp4' type='video/mp4' />
            )}
          </video>
        )}
      </div>

      {user ? (
        <>
          {!isSmallScreen && (
            <div className='fixed flex h-screen w-[700px] items-center justify-center overflow-y-hidden'>
              {user && (
                <>
                  <div className='absolute top-20 z-0 flex w-full items-center justify-center overflow-hidden text-8xl font-extrabold md:text-9xl lg:hidden'>
                    {user.username.toUpperCase()}
                  </div>

                  <div className='fixed left-16 z-0 hidden h-full w-1/4 items-start justify-center lg:flex lg:flex-col'>
                    <div className=' flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8'>
                      {username.split('').map((letter, index) => (
                        <span key={index}>{letter.toUpperCase()}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!isSmallScreen && (
                <>
                  {avatarsData && avatarsData.length !== 0 && (
                    <div className='z-30 size-full '>
                      <Avatar
                        modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                        animationSrc='/male-spawn-animation.fbx'
                        style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                        fov={40}
                        cameraTarget={1.5}
                        cameraInitialDistance={30}
                        effects={{
                          ambientOcclusion: true,
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Carousel */}

          <div className='z-20 mt-20 flex size-full flex-col'>
            <div className='flex w-full justify-center'>
              <UserInfoShowcase user={user} skillsData={skillsData} guild={guilds} />
            </div>
            <div className='mt-5 w-full flex-1'>
              <ExperienceShowcase experience={experience} user={user} height={550} width={800} pagination={false} />
            </div>
          </div>
        </>
      ) : (
        <div className='flex h-screen w-full items-center justify-center'>
          <div className='text-center text-2xl font-bold'>Loading...</div>
        </div>
      )}
    </div>
  )
}
