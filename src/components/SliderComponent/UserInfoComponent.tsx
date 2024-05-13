'use client'
import 'react-tabs/style/react-tabs.css'

import { useState, useEffect } from 'react'

import { useUser } from '@/context/UserContext/UserContext'

import axios from 'axios'
import GeniusIDFlipCard from '../card/GeniusIDFlipCard'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'
import Image from 'next/image'

import { IoTriangleSharp, IoCubeSharp } from 'react-icons/io5'
import { FaDiamond } from 'react-icons/fa6'
import { BsOctagonFill } from 'react-icons/bs'
import { MdHexagon } from 'react-icons/md'

export default function UserInfoComponent({ onNextButtonClick }) {
  const guildData = [
    {
      name: 'BUDDHA',
      symbol: <MdHexagon />,
      color: 'FFFFFF',
      description: ' WHITE Guild of the Vairochana family',
      image: '/svgs/vairocana.svg',
    },
    {
      name: 'VAJRA',
      symbol: <BsOctagonFill />,
      color: '0000FF',
      description: ' BLUE Guild of the Akshobhya family',
      image: '/svgs/akshobhya.svg',
    },
    {
      name: 'KARMA',
      symbol: <FaDiamond />,
      color: '00FF00',
      description: ' Green Guild of the Amoghasiddhi family selihgosadilnho uiogcseou voshdof',
      image: '/svgs/amoghasiddhi.svg',
    },
    {
      name: 'RATNA',
      symbol: <IoCubeSharp />,
      color: 'FFF200',
      description: ' YELLOW/GOLD Guild of the Ratnasambhava family',
      image: '/svgs/ratnasambhava.svg',
    },
    {
      name: 'PADMA',
      symbol: <IoTriangleSharp />,
      color: 'FF0000',
      description: ' RED Guild of the Amitabha family',
      image: '/svgs/amitabha.svg',
    },
  ]
  const [selectedGuild, setSelectedGuild] = useState('')

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

  return (
    <div className='-ml-3 mb-12 mt-2 flex flex-col items-center md:ml-0 lg:mb-0 '>
      <div
        id='Genius ID'
        className='relative flex h-[900px] w-[300px] py-4 md:w-[500px] md:rounded-3xl md:border  md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:px-10 md:shadow-inner md:shadow-purple-700/70 md:backdrop-blur-md lg:h-[550px] lg:w-[800px]'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-5 lg:text-7xl'>Genius ID</div>

          <div className='mt-5 rounded-[20px] '>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              {/* Card Image / Container */}
              <div className='flex flex-col'>
                <div className='flex justify-center'>
                  <GeniusIDFlipCard
                    first_name={first_name}
                    last_name={last_name}
                    email={email}
                    dob={dob}
                    contact={phone_number}
                    address={address}
                  />
                </div>

                <p className='flex justify-center'>{selectedGuild}</p>
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
                        aria-label='First Name'
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
                        aria-label='Last Name'
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
                        aria-label='Email'
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
                        aria-label='Address'
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
                        aria-label='Phone Number'
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
                        aria-label='Date of Birth'
                      />
                    </div>

                    {/* GUILDS SELECTION */}
                    <div className='flex flex-col lg:flex-row lg:justify-between'>
                      <label htmlFor='guilds'>Guilds</label>
                      <div className='relative flex items-center justify-between gap-x-2 px-4 lg:w-[70%]'>
                        {guildData.map((guild, index) => (
                          <div key={index} className='lg:relative'>
                            <input
                              type='radio'
                              id={guild.name.toString()}
                              name='guild'
                              value={`Guild ${guild.name}`}
                              className='hidden'
                              checked={selectedGuild === guild.name}
                              onChange={() => setSelectedGuild(guild.name)}
                              aria-label='Guild Selection'
                            />
                            <label
                              htmlFor={guild.name}
                              className={'group cursor-pointer'}
                              style={{
                                color: selectedGuild === guild.name ? `#${guild.color}` : `#FFFFFF`,
                                fontSize: selectedGuild === guild.name ? '1.2em' : '1em',
                                transition: 'font-size 0.2s ease',
                              }}
                            >
                              {guild.symbol}
                              <div
                                className={`absolute bottom-full left-1/2 z-50 hidden -translate-x-1/2 rounded-xl bg-black/80 p-2 text-white group-hover:block`}
                              >
                                <div style={{ width: '150px' }}>
                                  <Image src={guild.image} alt={guild.name} width={150} height={50} />
                                </div>
                                <p
                                  className='flex justify-center text-xs font-bold'
                                  style={{
                                    color: `#${guild.color}`,
                                  }}
                                >
                                  {guild.name}
                                </p>
                                <p className='text-xs'>{guild.description}</p>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Submit button */}
                  <div className='mt-4'>
                    <DrawOutlineButton type='submit' aria-label='generate'>
                      Generate
                    </DrawOutlineButton>
                  </div>
                </form>
              </div>
            </div>
            <div className='absolute bottom-4 right-4 mt-4'>
              <DrawOutlineButton onClick={onNextButtonClick} aria-label='next'>
                <p className='px-4'>Next</p>
              </DrawOutlineButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
