import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import DrawOutlineButton from '@/components/AnimatedButton/DrawOutlineButton'
import { CardContainer } from '@/components/card/card'
import ExpProfileView from '@/components/card/ExpProfileView'

export default function Slide2({ emblaRef, emblaRef3, experience, user, scrollPrev3, scrollNext3 }) {
  return (
    <>
      <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-end'>
        {/* <div className='h-full lg:ml-24 lg:w-full'>
          {user && (
            <div className='flex items-center justify-start'>
              {experience.length !== 0 ? (
                <>
                  <div className='w-full overflow-hidden' ref={emblaRef3}>
                    <div className='flex justify-center'>
                      <button onClick={scrollPrev3} aria-label='prev button'>
                        <MdNavigateBefore />
                      </button>
                      <button onClick={scrollNext3} aria-label='next button'>
                        <MdNavigateNext />
                      </button>
                    </div>
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
          )}
        </div> */}
        <div className='flex w-full shrink-0 grow justify-end lg:min-w-0'>
          <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-end'>
            <div className='h-full lg:ml-24 lg:w-[67%]'>
              <div className='relative flex flex-col items-center justify-center'>
                <div className='absolute top-[50%] z-50 w-full'>
                  <div className='flex justify-between text-2xl'>
                    <button onClick={scrollPrev3} aria-label='prev button'>
                      <MdNavigateBefore />
                    </button>
                    <button onClick={scrollNext3} aria-label='next button'>
                      <MdNavigateNext />
                    </button>
                  </div>
                </div>
                {/* Carousel */}
                {user && experience.length != 0 ? (
                  <div>
                    <div className='w-full overflow-hidden' ref={emblaRef3}>
                      <div className='flex items-center'>
                        {experience.map((exp) => (
                          <div key={exp.name} className='w-full shrink-0 grow lg:min-w-0 '>
                            <div className='flex flex-col justify-center'>
                              <div className='flex justify-center'>
                                <ExpProfileView
                                  type={exp.type}
                                  projectName={exp.name}
                                  skills={exp.project_skills.join(', ')}
                                  toolsAndTech={exp.tools}
                                  description={exp.description}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex flex-col justify-center'>
                    <p className='flex text-center'>
                      Seems like you have not generated an Experience card Yet, you want to generate one?
                    </p>
                    {/* <div className='mt-5 flex justify-center'>
                      <Link href='slider' aria-label='slider link'>
                        <DrawOutlineButton>EDIT</DrawOutlineButton>
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
              <div className='absolute mt-4 flex justify-center'>
                {/* https://r3-f-next-js-starter-package.vercel.app/ */}
                {user && (
                  <a
                    // href={`http://localhost:3001//api/public/users/${user.gg_id}`}
                    // target='_blank'
                    aria-label='Booking button'
                  >
                    <DrawOutlineButton>Booking Comming Soon!!</DrawOutlineButton>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
