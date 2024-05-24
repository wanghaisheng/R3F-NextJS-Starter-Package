'use client'
import { AvatarCreator, AvatarCreatorConfig, AvatarExportedEvent } from '@readyplayerme/react-avatar-creator'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
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
  const router = useRouter()
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    // router.push('/slider')
    setAvatarUrl(event.data.url)
  }

  // const { log } = console
  // const { user } = useUser()
  // const userId = user.gg_id
  // console.log(avatarUrl)
  // console.log(user)

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const submit = {
  //     avatarUrl,
  //   }

  //   log('Submit: ', submit)

  //   try {
  //     const { data } = await axios({
  //       url: `/api/internal/avatar/${userId}`,
  //       method: 'PUT',
  //       data: submit,
  //     })
  //     log('Response:', data)
  //   } catch (error) {
  //     log('Error: ', error)
  //   }
  // }

  return (
    <>
      <AvatarCreator
        subdomain='gguser'
        config={config}
        className='-ml-4 h-[127vh] w-[107%] rounded-lg border-none lg:ml-0 lg:h-[65vh] lg:w-full'
        onAvatarExported={handleOnAvatarExported}
      />
    </>
  )
}
