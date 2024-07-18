'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider' //----------------> module not found error in my branch
const Avatar = dynamic(() => import('@/components/Avatar').then((mod) => mod.Avatar), { ssr: false }) //----------------> module not found error in my branch
import axios from 'axios'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { FileUploaderRegular } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'
import GeniusID from '@/components/card/GeniusID' //----------------> module not found error in my branch
import { revalidateUser } from 'lib/actions'
import Cookies from 'js-cookie'
import { IoChevronBack } from 'react-icons/io5'

// async function getAllFaculties() {
//   try {
//     const res = await fetch('/api/internal/faculties/all-faculties')
//     if (!res.ok) {
//       throw new Error(`failded to fetch faculties`)
//     }
//     return res.json()
//   } catch (error) {
//     console.error('Internal server error')
//   }
// }
// async function getGuildFaculty() {
//   try {
//     const res = await fetch('/api/internal/faculties/guild-faculty')
//     if (!res.ok) {
//       throw new Error(`failded to fetch faculties`)
//     }
//     return res.json()
//   } catch (error) {
//     console.error('Internal server error')
//   }
// }

export default function ProfileComponent({ setShowSignUp, setActiveTab }) {
  const { user, updateUser } = useUser()
  const token = Cookies.get('token')
  const [showForm, setShowForm] = useState(false)

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
    cover_images: user?.cover_images || [],
  })

  const [regionStatus, setRegionStatus] = useState(false)
  const [avatarsData, setAvatarsData] = useState(user?.avatar || [])

  // const [primaryFaculty, setPrimaryFaculty] = useState('')
  // const [optionalFaculty, setOptionalFaculty] = useState('')
  // const [guild_faculty, setGuild_Faculty] = useState([])
  // const [faculties, setFaculties] = useState([])

  //get all faculties
  // useEffect(() => {
  //   const fetchFaculties = async () => {
  //     const faculties = await getAllFaculties()
  //     setFaculties(faculties)
  //   }
  //   fetchFaculties()
  // }, [])

  // //get guild based faculties
  // useEffect(() => {
  //   const fetchGuildFaculty = async () => {
  //     const guild_faculty = await getAllFaculties()
  //     setFaculties(guild_faculty)
  //   }
  //   fetchGuildFaculty()
  // }, [])

  // useEffect(() => {
  //   console.log(faculties)
  // }, [faculties])

  // useEffect(() => {
  //   console.log(guild_faculty)
  // }, [guild_faculty])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  // Check if user has region data and set region status accordingly
  useEffect(() => {
    if (user && user.region && user.region.ip) {
      setRegionStatus(true)
    }
  }, [user])

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

  const handleImageChange = (type) => (items) => {
    const successfulFiles = items.allEntries.filter((file) => file.status === 'success')
    const imageUrls = successfulFiles.map((file) => file.cdnUrl)
    if (type === 'profile') {
      setForm((prevForm) => ({
        ...prevForm,
        image_urls: imageUrls,
      }))
      if (imageUrls && imageUrls.length > 0) {
        handleProfileImgUpdate(imageUrls[imageUrls.length - 1])
      }
    } else if (type === 'cover') {
      setForm((prevForm) => ({
        ...prevForm,
        cover_images: imageUrls,
      }))
      if (imageUrls && imageUrls.length > 0) {
        handleCoverImgUpdate(imageUrls[imageUrls.length - 1])
      }
    }
  }

  const handleProfileImgUpdate = async (image_url) => {
    try {
      await axios.put(`/api/internal/users/${user.gg_id}`, { image_url: image_url })
      setForm((prevForm) => ({
        ...prevForm,
        image_urls: [...user.image_urls, image_url],
      }))
      updateUser(token)
      toast.success('Profile pic updated successfully!')
    } catch (error) {
      toast.error('Error updating profile pic!')
    }
  }

  const handleCoverImgUpdate = async (image_url) => {
    try {
      await axios.put(`/api/internal/users/${user.gg_id}`, { cover_image: image_url })
      setForm((prevForm) => ({
        ...prevForm,
        cover_images: [...user.cover_images, image_url],
      }))
      updateUser(token)
      toast.success('cover image updated successfully!')
    } catch (error) {
      toast.error('Error updating cover image!')
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
      // await RevalidateUser()
      updateUser(token)
      // revalidateUser()
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
        <div className='h-full flex-1 items-center justify-center overflow-auto rounded-lg bg-gray-200 p-3 text-white dark:bg-black/40'>
          {/* CoverImage */}
          <div className='relative h-[170px] w-full overflow-hidden rounded'>
            <Image
              src={
                form.cover_images.length > 0
                  ? form.cover_images[form.cover_images.length - 1]
                  : '/card/defaultbuddha.svg'
              }
              alt='porfilepic'
              height={170}
              width={500}
              unoptimized
              className='rounded object-cover'
            />
            <FileUploaderRegular
              onChange={handleImageChange('cover')}
              pubkey={'aff2bf9d09cde0f92516'}
              maxLocalFileSizeBytes={10000000}
              imgOnly={true}
              sourceList='local, url, camera'
              className='absolute left-2 top-2 flex justify-center rounded-lg bg-black/30 dark:bg-white'
            />
            <p className='absolute bottom-2 flex justify-center overflow-hidden text-wrap pt-2'>
              <span className='pl-2 text-sm font-semibold text-white drop-shadow'>{form.description}</span>
            </p>
          </div>
          <div className='mb-3 mt-0 flex items-center justify-center overflow-hidden whitespace-nowrap text-5xl font-bold uppercase text-black dark:text-white'>
            {form.username}
          </div>

          <div className='z-10 mt-[-250px] h-[360px] w-full'>
            {avatarsData && avatarsData.length !== 0 ? (
              <Avatar
                modelSrc={`${avatarsData.slice(-1)[0].avatar_url}?quality=low`}
                // shadows
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
                modelSrc='https://models.readyplayer.me/65ba39f18f9cbe2fcfec8a10.glb?quality=low'
                // shadows
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
            <GeniusID username={form.username} contact={form.phone_number} />
          </div>

          {!showForm && (
            <div className='mt-2 flex justify-start pl-2'>
              <button
                className='flex items-center justify-center rounded border bg-black p-1 transition-all ease-in-out hover:bg-gray-400 hover:text-black dark:border-purple-700
            dark:bg-purple-950/20 dark:hover:border-purple-500'
                onClick={handleShowForm}
              >
                Edit Profile
              </button>
            </div>
          )}

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
            >
              <div className='flex w-full flex-col gap-y-2 px-4  text-black dark:text-purple-200'>
                <button className='flex justify-start' onClick={handleShowForm}>
                  <IoChevronBack size={24} />
                </button>
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
                    className='rounded-md bg-black/50 px-3 text-white dark:bg-white/20'
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
                    className='rounded-md bg-black/50 px-3 text-white dark:bg-white/20'
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
                    className='rounded-md bg-black/50 px-3 text-white dark:bg-white/20'
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
                    className='rounded-md bg-black/50 px-3 text-white dark:bg-white/20'
                    required
                    aria-label='Date of Birth'
                  />
                </div>
                {/* Only shown if regionStatus is not given */}
                {!regionStatus && (
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
                      disabled={regionStatus} // Disable checkbox if regionStatus is true
                    />
                  </div>
                )}
                <div className='flex items-center justify-between gap-x-2'>
                  <label htmlFor='profile_picture' className='whitespace-nowrap font-semibold'>
                    Profile Picture
                  </label>
                  <div className='my-2 flex w-full items-center justify-center'>
                    <FileUploaderRegular
                      onChange={handleImageChange('profile')}
                      pubkey={'aff2bf9d09cde0f92516'}
                      maxLocalFileSizeBytes={10000000}
                      imgOnly={true}
                      sourceList='local, url, camera'
                      className='flex w-full justify-center rounded-lg bg-black/30 dark:bg-white'
                    />
                  </div>
                </div>
              </div>

              <div className='mt-4 w-full px-4'>
                <button
                  className='flex w-full items-center justify-center rounded border bg-black p-1 transition-all ease-in-out hover:bg-gray-400 hover:text-black dark:border-purple-700
            dark:bg-purple-950/20 dark:hover:border-purple-500'
                  type='submit'
                  aria-label='next'
                >
                  SUBMIT
                </button>
              </div>
            </form>
          )}
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
