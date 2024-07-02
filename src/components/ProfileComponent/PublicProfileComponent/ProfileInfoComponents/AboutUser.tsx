export default function AboutUser({ userData }) {
  return (
    <div>
      <div>
        {userData.first_name} {userData.last_name}
        <button>Edit Profile</button>
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
