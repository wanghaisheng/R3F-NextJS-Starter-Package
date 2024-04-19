'use client'

import { useState } from 'react'
import Image from 'next/image'

import { TiDelete } from 'react-icons/ti'

export default function ConnectionComponent() {
  const [selectedLogo, setSelectedLogo] = useState(null)
  const [connections, setConnections] = useState([])

  const handleLogoClick = (logo) => {
    if (!connections.some((connection) => connection.src === logo.src)) {
      const newConnection = { src: logo.src, alt: logo.alt, link: '' }
      setConnections([...connections, newConnection])
    }
  }

  const handleInputChange = (e, index) => {
    const updatedConnections = [...connections]
    updatedConnections[index] = { ...updatedConnections[index], link: e.target.value }
    setConnections(updatedConnections)
  }

  const handleRemoveConnection = (index, event) => {
    event.preventDefault() // To prevent form submission and reload of the page
    setConnections(connections.filter((_, i) => i !== index))
  }

  const logos = [
    { src: '/connectionlogo/github.png', alt: 'github logo', name: 'GitHub' },
    { src: '/connectionlogo/facebook.png', alt: 'facebook logo', name: 'Facebook' },
    { src: '/connectionlogo/google.png', alt: 'google logo', name: 'Google' },
    { src: '/connectionlogo/youtube.png', alt: 'youtube logo', name: 'YouTube' },
    { src: '/connectionlogo/twitter.png', alt: 'twitter logo', name: 'Twitter' },
    { src: '/connectionlogo/instagram.png', alt: 'instagram logo', name: 'Instagram' },
    { src: '/connectionlogo/linkedin.png', alt: 'linkedin logo', name: 'LinkedIn' },
    { src: '/connectionlogo/snapchat.png', alt: 'snapchat logo', name: 'Snapchat' },
    { src: '/connectionlogo/apple.png', alt: 'apple logo', name: 'Apple' },
    { src: '/connectionlogo/figma.png', alt: 'figma logo', name: 'Figma' },
  ]

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div
        id='connection'
        className='flex h-fit w-[68%] rounded-3xl border border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow md:my-8 md:text-7xl'>Connection</div>
          {connections.length < 4 ? (
            <div>
              <div className='mt-5 grid grid-cols-3 gap-2 md:flex md:justify-center md:gap-x-10'>
                {logos.map((logo, index) => (
                  <div key={index} onClick={() => handleLogoClick(logo)}>
                    <Image src={logo.src} alt={logo.alt} width={50} height={50} loading='lazy' />
                  </div>
                ))}
              </div>
              <p className='mt-2 flex justify-center'>{4 - connections.length} remaining</p>
            </div>
          ) : (
            <div className='mt-5 grid grid-cols-3 gap-2 md:flex md:justify-center md:gap-x-10'>
              {logos.map((logo, index) => (
                <div key={index} style={{ filter: 'grayscale(100%)' }}>
                  <Image src={logo.src} alt={logo.alt} width={50} height={50} />
                </div>
              ))}
            </div>
          )}

          <form>
            {connections.length > 0 && (
              <div className='mt-10 flex flex-wrap justify-center gap-4'>
                {connections.map((connection, index) => (
                  <div key={index} className='flex w-full items-center justify-center'>
                    <Image src={connection.src} alt={connection.alt} width={45} height={45} />
                    <label htmlFor='type' className='hidden'></label>
                    <input
                      id='connection-link'
                      type='text'
                      className='ml-2 w-1/2 rounded-md bg-white/20 p-2'
                      value={connection.link || ''}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder='Enter link here'
                    />
                    <button
                      className='rounded px-2 py-1 font-bold text-white hover:text-red-700'
                      onClick={(e) => handleRemoveConnection(index, e)}
                      id='remove-connection'
                    >
                      <TiDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className='flex items-center justify-center gap-x-2'>
              <button
                id='submit-connection'
                type='submit'
                className='mt-4 rounded-2xl px-4 py-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900'
              >
                Submit
              </button>
              <a
                id='skip-connection'
                href='/hero3'
                className='mt-4 flex justify-center rounded-2xl px-4 py-2 text-white shadow-md shadow-violet-600 backdrop-blur-xl hover:scale-105 hover:bg-violet-900'
              >
                Skip
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
