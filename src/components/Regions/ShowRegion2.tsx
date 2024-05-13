import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('../LeafletMap/LeafletMap'), {
  ssr: false,
})

export default function ShowRegion2({ filter }: { filter: string }) {
  return (
    <>
      <div className='relative flex flex-col'>
        <div className='flex w-full justify-end pr-5'>
          <div className='h-[550px] w-[50%]'>
            <MapComponent filteredContinent={filter} />
            {/* <Image src='/svgs/na.svg' width={500} height={500} alt='world map' /> */}
          </div>
          <div className='mx-10 flex w-[30%] flex-col items-center justify-center rounded-md bg-black/50'>a</div>
        </div>
      </div>
    </>
  )
}
