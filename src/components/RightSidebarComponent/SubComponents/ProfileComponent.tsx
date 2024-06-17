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
import GeniusID from '@/components/card/GeniusID'

export default function ProfileComponent({ setShowSignUp, setActiveTab }) {
  const { user } = useUser()
  const [phone_number, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')
  const [regionStatus, setRegionStatus] = useState(false)
  const [geoLocationInfo, setGeoLocationInfo] = useState({
    ip: '',
    city: '',
    country: '',
    continent_code: '',
    latitude: '',
    longitude: '',
  })

  const [avatarsData, setAvatarsData] = useState([])
  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }

  useEffect(() => {
    const setUserInfo = () => {
      setPhoneNumber(user.phone_number ? user.phone_number : '')
      setDob(user.dob ? user.dob : '')
      setGeoLocationInfo(user.region)
    }
    if (user) {
      setUserInfo()
    }
  }, [user])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const submit = {
      phone_number,
      dob,
      region:
        geoLocationInfo.ip !== ''
          ? {
              ip: geoLocationInfo.ip,
              city: geoLocationInfo.city,
              country: geoLocationInfo.country,
              continent_code: geoLocationInfo.continent_code,
              latitude: geoLocationInfo.latitude,
              longitude: geoLocationInfo.longitude,
            }
          : {
              ip: '',
              city: '',
              country: '',
              continent_code: '',
              latitude: '',
              longitude: '',
            },
    }
    try {
      await axios({
        url: `/api/internal/users/${user.gg_id}`,
        method: 'put',
        data: submit,
      })
      toast.success('Successfully updated!')
    } catch (error) {
      toast.error('Update failed!')
    }
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

  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber)
  }
  const handleDOBChange = (newDob: string) => {
    setDob(newDob)
  }

  const handleRegionStatus = async (value: boolean) => {
    setRegionStatus(value)
    if (value === true) {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      const isConfirmed = window.confirm('Do you want to share the location via your IP?')
      if (isConfirmed) {
        setGeoLocationInfo(data)
      } else {
        return
      }
    } else if (value === false) {
      setGeoLocationInfo({
        ip: '',
        city: '',
        country: '',
        continent_code: '',
        latitude: '',
        longitude: '',
      })
    }
  }

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
    <div className='mb-20 flex h-full flex-col pb-20'>
      {user ? (
        <div className='flex-1 items-center justify-center rounded-lg bg-black/40 p-3 text-white'>
          <div className='h-[170px] w-full rounded'>
            <Image
              src={
                imageUrls.length !== 0
                  ? imageUrls[imageUrls.length - 1]
                  : user.image_urls
                    ? user.image_urls[user.image_urls.length - 1]
                    : ''
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
                className='w-fit rounded-lg bg-white p-1'
              />
            </div>
          </form>

          <div className='flex flex-col'>
            <div className='mt-2 flex justify-center '>
              <GeniusID dob={dob} contact={phone_number} />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
          >
            <div className='flex w-full flex-col gap-y-2 px-4  text-purple-200'>
              <div className='flex flex-col'>
                <label htmlFor='' className='font-semibold'>
                  Contact
                </label>

                <input
                  type='text'
                  value={phone_number}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  placeholder='Phone Number'
                  className='rounded-md bg-white/20 px-3'
                  aria-label='Phone Number'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='' className='font-semibold'>
                  DOB
                </label>

                <input
                  type='date'
                  value={dob}
                  onChange={(e) => handleDOBChange(e.target.value)}
                  className='rounded-md bg-white/20 px-3'
                  required
                  aria-label='Date of Birth'
                />
              </div>
              <div className='flex'>
                <label htmlFor='' className='font-semibold'>
                  Region
                </label>

                <input
                  type='checkbox'
                  checked={regionStatus}
                  onChange={(e) => handleRegionStatus(e.target.checked)}
                  className='ml-10 flex size-5 justify-start'
                  aria-label='region status'
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
            </div>

            <div className='mb-20'>
              <button
                className='rounded-full bg-black transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                type='submit'
                aria-label='next'
              >
                <p className='p-4'>DONE</p>
              </button>
            </div>
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
