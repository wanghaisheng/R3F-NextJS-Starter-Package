import CloudsCesium from '../CloudsCesium'

import AreaChartComponent from '../../charts/AreaChart'
import LineComponent from '../../charts/LineChart'
import PieChartComponent from '../../charts/PieChart'

const CesiumWidgetViewer = () => {
  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
          {/* Includes cesium widget, day-night effect, clouds, fly to certain place effect, weather */}
          <CloudsCesium />
        </div>

        <div className='absolute left-0 top-0 bg-purple-900/20'>
          <LineComponent />
        </div>
        <div className='absolute right-10 top-10 w-[300px] bg-purple-900/20'>
          <AreaChartComponent />
        </div>
        <div className='absolute bottom-10 right-10 w-[300px] bg-purple-900/20'>
          <PieChartComponent />
        </div>
        <div className='absolute bottom-10 left-10 w-[300px] bg-purple-900/20'>
          <AreaChartComponent />
        </div>
      </div>
    </>
  )
}

export default CesiumWidgetViewer
