'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Cookies from 'js-cookie'

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
      const { data: userData } = await axios.get(`/api/internal/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    Cookies.set('token', '', { expires: new Date(0) })
    setUser(null)
  }

  return <UserContext.Provider value={{ user, updateUser, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
