'use client'

import AchievementsComponent from './RIghtSideComponents/AchievementsComponent'
import GGCard from '../GGFlipCards/GGCard'
import SocialMedias from './RIghtSideComponents/SocialMedias'
import CustomCardStack from '../MyComponents/CustomCardStack'
import AvatarsShowcase from './RIghtSideComponents/AvatarsShowcase'
import { useUser } from '@/UserClientProvider'
import { TbCards } from 'react-icons/tb'
import { FaEdit } from 'react-icons/fa'
import Link from 'next/link'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { CiCircleMore } from 'react-icons/ci'
import CustomToolTipLeftRight from '../MyComponents/CustomToolTipLeftRight'
import { LuScreenShare } from 'react-icons/lu'

export default function RightSideViewComponent({ publicUser, guild }) {
  const { user } = useUser()

  const explorerUsername = user?.username
  return (
    <>
      {publicUser ? (
        <div className='relative size-full select-none overflow-y-auto overflow-x-hidden p-2'>
          {/* CardStack Swiper */}
          <div className='sticky top-0 z-40'>
            <CustomCardStack
              height={200}
              speed={200}
              initialSlide={1}
              perSlideOffset={7}
              perSlideRotate={1}
              slideShadows={false}
            >
              <div className=' h-[190px] w-[96%] rounded-[7.35039px] '>
                <GGCard userData={publicUser} />
              </div>
              <div className=' h-[190px] w-[96%] rounded-[7.35039px] '>
                <GGCard userData={publicUser} />
              </div>
              <div className=' h-[190px] w-[96%] rounded-[7.35039px] '>
                <GGCard userData={publicUser} />
              </div>
              <div className=' h-[190px] w-[96%] rounded-[7.35039px] '>
                <GGCard userData={publicUser} />
              </div>
            </CustomCardStack>
          </div>

          {/* Bio */}
          <div className='relative w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='text-[16px] font-bold'>BIO</h1>
            {explorerUsername === publicUser.username && (
              <div className='absolute right-2 top-2'>
                <div className='group'>
                  <FaEdit size={14} className='cursor-pointer' />
                  <CustomToolTipLeftRight content='Edit Bio' top='-4' left='-20' translateY='0' />
                </div>
              </div>
            )}
            <p className='h-[60px] w-full overflow-auto text-[12px] font-semibold'>{publicUser.description}</p>
          </div>

          {/* Achievements */}
          <div className='relative mt-2 w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='text-[16px] font-bold'>ACHIEVEMENTS</h1>
            {explorerUsername === publicUser.username && (
              <div className='absolute right-2 top-2'>
                <div className='group'>
                  <CiCircleMore size={14} className='cursor-pointer' />
                  <CustomToolTipLeftRight content='View More' top='-4' left='-20' translateY='0' />
                </div>
              </div>
            )}
            <div className='relative py-2 font-semibold'>
              <AchievementsComponent userData={publicUser} />
            </div>
          </div>

          {/* Avatars */}
          <div className='relative mt-2 w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='text-[16px] font-bold'>AVATARS</h1>
            {explorerUsername === publicUser.username && (
              <div className='absolute right-2 top-2 flex gap-x-3'>
                <div className='group'>
                  <Link href='/slider'>
                    <LuScreenShare size={14} className='cursor-pointer' />
                  </Link>
                  <CustomToolTipLeftRight content='Advance Edit' top='-4' left='-45' translateY='0' />
                </div>
                <div className='group'>
                  <FaEdit size={14} className='cursor-pointer' />
                  <CustomToolTipLeftRight content='Edit Here' top='-4' left='-20' translateY='0' />
                </div>
              </div>
            )}
            <div className='relative py-2 font-semibold'>
              <AvatarsShowcase userData={publicUser} />
            </div>
          </div>

          {/* Skins */}
          <div className='relative mt-2 w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='cursor-pointer text-[16px] font-bold'>SKINS</h1>
            {explorerUsername === publicUser.username && (
              <div className='absolute right-2 top-2 flex gap-x-3'>
                <div className='group'>
                  <MdOutlineShoppingCartCheckout size={14} className='cursor-pointer' />
                  <CustomToolTipLeftRight content='Purchase More Skins' top='-4' left='-45' translateY='0' />
                </div>
                <div className='group'>
                  <FaEdit size={14} className='cursor-pointer' />
                  <CustomToolTipLeftRight content='Edit' top='-4' left='-20' translateY='0' />
                </div>
              </div>
            )}
            <div className='relative py-2 font-semibold'>
              <AchievementsComponent userData={publicUser} />
            </div>
          </div>

          {/* Social Media */}
          <div className='relative mt-2 w-full rounded-md bg-white/80 px-2 py-1 text-black'>
            <h1 className='cursor-pointer text-[16px] font-bold '>SOCIALS</h1>
            {explorerUsername === publicUser.username && (
              <div className='absolute right-2 top-2 flex gap-x-3'>
                <div className='group'>
                  <Link href='/slider'>
                    <LuScreenShare size={14} className='cursor-pointer' />
                  </Link>
                  <CustomToolTipLeftRight content='Advance Edit' top='-4' left='-45' translateY='0' />
                </div>
                <div className='group'>
                  <FaEdit size={14} className='cursor-pointer' />
                  <CustomToolTipLeftRight content='Edit Here' top='-4' left='-20' translateY='0' />
                </div>
              </div>
            )}
            <div className='relative py-2 font-semibold'>
              <SocialMedias userData={publicUser} />
            </div>
          </div>
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
