import Image from 'next/image'

export default function CoverPhoto({ coverPhotoUrl, height }) {
  return (
    <>
      <div className='relative w-full overflow-hidden rounded bg-black' style={{ height: height }}>
        <Image
          // {coverPhotoUrl}
          src='/card/defaultbuddha.svg'
          fill
          objectFit='cover'
          unoptimized
          alt='Cover Pic'
          className='rounded transition-all duration-1000 ease-in-out hover:scale-125'
        />
        <div className='absolute bottom-3 right-3'>Edit Button</div>
      </div>
    </>
  )
}
