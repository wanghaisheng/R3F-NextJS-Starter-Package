'use client'
import { useState } from 'react'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any[]; label: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-medium text-lg'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

const Skills = () => {
  const [skills, setSkills] = useState([
    { name: 'HTML', percentage: 80 },
    { name: 'CSS', percentage: 75 },
    { name: 'JavaScript', percentage: 90 },
    // Add more skills as needed
  ])

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
    setSkills((prevSkills) => [
      ...prevSkills,
      { name: '', percentage: 0 }, // Add a new skill with empty name and 0 percentage
    ])
  }

  return (
    <>
      <div className='relative'>
        <h2>Skills</h2>
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
        <button onClick={handleAddSkill}>+ Add Skill</button>
      </div>
      <div className='absolute right-[33%] top-10 flex justify-center'>
        <div className='mt-4 flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
          <div className='rounded-lg border border-purple-400 bg-black/30 py-4  shadow-lg shadow-purple-500'>
            {/* Condition for changing barchart chart and radar chart*/}
            {skills.length < 6 ? (
              <ResponsiveContainer width={400} height={300}>
                <BarChart
                  width={400}
                  height={300}
                  data={skills}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
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
              <ResponsiveContainer width={400} height={300}>
                <RadarChart
                  // cx={300}
                  // cy={250}
                  // outerRadius={150}
                  width={400}
                  height={300}
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Skills
