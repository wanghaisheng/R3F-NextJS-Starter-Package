import PublicProfile from '@/components/ProfileComponent/PublicProfile'

export default function PublicProfileView({ params }) {
  const username = params.username
  return (
    <div className=''>
      <PublicProfile username={username} />
    </div>
  )
}
