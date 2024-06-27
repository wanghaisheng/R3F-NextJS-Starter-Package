'use client'

import { useState } from 'react'
import EmergencyCard from '@/components/card/TypeCard/EmergencyCard'
import { useUser } from '@/UserClientProvider'
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function EmergencyComponent({ setActiveTab, setShowSignUp }) {
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  const { user } = useUser()

  QRCode.toDataURL(pathname).then(setImgSrc) // QRCode.toDataURL(pathname) is a promise that returns a data URL of the QR code of the current URL

  const [isFlipped, setIsFlipped] = useState(false) // isFlipped is a boolean state variable that is used to determine if the card is flipped or not
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // handleSignUpClick is a function that sets the active tab to profile and shows the signup modal
  const handleSignUpClick = () => {
    setActiveTab('profile')
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
              className='mt-2 flex cursor-pointer justify-center rounded border bg-black p-2 transition-colors hover:bg-gray-300 hover:text-black  dark:border-purple-700 dark:bg-purple-800/30 dark:hover:bg-purple-800/40 dark:hover:text-purple-200'
            >
              Signup
            </div>
          </>
        </>
      )}
    </>
  )
}
