'use client'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import 'react-tabs/style/react-tabs.css'

import { useState, useRef, useEffect } from 'react'

import { useUser } from '@/context/UserContext/UserContext'

import { useRouter } from 'next/navigation'

import axios from 'axios'

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
      alert('user info saved')
      window.location.reload()
      return
    } catch (error) {
      console.error(error)
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

  const ROTATION_RANGE = 32.5
  const HALF_ROTATION_RANGE = 32.5 / 2

  const TiltCard = () => {
    const ref = useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const xSpring = useSpring(x)
    const ySpring = useSpring(y)

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

    const handleMouseMove = (e) => {
      if (!ref.current) return [0, 0]

      const rect = ref.current.getBoundingClientRect()

      const width = rect.width
      const height = rect.height

      const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
      const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

      const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1
      const rY = mouseX / width - HALF_ROTATION_RANGE

      x.set(rX)
      y.set(rY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform,
        }}
        className='relative h-60 w-full rounded-xl bg-gradient-to-br from-purple-700 to-violet-700'
      >
        <div
          style={{
            transform: 'translateZ(75px)',
            transformStyle: 'preserve-3d',
          }}
          className='absolute inset-1 flex flex-col rounded-xl bg-black p-4 shadow-lg'
        >
          <p
            style={{
              transform: 'translateZ(50px)',
            }}
            className='text-3xl font-bold text-purple-700'
          >
            {first_name} {last_name}
          </p>
          <p
            style={{
              transform: 'translateZ(50px)',
            }}
            className=' text-xl'
          >
            {address}
          </p>
          <p
            style={{
              transform: 'translateZ(50px)',
            }}
            className=' text-xl'
          >
            {phone_number}
          </p>
          <p
            style={{
              transform: 'translateZ(50px)',
            }}
            className='text-xl'
          >
            Birth Date : {dob}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div className='relative flex h-fit w-[68%] rounded-3xl border  border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'>
        <div className='flex w-full flex-col'>
          <div className='relative my-4 flex justify-center text-7xl font-semibold drop-shadow'>Genius ID</div>

          <div className='mt-5 rounded-[20px] border border-[#B5B5B5] bg-[#D9D9D9]/20 p-4'>
            <div className='flex justify-between'>
              {/* Card Image / Container */}
              <div className='w-[50%] rounded-xl bg-black p-4 '>
                <TiltCard />
              </div>

              {/* <div className='flex w-[50%] justify-between rounded-xl bg-black p-4 '>
                <div>Img of Avatar</div>
                <div className='w-[50%]'>
                  <div translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                    {name}
                  </div>
                  <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                    {address}
                  </div>
                  <div as='p' translateZ='60' className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'>
                    DOB: {dob}
                  </div>
                </div>
              </div> */}

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
