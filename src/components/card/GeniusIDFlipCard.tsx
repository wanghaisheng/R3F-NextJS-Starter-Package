'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'

import { useState } from 'react'

import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function GeniusIDFlipCard({ first_name, last_name, email, dob, contact, address }) {
  // Flip Card QR
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end

  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  return (
    <>
      <CardBody>
        {/* Event Image  */}
        <div className='group h-[239px] p-3 [prespective:1000px]'>
          {/* Flip the card when clicked */}
          <div
            className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            onClick={handleFlip}
          >
            <div className='absolute inset-0 rounded-xl bg-black text-white'>
              <div className='flex w-full justify-end'>
                <p className='pr-3 pt-1 font-bold text-purple-600'>GENIUS ID</p>
              </div>
              {/* Card Details */}
              <div className='flex flex-col p-5 text-sm text-white'>
                <nav className='mb-1 flex list-none flex-wrap'>
                  <li className='mb-1 w-full text-xl font-semibold'>
                    <p>
                      {first_name.toUpperCase()} {last_name.toUpperCase()}
                    </p>
                  </li>
                  <li className='mb-1 w-full'>
                    <p className='text-purple-500'>{email}</p>
                  </li>
                  <li className='w-full'>
                    <p>DOB : {dob}</p>
                  </li>
                  <li className='w-full'>
                    <p>Address : {address}</p>
                  </li>
                  <li className='w-full'>
                    <p>Contact : {contact}</p>
                  </li>
                </nav>
              </div>
              <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
              </div>
            </div>

            {/* QRCode */}
            <div className='absolute inset-0  rounded-lg bg-black px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
              <div className='flex size-full items-center justify-center '>
                <Image className='rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
              </div>
              <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
                <div className='text-base font-bold text-purple-600'>GOING GENIUS</div>
                <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </>
  )
}
