'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { useState, useEffect } from 'react'

import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function Wallet({ first_name, last_name, email, dob, contact, address, balance }) {
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
    <div>
      <div className='absolute right-2 top-1 z-20'>
        {!isFlipped && (
          <button type='button' aria-label='hide-unhide button' onClick={checkHidden}>
            {isHidden ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
      <div className='group h-[220px] w-[340px]'>
        {/* Flip the card when clicked */}
        <div
          className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
          onClick={handleFlip}
        >
          <Image
            // placeholder='blur'
            src='/card/ljsd.png'
            alt='GID'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
            className='rounded-lg object-cover'
          />
          <div className='absolute top-0 flex w-full justify-end'>
            {isHidden ? (
              <p className='mr-6 flex items-center pt-1 font-bold text-purple-950 dark:text-purple-500'>
                {balance.toString().replace(/\d/g, '*')}
              </p>
            ) : (
              <p className='mr-6 font-bold text-gray-200 dark:text-purple-500'>{balance}</p>
            )}
          </div>

          <div className='absolute inset-0 cursor-default rounded-xl'>
            {/* Card Details */}
            <div className='absolute top-5 flex flex-col p-5 text-sm text-white'>
              <nav className='mb-1 flex list-none flex-wrap'>
                <ul>
                  <li className='mb-1 w-full text-xl font-semibold'>
                    <p>
                      {first_name ? first_name.toUpperCase() : 'GUEST'} {last_name && last_name.toUpperCase()}
                    </p>
                  </li>
                  <li className='mb-1 w-full'>
                    <p className='text-gray-400 dark:text-purple-500'>{email ? email : 'abc@gmail.com'}</p>
                  </li>
                  <li className='w-full'>
                    <p>DOB : {dob && dob}</p>
                  </li>
                  <li className='w-full'>
                    <p>Address : {address && address}</p>
                  </li>
                  <li className='w-full'>
                    <p>Contact : {contact && contact}</p>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
            <div className='text-base font-bold text-gray-200 dark:text-purple-500'>GOING GENIUS</div>
            <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
          </div>

          {/* QRCode */}
          <div className='absolute inset-0  rounded-lg bg-black px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
            <div className='flex size-full items-center justify-center '>
              {imgSrc && (
                <Image className='rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
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
  )
}
