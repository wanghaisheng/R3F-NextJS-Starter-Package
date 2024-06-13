'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@/context/UserContext/UserContext'
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false })
import axios from 'axios'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'

export default function ProfileComponent({ setShowSignUp, setActiveTab }) {
  const { user } = useUser()
  const [avatarsData, setAvatarsData] = useState([])
  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }

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

  const [description, setDescription] = useState(user ? user.description : '')
  const [imageUrls, setImageUrls] = useState([])
  const [files, setFiles] = useState([])

  const handleChangeEvent = (items) => {
    const successfulFiles = items.allEntries.filter((file) => file.status === 'success')
    setFiles(successfulFiles)
    const imageUrls = successfulFiles.map((file) => file.cdnUrl) // Extract cdnUrls
    setImageUrls(imageUrls) // Update cdnUrls state
  }

  useEffect(() => {
    const saveImage = () => {
      handleImgUpdate(imageUrls[imageUrls.length - 1])
    }
    if (imageUrls.length !== 0) {
      saveImage()
    }
  }, [imageUrls])

  function handelDescriptionChange(newDescription: string) {
    setDescription(newDescription)
  }

  useEffect(() => {
    console.log(imageUrls[imageUrls.length - 1])
  }, [imageUrls])

  const handleImgUpdate = async (image_url) => {
    const submit = {
      image_url: image_url,
    }
    try {
      await axios({
        url: `/api/internal/users/${user.gg_id}`,
        method: 'put',
        data: submit,
      })
      toast.success('Profile pic and bio updated successfully!')
    } catch (error) {
      toast.error('Error updating profile pic and bio!')
    }
  }
  const handleBioUpdate = async (e) => {
    e.preventDefault()
    const submit = {
      description: description,
    }
    try {
      await axios({
        url: `/api/internal/users/${user.gg_id}`,
        method: 'put',
        data: submit,
      })
      toast.success('Profile pic and bio updated successfully!')
    } catch (error) {
      toast.error('Error updating profile pic and bio!')
    }
  }

  return (
    <div className='mb-32 flex h-full flex-col'>
      {user ? (
        <div className='flex-1 items-center justify-center rounded-lg bg-black p-3 text-white'>
          <p className='flex items-center justify-center overflow-hidden whitespace-nowrap text-8xl font-bold uppercase'>
            {user.first_name} {user.last_name}!
          </p>
          <Image
            src={
              imageUrls.length !== 0
                ? imageUrls[imageUrls.length - 1]
                : user.image_urls
                  ? user.image_urls[user.image_urls.length - 1]
                  : ''
            }
            alt='porfilepic'
            height={30}
            width={30}
            unoptimized
          />

          <div className='absolute left-0 top-5 z-10 h-[360px] w-full'>
            {avatarsData && avatarsData.length !== 0 ? (
              <Avatar
                modelSrc={`${avatarsData.slice(-1)[0].avatar_url}`}
                shadows
                animationSrc='/male-spawn-animation.fbx'
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
                modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=1024&pose=A&useHands=true'
                shadows
                animationSrc='/male-idle-3.fbx'
                style={{ background: 'rgb(9,20,26)', pointerEvents: 'none' }}
                fov={40}
                cameraTarget={1.5}
                cameraInitialDistance={30}
                effects={{
                  ambientOcclusion: true,
                }}
              />
            )}
          </div>
          <div className='flex justify-between gap-x-10'>
            <div>
              <p>Bio: {description}</p>
            </div>
            <div>Heo</div>
          </div>
          <p>Other details</p>
          <p>Form to add profile pic and bio</p>
          <form onSubmit={handleBioUpdate} className='mt-32'>
            <FileUploaderRegular
              onChange={handleChangeEvent}
              pubkey={'aff2bf9d09cde0f92516'}
              maxLocalFileSizeBytes={10000000}
              imgOnly={true}
              sourceList='local, url, camera'
            />
            <input
              type='text'
              name='bio'
              id='bio'
              placeholder='Bio'
              value={description}
              className='text-black'
              onChange={(e) => handelDescriptionChange(e.target.value)}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      ) : (
        <>
          <div>You must sign in to view this tab</div>
          <div
            onClick={handleSignUpClick}
            className='mt-2 flex cursor-pointer justify-center rounded border border-purple-700 bg-purple-800/30 p-2 transition-colors hover:bg-purple-800/40 hover:text-purple-200'
          >
            Signup
          </div>
        </>
      )}
    </div>
  )
}
