import AreaChartComponent from '../charts/AreaChart'
import { FaTasks, FaRegClock } from 'react-icons/fa'
import { MdTask } from 'react-icons/md'
import { LuGauge } from 'react-icons/lu'

import GeniusIDFlipCard from '../card/GeniusIDFlipCard'

import { useUser } from '@/context/UserContext/UserContext'

export default function AdminDashboard() {
  const { user } = useUser()

  return (
    <div className='flex'>
      <div className='flex basis-full flex-col lg:flex-row lg:justify-between'>
        {/* left side */}
        <div className='grid grid-cols-2 gap-6 lg:w-[58%]'>
          {/* 1 */}
          <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
            <div className='mt-1'>
              <FaTasks />
            </div>
            <div>
              <h1 className='text-lg font-semibold'>Total Projects</h1>
              <p className='my-3 text-xl font-bold text-purple-400'>124</p>
              <p className='text-xs'>All running & completed projects</p>
            </div>
          </div>
          {/* 2 */}
          <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
            <div className='mt-1'>
              <FaRegClock />
            </div>
            <div>
              <h1 className='text-lg font-semibold'>Hours Logged</h1>
              <p className='my-3 text-xl font-bold text-purple-400'>52</p>
              <p className='text-xs text-red-400'>
                -2%
                <span className='text-white'> From last week</span>
              </p>
            </div>
          </div>
          {/* 3 */}
          <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
            <div className='mt-1'>
              <MdTask />
            </div>
            <div>
              <h1 className='text-lg font-semibold'>Completed Projects</h1>
              <p className='my-3 text-xl font-bold text-purple-400'>50</p>
              <p className='text-xs text-blue-400'>
                +12%
                <span className='text-white'> Completion rate this month</span>
              </p>
            </div>
          </div>
          {/* 4 */}
          <div className='flex gap-x-5 rounded-xl p-4 text-slate-50 shadow-md shadow-[#6B37CA]  backdrop-blur-md'>
            <div className='mt-1'>
              <LuGauge />
            </div>
            <div>
              <h1 className='text-lg font-semibold'>Performance</h1>
              <p className='my-3 text-xl font-bold text-purple-400'>80%</p>
              <p className='text-xs text-green-500'>
                +12%
                <span className='text-white'> than last week</span>
              </p>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className='mt-4 flex flex-col justify-center rounded-xl p-4 shadow-md shadow-[#6B37CA] backdrop-blur-md lg:mt-0 lg:w-[40%]'>
          {/* 1 */}
          <div className='mx-4 mb-4'>
            <p className='text-xl font-bold'>
              Performance of year <span className='text-sky-500'>2023</span>
            </p>
            <p className='text-purple-400'>User Name</p>
            <p>
              Expected Avg : <span className='text-green-500'>65%</span>
            </p>
            <p>
              Achieved Avg : <span className='text-red-400'>55%</span>
            </p>
          </div>
          <AreaChartComponent />
        </div>
      </div>

      {/* <div className='basis-1/4 px-4'>
        {user ? (
          <GeniusIDFlipCard
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            dob={user.dob}
            contact={user.phone_number}
            address={user.address}
          />
        ) : (
          <GeniusIDFlipCard
            first_name='DEFAULT'
            last_name='DEFAULT'
            email='DEFAULT@'
            dob='DEFAULT'
            contact='DEFAULT'
            address='DEFAULT'
          />
        )}
      </div> */}
    </div>
  )
}
