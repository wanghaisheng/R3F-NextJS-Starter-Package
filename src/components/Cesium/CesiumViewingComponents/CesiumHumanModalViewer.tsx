import HumanModalCesium from '../HumanModalCesium'

import AreaChartComponent from '../../charts/AreaChart'
import LineComponent from '../../charts/LineChart'
import PieChartComponent from '../../charts/PieChart'

const CesiumHumanModalViewer = () => {
  return (
    <>
      <div className='absolute -top-20 left-0 h-screen w-full'>
        {/* CesiumViewer as background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Cesium */}
          <HumanModalCesium />
        </div>

        <div className='absolute left-24 top-24 '>
          <div className='mb-2 bg-purple-900/20'>
            <p className='p-4 text-sm'>Certain description about the chart below</p>
            <LineComponent />
          </div>
          <div className='mt-2 bg-purple-900/20'>
            <p className='p-4 text-sm'>Certain description about the chart below</p>
            <AreaChartComponent />
          </div>
        </div>
        <div className='absolute right-10 top-24 w-[300px]'>
          <div className='mb-2 bg-purple-900/20'>
            <p className='p-4 text-sm'>Certain description about the chart below</p>
            <AreaChartComponent />
          </div>
          <div className='mt-2 bg-purple-900/20'>
            <p className='p-4 text-sm'>Certain description about the chart below</p>
            <PieChartComponent />
          </div>
        </div>
      </div>
    </>
  )
}

export default CesiumHumanModalViewer
