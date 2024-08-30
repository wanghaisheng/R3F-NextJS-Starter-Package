'use client'

import dynamic from 'next/dynamic'
import ExpressionBottomMidHud from '../GGHuds/ExpressionBottomMidHud'
import { useState } from 'react'

const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })

// Expressions
const expressions = [
  { label: 'neutral', icon: '/emojis/neutral.svg', bg: '#FFFFFF', animation: '/sillydance.fbx' },
  { label: 'sad', icon: '/emojis/sad.svg', bg: '#0C2E5C', animation: '/flair.fbx' },
  { label: 'happy', icon: '/emojis/happy.svg', bg: '#007F13', animation: '/moonwalk.fbx' },
  { label: 'amazed', icon: '/emojis/amazed.svg', bg: '#F8BF43', animation: '/Flip Kick 2.fbx' },
  { label: 'angry', icon: '/emojis/angry.svg', bg: '#A20325', animation: '/Swimming.fbx' },
  { label: 'angry', icon: '/emojis/angry.svg', bg: '#A20325', animation: '/hang.fbx' },
]

export default function AvatarAnimTest() {
  const [emote, setEmote] = useState('/fly.fbx')

  const handleEmote = (emote) => {
    setEmote(emote)
  }

  return (
    <div className='relative mt-20 flex flex-col lg:size-full'>
      <div className='absolute top-[40%] flex h-[360px] w-full items-center justify-center lg:relative lg:h-[600px]'>
        <Avatar
          modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
          shadows
          animationSrc={emote}
          style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
          fov={30}
          cameraTarget={1}
          cameraInitialDistance={30}
          effects={{
            ambientOcclusion: true,
          }}
        />
      </div>

      <ExpressionBottomMidHud expressions={expressions} handleEmote={handleEmote} />
    </div>
  )
}
