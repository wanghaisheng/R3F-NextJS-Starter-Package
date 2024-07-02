export default function AchievementsComponent({ userData }) {
  const val = 10
  return (
    <div className='flex w-full gap-x-5 overflow-auto whitespace-nowrap'>
      {Array.from({ length: val }).map((_, i) => (
        <>
          <div className='size-16 rounded-full bg-pink-300'></div>
        </>
      ))}
    </div>
  )
}
