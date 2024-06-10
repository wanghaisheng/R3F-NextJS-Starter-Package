'use client'

import { useState } from 'react'
import EmergencyCard from '@/components/card/TypeCard/EmergencyCard'
import { useUser } from '@/context/UserContext/UserContext'
import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function EmergencyComponent() {
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  const { user } = useUser()
  QRCode.toDataURL(pathname).then(setImgSrc)
  const [isFlipped, setIsFlipped] = useState(false)
  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  console.log(user)

  return (
    <>
      {user && user.cards[0] ? (
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
      ) : (
        <div className='flex h-96 items-center justify-center'>
          <div className='text-3xl text-gray-400'>No User Found</div>
        </div>
      )}
      <div>Okay</div>
    </>
  )
}
