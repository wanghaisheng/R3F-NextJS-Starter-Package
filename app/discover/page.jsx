'use client'

import { useState, useEffect } from 'react'
import HomePage from '@/components/HomePage/HomePage'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const getUsers = async () => {
  try {
    const res = await axios.get('/api/public/users')
    if (res.status !== 200) {
      toast.error('Error fetching users')
      return []
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
    toast.error('Internal Server Error')
    return []
  }
}

const Discover = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [])

  return (
    <div>
      <HomePage users={users} />
    </div>
  )
}

export default Discover
