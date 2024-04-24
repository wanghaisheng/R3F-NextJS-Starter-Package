'use client'
import 'react-tabs/style/react-tabs.css'

import { useState, useRef, useEffect } from 'react'

import { useUser } from '@/context/UserContext/UserContext'

import axios from 'axios'
import GeniusIDFlipCard from '../card/GeniusIDFlipCard'

export default function UserInfoComponent() {
  const { user } = useUser()
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')
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

  // Animated Button
  const DrawOutlineButton = ({ children, ...rest }) => {
    return (
      <button
        {...rest}
        className='group relative rounded-md bg-purple-400/20 px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-purple-300'
      >
        <span>{children}</span>

        {/* TOP */}
        <span className='absolute left-0 top-0 h-[2px] w-0 bg-purple-300 transition-all duration-100 group-hover:w-full' />

        {/* RIGHT */}
        <span className='absolute right-0 top-0 h-0 w-[2px] bg-purple-300 transition-all delay-100 duration-100 group-hover:h-full' />

        {/* BOTTOM */}
        <span className='absolute bottom-0 right-0 h-[2px] w-0 bg-purple-300 transition-all delay-200 duration-100 group-hover:w-full' />

        {/* LEFT */}
        <span className='absolute bottom-0 left-0 h-0 w-[2px] bg-purple-300 transition-all delay-300 duration-100 group-hover:h-full' />
      </button>
    )
  }

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div
        id='geniusId'
        className='relative flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-8 lg:text-7xl'>Genius ID</div>

          <div className='mt-5 rounded-[20px] '>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              {/* Card Image / Container */}
              <div className='flex'>
                <GeniusIDFlipCard
                  first_name={first_name}
                  last_name={last_name}
                  email={email}
                  dob={dob}
                  contact={phone_number}
                  address={address}
                />
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
                  </div>
                  {/* Submit button */}

                  <div className='mt-4'>
                    <DrawOutlineButton type='submit'>Generate</DrawOutlineButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
