import GeniusIDFlipCard from '@/components/card/GeniusIDFlipCard'
import { CardContainer } from '@/components/card/card'
import SubTabs from './SubTabs'

export default function WalletComponent() {
  return (
    <>
      <div className='md:absolute md:right-16 md:top-14'>
        <CardContainer>
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
      <div className='md:h-60'></div>
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

        <div className='mb-10 rounded border border-blue-200'>
          <SubTabs />
        </div>
      </div>
    </>
  )
}
