import PublicProfile from '@/components/ProfileComponent/PublicProfile'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function PublicProfileView({ params }) {
  const username = params.username
  return (
    <div className=''>
      <PublicProfile username={username} />
    </div>
  )
}
