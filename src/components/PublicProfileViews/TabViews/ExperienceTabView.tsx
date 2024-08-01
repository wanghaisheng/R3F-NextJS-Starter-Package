import ExperienceShow from '@/components/ProfileComponent/PublicProfileComponent/ProfileInfoComponents/RightSideComponents/ExperienceShow'

const ExperienceTabView = ({
  experience,
  userData,
  handleIsFlip,
}: {
  userData: any
  handleIsFlip: (newState: boolean) => void
  experience: any[]
}) => {
  return (
    <>
      <div className='flex size-full justify-center overflow-auto p-4'>
        {/* Experience Card Show */}
        {userData && experience.length > 0 ? (
          <div className='relative flex size-full px-10 py-3'>
            <ExperienceShow user={userData} experience={experience} handleIsFlip={handleIsFlip} />
          </div>
        ) : (
          <div className='ml-4 flex h-[190px] w-[290px] animate-pulse items-center justify-center rounded-lg bg-white/10'>
            <p>No experience to show</p>
          </div>
        )}
      </div>
    </>
  )
}

export default ExperienceTabView
