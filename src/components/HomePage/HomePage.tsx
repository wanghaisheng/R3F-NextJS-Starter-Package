'use client'
import { useState } from 'react'

export default function HomePage() {
  const [currentGuild, setCurrentGuild] = useState('') //current guild state

  const handleGuildChange = (guild_name: string) => {
    setCurrentGuild(guild_name.toLowerCase())
  }

  return (
    <div className='relative h-screen'>
      <video key={currentGuild} className='absolute inset-0 size-full object-cover' autoPlay loop muted>
        {currentGuild === 'buddha' ? (
          <source src='/livewallpapers/buddha.mp4' type='video/mp4' />
        ) : currentGuild === 'vajra' ? (
          <source src='/livewallpapers/candles.mp4' type='video/mp4' />
        ) : currentGuild === 'padma' ? (
          <source src='/livewallpapers/fire.mp4' type='video/mp4' />
        ) : currentGuild === 'karma' ? (
          <source src='/livewallpapers/karma.mp4' type='video/mp4' />
        ) : (
          <source src='/livewallpapers/forest.mp4' type='video/mp4' />
        )}
      </video>

      <div className='absolute top-20 z-10'>
        <div className='bg-black text-white'>{currentGuild}</div>

        <div className='flex gap-x-2 bg-black text-white'>
          <button onClick={() => handleGuildChange('buddha')}>Buddha</button>
          <button onClick={() => handleGuildChange('vajra')}>Vajra</button>
          <button onClick={() => handleGuildChange('padma')}>Padma</button>
          <button onClick={() => handleGuildChange('karma')}>Karma</button>
        </div>
      </div>
    </div>
  )
}
