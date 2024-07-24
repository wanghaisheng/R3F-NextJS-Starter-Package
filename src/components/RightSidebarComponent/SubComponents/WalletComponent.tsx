import Wallet from '@/components/card/TypeCard/Wallet'
import TopUpWalletTabs from './TopUpWalletTabs'
import { useUser } from '@/UserClientProvider'

export default function WalletComponent({ onSignInClick }) {
  const { user } = useUser()

  return (
    <>
      <div className='relative -mt-3 px-2'>
        {user ? (
          <>
            <Wallet
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
              dob={user.dob}
              contact={user.phone_number}
              address={user.address}
              balance='9076400'
            />
            <div className='mt-8'>
              <h1 className='text-lg font-semibold text-white'>Wallet</h1>
            </div>

            <div className='mb-10'>
              <TopUpWalletTabs />
            </div>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center'>
            <p className='mb-4 text-lg text-gray-700'>Please sign in to view your wallet.</p>
            <button
              onClick={onSignInClick}
              className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </>
  )
}
