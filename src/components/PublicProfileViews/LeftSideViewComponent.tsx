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
  const [avatarsData, setAvatarsData] = useState([])

  useEffect(() => {
    const fetchAvatarsData = async () => {
      try {
        setAvatarsData(user.avatar)
      } catch (error) {
        console.log('Error fetching avatars data:', error)
      }
    }
    if (user) {
      fetchAvatarsData() // Fetch data only if user is available
    }
  }, [user])
  useEffect(() => {
    if (parentEmote) {
      setCurrentEmote(parentEmote)
    }
  }, [parentEmote])

  return (
    <>
      {avatarsData && avatarsData.length !== 0 ? (
        <Avatar
          modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
          shadows
          animationSrc={currentEmote}
          style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
          fov={40}
          cameraTarget={1.5}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      ) : (
        <Avatar
          modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
          shadows
          animationSrc={currentEmote}
          style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
          fov={40}
          cameraTarget={1.5}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      )}
    </>
  )
}
