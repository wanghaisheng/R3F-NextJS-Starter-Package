'use client'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

// Static Data for the pie chart
const data = [
  { name: 'Fighting', value: 400 },
  { name: 'Farming', value: 300 },
  { name: 'Pushing', value: 300 },
  { name: 'Supporting', value: 200 },
  { name: 'Versitility', value: 200 },
]

// Colors for the pie chart segments/cells
const colors = ['#3DFFDC', '#1ED6FF', '#268AFF', '#1ED6FF', '#5A3FFF']

// Constant for converting degrees to radians
const RADIAN = Math.PI / 180

// Custom label component for the pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = data.reduce((acc, entry) => acc + entry.value, 0)
    const percentage = ((payload[0].payload.value / total) * 100).toFixed(2)

    return (
      <div className='flex flex-col gap-4 rounded-md bg-slate-900 p-4'>
        <p className='text-lg'>{label}</p>
        <p className='text-sm text-indigo-400'>
          <span className='ml-2'>{percentage}%</span>
        </p>
      </div>
    )
  }
}

export default function PieChartComponent() {
  return (
    <>
      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
        <div>
          <ResponsiveContainer width={300} height={300}>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                dataKey='value' // Add the dataKey property with a valid value
                // label={renderCustomizedLabel}
                outerRadius={120}
              >
                {/* Customizing the colors of each segment */}
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Legend />
              {/* <Legend
                width={150}
                wrapperStyle={{
                  bottom: 0,
                  right: -20,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  // border: "1px solid #000FDC",
                  borderRadius: 4,
                }}
              /> */}
              {/* <Tooltip /> */}
              <Tooltip content={<CustomTooltip active={false} payload={[]} label='' />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
