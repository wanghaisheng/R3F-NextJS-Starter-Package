import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import DrawOutlineButton from '@/components/AnimatedButton/DrawOutlineButton'
import { CardContainer } from '@/components/card/card'
import ExpProfileView from '@/components/card/ExpProfileView'

export default function Slide2({ emblaRef, emblaRef3, experience, user, scrollPrev3, scrollNext3 }) {
  return (
    <>
      <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-end'>
        <div className='h-full lg:ml-24 lg:w-full'>
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
        </div>
      </div>
    </>
  )
}

// ;<>
//   <div className='mt-10 flex size-full lg:justify-end'>
//     <div className='flex size-full flex-col flex-wrap justify-start rounded-xl bg-[#f5f5f5] p-8 shadow shadow-purple-500 backdrop-blur-md lg:mr-14 lg:w-[67%] dark:bg-purple-950/20'>
//       <div></div>
//       <div className='flex items-center justify-center gap-x-5'>
//         <h1>
//           <span className='text-lg font-semibold'>10</span> Followers
//         </h1>
//         <h1>
//           <span className='text-lg font-semibold'>0</span> Following
//         </h1>
//       </div>
//       <div className='flex flex-col flex-wrap gap-y-4 py-2 lg:flex-row lg:justify-center lg:gap-x-4'>
//         <div className='mt-4 flex justify-center'>
//           {/* https://r3-f-next-js-starter-package.vercel.app/ */}
//           {user && (
//             <a
//               // href={`http://localhost:3001//api/public/users/${user.gg_id}`}
//               // target='_blank'
//               aria-label='Interact button'
//             >
//               <DrawOutlineButton>Interact!!</DrawOutlineButton>
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </>
