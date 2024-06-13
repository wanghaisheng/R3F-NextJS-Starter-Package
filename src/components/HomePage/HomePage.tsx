'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [currentGuild, setCurrentGuild] = useState('') //current guild state

  return (
    <div className='h-screen'>
      <video className='absolute inset-0 size-full object-cover' autoPlay loop muted>
        <source src='/livewallpapers/forest.mp4' type='video/mp4' />
      </video>

      <button>Buddha</button>
      <button>Vajra</button>
      <button>Padma</button>
      <button>Karma</button>
    </div>
  )
}
