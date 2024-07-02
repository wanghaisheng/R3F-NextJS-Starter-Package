export default function CoverPhoto({ coverPhotoUrl, height }) {
  return (
    <>
      <div className='w-full rounded-lg bg-pink-300' style={{ height: height }}>
        {coverPhotoUrl}
      </div>
    </>
  )
}
