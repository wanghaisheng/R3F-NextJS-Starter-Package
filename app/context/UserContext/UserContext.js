'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { unstable_cache } from 'next/cache'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const decoded = jwtDecode(token)
      fetchUserData(decoded.id, token)
    }
  }, [])

  const fetchUserData = async (userId, token) => {
    try {
      const response = await fetch(`/api/internal/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Add this header if required
        },
        next: {
          tags: ['user'],
        },
      })
      if (!response.ok) {
        // Handle the error if the response is not successful (status not in the range 200-299)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const updateUser = (token) => {
    const decoded = jwtDecode(token)
    fetchUserData(decoded.id, token)
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
  }

  return <UserContext.Provider value={{ user, updateUser, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)

// export const revalidateUser = unstable_cache(
//   async (userId, token) =>
//     await fetch(`/api/internal/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json', // Add this header if required
//       },
//       next: {
//         tags: ['user'],
//       },
//     }),
//   ['my-app-user'],
// )

// 'use client'
// import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
// import { jwtDecode } from 'jwt-decode'
// import axios from 'axios'
// import Cookies from 'js-cookie'

// const UserContext = createContext()

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     const token = Cookies.get('token')
//     if (token) {
//       try {
//         const decoded = jwtDecode(token)
//         fetchUserData(decoded.id, token)
//       } catch (error) {
//         console.error('Error decoding token:', error)
//       }
//     }
//   }, [])

//   const fetchUserData = useCallback(async (userId, token) => {
//     try {
//       const { data: userData } = await axios.get(`/api/internal/users/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       setUser(userData)
//     } catch (error) {
//       console.error('Error fetching user data:', error)
//     }
//   }, [])

//   const updateUser = useCallback(
//     (token) => {
//       try {
//         const decoded = jwtDecode(token)
//         fetchUserData(decoded.id, token)
//       } catch (error) {
//         console.error('Error decoding token:', error)
//       }
//     },
//     [fetchUserData],
//   )

//   const logout = useCallback(() => {
//     Cookies.remove('token')
//     setUser(null)
//   }, [])

//   const contextValue = useMemo(
//     () => ({
//       user,
//       updateUser,
//       logout,
//     }),
//     [user, updateUser, logout],
//   )

//   return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
// }

// export const useUser = () => useContext(UserContext)
