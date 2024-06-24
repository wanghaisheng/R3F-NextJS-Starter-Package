'use client'
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider' //----------------> module not found error in my branch
import toast from 'react-hot-toast'

const config: AvatarCreatorConfig = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
}

// const editConfig: AvatarCreatorConfig = {
//   clearCache: false,
//   bodyType: 'fullbody',
//   quickStart: false,
//   language: 'en',
//   avatarId: '',
// }

export default function App() {
  const [avatarUrl, setAvatarUrl] = useState('')
  const { user } = useUser()

  // const [id, setId] = useState('')
  // useEffect(() => {
  //   setId(avatarId)
  // }, [avatarId])

  // editConfig.avatarId = id

  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    console.log(event.data.avatarId)
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
        await axios({
          url: '/api/internal/avatar',
          method: 'POST',
          data: submit,
        })
        toast.success('Avatar Created Sucessfully')
      } catch (error) {
        console.error('Error: ', error)
        toast.error('Failed to create the avatar')
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
