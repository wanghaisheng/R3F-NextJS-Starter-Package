'use client'

import HomePage from '@/components/HomePage/HomePage'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const getUsers = async () => {
  try {
    const res = await axios.get('/api/public/users')
    if (res.status !== 200) {
      toast.error('error fetching users')
    }
    const users = res.data.filter(
      (user) =>
        user.first_name &&
        user.last_name &&
        user.username &&
        user.email &&
        user.region.ip &&
        user.avatar.length !== 0 &&
        user.guild_id,
    )
    return users
  } catch (error) {
    toast.error('Interal Server Error')
  }
}

export default async function Avatars() {
  const users = await getUsers()
  return (
    <div>
      <HomePage users={users} />
    </div>
  )
}
