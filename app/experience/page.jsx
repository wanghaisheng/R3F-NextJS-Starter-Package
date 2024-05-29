const ExperiencePage = () => {
  return (
    <div className='relative h-[80vh] flex-1 items-center justify-center'>
      <div className='absolute top-10 z-50 flex w-full justify-center'>
        <p className='animate-pulse rounded-lg p-2 font-semibold  text-purple-200 shadow shadow-violet-400'>
          BETA TESTING
        </p>
      </div>
      <a
        href='https://r3-f-next-js-starter-package-git-mainproduction-going-genius.vercel.app/guilds/feedback'
        className='absolute left-2 top-24 z-50 animate-pulse rounded-lg p-2 font-semibold  text-purple-200 shadow shadow-violet-400 lg:left-[46%] lg:top-24'
      >
        Give Feedback
      </a>
      <div className='flex size-full animate-pulse items-center justify-center'>
        <h1 className='text-3xl font-bold text-white'>WORK IN PROGRESS!!!</h1>
      </div>
    </div>
  )
}

export default ExperiencePage
