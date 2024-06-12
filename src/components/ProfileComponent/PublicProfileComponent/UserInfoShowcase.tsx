import SkillsChartComponent from '@/components/SliderComponent/SkillsChartComponent'

export default function UserInfoShowcase({ user, skillsData }) {
  return (
    <>
      <div className='flex size-full flex-col'>
        {user && (
          <>
            <div className='mt-10 flex size-full px-24 '>
              <div className='flex h-fit w-full flex-col flex-wrap justify-start rounded-xl bg-[#f5f5f5] px-10 py-3 backdrop-blur-md lg:shadow lg:shadow-purple-500 dark:bg-transparent dark:lg:bg-purple-950/20'>
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
                        // border: `2px solid ${user.guilds[0].color}`,
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
                  {/* <p className='mt-2'>Guild: {user.guilds[0].guild_name}</p> */}
                </div>
                <div className='my-4 flex items-center justify-center gap-x-5'>
                  <h1>
                    <span className='text-lg font-semibold'>10</span> Followers
                  </h1>
                  <h1>
                    <span className='text-lg font-semibold'>0</span> Following
                  </h1>
                </div>
                <div className='flex flex-col flex-wrap items-center justify-center gap-y-4 py-2 lg:flex-row lg:gap-x-4'>
                  <div className='flex h-60 w-72 flex-col items-center justify-center rounded-xl px-4 py-2 md:w-80 md:px-8 xl:px-0'>
                    {user && skillsData ? (
                      <SkillsChartComponent skills={skillsData} />
                    ) : (
                      // Render loading indicator or placeholder while data is being fetched
                      <div className='rounded-lg border p-5'>Recommendations for Skills Card</div>
                    )}
                  </div>

                  <div className='h-60 w-72 rounded-xl px-4 py-2 lg:w-80'>
                    <h1 className='flex justify-center font-semibold'>BADGES</h1>
                    <div className='flex flex-col items-center justify-center'>
                      <p>!</p>
                      <p>!</p>
                      <p>!</p>
                      <p>!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
