'use client'

import { useState } from 'react'
import EmergencyCard from '@/components/card/TypeCard/EmergencyCard'
import { useUser } from '@/context/UserContext/UserContext'
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function EmergencyComponent({ setActiveTab, setShowSignUp }) {
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  const { user } = useUser()
  QRCode.toDataURL(pathname).then(setImgSrc)
  const [isFlipped, setIsFlipped] = useState(false)
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }

  return (
    <>
      {user ? (
        <>
          {user.cards[0] ? (
            <>
              <div className='group h-[239px] [prespective:1000px]'>
                <EmergencyCard
                  type='emergency'
                  isFlipped={isFlipped}
                  handleFlip={handleFlip}
                  user={user}
                  name={user.first_name + ' ' + user.last_name}
                  blood_group={user.cards[0].blood_group}
                  emergency_contact={user.cards[0].emergency_contact}
                  emergency_details={user.cards[0].emergency_details}
                  emergency_address={user.cards[0].emergency_address}
                  imgSrc={imgSrc}
                />
              </div>
              <div className='mt-4 flex items-center justify-center'>
                <button
                  className='w-full rounded bg-red-700 p-2 text-xl font-bold transition-all duration-300 hover:bg-red-700/40'
                  onClick={() =>
                    alert('This will share the current location of the user and call the emergency contact')
                  }
                >
                  SOS
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>You have not filled Emergency details yet.</h2>
              <p>Add emergency details</p>
            </>
          )}
        </>
      ) : (
        <>
          <>
            <div>You must signin to view this tab</div>
            <div
              onClick={handleSignUpClick}
              className='mt-2 flex cursor-pointer justify-center rounded border border-purple-700 bg-purple-800/30 p-2 transition-colors hover:bg-purple-800/40 hover:text-purple-200'
            >
              Signup
            </div>
          </>
        </>
      )}
    </>
  )
}
