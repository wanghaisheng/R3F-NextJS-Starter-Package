'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

const guildColors = {
  BUDDHA: '#FFFFFF',
  VAJRA: '#0000FF',
  KARMA: '#00FF00',
  RATNA: '#FFD700',
  PADMA: '#FF0000',
}

const getGradientStyle = (guild) => {
  const color = guildColors[guild] || '#FFFFFF' // Default to white if guild is not found
  return {
    background: `linear-gradient(to right, black 20%, ${color} 90%, ${color} 100%)`,
  }
}

const getTextColor = (guild) => {
  return guild === 'BUDDHA' ? 'black' : 'white'
}

export default function GGCard({ userData }) {
  // Flip Card QR
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    QRCode.toDataURL(pathname).then(setImgSrc)
  }, [pathname])

  const [isHidden, setIsHidden] = useState(false)
  const checkHidden = () => {
    setIsHidden(!isHidden)
  }

  // Flip Card QR end

  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <>
      {userData ? (
        <div className='group h-full [prespective:1000px]'>
          {/* Flip the card when clicked */}
          <div
            style={getGradientStyle(userData.guild)}
            className={`relative size-full rounded-lg shadow-md transition-all duration-500 [transform-style:preserve-3d]
    ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            onClick={handleFlip}
          >
            <div className='absolute right-2 top-2'>
              {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
              <p className={`text-montserrat text-xs font-semibold`} style={{ color: getTextColor(userData.guild) }}>
                DEVELOPER
              </p>
            </div>

            <div className='absolute left-2 top-2'>
              {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
              <p className={`text-montserrat text-xs font-semibold text-white`}>GG</p>
            </div>

            <div className='absolute bottom-2 right-2'>
              <p
                //  eslint-disable-next-line tailwindcss/no-custom-classname
                className='text-montserrat z-20 text-xs font-semibold hover:underline'
                style={{ color: getTextColor(userData.guild) }}
              >
                View More
              </p>
            </div>

            <div className='absolute flex size-full flex-col items-start justify-center pl-4 text-[24px] font-bold uppercase text-white'>
              <h1>{userData.name}</h1>
              <p className='-mt-2 text-[14px] font-semibold'>8708 H87F 8JID 989D</p>
            </div>

            <div className='absolute flex size-full flex-col items-end justify-center pr-2 text-[24px] font-bold uppercase text-white'>
              <div
                className={`size-[24px] rounded-md  ${userData.guild === 'BUDDHA' ? 'bg-black/70' : 'bg-white/60'}`}
              ></div>
            </div>

            <div className='absolute bottom-2 left-2 text-[14px] font-bold text-white'>{userData.age}21</div>

            {/* QRCode */}
            <div
              style={getGradientStyle(userData.guild)}
              className='absolute inset-0 z-10 rounded-lg px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'
            >
              <div className='relative size-full'>
                <div className='absolute left-2 top-2 text-blue-300 hover:underline'>{userData.email}</div>

                <div className='flex size-full items-center justify-center '>
                  {imgSrc && (
                    <Image className='rounded-sm object-cover' alt='qr code' src={imgSrc} width={42} height={42} />
                  )}
                </div>
                <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                  <div className='text-base font-semibold text-gray-200 dark:text-purple-500'>GOING GENIUS</div>
                  <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  )
}
