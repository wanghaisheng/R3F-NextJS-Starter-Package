'use client'

import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

const UserClientProvider = ({ children, user: initialUser }) => {
  const [user, setUser] = useState(initialUser)

  const updateUser = (token) => {
    const decoded = jwtDecode(token)
    fetchUserData(decoded.id, token)
  }

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`https://r3-f-next-js-starter-package.vercel.app/api/internal/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
  }

  return <UserContext.Provider value={{ user, updateUser, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
export default UserClientProvider
