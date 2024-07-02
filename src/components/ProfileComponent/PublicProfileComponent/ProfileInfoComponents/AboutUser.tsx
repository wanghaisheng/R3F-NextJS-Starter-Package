import { useUser } from '@/UserClientProvider'

export default function AboutUser({ userData }) {
  const { user } = useUser()

  return (
    <div>
      <div className='flex'>
        {userData.first_name} {userData.last_name}
        {user && user.username === userData.username && <button>Edit Profile</button>}
        <p className='text-xs'>Tick/Badge of the user membership</p>
      </div>
      <div>
        @{userData.username} ‧ <span className='text-lg font-semibold'>10</span> Followers ‧{' '}
        <span className='text-lg font-semibold'>0</span> Following
      </div>
      <div>{userData.description}</div>
      <div>links and no. + more</div>

      <div>Buttons</div>
    </div>
  )
}
