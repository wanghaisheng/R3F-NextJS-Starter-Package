'use client'

import { motion } from 'framer-motion'

import { Avatar } from 'src/components/Avatar'

export default function AvatarComponent() {
  return (
    <div className='mt-2 flex flex-col items-center justify-center'>
      <div className='relative flex h-fit w-[68%] items-center justify-center rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex flex-col'>
          <div className='relative my-8 flex justify-center text-7xl drop-shadow'>My Avatars</div>

          <div className='mt-7 flex justify-between'>
            <Avatar
              modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0'
              // shadows
              animationSrc='/male-idle-3.fbx'
              style={{ background: 'rgb(9,20,26)', width: '400px', height: '300px' }}
              fov={40}
              cameraTarget={1.5}
              cameraInitialDistance={30}
              effects={{
                ambientOcclusion: true,
              }}
            />
            <div className='grid h-fit grid-cols-3 gap-4'>
              <div className='rounded-lg bg-white/20'>
                <img src='/aa.png' alt='' height='120px' width='120px' />
              </div>
              <div className='rounded-lg bg-white/20'>
                <img src='/aa.png' alt='' height='120px' width='120px' />
              </div>
              <div className='rounded-lg bg-white/20'>
                <img src='/aa.png' alt='' height='120px' width='120px' />
              </div>
            </div>
          </div>
          <div className='absolute bottom-6 right-4'>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='rounded-2xl border-2 p-2 text-white shadow-md '
              href='#'
            >
              Create New Avatar &emsp;&emsp; +
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  )
}
