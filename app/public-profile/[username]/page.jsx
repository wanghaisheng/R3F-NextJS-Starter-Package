import PublicProfile from '@/components/ProfileComponent/PublicProfile'

export default function PublicProfileView({ params }) {
  const username = params.username
  return (
    <>
      <PublicProfile username={username} />
    </>
  )
}
