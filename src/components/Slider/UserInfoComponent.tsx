'use client'
import 'react-tabs/style/react-tabs.css'

import { useState, useRef, useEffect } from 'react'

import { useUser } from '@/context/UserContext/UserContext'

import { useRouter } from 'next/navigation'

import axios from 'axios'
import GeniusIDFlipCard from '../card/GeniusIDFlipCard'

export default function UserInfoComponent() {
  const { user } = useUser()
  const router = useRouter()
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
      router.push('/hero3')
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
    setLastName(newEmail)
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
        id='geniusId'
        className='relative flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>Genius ID</div>

          <div className='mt-5 rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
            <div className='flex justify-between'>
              {/* Card Image / Container */}

              <GeniusIDFlipCard
                first_name={first_name}
                last_name={last_name}
                email={email}
                dob={dob}
                contact={phone_number}
                address={address}
              />

              {/* form */}
              <div className='w-[50%]'>
                <form
                  onSubmit={handleSubmit}
                  className='mx-auto flex w-full max-w-lg flex-col items-center justify-center'
                >
                  <div className='flex w-full flex-col gap-y-2 px-4'>
                    <div className='flex justify-between'>
                      <label htmlFor=''>First Name</label>
                      <input
                        type='text'
                        value={first_name}
                        onChange={(e) => handleFirstNameChange(e.target.value)}
                        placeholder='First Name'
                        className='w-[70%] rounded-md bg-white/20 px-3'
                        required
                      />
                    </div>
                    <div className='flex justify-between'>
                      <label htmlFor=''>Last Name</label>
                      <input
                        type='text'
                        value={last_name}
                        onChange={(e) => handleLastNameChange(e.target.value)}
                        placeholder='Last Name'
                        className='w-[70%] rounded-md bg-white/20 px-3'
                        required
                      />
                    </div>
                    <div className='flex justify-between'>
                      <label htmlFor=''>Email</label>
                      <input
                        type='text'
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        placeholder='Email'
                        className='w-[70%] rounded-md bg-white/20 px-3'
                        required
                      />
                    </div>
                    <div className='flex justify-between'>
                      <label htmlFor=''>Address</label>
                      <input
                        type='text'
                        value={address}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder='Address'
                        className='w-[70%] rounded-md bg-white/20 px-3'
                      />
                    </div>
                    <div className='flex justify-between'>
                      <label htmlFor=''>Contact</label>
                      <input
                        type='text'
                        value={phone_number}
                        onChange={(e) => handlePhoneNumberChange(e.target.value)}
                        placeholder='Phone Number'
                        className='w-[70%] rounded-md bg-white/20 px-3'
                      />
                    </div>
                    <div className='flex justify-between'>
                      <label htmlFor=''>DOB</label>
                      <input
                        type='date'
                        value={dob}
                        onChange={(e) => handleDOBChange(e.target.value)}
                        className='w-[70%] rounded-md bg-white/20  px-3'
                        required
                      />
                    </div>
                  </div>
                  {/* Submit button */}
                  <button
                    type='submit'
                    className='mt-4 rounded-xl bg-purple-700 px-4 py-2 font-bold text-white hover:bg-purple-500'
                  >
                    Generate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
