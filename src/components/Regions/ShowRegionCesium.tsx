import CesiumMap from '../LeafletMap/CesiumMap'
import Image from 'next/image'
import { Suspense } from 'react'
import ShowGuild from '../Guilds/ShowGuild'
import GuildHeader from '../Guilds/GuildHeader'

async function getCountries() {
  // const response = await fetch('https://restcountries.com/v3.1/all')
  const response = await fetch('https://restcountries.com/v3.1/region/asia')
  const data = await response.json()
  return data
}
export default function ShowRegionCesium({
  selectedRegionFilter,
  guilds,
  selectedGuildFilter,
  searchTerm,
  handleFilterGuildChange,
  setSearchTerm,
}: {
  selectedRegionFilter: string
  guilds: any
  selectedGuildFilter: string
  searchTerm: string
  handleFilterGuildChange: (event: any) => void
  setSearchTerm: (event: any) => void
}) {
  console.log(guilds)

  const regions = [
    {
      name: 'East Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/15865/15865373.png',
      continent: 'ASIA',
      image:
        'https://imgs.search.brave.com/aSDKpjkUcexmRKTgD4x46WheLrZPpHQzTNQ5uuFYx5k/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlnbG9iYWx2aWV3/cG9pbnQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA4/L1BhbGF3YW4tMS5q/cGc',
    },
    {
      name: 'South Asia',
      icon: 'https://cdn-icons-png.flaticon.com/128/356/356749.png',
      continent: 'ASIA',
      image:
        'https://imgs.search.brave.com/CHR1lb38tg1-9E8kcVdsTqaK2sEmUZCZo7PSvKWy3tM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yYXdt/YWxyb2Ftcy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDgvMjVEQzg5RTEt/MDA2Mi00NDNFLUFG/MUQtQ0Y1ODAxMzcy/RjI4LTEwMjR4Njg0/LmpwZWc',
    },
    {
      name: 'Meso America',
      icon: 'https://cdn-icons-png.flaticon.com/128/2492/2492046.png',
      continent: 'NORTH AMERICA',
      image:
        'https://imgs.search.brave.com/t4ZToHbheBsGuZBsU4WvRJd7VQmyNn0xtgOon50vsSA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbnRyYXZlbGVy/LmNvbS9waG90b3Mv/NjU0ODVlNTk1M2My/NTc2YTRlMjBmODkz/L21hc3Rlci93XzMy/MCxjX2xpbWl0L0Jp/Zy1TdXItdGhvbWFz/LWNpc3pld3NraS1l/ckFwbWZSWDdlby11/bnNwbGFzaC5qcGc',
    },
    {
      name: 'North Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      continent: 'AFRICA',
      image:
        'https://imgs.search.brave.com/sdPLZjS3Z9AOVh1q6THgtwaL4UU_ug4VwT_dkE3LZRI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmFzc2V0cy50aGVk/aXNjb3ZlcmVyLmNv/bS8yMDE5LzA1L2Jl/YXV0aWZ1bC1hZnJp/Y2EuanBn',
    },
    {
      name: 'Sub-Saharan Africa',
      icon: 'https://cdn-icons-png.flaticon.com/128/15597/15597373.png',
      continent: 'AFRICA',
      image:
        'https://imgs.search.brave.com/G7zOwnpcKRoEWw2tPhmfU7pdbPImUNKWtOSH4eNqslY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vdW5pdGVjaC1n/bG9iYWwtcmVzb3Vy/Y2UvaW1hZ2UvdXBs/b2FkL3YxNTgyNzAw/NTEwL25hbWliaWEx/X2gzMzFxbi5qcGc',
    },
  ]
  const filteredRegions = selectedRegionFilter
    ? regions.filter((region) => region.continent === selectedRegionFilter)
    : regions.filter((region) => region.continent === 'NA') // default is this region

  return (
    <>
      <div className='relative flex-1'>
        <div className='flex w-full flex-col justify-center lg:flex-row lg:justify-end lg:pr-5'>
          {/* <div>
            {countries.map((country) => (
              <div key={country.name.common}>
                <h1>{country.name.common}</h1>
              </div>
            ))}
          </div> */}
          <div className='size-full'>
            <Suspense fallback={<div>Loading map...</div>}>
              <div className='absolute -top-20 h-screen w-full'>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <CesiumMap filteredContinent={selectedRegionFilter} />
                </div>
              </div>
            </Suspense>
            {/* <Image src='/svgs/na.svg' width={500} height={500} alt='world map' /> */}
            <div className='absolute right-0 top-14 mr-4 h-[57vh] w-[46vh] rounded-lg bg-gradient-to-t from-white/30 from-10% via-black/20 via-30% to-black/50 to-90% p-2 shadow-md shadow-purple-700 backdrop-blur-md'>
              <GuildHeader
                onFilterChange={handleFilterGuildChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <div className='flex w-full overflow-auto'>
                <ShowGuild
                  users={guilds}
                  selectedRegionFilter={selectedRegionFilter}
                  filterguild={selectedGuildFilter}
                  searchTerm={searchTerm}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='fixed bottom-0 left-[50%] z-50 flex h-auto w-[60%] -translate-x-1/2 items-center justify-center '>
        <div className='flex flex-wrap justify-center gap-x-5 py-2'>
          {filteredRegions.map((region, index) => (
            <a
              href={`#`} // filter the guilds based on the country
              className='relative flex aspect-[2/1] size-20 min-w-0 flex-col items-center justify-center rounded-lg transition duration-500 ease-out hover:scale-105'
              key={index}
            >
              <Image
                className='rounded-lg object-cover'
                src={region.image}
                alt=''
                layout='fill' // Use layout="fill" for responsive images
                // width={200}
                // height={100}
                loading='lazy'
              />
              <span className='absolute top-0 flex size-20 items-center justify-center rounded-lg bg-black/40 opacity-100 transition duration-700 ease-out hover:opacity-0'>
                <Image
                  src={region.icon}
                  alt='region icon'
                  height={30}
                  width={30}
                  className='absolute top-[19%]'
                  loading='lazy'
                />
              </span>
              <span className='absolute bottom-0 flex w-full flex-col items-center rounded-b-md bg-purple-950 py-1 text-xs'>
                <h1>{region.name}</h1>
              </span>
            </a>
          ))}
        </div>
      </div> */}
    </>
  )
}
