import PublicProfile from '@/components/ProfileComponent/PublicProfile'
import axios from 'axios'
import toast from 'react-hot-toast'

const getSelectedPublicUser = async () => {
  try {
    const res = await axios.get(``)
  } catch (error) {}
}

export default function PublicProfileView({ params }) {
  const username = params.username
  return (
    <div className=''>
      <PublicProfile username={username} />
    </div>
  )
}
