'use client'
import 'react-tabs/style/react-tabs.css'
import { useState, useEffect } from 'react'
// import { useUser } from '@/context/UserContext/UserContext'
import { useUser } from '@/UserClientProvider'
import axios from 'axios'
import GeniusIDFlipCard from '../card/GeniusIDFlipCard'
import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import toast from 'react-hot-toast'

import { FaArrowRight } from 'react-icons/fa6'

export default function UserInfoComponent({ onNextButtonClick, isSmallScreen }) {
  const { user } = useUser()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
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

  useEffect(() => {
    const setUserInfo = () => {
      setFirstName(user.first_name ? user.first_name : '')
      setLastName(user.last_name ? user.last_name : '')
      setEmail(user.email ? user.email : '')
      setAddress(
        user.region.ip !== '' ? user.region.city + ', ' + user.region.country : user.address ? user.address : '',
      )
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
      first_name,
      last_name,
      email,
      phone_number,
      address,
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
      onNextButtonClick() // Proceed to the next slide after successful update
    } catch (error) {
      toast.error('Update failed!')
    }
  }

  const handleFirstNameChange = (newFirstName: string) => {
    setFirstName(newFirstName)
  }
  const handleLastNameChange = (newLastName: string) => {
    setLastName(newLastName)
  }
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail)
  }
  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress)
  }
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

  return (
    <>
      <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0 '>
        <div
          id='Genius ID'
          className='relative flex h-[770px] w-[300px] rounded bg-[#F5F5F5]/20 px-2 py-4 shadow-md md:w-[500px] md:rounded-3xl md:px-10 md:backdrop-blur-md lg:h-[550px] lg:w-[800px] dark:bg-transparent md:dark:bg-black/10 dark:md:shadow-purple-700'
        >
          <div className='flex w-full flex-col'>
            <div className='relative my-3 flex justify-center text-2xl font-semibold text-purple-200 drop-shadow lg:my-5 lg:text-5xl'>
              GENIUS ID
            </div>
            <div className='mt-5 rounded-[20px] '>
              <div className='flex flex-col lg:flex-row lg:justify-between'>
                {/* Card Image / Container */}
                <div className='flex flex-col'>
                  <div className='mt-2 flex justify-center '>
                    <GeniusIDFlipCard
                      // selectedGuild={selectedGuild}
                      // guildData={guildData}
                      first_name={first_name}
                      last_name={last_name}
                      email={email}
                      contact={phone_number}
                      address={address}
                    />
                  </div>
                </div>
                {/* form */}
                <div className='w-full lg:w-[50%]'>
                  <form
                    onSubmit={handleSubmit}
                    className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                  >
                    <div className='flex w-full flex-col gap-y-2 px-4  text-purple-200'>
                      <div className='flex flex-col lg:flex-row lg:justify-between '>
                        <label htmlFor='' className='font-semibold'>
                          First Name
                        </label>

                        <input
                          type='text'
                          value={first_name}
                          onChange={(e) => handleFirstNameChange(e.target.value)}
                          placeholder='First Name'
                          className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                          required
                          aria-label='First Name'
                        />
                      </div>
                      <div className='flex flex-col lg:flex-row lg:justify-between'>
                        <label htmlFor='' className='font-semibold'>
                          Last Name
                        </label>

                        <input
                          type='text'
                          value={last_name}
                          onChange={(e) => handleLastNameChange(e.target.value)}
                          placeholder='Last Name'
                          className='rounded-md  bg-white/20 px-3 lg:w-[70%]'
                          required
                          aria-label='Last Name'
                        />
                      </div>
                      <div className='flex flex-col lg:flex-row lg:justify-between'>
                        <label htmlFor='' className='font-semibold'>
                          Email
                        </label>

                        <input
                          type='text'
                          value={email}
                          onChange={(e) => handleEmailChange(e.target.value)}
                          placeholder='Email'
                          className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                          required
                          aria-label='Email'
                        />
                      </div>
                      {!regionStatus && (
                        <div className='flex flex-col lg:flex-row lg:justify-between'>
                          <label htmlFor='' className='font-semibold'>
                            Address
                          </label>

                          <input
                            type='text'
                            value={address}
                            onChange={(e) => handleAddressChange(e.target.value)}
                            placeholder='Address'
                            className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                            aria-label='Address'
                          />
                        </div>
                      )}
                      <div className='flex flex-col lg:flex-row lg:justify-between'>
                        <label htmlFor='' className='font-semibold'>
                          Contact
                        </label>

                        <input
                          type='text'
                          value={phone_number}
                          onChange={(e) => handlePhoneNumberChange(e.target.value)}
                          placeholder='Phone Number'
                          className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                          aria-label='Phone Number'
                        />
                      </div>
                      <div className='flex flex-col lg:flex-row lg:justify-between'>
                        <label htmlFor='' className='font-semibold'>
                          DOB
                        </label>

                        <input
                          type='date'
                          value={dob}
                          onChange={(e) => handleDOBChange(e.target.value)}
                          className='rounded-md bg-white/20 px-3  lg:w-[70%]'
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
                    </div>
                    {/* Next */}
                    {!isSmallScreen ? (
                      <>
                        <div className='absolute bottom-4 right-4'>
                          <button
                            className='rounded-full bg-black transition-all duration-150 hover:scale-105 hover:bg-purple-500 dark:bg-purple-400/20 hover:dark:bg-purple-300/30'
                            type='submit'
                            aria-label='next'
                          >
                            <p className='p-4'>
                              <FaArrowRight />
                            </p>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className='absolute bottom-2 right-4'>
                        <DrawOutlineButton type='submit' aria-label='next slide'>
                          Next
                        </DrawOutlineButton>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
