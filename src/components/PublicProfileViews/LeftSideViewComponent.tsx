import { useUser } from '@/UserClientProvider'
import { useEffect, useState } from 'react'
import { Avatar } from '../Avatar'
import useUserAndGuildData from '../CustomHooks/useUserAndGuildData'

interface LeftSideViewComponentProps {
  emote: string | null
}

export default function LeftSideViewComponent({ emote: parentEmote }: LeftSideViewComponentProps) {
  const { user } = useUser()
  const { users, guilds } = useUserAndGuildData()
  const [fetchedData, setFetchedData] = useState([])
  const [currentEmote, setCurrentEmote] = useState('/male-idle-3.fbx')
  const loggedin_user_avatar = user?.avatar.length > 0 ? user.avatar[user.avatar.length - 1].avatar_url : ''

  useEffect(() => {
    if (parentEmote) {
      setCurrentEmote(parentEmote)
    }
  }, [parentEmote])

  return (
    <>
      {user?.username !== fetchedData[0]?.username && (
        <>
          {loggedin_user_avatar && (
            <div className='size-full'>
              <ambientLight />
              <pointLight position={[0, 20, 10]} intensity={15} />
              <Avatar
                modelSrc={`${loggedin_user_avatar}?quality=low`}
                animationSrc={currentEmote}
                fov={50}
                cameraTarget={1.5}
                cameraInitialDistance={10}
                effects={{
                  ambientOcclusion: false,
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}
