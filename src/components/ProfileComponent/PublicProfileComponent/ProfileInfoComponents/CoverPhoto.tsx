export default function CoverPhoto({ coverPhotoUrl, height }) {
  return (
    <>
      <div className='relative w-full rounded-lg bg-pink-300' style={{ height: height }}>
        {coverPhotoUrl}
        <div className='absolute bottom-3 right-3'>Edit Button</div>
      </div>
    </>
  )
}
