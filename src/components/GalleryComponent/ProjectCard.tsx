import Image from 'next/image'

export default function ProjectCard({ imageUrl }) {
  return (
    <div className='relative h-[300px] w-full overflow-hidden rounded-lg shadow-lg'>
      <Image
        src={imageUrl}
        alt='project'
        fill
        unoptimized
        loading='lazy'
        className='object-cover transition-all duration-300 ease-in-out hover:scale-110'
      />
    </div>
  )
}
