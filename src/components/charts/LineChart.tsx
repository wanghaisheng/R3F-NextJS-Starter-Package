'use client'

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const ramData = [
  {
    name: 'Jan',
    currentPerformance: 20,
    expected: 10,
  },
  {
    name: 'Feb',
    currentPerformance: 40,
    expected: 20,
  },
  {
    name: 'Mar',
    currentPerformance: 60,
    expected: 30,
  },
  {
    name: 'Apr',
    currentPerformance: 63,
    expected: 35,
  },
  {
    name: 'May',
    currentPerformance: 40,
    expected: 40,
  },
  {
    name: 'Jun',
    currentPerformance: 60,
    expected: 55,
  },
  {
    name: 'Jul',
    currentPerformance: 65,
    expected: 65,
  },
  {
    name: 'Aug',
    currentPerformance: 55,
    expected: 70,
  },
  {
    name: 'Sept',
    currentPerformance: 66,
    expected: 75,
  },
  {
    name: 'Oct',
    currentPerformance: 80,
    expected: 80,
  },
  {
    name: 'Nov',
    currentPerformance: 78,
    expected: 85,
  },
  {
    name: 'Dec',
    currentPerformance: 82,
    expected: 90,
  },
]

export default function LineComponent() {
  return (
    <>
      <div className='flex flex-col justify-center'>
        {/* For Line chart */}

        <div>
          <ResponsiveContainer width={350} height={250}>
            <LineChart data={ramData} margin={{ right: 30 }}>
              <XAxis dataKey='name' padding={{ left: 5, right: 20 }} />
              <YAxis width={50} orientation='left' tickCount={5} />

              <CartesianGrid vertical={false} strokeDasharray='6 6' />

              <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />

              <Line type='monotone' dataKey='currentPerformance' stroke='#36F097' />
              <Line type='monotone' dataKey='expected' stroke='#268AFF' strokeDasharray='7 7' />
              {/* <Legend /> */}
              <Legend
                width={300}
                wrapperStyle={{
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-lg'>{label}</p>
        <p className='text-sm text-blue-400'>
          currentPerformance:
          <span className='ml-2'>${payload[0].value}</span>
        </p>
        <p className='text-sm text-indigo-400'>
          expected:
          <span className='ml-2'>${payload[1].value}</span>
        </p>
      </div>
    )
  }
}
