'use client'

import AchievementsComponent from '../ProfileComponent/PublicProfileComponent/ProfileInfoComponents/RightSideComponents/AchievementsComponent'
import GGCard from '../GGFlipCards/GGCard'
import SocialMedias from '../ProfileComponent/PublicProfileComponent/ProfileInfoComponents/RightSideComponents/SocialMedias'

export default function RightSideViewComponent({ user, guild }) {
  return (
    <>
      {user ? (
        <div className='relative select-none'>
          {/* Card */}
          <div className=' h-[200px] w-full rounded-[7.35039px] '>
            <GGCard userData={user} />
          </div>

          {/* Bio */}
          <div className='mt-2 w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='cursor-pointer text-[16px] font-bold'>BIO</h1>
            <p className='h-[60px] w-full overflow-auto text-[12px] font-semibold'>{user.description}</p>
          </div>

          {/* Achievements */}
          <div className='mt-2 w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='cursor-pointer text-[16px] font-bold'>ACHIEVEMENTS</h1>
            <div className='relative p-2 font-semibold'>
              <AchievementsComponent userData={user} />
            </div>
          </div>

          {/* Social Media */}
          <div className='mt-2 w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='cursor-pointer text-[16px] font-bold '>SOCIALS</h1>
            <div className='relative p-2 font-semibold'>
              <SocialMedias userData={user} />
            </div>
          </div>

          {/* About User */}
          {/* <div className='flex w-full justify-center p-2 text-black'>
            <AboutUser userData={user} />
          </div> */}

          {/* Guild */}
          {/* <div className='flex flex-col pl-4 '>
            <div className='group absolute left-0 top-0'>
              <Image
                src={guild.find((guild) => guild.guild_name === user.guild)?.symbol || ''}
                height={30}
                width={30}
                alt='guild'
                loading='lazy'
                className='rounded-full border-2 border-white/50 transition-all duration-300 ease-in-out hover:rotate-180 group-hover:border-white/100'
              />

              <HoverGuild
                hoveredGuild={guild.find((guild) => guild.guild_name === user.guild)?.guild_name.toUpperCase() || ''}
                top={10}
                left={50}
                translateY={10}
              />
            </div>
          </div> */}
        </div>
      ) : (
        <div className='flex size-full items-center justify-center'>
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

// {
//   /* Pictures */
// }
// ;<div className='h-[310px] w-full p-2'>
//   <div className='flex size-full flex-col overflow-auto rounded-lg bg-white/60'>
//     {/* Gallery */}
//     <section>
//       <div className='sticky top-0 z-10 flex w-fit items-center gap-x-1 rounded-br-lg bg-white px-2'>
//         <h2 className='text-lg font-semibold text-black'>Gallery</h2>
//         <IoMdInformationCircleOutline size={22} className='text-blue-400 drop-shadow' />
//       </div>
//       <div className='w-full rounded-lg'>
//         <Pictures user={user} user_images={user.overall_user_image} />
//       </div>
//     </section>

//     {/* Skills */}
//     <section>
//       <div className='sticky top-0 z-10 flex w-fit items-center gap-x-1 rounded-r-lg bg-white px-2'>
//         <h2 className='text-lg font-semibold text-black'>Skills</h2>
//         <IoMdInformationCircleOutline size={22} className='text-blue-400 drop-shadow' />
//       </div>
//       <div className='w-full rounded-lg'>
//         <Pictures user={user} user_images={user.overall_user_image} />
//       </div>
//     </section>

//     {/* Additional Skills or Content */}
//     <section>
//       <div className='sticky top-0 z-10 flex w-fit items-center gap-x-1 rounded-r-lg bg-white px-2'>
//         <h2 className='text-lg font-semibold text-black'>Additional Skills</h2>
//         <IoMdInformationCircleOutline size={22} className='text-blue-400 drop-shadow' />
//       </div>
//       <div className='w-full rounded-lg '>
//         <Pictures user={user} user_images={user.overall_user_image} />
//       </div>
//     </section>
//   </div>
// </div>
