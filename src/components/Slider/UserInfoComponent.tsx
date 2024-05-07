'use client'
import 'react-tabs/style/react-tabs.css'

import { useState, useRef, useEffect } from 'react'

import { useUser } from '@/context/UserContext/UserContext'

import axios from 'axios'
import GeniusIDFlipCard from '../card/GeniusIDFlipCard'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

import AddRegionModal from '../FormModal/AddRegionsModal'
import AddGuildsModal from '../FormModal/AddGuildsModal'

export default function UserInfoComponent({ onNextButtonClick }) {
  const { user } = useUser()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')

  const [guildIsOpen, setGuildIsOpen] = useState(false)
  const [regionIsOpen, setRegionIsOpen] = useState(false)

  useEffect(() => {
    const setUserInfo = () => {
      setFirstName(user.first_name ? user.first_name : '')
      setLastName(user.last_name ? user.last_name : '')
      setEmail(user.email ? user.email : '')
      setAddress(user.address ? user.address : '')
      setPhoneNumber(user.phone_number ? user.phone_number : '')
      setDob(user.dob ? user.dob : '')
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
    }
    try {
      await axios({
        url: `/api/users/${user.gg_id}`,
        method: 'put',
        data: submit,
      })
      alert('user info saved')
      window.location.reload()
      return
    } catch (error) {
      throw new Error(error)
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

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div
        id='Genius ID'
        className='relative flex h-fit w-[85%] py-4 md:w-[68%] md:rounded-3xl md:border md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:px-10 md:shadow-md md:shadow-purple-700 md:backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-5 lg:text-7xl'>Genius ID</div>

          <div className='mt-5 rounded-[20px] '>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              {/* Card Image / Container */}
              <div className='flex flex-col items-center justify-center'>
                <GeniusIDFlipCard
                  first_name={first_name}
                  last_name={last_name}
                  email={email}
                  dob={dob}
                  contact={phone_number}
                  address={address}
                />

                <p>Symbols for guilds and regions</p>
              </div>

              {/* form */}
              <div className='w-full lg:w-[50%]'>
                <form
                  onSubmit={handleSubmit}
                  className='mx-auto mt-4 flex w-full max-w-lg flex-col items-center justify-center'
                >
                  <div className='flex w-full flex-col gap-y-2 px-4'>
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                      <label htmlFor=''>First Name</label>
                      <input
                        type='text'
                        value={first_name}
                        onChange={(e) => handleFirstNameChange(e.target.value)}
                        placeholder='First Name'
                        className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                        required
                      />
                    </div>
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                      <label htmlFor=''>Last Name</label>
                      <input
                        type='text'
                        value={last_name}
                        onChange={(e) => handleLastNameChange(e.target.value)}
                        placeholder='Last Name'
                        className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                        required
                      />
                    </div>
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                      <label htmlFor=''>Email</label>
                      <input
                        type='text'
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder='Email'
                        className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                        required
                      />
                    </div>
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                      <label htmlFor=''>Address</label>
                      <input
                        type='text'
                        value={address}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder='Address'
                        className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                      />
                    </div>
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                      <label htmlFor=''>Contact</label>
                      <input
                        type='text'
                        value={phone_number}
                        onChange={(e) => handlePhoneNumberChange(e.target.value)}
                        placeholder='Phone Number'
                        className='rounded-md bg-white/20 px-3 lg:w-[70%]'
                      />
                    </div>
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                      <label htmlFor=''>DOB</label>
                      <input
                        type='date'
                        value={dob}
                        onChange={(e) => handleDOBChange(e.target.value)}
                        className='rounded-md bg-white/20 px-3  lg:w-[70%]'
                        required
                      />
                    </div>
                    <div className='flex w-full justify-center gap-x-2'>
                      <DrawOutlineButton type='button' onClick={() => setGuildIsOpen(true)}>
                        Add Guilds
                      </DrawOutlineButton>
                      <DrawOutlineButton type='button' onClick={() => setRegionIsOpen(true)}>
                        Add Regions
                      </DrawOutlineButton>
                    </div>
                  </div>
                  {/* Submit button */}
                  <div className='mt-4'>
                    <DrawOutlineButton type='submit'>Generate</DrawOutlineButton>
                  </div>
                </form>
              </div>
            </div>
            <div className='mt-5 flex justify-center gap-x-2'>
              <DrawOutlineButton onClick={onNextButtonClick}>Next</DrawOutlineButton>
            </div>
          </div>
        </div>
      </div>
      <AddGuildsModal guildIsOpen={guildIsOpen} setGuildIsOpen={setGuildIsOpen} />
      <AddRegionModal regionIsOpen={regionIsOpen} setRegionIsOpen={setRegionIsOpen} />
    </div>
  )
}
