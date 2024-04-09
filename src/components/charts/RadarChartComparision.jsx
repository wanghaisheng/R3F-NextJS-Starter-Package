'use client'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

// Data for the radar chart
const data = [
  {
    subject: 'Math',
    A: 80,
    B: 40,
  },
  {
    subject: 'Chinese',
    A: 55,
    B: 62,
  },
  {
    subject: 'English',
    A: 86,
    B: 50,
  },
  {
    subject: 'Geography',
    A: 66,
    B: 75,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
  },
  {
    subject: 'History',
    A: 45,
    B: 65,
  },
]

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-lg'>{label}</p>
        <p className='text-sm text-blue-400'>
          Student A:
          <span className='ml-2'>{payload[0].value}%</span>
        </p>
        <p className='text-sm text-indigo-400'>
          Student B:
          <span className='ml-2'>{payload[1].value}%</span>
        </p>
      </div>
    )
  }
}

export default function RadarChartComponent() {
  return (
    <>
      {/* Main content */}
      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
        <div>
          <ResponsiveContainer width={400} height={350}>
            <RadarChart
              // cx={300}
              // cy={250}
              outerRadius={120}
              data={data}
            >
              {/* Grid of the radar chart | polygon or circle */}
              <PolarGrid radialLines={true} gridType='polygon' />

              {/* Angle axis for the radar chart where the data to show is subject */}
              <PolarAngleAxis dataKey='subject' />
              {/* Domain set 0-100 as highest marks will be 100*/}
              <PolarRadiusAxis domain={[0, 100]} opacity={0} />
              <Radar name='Student A' dataKey='A' stroke='#28B5E1' strokeWidth={3} fill='#28B5E1' fillOpacity={0.4} />
              <Radar name='Student B' dataKey='B' stroke='#5A3FFF' strokeWidth={3} fill='#D94DDC' fillOpacity={0.3} />
              {/* <Tooltip /> */}
              <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
              {/* <Legend /> */}
              <Legend
                width={150}
                wrapperStyle={{
                  bottom: 0,
                  right: -20,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  // border: "1px solid #000FDC",
                  borderRadius: 4,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
