'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import 'swiper/css'
import GuildHeader from '../Guilds/GuildHeader'
import ShowGuildDiscover from '../Guilds/ShowGuildDiscover'

export default function DiscoverRegion({
  facultyTags,
  selectedRegionFilter,
  guilds,
  selectedGuildFilter,
  searchTerm,
  handleFilterGuildChange,
  setSearchTerm,
}: {
  facultyTags: string[]
  selectedRegionFilter: string
  guilds: any
  selectedGuildFilter: string
  searchTerm: string
  handleFilterGuildChange: (event: any) => void
  setSearchTerm: (event: any) => void
}) {
  const [viewBusiness, setViewBusiness] = useState(false)
  const [viewMates, setViewMates] = useState(true)
  const [filteredUsers, setFilteredUsers] = useState([])

  //---------------------test input tags---------------------------------
  const [inputTags, setInputTags] = useState([])

  const handleInputTagsChange = (tag: string) => {
    if (!inputTags.includes(tag)) {
      setInputTags((prevInputTags) => {
        const updatedInputTags = [...prevInputTags, tag]
        return updatedInputTags
      })
    }
  }

  const handleDeleteTags = (index: number) => {
    setInputTags((prevInputTags) => {
      const updatedInputTags = [...prevInputTags]
      updatedInputTags.splice(index, 1)
      return updatedInputTags
    })
  }

  const filterUsers = async () => {
    try {
      const res = await fetch('/api/public/filter-tags/faculty-name/filter-users', {
        method: 'POST',
        body: JSON.stringify({ inputTags: inputTags }),
      })
      if (!res.ok) {
        toast.error('unable to filter users')
      }
      const filteredUsers = await res.json()
      setFilteredUsers(filteredUsers)
    } catch (error) {
      console.error(error)
      toast.error('Internal server error')
    }
  }

  useEffect(() => {
    console.log('filteredUsers: ', filteredUsers)
  }, [filteredUsers])

  //---------------------test input tags---------------------------------

  const handleBusinessFilterView = () => {
    setViewBusiness(true)
    setViewMates(false)
  }

  const handleMatesFilterView = () => {
    setViewMates(true)
    setViewBusiness(false)
  }

  return (
    <>
      <div className='flex size-full flex-col items-center justify-center md:flex-row'>
        {/* Video section */}
        <div className='absolute top-0 h-screen w-full'>
          <video key={selectedGuildFilter} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
            {selectedGuildFilter === 'BUDDHA' ? (
              <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'VAJRA' ? (
              <source src='/livewallpapers/vajra.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'PADMA' ? (
              <source src='/livewallpapers/padma.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'KARMA' ? (
              <source src='/livewallpapers/karma.mp4' type='video/mp4' />
            ) : selectedGuildFilter === 'RATNA' ? (
              <source src='/livewallpapers/earth.mp4' type='video/mp4' />
            ) : (
              <source src='/livewallpapers/forest.mp4' type='video/mp4' />
            )}
          </video>
        </div>
        {/* Rigth Side Filter section */}
        <div className='z-10 mb-10 mt-24 transition-all duration-200 md:absolute md:right-4 md:my-0 md:w-[22%] lg:right-10 xl:right-20'>
          <div className='flex h-fit w-full flex-col gap-y-2 md:h-[450px]'>
            {/* <div className='flex items-center gap-3 font-semibold'>
              <button
                className={`w-[100px] rounded bg-white p-2 text-black transition-all duration-300 dark:bg-pink-300/20 dark:text-white ${viewBusiness && 'bg-gray-400 dark:bg-pink-300/70'}`}
                onClick={() => handleBusinessFilterView()}
              >
                BUSINESS
              </button>
              <button
                className={`w-[100px] rounded bg-white p-2 text-black transition-all duration-300 dark:bg-pink-300/20 dark:text-white ${viewMates && 'bg-gray-400 dark:bg-pink-300/70'}`}
                onClick={() => handleMatesFilterView()}
              >
                MATES
              </button>
              <button className='w-[100px] rounded bg-pink-300/20 p-2 text-black dark:text-white'>...</button>
            </div> */}

            {/*test input tags */}
            {/* <div className='flex size-full flex-col items-center  justify-center gap-4 rounded bg-pink-300/20'>
              <div className='flex w-full flex-wrap gap-1 text-sm font-bold text-black'>
                {inputTags
                  ? inputTags.map((tag, index) => (
                      <div
                        className='flex bg-yellow-300 whitespace-nowrap cursor-pointer rounded p-1 transition-all duration-500 ease-in-out hover:scale-105 mx-2'

                        onClick={() => handleInputTagsChange(tag)}
                      >
                        {tag}
                        <button>
                          <TiDeleteOutline className='text-red-600 ml-2' onClick={() => handleDeleteTags(index)} />
                        </button>
                      </div>
                    ))
                  : ''}
              </div>
              <div className='w-full'>
                <TagSwiper facultyTags={facultyTags} handleInputTagsChange={handleInputTagsChange} />
              </div>
              <div>
                <button onClick={filterUsers}>search</button>
              </div>
            </div> */}
          </div>
        </div>
        <div className='flex size-full flex-col items-center justify-center'>
          <div
            className={`z-10 flex w-[75%] flex-col items-center justify-center rounded-lg p-2 shadow-md backdrop-blur sm:w-[400px] lg:w-[473px] ${selectedGuildFilter ? getBorderColor(selectedGuildFilter) : 'shadow-purple-700'}`}
          >
            <div className='relative w-full'>
              {/* Header to showcase the guilds to filter between */}
              <GuildHeader
                onFilterChange={handleFilterGuildChange}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
            <div className='size-full'>
              {/* Guilds to display based on the filter */}
              <ShowGuildDiscover
                users={guilds}
                selectedRegionFilter={selectedRegionFilter}
                filterguild={selectedGuildFilter}
                searchTerm={searchTerm}
                viewExp={viewBusiness}
                viewMates={viewMates}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Function to determine the shadow color based on the guild
function getBorderColor(guild: string): string {
  switch (guild) {
    case 'BUDDHA':
      return 'shadow-white'
    case 'VAJRA':
      return 'shadow-blue-500'
    case 'KARMA':
      return 'shadow-green-500'
    case 'RATNA':
      return 'shadow-yellow-500'
    case 'PADMA':
      return 'shadow-red-500'
    default:
      return 'shadow-purple-700'
  }
}
