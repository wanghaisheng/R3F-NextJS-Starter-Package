'use client'
import { motion } from 'framer-motion'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'

import Image from 'next/image'

export default function CardComponent() {
  return (
    <div className='mx-20 flex items-center'>
      <div className='bg-[#F8F8F8]/7 flex h-screen w-fit rounded-[30px] border-4 border-[#2E2B3C] px-10 py-4'>
        <div className='flex flex-col'>
          <div className='flex justify-center text-7xl drop-shadow'>Card</div>

          <CardContainer className='hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl'>
            <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
              <div className='flex'>
                <CardItem className='mt-4 w-full'>
                  <Image
                    src='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.png?size=1024?quality=100'
                    height='500'
                    width='500'
                    className='rounded-xl object-cover group-hover/card:shadow-xl'
                    alt='thumbnail'
                  />
                </CardItem>
                <div className='flex flex-col'>
                  <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                    Ayush Lama
                  </CardItem>
                  <CardItem as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                    Jr.CEO
                  </CardItem>
                  <div className='mt-20 flex items-center justify-between'>
                    <CardItem
                      translateZ={20}
                      as='button'
                      className='right-0 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black'
                    >
                      Follow
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as='button'
                      className='ml-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black'
                    >
                      Edit
                    </CardItem>
                  </div>
                </div>
              </div>
            </CardBody>
          </CardContainer>
          <div className='flex justify-end'>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='rounded-2xl border-2 p-2 text-white shadow-md '
              href='#'
            >
              Create New Avatar &emsp;&emsp; +
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}

const Option = ({ text, Icon, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className='flex w-full cursor-pointer items-center gap-2 whitespace-nowrap rounded-md p-2 text-xs font-medium text-slate-700 transition-colors hover:bg-indigo-100 hover:text-indigo-500'
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  )
}

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
}
