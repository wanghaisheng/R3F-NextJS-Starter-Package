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
import Link from 'next/link'

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

  let profileImage = imageUrls.length !== 0 ? imageUrls[imageUrls.length - 1] : ''

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
      toast.success('Profile pic updated successfully!')
    } catch (error) {
      toast.error('Error updating profile pic!')
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
      toast.success('Bio updated successfully!')
    } catch (error) {
      toast.error('Error updating bio!')
    }
  }

  return (
    <div className='mb-20 flex h-full flex-col'>
      {user ? (
        <div className='flex-1 items-center justify-center rounded-lg bg-black/40 p-3 text-white'>
          <div className='h-[170px] w-full rounded'>
            <Image
              src={
                profileImage !== '' ? profileImage : user.image_urls ? user.image_urls[user.image_urls.length - 1] : ''
              }
              alt='porfilepic'
              height={170}
              width={500}
              unoptimized
              className='rounded'
            />
          </div>
          <p className='my-3 flex items-center justify-center overflow-hidden whitespace-nowrap text-5xl font-bold uppercase'>
            {user.username}
          </p>

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
          <div className='flex h-16 justify-center gap-x-10 overflow-auto pt-2'>
            <span className='text-lg font-semibold text-blue-400'>{description}</span>
          </div>
          <form onSubmit={handleBioUpdate}>
            <div className='my-2 flex w-full items-center justify-center'>
              <FileUploaderRegular
                onChange={handleChangeEvent}
                pubkey={'aff2bf9d09cde0f92516'}
                maxLocalFileSizeBytes={10000000}
                imgOnly={true}
                sourceList='local, url, camera'
                className='w-fit rounded-lg bg-black p-1'
              />
            </div>
            <div className='flex items-center  gap-x-2'>
              <label htmlFor='bio' className='text-xl font-bold'>
                Bio
              </label>
              <input
                type='text'
                name='bio'
                id='bio'
                placeholder='Bio'
                value={description}
                className='mt-2 w-full rounded-lg border border-white bg-black p-2 text-white'
                onChange={(e) => handelDescriptionChange(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='mt-2 flex w-full items-center justify-center rounded border border-purple-700 bg-purple-950/20 p-2 transition-all
             ease-in-out hover:border-purple-500'
            >
              Submit
            </button>
          </form>

          <Link
            href={`/public-profile/${user.username}`}
            className='mt-2 flex w-full items-center justify-center rounded border border-purple-700 bg-purple-950/20 p-2 transition-all
             ease-in-out hover:border-purple-500'
          >
            View Public Profile
          </Link>
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
