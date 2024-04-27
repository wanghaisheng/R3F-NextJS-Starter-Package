'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import FormModal from '@/components/FormModal/Modal'
import { motion } from 'framer-motion'

import Link from 'next/link'

const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
const Avatar_2 = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Avatar), { ssr: false })
const Avatar_1 = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Avatar_1), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cardBackground, setCardBackground] = useState('project-card-bg.jpg')
  const [cardAvatar, setCardAvatar] = useState('aa.png')
  return (
    <>
      <div className='relative flex size-full flex-col ' id='about-me'>
        <div className='z-20 mt-16 flex size-full items-center justify-center p-10'>
          {/* <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='rounded-2xl border-2 p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Open Project Modal
          </motion.button> */}

          {/* <FormModal show={isModalOpen} onclose={setIsModalOpen}>
            <form action='#' method='' className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'>
              <div className='image-preview w-50 object-fit relative mb-10 h-44 overflow-hidden rounded-md bg-white'>
                <img src={`/${cardBackground}`} />
                <div className='avatar-img absolute right-2 top-0 z-10 h-20 w-40'>
                  <img src={`/${cardAvatar}`} />
                </div>
                <div id='name-preview' className='bw-full absolute bottom-0 rounded-lg p-3 backdrop-blur-2xl'>
                  {name}
                </div>
                <div id='description-preview' className='absolute top-0 w-full rounded-t-sm p-3'>
                  {description}
                </div>
              </div>
              <div className='form-section grid- grid grid-cols-3 grid-rows-4 gap-10 text-white'>
                <div className='upload-images col-start-1 col-end-4 flex'>
                  <div className='avatar-bg text-center'>
                    <label htmlFor='avatar-bg' className='mx-auto'>
                      Card Background
                    </label>
                    <input type='file' onChange={(e) => setCardBackground(e.target.files[0].name)} />
                  </div>
                  <div className='avatar text-center'>
                    <label htmlFor='avatar-img' className='mx-auto'>
                      Avatar
                    </label>
                    <input type='file' id='avatar-img' onChange={(e) => setCardAvatar(e.target.files[0].name)} />
                  </div>
                </div>
                <div className='col-span-4 col-start-1 flex flex-col'>
                  <label htmlFor='project-name' className=' pr-5'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='project-name'
                    className='h-8 w-80 p-2 text-black'
                    placeholder='Project Name'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='col-span-4 col-start-1'>
                  <label htmlFor='project-descrip' className='pr-5'>
                    Description
                  </label>
                  <textarea
                    id='project-descrip'
                    className='h-12 w-full resize-none p-1 text-black'
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className='btn col-span-4 col-start-1 flex items-center justify-center' type='submit'>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='rounded-2xl border-2 p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:bg-violet-900'
                  >
                    Pathaideu
                  </motion.button>
                </div>
              </div>
            </form>
          </FormModal> */}

          <Link
            className='rounded-2xl border p-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900  '
            href='/signin'
          >
            Sign-In
          </Link>
        </div>
      </div>
    </>
  )
}
