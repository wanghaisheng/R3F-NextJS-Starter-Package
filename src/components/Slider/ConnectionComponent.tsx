'use client'

import { useState } from 'react'
import Image from 'next/image'

import { TiDelete } from 'react-icons/ti'

import DrawOutlineButton from '../AnimatedButton/DrawOutlineButton'

export default function ConnectionComponent({ onNextButtonClick }) {
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
        className='relative flex h-[550px] w-[300px] flex-col py-4 md:w-[600px]  md:rounded-3xl  md:border md:border-[#a5a4a8]/40 md:bg-[#F8F8F8]/10 md:px-10 md:shadow-inner md:shadow-purple-700/70 md:backdrop-blur-md lg:w-[800px]'
      >
        <div className='flex flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow lg:my-5 lg:text-7xl'>Connection</div>
          {connections.length < 4 ? (
            <div className='mt-3 flex flex-wrap justify-center gap-x-10 gap-y-5'>
              {logos.map((logo, index) => (
                <div
                  key={index}
                  onClick={() => handleLogoClick(logo)}
                  style={
                    connections.some((connection) => connection.src === logo.src)
                      ? { filter: 'grayscale(100%)', transform: 'scale(0.8)', transition: 'all 0.3s ease-in-out' }
                      : { transition: 'all 0.3s ease-in-out' }
                  }
                >
                  <Image src={logo.src} alt={logo.alt} width={40} height={40} loading='lazy' />
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-3 flex flex-wrap justify-center gap-x-10 gap-y-5'>
              {logos.map((logo, index) => (
                <div
                  key={index}
                  style={{
                    transition: 'all 0.3s ease-in-out',
                    filter: 'grayscale(100%)',
                    transform: 'scale(0.8)',
                  }}
                >
                  <Image src={logo.src} alt={logo.alt} width={40} height={40} loading='lazy' />
                </div>
              ))}
            </div>
          )}

          <form>
            {connections.length > 0 && (
              <div className='mt-10 flex flex-wrap justify-center gap-4'>
                {connections.map((connection, index) => (
                  <div key={index} className='flex w-full items-center justify-center'>
                    <Image src={connection.src} alt={connection.alt} width={30} height={30} />
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
            <div className='absolute bottom-0 right-28 md:bottom-4'>
              <DrawOutlineButton id='submit-connection' type='submit'>
                Submit
              </DrawOutlineButton>
            </div>
          </form>
          <div className='absolute bottom-0 right-4 md:bottom-4'>
            <DrawOutlineButton onClick={onNextButtonClick}>
              <p className='px-2'>Next</p>
            </DrawOutlineButton>
          </div>
        </div>
      </div>
    </div>
  )
}
