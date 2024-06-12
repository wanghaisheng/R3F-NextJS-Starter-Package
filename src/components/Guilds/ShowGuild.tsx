import Image from 'next/image'
import { IoTriangleSharp, IoCubeSharp } from 'react-icons/io5'
import { FaDiamond } from 'react-icons/fa6'
import { BsOctagonFill } from 'react-icons/bs'
import { MdHexagon } from 'react-icons/md'
export default function ShowGuild({
  users,
  filterguild,
  selectedRegionFilter,
  searchTerm,
}: {
  users: any
  filterguild: string
  selectedRegionFilter: string
  searchTerm: string
}) {
  // Filter based on guild, continent, and search term
  const filteredFactions = users.filter((user) => {
    return (
      (filterguild ? user.guild === filterguild : true) &&
      (selectedRegionFilter ? user.continent === selectedRegionFilter.toUpperCase() : true) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })
  return (
    <>
      <div className='flex justify-start'>
        <div className='mx-10 my-6 flex justify-center gap-5 lg:justify-start'>
          {filteredFactions.map((user, index) => (
            <a
              href={`/regions/${user.name.toLowerCase().replace(' ', '-')}`}
              key={index}
              className='relative flex h-[280px] w-[240px] flex-col items-center justify-center rounded-lg shadow-sm backdrop-blur-md transition duration-500 ease-out'
            >
              <Image
                className='absolute top-0 w-[240px] rounded-t-md transition duration-500 ease-out hover:-translate-y-3 hover:scale-110'
                src={user.avatarimg}
                alt=''
                width={240}
                height={280}
                style={{
                  objectFit: 'cover',
                  filter: `drop-shadow(-1px -2px 4px rgba(${
                    user.guild === 'PADMA'
                      ? '255, 0, 0, 0.5'
                      : user.guild === 'VAJRA'
                        ? '0, 0, 255, 0.5'
                        : user.guild === 'RATNA'
                          ? '255, 255, 0, 0.5'
                          : user.guild === 'KARMA'
                            ? '0, 255, 0, 0.5'
                            : '255, 255, 255, 0.5'
                  }))`,
                }}
                //On hover remove the drop shadow
                // onMouseOver={(e) => {
                //   e.currentTarget.style.filter = 'none'
                // }}
                // onMouseOut={(e) => {
                //   e.currentTarget.style.filter = `drop-shadow(-1px -2px 4px rgba(${
                //     user.guild === 'PADMA'
                //       ? '255, 0, 0, 0.5'
                //       : user.guild === 'VAJRA'
                //         ? '0, 0, 255, 0.5'
                //         : user.guild === 'RATNA'
                //           ? '255, 255, 0, 0.5'
                //           : user.guild === 'KARMA'
                //             ? '0, 255, 0, 0.5'
                //             : '255, 255, 255, 0.5'
                //   }))`
                // }}
              />
              {/* <span className='absolute top-0 flex size-full items-center justify-center opacity-0 transition duration-500 ease-out hover:bg-black/80 hover:opacity-100'>
                <p>{user.description}</p>
              </span> */}
              <span
                className={`absolute bottom-0 flex w-full items-center rounded-b-md bg-purple-950/60 px-3 py-2 transition duration-500 ease-out hover:bg-purple-900/80 hover:text-purple-300 `}
              >
                <h1 className='flex w-full items-center justify-between gap-x-4 font-bold transition duration-300 ease-in-out'>
                  {user.name.toUpperCase()}
                  {user.guild.toUpperCase() === 'PADMA' ? (
                    <p className='text-red-500'>
                      <IoTriangleSharp />
                    </p>
                  ) : user.guild.toUpperCase() === 'VAJRA' ? (
                    <p className=' text-blue-500'>
                      <BsOctagonFill />
                    </p>
                  ) : user.guild.toUpperCase() === 'KARMA' ? (
                    <p className=' text-green-500'>
                      <FaDiamond />
                    </p>
                  ) : user.guild.toUpperCase() === 'RATNA' ? (
                    <p className=' text-yellow-500'>
                      <IoCubeSharp />
                    </p>
                  ) : (
                    <p className='text-white'>
                      <MdHexagon />
                    </p>
                  )}
                </h1>
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
