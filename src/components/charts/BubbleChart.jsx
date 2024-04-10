'use client'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'

const clockIn = 45
const clockOut = 0
const startTimer = 100
const stopTimer = 50

// Static data of ram from Sunday to Saturday
const ram_sunday = [
  { hour: '12a', index: 1, value: clockOut }, // x = 12a, y = 1, z = 70
  { hour: '1a', index: 1, value: clockOut },
  { hour: '2a', index: 1, value: clockOut },
  { hour: '3a', index: 1, value: clockOut },
  { hour: '4a', index: 1, value: clockOut },
  { hour: '5a', index: 1, value: clockOut },
  { hour: '6a', index: 1, value: clockIn },
  { hour: '7a', index: 1, value: clockIn },
  { hour: '8a', index: 1, value: clockIn },
  { hour: '9a', index: 1, value: clockIn },
  { hour: '10a', index: 1, value: startTimer },
  { hour: '11a', index: 1, value: startTimer },
  { hour: '12a', index: 1, value: startTimer },
  { hour: '1p', index: 1, value: startTimer },
  { hour: '2p', index: 1, value: startTimer },
  { hour: '3p', index: 1, value: startTimer },
  { hour: '4p', index: 1, value: stopTimer },
  { hour: '5p', index: 1, value: startTimer },
  { hour: '6p', index: 1, value: startTimer },
  { hour: '7p', index: 1, value: clockOut },
  { hour: '8p', index: 1, value: clockOut },
  { hour: '9p', index: 1, value: clockOut },
  { hour: '10p', index: 1, value: clockOut },
  { hour: '11p', index: 1, value: clockOut },
]

const ram_monday = [
  { hour: '12a', index: 1, value: clockOut }, // x = 12a, y = 1, z = 70
  { hour: '1a', index: 1, value: clockOut },
  { hour: '2a', index: 1, value: clockOut },
  { hour: '3a', index: 1, value: clockOut },
  { hour: '4a', index: 1, value: clockOut },
  { hour: '5a', index: 1, value: clockOut },
  { hour: '6a', index: 1, value: clockIn },
  { hour: '7a', index: 1, value: startTimer },
  { hour: '8a', index: 1, value: startTimer },
  { hour: '9a', index: 1, value: startTimer },
  { hour: '10a', index: 1, value: stopTimer },
  { hour: '11a', index: 1, value: startTimer },
  { hour: '12a', index: 1, value: startTimer },
  { hour: '1p', index: 1, value: startTimer },
  { hour: '2p', index: 1, value: startTimer },
  { hour: '3p', index: 1, value: startTimer },
  { hour: '4p', index: 1, value: startTimer },
  { hour: '5p', index: 1, value: startTimer },
  { hour: '6p', index: 1, value: clockOut },
  { hour: '7p', index: 1, value: clockOut },
  { hour: '8p', index: 1, value: clockOut },
  { hour: '9p', index: 1, value: clockOut },
  { hour: '10p', index: 1, value: clockOut },
  { hour: '11p', index: 1, value: clockOut },
]

const ram_tuesday = [
  { hour: '12a', index: 1, value: clockOut }, // x = 12a, y = 1, z = 70
  { hour: '1a', index: 1, value: clockOut },
  { hour: '2a', index: 1, value: clockOut },
  { hour: '3a', index: 1, value: clockOut },
  { hour: '4a', index: 1, value: clockOut },
  { hour: '5a', index: 1, value: clockOut },
  { hour: '6a', index: 1, value: clockIn },
  { hour: '7a', index: 1, value: startTimer },
  { hour: '8a', index: 1, value: startTimer },
  { hour: '9a', index: 1, value: startTimer },
  { hour: '10a', index: 1, value: startTimer },
  { hour: '11a', index: 1, value: stopTimer },
  { hour: '12a', index: 1, value: stopTimer },
  { hour: '1p', index: 1, value: startTimer },
  { hour: '2p', index: 1, value: startTimer },
  { hour: '3p', index: 1, value: startTimer },
  { hour: '4p', index: 1, value: clockOut },
  { hour: '5p', index: 1, value: clockOut },
  { hour: '6p', index: 1, value: clockOut },
  { hour: '7p', index: 1, value: clockOut },
  { hour: '8p', index: 1, value: clockOut },
  { hour: '9p', index: 1, value: startTimer },
  { hour: '10p', index: 1, value: startTimer },
  { hour: '11p', index: 1, value: clockOut },
]

const ram_wednesday = [
  { hour: '12a', index: 1, value: clockOut }, // x = 12a, y = 1, z = 70
  { hour: '1a', index: 1, value: clockOut },
  { hour: '2a', index: 1, value: clockOut },
  { hour: '3a', index: 1, value: clockOut },
  { hour: '4a', index: 1, value: clockIn },
  { hour: '5a', index: 1, value: startTimer },
  { hour: '6a', index: 1, value: startTimer },
  { hour: '7a', index: 1, value: startTimer },
  { hour: '8a', index: 1, value: startTimer },
  { hour: '9a', index: 1, value: stopTimer },
  { hour: '10a', index: 1, value: startTimer },
  { hour: '11a', index: 1, value: startTimer },
  { hour: '12a', index: 1, value: startTimer },
  { hour: '1p', index: 1, value: startTimer },
  { hour: '2p', index: 1, value: startTimer },
  { hour: '3p', index: 1, value: startTimer },
  { hour: '4p', index: 1, value: stopTimer },
  { hour: '5p', index: 1, value: stopTimer },
  { hour: '6p', index: 1, value: startTimer },
  { hour: '7p', index: 1, value: startTimer },
  { hour: '8p', index: 1, value: clockOut },
  { hour: '9p', index: 1, value: clockOut },
  { hour: '10p', index: 1, value: clockOut },
  { hour: '11p', index: 1, value: clockOut },
]

const ram_thursday = [
  { hour: '12a', index: 1, value: clockOut }, // x = 12a, y = 1, z = 70
  { hour: '1a', index: 1, value: clockOut },
  { hour: '2a', index: 1, value: clockOut },
  { hour: '3a', index: 1, value: clockOut },
  { hour: '4a', index: 1, value: clockOut },
  { hour: '5a', index: 1, value: startTimer },
  { hour: '6a', index: 1, value: startTimer },
  { hour: '7a', index: 1, value: startTimer },
  { hour: '8a', index: 1, value: startTimer },
  { hour: '9a', index: 1, value: stopTimer },
  { hour: '10a', index: 1, value: startTimer },
  { hour: '11a', index: 1, value: startTimer },
  { hour: '12a', index: 1, value: startTimer },
  { hour: '1p', index: 1, value: startTimer },
  { hour: '2p', index: 1, value: stopTimer },
  { hour: '3p', index: 1, value: startTimer },
  { hour: '4p', index: 1, value: startTimer },
  { hour: '5p', index: 1, value: startTimer },
  { hour: '6p', index: 1, value: startTimer },
  { hour: '7p', index: 1, value: clockOut },
  { hour: '8p', index: 1, value: clockOut },
  { hour: '9p', index: 1, value: clockOut },
  { hour: '10p', index: 1, value: clockOut },
  { hour: '11p', index: 1, value: clockOut },
]

const ram_friday = [
  { hour: '12a', index: 1, value: clockOut }, // x = 12a, y = 1, z = 70
  { hour: '1a', index: 1, value: clockOut },
  { hour: '2a', index: 1, value: clockOut },
  { hour: '3a', index: 1, value: clockOut },
  { hour: '4a', index: 1, value: clockOut },
  { hour: '5a', index: 1, value: startTimer },
  { hour: '6a', index: 1, value: startTimer },
  { hour: '7a', index: 1, value: startTimer },
  { hour: '8a', index: 1, value: startTimer },
  { hour: '9a', index: 1, value: startTimer },
  { hour: '10a', index: 1, value: stopTimer },
  { hour: '11a', index: 1, value: stopTimer },
  { hour: '12a', index: 1, value: clockOut },
  { hour: '1p', index: 1, value: clockOut },
  { hour: '2p', index: 1, value: clockOut },
  { hour: '3p', index: 1, value: clockOut },
  { hour: '4p', index: 1, value: clockOut },
  { hour: '5p', index: 1, value: startTimer },
  { hour: '6p', index: 1, value: startTimer },
  { hour: '7p', index: 1, value: startTimer },
  { hour: '8p', index: 1, value: stopTimer },
  { hour: '9p', index: 1, value: clockOut },
  { hour: '10p', index: 1, value: clockOut },
  { hour: '11p', index: 1, value: clockOut },
]

const ram_saturday = [
  { hour: '12a', index: 1, value: clockOut },
  { hour: '1a', index: 1, value: clockOut },
  { hour: '2a', index: 1, value: clockOut },
  { hour: '3a', index: 1, value: clockOut },
  { hour: '4a', index: 1, value: startTimer },
  { hour: '5a', index: 1, value: startTimer },
  { hour: '6a', index: 1, value: stopTimer },
  { hour: '7a', index: 1, value: startTimer },
  { hour: '8a', index: 1, value: startTimer },
  { hour: '9a', index: 1, value: startTimer },
  { hour: '10a', index: 1, value: startTimer },
  { hour: '11a', index: 1, value: startTimer },
  { hour: '12a', index: 1, value: stopTimer },
  { hour: '1p', index: 1, value: clockIn },
  { hour: '2p', index: 1, value: startTimer },
  { hour: '3p', index: 1, value: startTimer },
  { hour: '4p', index: 1, value: startTimer },
  { hour: '5p', index: 1, value: startTimer },
  { hour: '6p', index: 1, value: clockOut },
  { hour: '7p', index: 1, value: clockOut },
  { hour: '8p', index: 1, value: clockOut },
  { hour: '9p', index: 1, value: clockOut },
  { hour: '10p', index: 1, value: clockOut },
  { hour: '11p', index: 1, value: clockOut },
]

const parseDomain = () => [
  // Don't know what this function does | copied from the examples in the docs
  0,
  Math.max(
    Math.max.apply(
      null,
      ram_sunday.map((entry) => entry.value),
    ),
    Math.max.apply(
      null,
      ram_saturday.map((entry) => entry.value),
    ),
  ),
]

// Custom tooltip for the scatter chart
const renderTooltip = (props) => {
  const { active, payload } = props

  if (active && payload && payload.length) {
    const data = payload[0] && payload[0].payload

    return (
      <div
        className='rounded-lg'
        style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          border: 'none',
          margin: 0,
          padding: 10,
        }}
      >
        <p>{data.hour}</p>
        <p>
          {data.value > 0 ? 'ClockIn' : 'ClockOut'}
          {data.value === 100 && ' + SetTimer'}
        </p>
      </div>
    )
  }

  return null
}

// Custom Legend component
const Legend = () => (
  <div className='mt-4 flex justify-end space-x-4'>
    <div className='flex items-center'>
      <div className='mr-2 size-4 rounded-xl bg-[gray]'></div>
      <span>ClockOut</span>
    </div>
    <div className='flex items-center'>
      <div className='mr-2 size-4 rounded-xl bg-[#268AFF]'></div>
      <span>ClockIn</span>
    </div>

    <div className='flex items-center'>
      <div className='mr-2 size-4 rounded-xl bg-[#36F097]'></div>
      <span>SetTimer</span>
    </div>
  </div>
)

// Main component
export default function BubbleChartComponent() {
  const domain = parseDomain()
  const range = [16, 225]
  return (
    <>
      {/* Main content */}
      <div className='flex min-h-48 flex-col items-center justify-center px-4 md:px-8 xl:px-10'>
        <div>
          <div className='mb-16'>
            <Legend />
          </div>

          <ResponsiveContainer>
            <div>
              {/* Chart for Sunday */}
              <ScatterChart
                width={900}
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 20,
                }}
              >
                <XAxis
                  type='category'
                  dataKey='hour'
                  interval={0}
                  tick={{ fontSize: 0 }}
                  tickLine={{ transform: 'translate(0, -6)' }}
                />
                <YAxis
                  type='number'
                  dataKey='index'
                  name='sunday'
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Sunday', position: 'insideRight' }}
                />
                <ZAxis type='number' dataKey={'value'} domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                {/* <Scatter data={ram_sunday} fill="#8884d8 " /> */}
                <Scatter data={ram_sunday} fill='#8884d8'>
                  {ram_sunday.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 30
                          ? 'gray'
                          : entry.value < 50
                            ? '#268AFF'
                            : entry.value < 60
                              ? '#268AFF'
                              : '#36F097'
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>

              {/* Chart for Monday */}
              <ScatterChart
                width={900}
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 20,
                }}
              >
                <XAxis
                  type='category'
                  dataKey='hour'
                  name='hour'
                  interval={0}
                  tick={{ fontSize: 0 }}
                  tickLine={{ transform: 'translate(0, -6)' }}
                />
                <YAxis
                  type='number'
                  dataKey='index'
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Monday', position: 'insideRight' }}
                />
                <ZAxis type='number' dataKey='value' domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                {/* <Scatter data={ram_monday} fill="#8884d8" /> */}
                <Scatter data={ram_monday} fill='#8884d8'>
                  {ram_monday.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 30
                          ? 'gray'
                          : entry.value < 50
                            ? '#268AFF'
                            : entry.value < 60
                              ? '#268AFF'
                              : '#36F097'
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>

              {/* Chart for Tuesday */}
              <ScatterChart
                width={900}
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 20,
                }}
              >
                <XAxis
                  type='category'
                  dataKey='hour'
                  name='hour'
                  interval={0}
                  tick={{ fontSize: 0 }}
                  tickLine={{ transform: 'translate(0, -6)' }}
                />
                <YAxis
                  type='number'
                  dataKey='index'
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Tuesday', position: 'insideRight' }}
                />
                <ZAxis type='number' dataKey='value' domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                {/* <Scatter data={ram_tuesday} fill="#8884d8" /> */}
                <Scatter data={ram_tuesday} fill='#8884d8'>
                  {ram_tuesday.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 30
                          ? 'gray'
                          : entry.value < 50
                            ? '#268AFF'
                            : entry.value < 60
                              ? '#268AFF'
                              : '#36F097'
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>

              {/* Chart for Wednesday */}
              <ScatterChart
                width={900}
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 20,
                }}
              >
                <XAxis
                  type='category'
                  dataKey='hour'
                  name='hour'
                  interval={0}
                  tick={{ fontSize: 0 }}
                  tickLine={{ transform: 'translate(0, -6)' }}
                />
                <YAxis
                  type='number'
                  dataKey='index'
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Wednesday', position: 'insideRight' }}
                />
                <ZAxis type='number' dataKey='value' domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                {/* <Scatter data={ram_wednesday} fill="#8884d8" /> */}
                <Scatter data={ram_wednesday} fill='#8884d8'>
                  {ram_wednesday.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 30
                          ? 'gray'
                          : entry.value < 50
                            ? '#268AFF'
                            : entry.value < 60
                              ? '#268AFF'
                              : '#36F097'
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>

              {/* Chart for Thursday */}
              <ScatterChart
                width={900}
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 20,
                }}
              >
                <XAxis
                  type='category'
                  dataKey='hour'
                  name='hour'
                  interval={0}
                  tick={{ fontSize: 0 }}
                  tickLine={{ transform: 'translate(0, -6)' }}
                />
                <YAxis
                  type='number'
                  dataKey='index'
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Thursday', position: 'insideRight' }}
                />
                <ZAxis type='number' dataKey='value' domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                {/* <Scatter data={ram_thursday} fill="#8884d8" /> */}
                <Scatter data={ram_thursday} fill='#8884d8'>
                  {ram_thursday.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 30
                          ? 'gray'
                          : entry.value < 50
                            ? '#268AFF'
                            : entry.value < 60
                              ? '#268AFF'
                              : '#36F097'
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>

              {/* Chart for Friday */}
              <ScatterChart
                width={900}
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 20,
                }}
              >
                <XAxis
                  type='category'
                  dataKey='hour'
                  name='hour'
                  interval={0}
                  tick={{ fontSize: 0 }}
                  tickLine={{ transform: 'translate(0, -6)' }}
                />
                <YAxis
                  type='number'
                  dataKey='index'
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Friday', position: 'insideRight' }}
                />
                <ZAxis type='number' dataKey='value' domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                {/* <Scatter data={ram_friday} fill="#8884d8" /> */}
                <Scatter data={ram_friday} fill='#8884d8'>
                  {ram_friday.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 30
                          ? 'gray'
                          : entry.value < 50
                            ? '#268AFF'
                            : entry.value < 60
                              ? '#268AFF'
                              : '#36F097'
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>

              {/* Chart for Saturday */}
              <ScatterChart
                width={900}
                height={60}
                margin={{
                  top: 10,
                  right: 0,
                  bottom: 0,
                  left: 20,
                }}
              >
                <XAxis
                  type='category'
                  dataKey='hour'
                  name='hour'
                  interval={0}
                  tickLine={{ transform: 'translate(0, -6)' }}
                />
                <YAxis
                  type='number'
                  dataKey='index'
                  height={10}
                  width={80}
                  tick={false}
                  tickLine={false}
                  axisLine={false}
                  label={{ value: 'Saturday', position: 'insideRight' }}
                />
                <ZAxis type='number' dataKey='value' domain={domain} range={range} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
                {/* <Scatter data={ram_saturday} fill="#8884d8" /> */}
                <Scatter data={ram_saturday} fill='#8884d8'>
                  {ram_saturday.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.value < 30
                          ? 'gray'
                          : entry.value < 50
                            ? '#268AFF'
                            : entry.value < 60
                              ? '#268AFF'
                              : '#36F097'
                      }
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </div>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
