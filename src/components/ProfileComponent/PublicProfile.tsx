'use client'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import dynamic from 'next/dynamic'
import { useUser } from '@/context/UserContext/UserContext'
import { useCallback, useEffect, useState, useRef } from 'react'
import ExpProfileView from '../card/ExpProfileView'
//icons
import { FaRegEdit } from 'react-icons/fa'
// For the card flip QR code
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'
// For the carousel
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'
// For carousel inside slide 1
import DrawOutlineButton from '@/components/AnimatedButton/DrawOutlineButton'
import { format, formatDistanceToNow } from 'date-fns'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })

export default function PublicProfile() {
  const { user } = useUser()
  const [skillsData, setSkillsData] = useState([])
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [experience, setExperience] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const isScrollingRef = useRef(false)

  const handleChangeSlide = (index) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }

  const handleScroll = useCallback(
    (event) => {
      if (!emblaApi || isScrollingRef.current) return

      isScrollingRef.current = true

      const deltaY = event.deltaY

      if (deltaY > 0) {
        emblaApi.scrollNext()
      } else if (deltaY < 0) {
        emblaApi.scrollPrev()
      }

      setTimeout(() => {
        isScrollingRef.current = false
      }, 500) // Adjust debounce delay as needed
    },
    [emblaApi],
  )

  useEffect(() => {
    window.addEventListener('wheel', handleScroll)
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll])
  // Main Carousel

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // carousel inside Slide 1
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true })
  useEffect(() => {
    if (emblaApi2) {
      console.log(emblaApi2.slideNodes()) // Access API
    }
  }, [emblaApi2])

  const scrollPrev2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollPrev()
  }, [emblaApi2])

  const scrollNext2 = useCallback(() => {
    if (emblaApi2) emblaApi2.scrollNext()
  }, [emblaApi2])

  // Carousel inside slide 2
  const [emblaRef3, emblaApi3] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi3) {
      console.log(emblaApi3.slideNodes()) // Access API
    }
  }, [emblaApi3])

  const scrollPrev3 = useCallback(() => {
    if (emblaApi3) emblaApi3.scrollPrev()
  }, [emblaApi3])

  const scrollNext3 = useCallback(() => {
    if (emblaApi3) emblaApi3.scrollNext()
  }, [emblaApi3])

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
  }, [user])

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

  console.log(user)
  return (
    <div className='relative flex flex-col lg:size-full'>
      <div className='relative z-10 flex h-[360px] w-full items-center justify-center overflow-y-hidden lg:relative lg:h-[650px] lg:w-[40%]'>
        {/* <div className='absolute top-[40%] z-10 flex h-[360px] w-full items-center justify-center lg:relative lg:h-[650px]'> */}
        {avatarsData && avatarsData.length !== 0 ? (
          <Avatar
            modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
            shadows
            animationSrc='/male-idle-3.fbx'
            style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
            fov={40}
            cameraTarget={1.5}
            cameraInitialDistance={30}
            effects={{
              ambientOcclusion: true,
            }}
          />
        ) : (
          <Avatar
            modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=1024&pose=A&useHands=true'
            shadows
            animationSrc='/male-idle-3.fbx'
            style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
            fov={40}
            cameraTarget={1.5}
            cameraInitialDistance={30}
            effects={{
              ambientOcclusion: true,
            }}
          />
        )}
      </div>

      {user && (
        <div className='absolute top-20 z-0 flex w-full items-center justify-center text-8xl font-extrabold md:text-9xl lg:hidden'>
          {user.first_name.toUpperCase()}
        </div>
      )}
      {/* Carousel */}
      <div className='top-10 flex size-full justify-end px-4 lg:absolute'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex '>
            {/* Slide 1 */}
            <div className='w-full shrink-0 grow lg:min-w-0 '>
              <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-end'>
                <div className='h-full lg:ml-24 lg:w-full'>
                  {user && (
                    <>
                      <div className='flex size-full lg:justify-between'>
                        <div className='z-0 hidden w-1/4 items-start justify-center lg:flex lg:flex-col'>
                          <div className='flex flex-col items-center justify-center pt-4 text-8xl font-extrabold lg:pl-8'>
                            {user.first_name.split('').map((letter, index) => (
                              <span key={index}>{letter.toUpperCase()}</span>
                            ))}
                          </div>
                        </div>

                        <div className='z-0 flex w-full flex-col justify-start bg-blue-950 p-8 lg:w-[72%]'>
                          <div>
                            <h1 className='text-3xl font-bold'>
                              Name : {user.first_name} {user.last_name}
                            </h1>
                            <p>{user.created_at}</p>
                            <p className='mt-2'>DOB: {user.dob}</p>
                            <p className='mt-2'>Guild: {user.guilds[0].guild_name}</p>
                            <p className='mt-2'>Description: {user.description}</p>
                          </div>
                          <div>
                            <CardContainer className='mt-10 py-0 hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
                              <CardBody className='group/card relative'>
                                <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
                                  {user && skillsData ? (
                                    <SkillsChartComponent skills={skillsData} />
                                  ) : (
                                    // Render loading indicator or placeholder while data is being fetched
                                    <div className='rounded-lg border p-5'>Recommendations for Skills Card</div>
                                  )}
                                </div>
                              </CardBody>
                            </CardContainer>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className='w-full shrink-0 grow lg:min-w-0'>
              <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-end'>
                <div className='h-full lg:ml-24 lg:w-[70%]'>
                  <div className='relative'>
                    <div className='overflow-hidden' ref={emblaRef}>
                      <div className='flex'>
                        <div className='flex-[0_0_100%]'>
                          <div className='flex justify-center'>
                            <button onClick={scrollPrev3} aria-label='prev button'>
                              <MdNavigateBefore />
                            </button>
                            <button onClick={scrollNext3} aria-label='next button'>
                              <MdNavigateNext />
                            </button>
                          </div>
                          {experience.length !== 0 ? (
                            <>
                              <div className='w-full overflow-hidden' ref={emblaRef3}>
                                <div className='flex w-full flex-row items-center justify-start'>
                                  {experience.map((exp, index) => (
                                    <>
                                      <div key={exp.name} className='w-full shrink-0 grow lg:min-w-0 '>
                                        <CardContainer>
                                          <ExpProfileView
                                            type={exp.type}
                                            projectName={exp.name}
                                            skills={exp.project_skills.join(', ')}
                                            toolsAndTech={exp.tools}
                                          />
                                        </CardContainer>
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </>
                          ) : (
                            <p>No experiences available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 flex justify-center'>
                    {/* https://r3-f-next-js-starter-package.vercel.app/ */}
                    {user && (
                      <a
                        // href={`http://localhost:3001//api/public/users/${user.gg_id}`}
                        // target='_blank'
                        aria-label='Interact button'
                      >
                        <DrawOutlineButton>Interact!!</DrawOutlineButton>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className='absolute hidden lg:left-10 lg:top-[45%] lg:block lg:text-5xl'
            onClick={scrollPrev}
            aria-label='Previous Slide'
          >
            <MdNavigateBefore />
          </button>
          <button
            className='absolute hidden lg:right-10 lg:top-[45%] lg:block lg:text-5xl'
            onClick={scrollNext}
            aria-label='Next Slide'
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  )
}
