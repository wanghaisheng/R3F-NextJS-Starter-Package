import CloudsCesium from './CloudsCesium'
import VehicleCesium from './VehicleCesium'
import HumanModalCesium from './HumanModalCesium'
import AirCraftCesium from './AirCraftCesium'
import GPX from './GPX'

// import BarChartPage from './component/charts/barchart/page'
// import TestDiv from './component/charts/testdiv/page'
// import Navbar from './component/navbar/page'

const CesiumViewer = () => {
  return (
    <>
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
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

          <GPX />

          {/* Includes cesium widget, day-night effect, clouds, fly to certain place effect, weather */}
          {/* <CloudsCesium /> */}
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

export default CesiumViewer
