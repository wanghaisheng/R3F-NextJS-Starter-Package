import PublicProfile from '@/components/ProfileComponent/PublicProfile'
import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'

export default function PublicProfileView({ params }) {
  const username = params.username
  return (
    <div className=''>
      <PublicProfile username={username} />
      <GalleryComponent username={username} />
    </div>
  )
}
