import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Pagination, Scrollbar } from 'swiper/modules'
import Image from 'next/image'
import { IoTriangleSharp, IoCubeSharp } from 'react-icons/io5'
import { FaDiamond } from 'react-icons/fa6'
import { BsOctagonFill } from 'react-icons/bs'
import { MdHexagon } from 'react-icons/md'
import Link from 'next/link'

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
    <Swiper
      modules={[Pagination, Scrollbar]}
      scrollbar={{ draggable: true, hide: false }}
      pagination={{ clickable: true }}
      spaceBetween={2}
      slidesPerView={2}
      className='h-[300px] w-full'
    >
      {filteredFactions.map((user, index) => (
        <SwiperSlide key={index}>
          <Link
            href={`/public-profile/${user.username}`}
            className='relative ml-2 flex h-[260px] w-[140px] flex-col items-center justify-center rounded-lg shadow-sm transition duration-500 ease-out hover:scale-105'
            // style={{
            //   background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%), url(${user.avatarimg})`,
            //   backgroundSize: 'cover',
            //   backgroundPosition: 'center',
            //   objectFit: 'cover',
            //   filter: `drop-shadow( 0px 0px 3px rgba(${
            //     user.guild === 'PADMA'
            //       ? '255, 0, 0, 1'
            //       : user.guild === 'VAJRA'
            //         ? '0, 0, 255, 1'
            //         : user.guild === 'RATNA'
            //           ? '255, 255, 0, 1'
            //           : user.guild === 'KARMA'
            //             ? '0, 255, 0, 1'
            //             : '255, 255, 255, 1'
            //   }))`,
            // }}
          >
            <Image
              className='absolute top-0 h-[230px] rounded-t-md transition duration-500 ease-out hover:-translate-y-3 hover:scale-110'
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
            />
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
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
