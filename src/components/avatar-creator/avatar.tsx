'use client'
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@/context/UserContext/UserContext'
const config: AvatarCreatorConfig = {
  clearCache: false,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
}
export default function App() {
  const [avatarUrl, setAvatarUrl] = useState('')
  const { user } = useUser()
  const router = useRouter()
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    setAvatarUrl(event.data.url)
  }
  useEffect(() => {
    const createAvatar = async () => {
      const submit = {
        avatar_url: avatarUrl,
        gg_id: user.gg_id,
      }
      console.log('Submit: ', submit)
      try {
        const { data } = await axios({
          url: '/api/internal/avatar',
          method: 'POST',
          data: submit,
        })
        console.log('Response:', data)
        enqueueSnackbar('Avatar Created Sucessfully', {
          autoHideDuration: 2000,
          variant: 'success',
        })
      } catch (error) {
        console.log('Error: ', error)
        enqueueSnackbar('Failed to create the avatar', {
          autoHideDuration: 2000,
          variant: 'error',
        })
      }
    }
    if (user && avatarUrl !== '') {
      createAvatar()
    }
  }, [avatarUrl])
  return (
    <>
      <AvatarCreator
        subdomain='gguser'
        config={config}
        className='-ml-4 size-full rounded-lg border-none lg:ml-0'
        onAvatarExported={handleOnAvatarExported}
      />
    </>
  )
}
