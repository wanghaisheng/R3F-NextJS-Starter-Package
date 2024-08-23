import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

import UserClientProvider from './UserClientProvider.js'

const fetchUserData = async (userId, token) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${apiUrl}/api/internal/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    next: { tags: ['user'] },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return await response.json()
}

const UserProvider = async ({ children }) => {
  const token = cookies().get('token')
  let user = null

  if (token) {
    try {
      const decoded = jwtDecode(token.value)
      user = await fetchUserData(decoded.id, token.value)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return <UserClientProvider user={user}>{children}</UserClientProvider>
}

export default UserProvider
