import Image from 'next/image'

export default function ShowRegion2({ filter, searchTerm }: { filter: string; searchTerm: string }) {
  return (
    <>
      <div className='relative flex flex-col'>
        {/* <Image src='/svgs/world.svg' width={3000} height={500} alt='world map' /> */}
        <div className='flex h-[500px] w-full justify-end pr-5'>
          <Image src='/svgs/na.svg' width={500} height={500} alt='world map' />
          <div className='mx-10 flex h-full w-[40%] items-center justify-center rounded-md bg-black/50'>a</div>
        </div>
        {/* <div className='flex h-48 items-center justify-center bg-black/50 lg:absolute lg:-bottom-10 lg:right-20 lg:w-[90%]'>
          a
        </div> */}
      </div>
    </>
  )
}
