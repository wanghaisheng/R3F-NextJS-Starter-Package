import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import DrawOutlineButton from '@/components/AnimatedButton/DrawOutlineButton'
import { CardContainer } from '@/components/card/card'
import ExpProfileView from '@/components/card/ExpProfileView'

export default function Slide2({ emblaRef, emblaRef3, experience, user, scrollPrev3, scrollNext3 }) {
  return (
    <>
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
    </>
  )
}
