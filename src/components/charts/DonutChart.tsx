'use client'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

// Static Data for the pie chart
const data_1 = [
  { name: 'Fighting', value: 400 },
  { name: 'Farming', value: 300 },
  { name: 'Pushing', value: 300 },
  { name: 'Supporting', value: 200 },
  { name: 'Versitility', value: 200 },
]

// Colors for the pie chart segments/cells
const COLORS = ['#3DFFDC', '#1ED6FF', '#268AFF', '#5A3FFF', '#1ED6FF']

export default function DonutComponent() {
  return (
    <>
      {/* Main content */}
      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
        {/* Card container */}
        <div>
          {/* Responsive container for the chart */}
          <ResponsiveContainer width={400} height={400}>
            <PieChart width={400} height={400}>
              <Pie
                data={data_1}
                // cx={200}
                // cy={200}
                innerRadius={100}
                // label={true}
                labelLine={false}
                outerRadius={126}
                paddingAngle={3}
                // fill="#8884d8"
                stroke='none'
                dataKey='value'
              >
                {/* Customizing the colors of each segment */}
                {data_1.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {/* Legend component */}
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
