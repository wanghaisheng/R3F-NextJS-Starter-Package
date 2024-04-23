'use client'

import { useState } from 'react'
import Image from 'next/image'

import { TiDelete } from 'react-icons/ti'

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
        className='flex h-fit w-[68%] rounded-xl border border-[#a5a4a8]/40 bg-[#F8F8F8]/10 px-10 py-4 shadow-md shadow-purple-700 backdrop-blur-md'
      >
        <div className='flex w-full flex-col'>
          <div className='relative my-3 flex justify-center text-2xl drop-shadow md:my-8 md:text-7xl'>Connection</div>
          {connections.length < 4 ? (
            <div className='mt-5 grid grid-cols-3 gap-2 md:flex md:justify-center md:gap-x-10'>
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
                  <Image src={logo.src} alt={logo.alt} width={50} height={50} loading='lazy' />
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-5 grid grid-cols-3 gap-2 md:flex md:justify-center md:gap-x-10'>
              {logos.map((logo, index) => (
                <div
                  key={index}
                  style={{
                    transition: 'all 0.3s ease-in-out',
                    filter: 'grayscale(100%)',
                    transform: 'scale(0.8)',
                  }}
                >
                  <Image src={logo.src} alt={logo.alt} width={50} height={50} loading='lazy' />
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
            <div className='mt-4 flex items-center justify-center gap-x-2'>
              <DrawOutlineButton id='submit-connection' type='submit'>
                Submit
              </DrawOutlineButton>
              <a id='skip-connection' href='/hero3'>
                <DrawOutlineButton>Skip</DrawOutlineButton>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
