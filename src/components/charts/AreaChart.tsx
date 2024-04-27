'use client'

import {
  LineChart,
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  CartesianAxis,
} from 'recharts'

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

const AreaChartComponent = () => {
  return (
    <>
      <div className=' flex flex-col justify-center'>
        {/* For area chart */}

        <div>
          <ResponsiveContainer width={350} height={250}>
            <AreaChart width={350} height={250} data={ramData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#36F097' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#36F097' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#268AFF' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#268AFF' stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey='name' padding={{ left: 5, right: 20 }} />
              <YAxis />
              <CartesianGrid vertical={false} strokeDasharray='6 6' />
              <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
              <Legend
                width={300}
                wrapperStyle={{
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 3,
                }}
              />
              <Area type='monotone' dataKey='expected' stroke='#36F097' fillOpacity={1} fill='url(#colorUv)' />
              <Area
                type='monotone'
                dataKey='currentPerformance'
                stroke='#208AFF'
                fillOpacity={1}
                fill='url(#colorPv)'
              />
            </AreaChart>
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

export default AreaChartComponent
