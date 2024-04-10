'use client'

import { FiChevronDown } from 'react-icons/fi'
import { AiOutlineRadarChart } from 'react-icons/ai'
import { FaChartPie, FaRegChartBar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'
import FormModal from '@/components/FormModal/Modal'

import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-lg'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

export default function SkillsComponent() {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [skills, setSkills] = useState([
    { name: 'HTML', percentage: 80 },
    { name: 'CSS', percentage: 75 },
    { name: 'JavaScript', percentage: 90 },
  ])

  const openSkillModal = () => {
    setIsSkillModalOpen(true)
  }

  const handleSkillNameChange = (index, newName) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills[index].name = newName
      return updatedSkills
    })
  }

  const handleSliderChange = (index, newValue) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills]
      updatedSkills[index].percentage = newValue
      return updatedSkills
    })
  }

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, { name: '', percentage: 0 }])
  }

  const openCardModal = () => {
    setIsCardModalOpen(true)
  }

  const [open, setOpen] = useState(false)

  return (
    <div className='flex flex-col items-center'>
      <div className='flex h-full w-fit rounded-[30px] border-4 border-[#2E2B3C] bg-[#F8F8F8]/10 px-10 py-4'>
        <div className='flex flex-col '>
          <div className='flex justify-center text-7xl drop-shadow'>Skills</div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='w-1/5 rounded-2xl border-2 p-2 text-white shadow-md '
            onClick={() => {
              openCardModal(true)
            }}
          >
            Add New Skill
          </motion.button>
          <FormModal show={isCardModalOpen} onClick={openCardModal} onclose={setIsCardModalOpen}>
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.3 }}
              className='my-4 flex w-fit items-center rounded-[20px] bg-black px-4 py-2 shadow-sm shadow-white'
            >
              <button onClick={handleAddSkill}>Add New Skill</button>
            </motion.div>
            {skills.map((skill, index) => (
              <div key={index}>
                <input
                  type='text'
                  value={skill.name}
                  onChange={(e) => handleSkillNameChange(index, e.target.value)}
                  placeholder='Skill Name'
                  className='rounded-md bg-white/20'
                />
                <p>
                  {skill.name}: {skill.percentage}%
                </p>
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={skill.percentage}
                  onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                />
              </div>
            ))}
          </FormModal>

          <div className='flex'>
            <div className='flex flex-col'>
              <div className='flex'>
                {skills.map((skill, index) => (
                  <div key={index}>
                    <nav className='my-2 flex justify-center'>
                      <p className='mx-2'>{skill.name}</p>
                    </nav>
                  </div>
                ))}
              </div>
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
              {skills.length < 6 ? (
                <ResponsiveContainer width={278} height={287}>
                  <BarChart
                    width={278}
                    height={287}
                    data={skills}
                    margin={{
                      top: 5,
                      right: 20,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey='name' padding={{ left: 20, right: 20 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
                    <CartesianGrid vertical={false} strokeDasharray='6 6' />
                    <Bar
                      name='Ram'
                      dataKey='percentage'
                      fill='#6E29F7'
                      activeBar={<Rectangle fill='#268AFF' stroke='blue' />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                // Radar chart
                <ResponsiveContainer width={278} height={287}>
                  <RadarChart
                    // cx={300}
                    // cy={250}
                    // outerRadius={150}
                    width={278}
                    height={287}
                    data={skills}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey='name' />
                    <PolarRadiusAxis opacity={0} domain={[0, 100]} />
                    <Radar
                      name='Ram'
                      dataKey='percentage'
                      stroke='#28B5E1'
                      strokeWidth={4}
                      fill='#28B5E1'
                      fillOpacity={0.4}
                    />
                    {/* <Tooltip /> */}
                    {/* <Legend values="100%" /> */}
                    <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
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
