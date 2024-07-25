import Image from 'next/image'

export default function CoverPhoto({ coverPhotoUrl, height }) {
  return (
    <>
      <div className='relative w-full overflow-hidden rounded-lg' style={{ height: height }}>
        <Image
          src='/card/defaultbuddha.svg'
          fill
          unoptimized
          alt='Cover Pic'
          className='rounded-lg object-cover transition-all duration-1000 ease-in-out hover:scale-125'
        />
      </div>
    </>
  )
}
