import Wallet from '@/components/card/TypeCard/Wallet'
import TopUpWalletTabs from './TopUpWalletTabs'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider'

export default function WalletComponent({ setActiveTab, setShowSignUp }) {
  const { user } = useUser()

  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }

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
            <hr className=' border-t-2 border-purple-700 transition-colors hover:border-purple-400' />

            <div className='mb-10'>
              <TopUpWalletTabs />
            </div>
          </>
        ) : (
          <>
            <div>You must signin to view this tab</div>
            <div
              onClick={handleSignUpClick}
              className='mt-2 flex cursor-pointer justify-center rounded border border-purple-700 bg-purple-800/30 p-2 transition-colors hover:bg-purple-800/40 hover:text-purple-200'
            >
              Signup
            </div>
          </>
        )}
      </div>
    </>
  )
}
