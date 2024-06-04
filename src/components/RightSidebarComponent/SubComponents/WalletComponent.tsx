import GeniusIDFlipCard from '@/components/card/GeniusIDFlipCard'
import { CardContainer } from '@/components/card/card'
import SubTabs from './SubTabs'

export default function WalletComponent() {
  return (
    <>
      <div className='absolute right-16 top-14'>
        <CardContainer className='z-0'>
          <GeniusIDFlipCard
            first_name='Ram'
            last_name='Kumar'
            email='asf@gmail.com'
            dob='12/12/12'
            contact='1234567890'
            address='Bangalore'
          />
        </CardContainer>
      </div>
      <div className='h-60'></div>
      <div className='mt-12 overflow-auto'>
        <div className=''>
          <p>hasvk</p>
          {/* <p>hasvk</p>
            <p>hasvk</p>
            <p>hasvk</p>
            <p>hasvk</p>
            <p>hasvk</p>
            <p>hasvk</p>
            <p>hasvk</p>
            <p>hasvk</p>
            <p>hasvk</p> */}
        </div>

        <div className='rounded border border-blue-200'>
          <SubTabs />
        </div>
      </div>
    </>
  )
}
