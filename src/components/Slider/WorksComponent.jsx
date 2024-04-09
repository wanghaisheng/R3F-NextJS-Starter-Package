'use client'

import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { FaChartPie, FaRegChartBar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'
import FormModal from '@/components/FormModal/Modal'

export default function WorksComponent() {
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false)

  const [name, setName] = useState('')

  const [description, setDescription] = useState('')
  const [cardBackground, setCardBackground] = useState('project-card-bg.jpg')
  const [cardAvatar, setCardAvatar] = useState('aa.png')

  const openWorkModal = () => {
    setIsWorkModalOpen(true)
  }

  const [open, setOpen] = useState(false)

  return (
    <div className='mx-20 flex flex-col items-center'>
      <div className='bg-[#F8F8F8]/7 flex h-full w-fit rounded-[30px] border-4 border-[#2E2B3C] px-10 py-4'>
        <div className='flex flex-col '>
          <div className='flex justify-center text-7xl drop-shadow'>Experience</div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='w-1/5 rounded-2xl border-2 p-2 text-white shadow-md '
            onClick={() => {
              openWorkModal(true)
            }}
          >
            Add New Skill
          </motion.button>
          <FormModal show={isWorkModalOpen} onClick={openWorkModal} onclose={setIsWorkModalOpen}>
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
                  <label htmlFor='project-name' className='text- pr-5'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='project-name'
                    className='h-8 w-full rounded-md bg-white/10  p-2 text-white'
                    placeholder='Project Name'
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='col-span-4 col-start-1'>
                  <label htmlFor='project-descrip' className='text- pr-5'>
                    Description
                  </label>
                  <textarea
                    id='project-descrip'
                    className='h-12 w-full resize-none  rounded-md bg-white/10 p-1 text-white'
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
          </FormModal>

          <div className='flex'>
            <div className='flex flex-col'>
              <div className='mr-10 w-96 rounded-[20px] border-4 border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
                <p>React</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consectetur dolores, veniam
                  reprehenderit dolore deleniti iure veritatis natus hic, minima quibusdam qui assumenda. Quod eum
                  veritatis, quos est illo iusto.
                </p>
                <p>Certifications: </p>
              </div>
            </div>
            <div className='flex h-full w-[40%] flex-col justify-between rounded-[30px] bg-[#D9D9D9]/20  py-4'>
              <p className='pl-4'>Specifications</p>
              {/* Condition for changing barchart chart and radar chart*/}

              <div className='flex items-center justify-center'>
                <motion.div animate={open ? 'open' : 'closed'} className='relative'>
                  <button
                    onClick={() => setOpen((pv) => !pv)}
                    className='flex items-center gap-2 rounded-md bg-indigo-500 px-3 py-2 text-indigo-50 transition-colors hover:bg-indigo-500'
                  >
                    <span className='text-sm font-medium'>Select View</span>
                    <motion.span variants={iconVariants}>
                      <FiChevronDown />
                    </motion.span>
                  </button>

                  <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: 'top', translateX: '-50%' }}
                    className='absolute left-[50%] top-[120%] flex w-48 flex-col gap-2 overflow-hidden rounded-lg bg-[#D9D9D9] p-2 shadow-xl'
                  >
                    <Option setOpen={setOpen} Icon={AiOutlineRadarChart} text='Radar Chart' />
                    <Option setOpen={setOpen} Icon={FaChartPie} text='Pie Chart' />
                    <Option setOpen={setOpen} Icon={FaRegChartBar} text='Bar Chart' />
                  </motion.ul>
                </motion.div>
              </div>
            </div>
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

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
}

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
}
