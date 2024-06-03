import { CardContainer } from '@/components/card/card'
import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'

export default function Slide1({ user, skillsData }) {
  return (
    <>
      <div className='flex size-full flex-col px-4 lg:flex-row lg:justify-end'>
        <div className='h-full lg:ml-24 lg:w-full'>
          {user && (
            <>
              <div className='mt-10 flex size-full lg:justify-end'>
                <div className='flex size-full flex-col flex-wrap justify-start rounded-xl bg-[#f5f5f5] p-8 shadow shadow-purple-500 backdrop-blur-md lg:mr-14 lg:w-[67%] dark:bg-purple-950/20'>
                  <div>
                    <div className='flex items-center justify-start'>
                      <div
                        className='size-12 rounded-full'
                        style={{
                          backgroundImage: 'url(/image.png)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          borderRadius: '50%',
                          border: `2px solid ${user.guilds[0].color}`,
                        }}
                      ></div>
                      <div className='flex flex-col pl-4 '>
                        <h1 className='text-lg font-bold lg:text-3xl'>
                          {user.first_name} {user.last_name}
                        </h1>

                        <p className='mt-2'>Bio: {user.description}</p>
                      </div>
                    </div>
                    <p className='flex justify-end'></p>
                    <p className='mt-2'>DOB: {user.dob}</p>
                    <p className='mt-2'>Guild: {user.guilds[0].guild_name}</p>
                  </div>
                  <div className='flex items-center justify-center gap-x-5'>
                    <h1>
                      <span className='text-lg font-semibold'>10</span> Followers
                    </h1>
                    <h1>
                      <span className='text-lg font-semibold'>0</span> Following
                    </h1>
                  </div>
                  <div className='flex flex-col flex-wrap gap-y-4 py-2 lg:flex-row lg:justify-center lg:gap-x-4'>
                    <CardContainer className='rounded-xl py-2 shadow shadow-purple-500'>
                      <div className='flex h-60 w-80 flex-col items-center justify-center px-4 md:px-8 xl:px-0'>
                        {user && skillsData ? (
                          <SkillsChartComponent skills={skillsData} />
                        ) : (
                          // Render loading indicator or placeholder while data is being fetched
                          <div className='rounded-lg border p-5'>Recommendations for Skills Card</div>
                        )}
                      </div>
                    </CardContainer>

                    <CardContainer className='rounded-xl py-2 shadow shadow-purple-500'>
                      <div className='h-60 w-80 px-4'>
                        <h1 className='flex justify-center font-semibold'>BADGES</h1>
                        <p>!</p>
                        <p>!</p>
                        <p>!</p>
                        <p>!</p>
                      </div>
                    </CardContainer>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
