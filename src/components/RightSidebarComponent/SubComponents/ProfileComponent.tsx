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
import { RiGalleryFill } from 'react-icons/ri'
import { GiRamProfile } from 'react-icons/gi'

export default function ProfileComponent({ setShowSignUp, setActiveTab }) {
  const { user } = useUser()

  const [form, setForm] = useState({
    username: user?.username || '',
    phone_number: user?.phone_number || '',
    dob: user?.dob || '',
    description: user?.description || '',
    region: user?.region || {
      ip: '',
      city: '',
      country: '',
      continent_code: '',
      latitude: '',
      longitude: '',
    },
    image_urls: user?.image_urls || [],
  })

  const [regionStatus, setRegionStatus] = useState(false)
  const [avatarsData, setAvatarsData] = useState(user?.avatar || [])
  const [files, setFiles] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleRegionStatus = async (value) => {
    setRegionStatus(value)
    if (value) {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      if (window.confirm('Do you want to share the location via your IP?')) {
        setForm((prevForm) => ({
          ...prevForm,
          region: data,
        }))
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        region: {
          ip: '',
          city: '',
          country: '',
          continent_code: '',
          latitude: '',
          longitude: '',
        },
      }))
    }
  }

  const handleImageChange = (items) => {
    const successfulFiles = items.allEntries.filter((file) => file.status === 'success')
    setFiles(successfulFiles)
    const imageUrls = successfulFiles.map((file) => file.cdnUrl)
    setForm((prevForm) => ({
      ...prevForm,
      image_urls: imageUrls,
    }))
  }

  useEffect(() => {
    if (files.length) {
      const imageUrl = form.image_urls[form.image_urls.length - 1]
      handleImgUpdate(imageUrl)
    }
  }, [files])

  const handleImgUpdate = async (image_url) => {
    try {
      await axios.put(`/api/internal/users/${user.gg_id}`, { image_url })
      toast.success('Profile pic updated successfully!')
    } catch (error) {
      toast.error('Error updating profile pic!')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitData = {
      username: form.username,
      phone_number: form.phone_number,
      dob: form.dob,
      description: form.description,
      region: form.region.ip
        ? form.region
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
      await axios.put(`/api/internal/users/${user.gg_id}`, submitData)
      toast.success('Successfully updated!')
    } catch (error) {
      toast.error('Update failed!')
    }
  }

  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }

  return (
    <div className='flex h-full flex-col overflow-hidden pb-8'>
      {user ? (
        <div className='h-full flex-1 items-center justify-center overflow-auto rounded-lg bg-black/40 p-3 text-white'>
          <div className='relative h-[170px] w-full overflow-hidden rounded'>
            <Image
              src={
                form.image_urls.length
                  ? form.image_urls[form.image_urls.length - 1]
                  : user.image_urls?.[user.image_urls.length - 1] || '/card/defaultbuddha.svg'
              }
              alt='porfilepic'
              height={170}
              width={500}
              unoptimized
              className='rounded'
            />
            <p className='absolute bottom-2 flex justify-center overflow-hidden text-wrap pt-2'>
              <span className='text-sm font-semibold text-pink-300'>{form.description}</span>
            </p>
          </div>
          <div className='mb-3 mt-0 flex items-center justify-center overflow-hidden whitespace-nowrap text-5xl font-bold uppercase'>
            {user.username}
          </div>

          <div className='z-10 mt-[-250px] h-[360px] w-full'>
            {avatarsData && avatarsData.length !== 0 ? (
              <Avatar
                modelSrc={`${avatarsData.slice(-1)[0].avatar_url}?textureQuality=low`}
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
                modelSrc='https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=1024&pose=A&useHands=true?textureQuality=low'
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

          <div className='-mt-5 flex justify-center '>
            <GeniusID dob={form.dob} contact={form.phone_number} />
          </div>

          <form
            onSubmit={handleSubmit}
            className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
          >
            <div className='flex w-full flex-col gap-y-2 px-4  text-purple-200'>
              <div className='flex flex-col'>
                <label htmlFor='description' className='font-semibold'>
                  USERNAME
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='Username'
                  value={form.username}
                  className='rounded-md bg-white/20 px-3'
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='description' className='font-semibold'>
                  BIO
                </label>
                <input
                  type='text'
                  name='description'
                  id='bio'
                  placeholder='Bio'
                  value={form.description}
                  className='rounded-md bg-white/20 px-3'
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='phone_number' className='font-semibold'>
                  Contact
                </label>

                <input
                  type='text'
                  name='phone_number'
                  value={form.phone_number}
                  onChange={handleInputChange}
                  placeholder='Phone Number'
                  className='rounded-md bg-white/20 px-3'
                  aria-label='Phone Number'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='dob' className='font-semibold'>
                  DOB
                </label>

                <input
                  type='date'
                  name='dob'
                  value={form.dob}
                  onChange={handleInputChange}
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
                  id='region_status'
                  checked={regionStatus}
                  onChange={(e) => handleRegionStatus(e.target.checked)}
                  className='ml-2 flex size-5 items-center justify-start'
                  aria-label='region status'
                />
              </div>
              <div className='flex items-center justify-between gap-x-2'>
                <label htmlFor='profile_picture' className='whitespace-nowrap font-semibold'>
                  Profile Picture
                </label>
                <div className='my-2 flex w-full items-center justify-center'>
                  <FileUploaderRegular
                    onChange={handleImageChange}
                    pubkey={'aff2bf9d09cde0f92516'}
                    maxLocalFileSizeBytes={10000000}
                    imgOnly={true}
                    sourceList='local, url, camera'
                    className='flex w-full justify-center rounded-lg bg-white'
                  />
                </div>
              </div>
            </div>

            <div className='mt-4'>
              <button
                className='flex w-fit items-center justify-center rounded border border-purple-700 bg-purple-950/20 transition-all
            ease-in-out hover:border-purple-500'
                type='submit'
                aria-label='next'
              >
                <p className='px-4 py-1'>DONE</p>
              </button>
            </div>
          </form>
          <div className='flex items-center justify-center gap-x-2'>
            <Link
              href={`/public-profile/${user.username}`}
              className='mt-2 flex w-fit items-center justify-center rounded border border-purple-700 bg-purple-950/20 p-2 transition-all
            ease-in-out hover:border-purple-500'
            >
              <GiRamProfile />
            </Link>
            <div
              onClick={setActiveTab.bind(this, 'gallery')}
              className='mt-2 flex w-fit cursor-pointer items-center justify-center rounded border border-purple-700 bg-purple-950/20 p-2 transition-all
            ease-in-out hover:border-purple-500'
            >
              <RiGalleryFill />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>You must sign In to view this tab</div>
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
