import Wallet from '@/components/card/TypeCard/Wallet'
import TopUpWalletTabs from './TopUpWalletTabs'
import { useUser } from '@/UserClientProvider'

export default function WalletComponent({ setActiveTab, setShowSignUp }) {
  const { user } = useUser()

  // handleSignUpClick is a function that sets the active tab to profile and shows the signup modal
  const handleSignUpClick = () => {
    setActiveTab('profile')
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

            <div className='mb-10'>
              <TopUpWalletTabs />
            </div>
          </>
        ) : (
          <>
            <div>You must signin to view this tab</div>
            <div
              onClick={handleSignUpClick}
              className='mt-2 flex cursor-pointer justify-center rounded border bg-black p-2 transition-colors hover:bg-gray-300 hover:text-black  dark:border-purple-700 dark:bg-purple-800/30 dark:hover:bg-purple-800/40 dark:hover:text-purple-200'
            >
              Signup
            </div>
          </>
        )}
      </div>
    </>
  )
}
