export default function DescriptionComponent({ userData }) {
  return (
    <>
      <div className='mt-2'>Bio: {userData.description}</div>
      <div className='mt-2'>Age: {userData.age}</div>
      <div className='my-4 flex items-center justify-center gap-x-5'>
        <h1>
          <span className='text-lg font-semibold'>10</span> Followers
        </h1>
        <h1>
          <span className='text-lg font-semibold'>0</span> Following
        </h1>
      </div>
    </>
  )
}
