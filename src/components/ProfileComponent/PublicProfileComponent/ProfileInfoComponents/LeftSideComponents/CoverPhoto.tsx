import Image from 'next/image'

export default function CoverPhoto({ coverPhotoUrl, height }) {
  return (
    <>
      <div className='relative w-full overflow-hidden rounded-lg' style={{ height: height }}>
        <Image
          // {coverPhotoUrl}
          src='/card/defaultbuddha.svg'
          fill
          objectFit='cover'
          unoptimized
          alt='Cover Pic'
          className='rounded-lg transition-all duration-1000 ease-in-out hover:scale-125'
        />
        <div className='absolute right-3 top-0'>...</div>
      </div>
    </>
  )
}
