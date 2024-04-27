'use client'

import React, { useState } from 'react'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

interface Faction {
  regionName: string
  regionIcon: string
  regionImage: string
}

interface AddFactionFormProps {
  onAddFaction: (faction: Faction) => void
}

const AddRegionForm: React.FC = ({ onAddFaction }: AddFactionFormProps) => {
  const [regionName, setRegionName] = useState('')
  const [regionIcon, setRegionIcon] = useState('')
  const [regionImage, setRegionImage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submit
    const newFaction: Faction = { regionName, regionIcon, regionImage }
    onAddFaction(newFaction)
    setRegionName('')
    setRegionIcon('')
    setRegionImage('')
  }

  return (
    <div className='w-[60%]'>
      <form onSubmit={handleSubmit} className='my-4 flex flex-col justify-center'>
        <label htmlFor='name' className='block text-sm text-white'>
          Region Name
        </label>
        <input
          id='name'
          type='text'
          value={regionName}
          onChange={(e) => setRegionName(e.target.value)}
          required
          className='mt-1 block w-full rounded-md bg-white/30 text-white focus:border-none'
        />
        <label htmlFor='description' className='mt-2 block text-sm  text-white'>
          Region Icon URL
        </label>
        <textarea
          id='description'
          value={regionIcon}
          onChange={(e) => setRegionIcon(e.target.value)}
          required
          className='mt-1 block w-full rounded-md bg-white/30 text-white focus:border-none'
        />
        <label htmlFor='avatarimg' className=' mt-2 block text-sm text-white'>
          Region Image URL
        </label>
        <input
          id='avatarimg'
          type='url'
          value={regionImage}
          onChange={(e) => setRegionImage(e.target.value)}
          required
          className='mb-4 mt-1 block w-full rounded-md bg-white/30 text-white focus:border-none'
        />

        <DrawOutlineButton type='submit'>Add Region</DrawOutlineButton>
      </form>
    </div>
  )
}

export default AddRegionForm
