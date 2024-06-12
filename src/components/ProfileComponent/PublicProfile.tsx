'use client'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState, useRef } from 'react'
// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'
import UserInfoShowcase from './PublicProfileComponent/UserInfoShowcase'
import ExperienceShowcase from './PublicProfileComponent/ExperienceShowcase'

import axios from 'axios'
import toast from 'react-hot-toast'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })

const getSelectedPublicUser = async (username) => {
  try {
    const res = await axios.get(`/api/public/users/${username}`)
    if (res.status !== 200) {
      return toast.error('Failed to get the user')
    }
    console.log('user', res.data)
    return res.data
  } catch (error) {
    toast.error('Internal server error')
  }
}

export default function PublicProfile({ username }) {
  const [user, setUser] = useState(null)
  const [skillsData, setSkillsData] = useState([])
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [experience, setExperience] = useState([])

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
    <div className='relative flex justify-between lg:size-full'>
      {user ? (
        <>
          <div className='relative flex h-[360px] w-full items-center justify-center overflow-y-hidden lg:relative lg:h-screen lg:w-[27%]'>
            {user && (
              <>
                <div className='absolute top-20 z-0 flex w-full items-center justify-center overflow-hidden text-8xl font-extrabold md:text-9xl lg:hidden'>
                  {user.first_name.toUpperCase()}
                </div>

                <div className='fixed left-16 top-0 z-0 hidden w-1/4 items-start justify-center lg:flex lg:flex-col'>
                  <div className=' flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8'>
                    {username.split('').map((letter, index) => (
                      <span key={index}>{letter.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {avatarsData && avatarsData.length !== 0 && (
              <div className='fixed left-24 top-0 z-50 h-full'>
                <Avatar
                  modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                  shadows
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
          </div>

          {/* Carousel */}

          <div className='flex size-full flex-col'>
            <div className='flex w-full justify-center'>
              <UserInfoShowcase user={user} skillsData={skillsData} />
            </div>
            {/* Slide 2 */}
            <div className='mt-5 w-full flex-1'>
              <ExperienceShowcase experience={experience} user={user} />
            </div>
          </div>
        </>
      ) : (
        <div className='flex size-full items-center justify-center'>
          <div className='text-center text-2xl font-bold'>Loading</div>
        </div>
      )}
    </div>
  )
}
