'use client'

import { useUser } from '@/context/UserContext/UserContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/loading'

const NavigateUser = () => {
  const { user } = useUser()
  const router = useRouter()
  const [userInfoStatus, setUserInfoStatus] = useState(false)

  useEffect(() => {
    const checkUserInfoStatus = () => {
      if (user.first_name && user.last_name && user.email && user.dob) {
        if (user.avatar.length !== 0 && user.guilds.length !== 0) {
          setUserInfoStatus(true)
        }
      }
    }
    if (user) {
      checkUserInfoStatus()
    }
  }, [user])

  useEffect(() => {
    const navigateBasedOnStatus = () => {
      if (!userInfoStatus) {
        router.push('/slider')
      } else {
        router.push('/hero')
      }
    }

    const timer = setTimeout(navigateBasedOnStatus, 1000) // 1000 milliseconds = 1 seconds

    // Cleanup the timer if the component unmounts before the timeout is done
    return () => clearTimeout(timer)
  }, [userInfoStatus, router])

  return <Loading />
}

export default NavigateUser
