import CloudsCesium from '../CloudsCesium'
import VehicleCesium from '../VehicleCesium'
import HumanModalCesium from '../HumanModalCesium'
import AirCraftCesium from '../AirCraftCesium'
import GPX from '../GPX'
import CesiumWidgetComponent from '../CesiumWidgetComponent'

import AreaChartComponent from '../../charts/AreaChart'
import LineComponent from '../../charts/LineChart'
import PieChartComponent from '../../charts/PieChart'

// import BarChartPage from './component/charts/barchart/page'
// import TestDiv from './component/charts/testdiv/page'
// import Navbar from './component/navbar/page'

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
          {/* <HumanModalCesiumViewer /> */}
          {/* <VehicleCesiumViewer /> */}
          {/* <AircraftCesiumViewer /> */}

          {/* <GPX /> */}

          {/* Includes cesium widget, day-night effect, clouds, fly to certain place effect, weather */}
          {/* <CloudsCesium /> */}
          <CesiumWidgetComponent />
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

        {/* <Navbar /> */}
        {/* TestDiv components on four corners */}
        {/* <div className="absolute flex justify-start p-6 w-1/2 h-1/2 z-10 pointer-events-none">
          <TestDiv />
        </div> */}
        {/* <div className="absolute flex justify-start p-6 w-1/2 h-1/2 z-10 pointer-events-none">
          <BarChartPage />
        </div> */}
        {/* <div className="absolute flex justify-end top-0 right-0 p-6 w-1/2 h-1/2 z-10 pointer-events-none">
          <TestDiv />
        </div> */}
        {/* <div className="absolute flex justify-end bottom-0 right-0 pr-6 pb-10 w-1/4 h-1/2 z-10 pointer-events">
          <TestDiv />
        </div> */}
      </div>
    </>
  )
}

export default CesiumWidgetViewer
