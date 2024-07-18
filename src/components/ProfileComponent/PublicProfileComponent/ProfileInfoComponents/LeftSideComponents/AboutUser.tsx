'use client'

import { useUser } from '@/UserClientProvider'
import Link from 'next/link'
import { useState } from 'react'
import { MdOutlineInsertLink } from 'react-icons/md'

export default function AboutUser({ userData }) {
  const { user } = useUser()
  const [expanded, setExpanded] = useState(false)

  const Links = [
    { url: 'https://www.instagram.com/user1', name: 'instagram.user1' },
    { url: 'https://www.instagram.com/user2', name: 'instagram.user2' },
    { url: 'https://www.instagram.com/user3', name: 'instagram.user3' },
    { url: 'https://www.instagram.com/user4', name: 'instagram.user4' },
  ]

  return (
    <>
      {/* USERNAME */}
      <div className='my-2 flex w-full justify-center text-xl font-semibold'>
        {userData.username.charAt(0).toUpperCase()}
        {userData.username.slice(1)}
      </div>
      {/* Row 1 */}
      <div className='w-full justify-center'>
        <div className='flex w-full flex-wrap items-center justify-center gap-x-2'>
          <h1 className='cursor-pointer font-semibold'>
            10 <span className='text-sm font-normal hover:underline'>Followers</span>
          </h1>
          <span className='text-2xl font-extrabold'>‧</span>
          <h1 className='cursor-pointer font-semibold'>
            10 <span className='text-sm font-normal hover:underline'>Following</span>
          </h1>
          <span className='text-2xl font-extrabold'>‧</span>
          <h1 className='cursor-pointer font-semibold'>
            0 <span className='text-sm font-normal hover:underline'>Connections</span>
          </h1>
        </div>

        {/* Row 2 */}
        <div>
          <p className='mt-2 text-sm font-light text-gray-200'>{userData.description}</p>
        </div>
        {/* Row 4 */}
        <div className='mt-2 flex items-start justify-center'>
          <MdOutlineInsertLink className='mr-1 mt-1 rotate-45 drop-shadow' size={17} />
          <div className='flex w-full flex-wrap gap-x-2 text-sm drop-shadow'>
            {Links.slice(0, 1).map((link, index) => (
              <Link key={index} href={link.url} target='_blank' className='text-blue-300 hover:underline'>
                {link.name}
              </Link>
            ))}
            {expanded &&
              Links.slice(1).map((link, index) => (
                <Link key={index} href={link.url} target='_blank' className='text-blue-300 hover:underline'>
                  {link.name}
                </Link>
              ))}

            <button onClick={() => setExpanded(!expanded)} className='text-xs text-gray-200 hover:underline'>
              {expanded ? 'Show Less' : `+ ${Links.length - 1} More`}
            </button>
          </div>
        </div>
        {/* Row 5 */}
        <div className='mb-3 mt-5'>
          <p className='text-xs font-normal text-gray-200'>
            Followed by <span className='font-bold text-white'>Person1</span> and{' '}
            <span className='font-bold text-white'>Person2</span>
          </p>
        </div>
      </div>
    </>
  )
}
