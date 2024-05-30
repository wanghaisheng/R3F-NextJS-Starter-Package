'use client'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'
import dynamic from 'next/dynamic'
import { useUser } from '@/context/UserContext/UserContext'
import { useCallback, useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import useEmblaCarousel from 'embla-carousel-react'
// Cards
import GeniusIDFlipCard from '@/components/card/GeniusIDFlipCard'
import ExperienceFlipCard from '@/components/card/experienceFlipCard'
import CardsFlipCard from '@/components/card/cardsFlipCard'

const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })
const SkinsCard = dynamic(() => import('@/components/card/SkinsCard'), { ssr: false })

export default function PublicProfile() {
  const { user } = useUser()
  const [skillsData, setSkillsData] = useState([])
  const [avatarsData, setAvatarsData] = useState([])
  const [cardsData, setCardsData] = useState([])
  const [experience, setExperience] = useState([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes())
    }
  }, [emblaApi])

  useEffect(() => {
    if (user) {
      setExperience(user.experience)
      setSkillsData(
        user.skills.map((skillObj) => ({
          skill_name: skillObj.skill[0].skill_name,
          percentage: skillObj.skill[0].percentage,
        })),
      )
      setCardsData(user.cards)
      setAvatarsData(user.avatar)
    }
  }, [user])

  const pathname = usePathname()
  const [imgSrc, setImgSrc] = useState('')
  QRCode.toDataURL(pathname).then(setImgSrc)

  return (
    <div className='relative flex flex-col lg:size-full'>
      <div className='absolute top-2 z-50 flex w-full justify-center'>
        <p className='animate-pulse rounded-lg p-2 font-semibold  text-purple-200 shadow shadow-violet-400'>
          PUBLIC PROFILE
        </p>
      </div>
      <div className='absolute top-[40%] flex h-[360px] w-full items-center justify-center lg:relative lg:h-[600px]'>
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
            modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
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
      {/* Carousel */}
      <div className='top-10 flex size-full justify-between px-4 lg:absolute'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex '>
            {/* Slide 1 */}
            <div className='w-full shrink-0 grow lg:min-w-0 '>
              <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-between'>
                <div className='h-full lg:ml-24 lg:w-[27%]'>
                  {user && (
                    <div className='flex flex-col items-center justify-center'>
                      {/* Carousel */}
                      <div className='w-full overflow-hidden'>
                        <div className='flex items-center'>
                          <div className='w-full shrink-0 grow md:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                Genius ID
                              </div>
                              <div className='flex justify-center'>
                                <GeniusIDFlipCard
                                  first_name={user.first_name}
                                  last_name={user.last_name}
                                  email={user.email}
                                  dob={user.dob}
                                  contact={user.phone_number}
                                  address={user.address}
                                />
                              </div>
                            </div>
                          </div>
                          {cardsData.length != 0 ? (
                            cardsData.map((card) => (
                              <div key={card.card_id} className='w-full shrink-0 grow lg:min-w-0 '>
                                <div className='flex flex-col justify-center'>
                                  <div className='my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                    {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                                  </div>
                                  <div className='flex justify-center'>
                                    <CardsFlipCard
                                      type={card.type}
                                      name={card.name}
                                      dateIn={card.date_in}
                                      dateOut={card.date_out}
                                      emergency_address={card.emergency_address}
                                      emergency_details={card.emergency_details}
                                      emergency_contact={card.emergency_contact}
                                      blood_group={card.blood_group}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className='w-full shrink-0 grow lg:min-w-0 '>
                              <div className='flex flex-col justify-center'>
                                <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                                  CARD2
                                </div>
                                <div className='flex justify-center'>
                                  <CardsFlipCard
                                    personName='Person Name'
                                    type='DEFAULT'
                                    name='DEFAULT'
                                    dateIn='DEFAULT'
                                    dateOut='DEFAULT'
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='my-4 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
                          <button aria-label='previos button' onClick={scrollPrev}>
                            <MdNavigateBefore />
                          </button>
                          <button aria-label='next button' onClick={scrollNext}>
                            <MdNavigateNext />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Slide 2 */}
            <div className='w-full shrink-0 grow lg:min-w-0'>
              <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-between'>
                <div className='h-full lg:ml-24 lg:w-[27%]'>
                  <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Experience
                  </div>
                  <div className='flex flex-col items-center justify-center'>
                    {/* Carousel */}
                    {user && experience.length != 0 ? (
                      <>
                        <div className='w-full overflow-hidden'>
                          <div className='flex items-center'>
                            {experience.map((exp) => (
                              <div key={exp.name} className='w-full shrink-0 grow lg:min-w-0 '>
                                <div className='flex flex-col justify-center'>
                                  <div className='flex justify-center'>
                                    <ExperienceFlipCard
                                      type={exp.type}
                                      projectName={exp.name}
                                      skills={exp.project_skills.join(', ')}
                                      toolsAndTech={exp.tools}
                                    />
                                  </div>
                                  <div className='mt-6 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
                                    <button aria-label='previos button' onClick={scrollPrev}>
                                      <MdNavigateBefore />
                                    </button>
                                    <button aria-label='next button' onClick={scrollNext}>
                                      <MdNavigateNext />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className='w-full shrink-0 grow lg:min-w-0 '>
                        <div className='flex flex-col justify-center'>
                          <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                            Experience
                          </div>
                          <div className='flex justify-center'>
                            <ExperienceFlipCard
                              type='DEFAULT'
                              projectName='DEFAULT'
                              skills='DEFAULT'
                              toolsAndTech='DEFAULT'
                            />
                          </div>
                          <div className='mt-6 flex justify-center gap-x-24 text-2xl sm:gap-x-36'>
                            <button aria-label='previos button' onClick={scrollPrev}>
                              <MdNavigateBefore />
                            </button>
                            <button aria-label='next button' onClick={scrollNext}>
                              <MdNavigateNext />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='mt-60 h-full lg:mr-20 lg:mt-0 lg:w-[30%]'>
                  <div className='relative my-4 flex justify-center text-xl font-semibold drop-shadow md:text-5xl'>
                    Skills
                  </div>
                  <div className='mt-20 flex min-h-48 items-center justify-center px-4'>
                    {user && skillsData.length != 0 && <SkillsChartComponent data={skillsData} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
