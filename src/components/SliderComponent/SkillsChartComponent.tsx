'use client'
import { useState } from 'react'
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
        <p className='text-lg text-white'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{payload[0].payload.percentage}</span>%
        </p>
      </div>
    )
  }
}

// Custom tick component for BarChart's XAxis
const CustomXAxisTick = ({ x, y, payload, activeIndex, index, setActiveIndex }) => {
  const text = payload.value
  const maxLength = 3 // Maximum characters to show before truncating
  const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  const isActive = activeIndex === index

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor='end'
        fill={isActive ? '#a78bfa' : '#808080'}
        transform='rotate(-30)'
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {truncatedText}
      </text>
    </g>
  )
}

interface CustomXAxisRadarTickProps {
  payload: {
    coordinate: number
    value: string
  }
  x: number
  y: number
  textAnchor: string
  stroke: string
  radius: number
  activeIndex: number | null
  index: number
  setActiveIndex: (index: number | null) => void
}

// Custom tick component for PolarAngleAxis
const CustomXAxisRadarTick: React.FC<CustomXAxisRadarTickProps> = ({
  payload,
  x,
  y,
  textAnchor,
  stroke,
  activeIndex,
  index,
  setActiveIndex,
}) => {
  const isActive = activeIndex === index
  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={isActive ? '#a78bfa' : '#808080'}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {payload.value}
    </text>
  )
}

export default function SkillsChartComponent({ skills }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  return (
    <div className='mb-5 lg:block lg:w-full'>
      {skills.length < 6 ? (
        <ResponsiveContainer width='100%' height={220}>
          <BarChart
            width={100}
            height={287}
            data={skills}
            margin={{
              top: 5,
              right: 20,
              left: -20,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey='skill_name'
              tick={(props) => (
                <CustomXAxisTick
                  {...props}
                  activeIndex={activeIndex}
                  index={props.index}
                  setActiveIndex={setActiveIndex}
                />
              )}
              interval={0}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip active={false} payload={[]} label='skill_name' />} />
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
        <ResponsiveContainer width='100%' height={220}>
          <RadarChart
            // cx={300}
            // cy={250}
            // outerRadius={150}
            width={100}
            height={287}
            data={skills}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey='skill_name'
              tick={(props) => (
                <CustomXAxisRadarTick
                  {...props}
                  activeIndex={activeIndex}
                  index={props.index}
                  setActiveIndex={setActiveIndex}
                />
              )}
            />
            <PolarRadiusAxis opacity={0} domain={[0, 100]} />
            <Radar name='Ram' dataKey='percentage' stroke='#28B5E1' strokeWidth={4} fill='#28B5E1' fillOpacity={0.4} />
            {/* <Tooltip /> */}
            {/* <Legend values="100%" /> */}
            <Tooltip content={<CustomTooltip active={false} payload={[]} label='skill_name' />} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
