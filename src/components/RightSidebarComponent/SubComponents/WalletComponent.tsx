import GeniusIDFlipCard from '@/components/card/GeniusIDFlipCard'
import { CardContainer } from '@/components/card/card'
import SubTabs from './SubTabs'

export default function WalletComponent() {
  return (
    <>
      <div className='px-2 md:absolute md:right-12 md:top-14'>
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
      <div className='mb-4 mt-0 h-20 bg-blue-300 md:mt-52'>
        <h1 className='text-lg font-semibold text-white'>Wallet</h1>
      </div>
      <hr />
      <div className='mb-10'>
        <SubTabs />
      </div>
    </>
  )
}
