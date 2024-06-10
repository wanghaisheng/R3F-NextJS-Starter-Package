import Wallet from '@/components/card/TypeCard/Wallet'
import { CardContainer } from '@/components/card/card'
import TopUpWalletTabs from './TopUpWalletTabs'
import { useUser } from '@/context/UserContext/UserContext'

export default function WalletComponent() {
  const { user } = useUser()

  return (
    <>
      <div className='relative -mt-3 px-2'>
        {user ? (
          <Wallet
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            dob={user.dob}
            contact={user.phone_number}
            address={user.address}
            balance='9076400'
          />
        ) : (
          <div>Signup</div>
        )}
      </div>
      <div className='mt-8'>
        <h1 className='text-lg font-semibold text-white'>Wallet</h1>
      </div>
      <hr />

      <div className='mb-10'>
        <TopUpWalletTabs />
      </div>
    </>
  )
}
