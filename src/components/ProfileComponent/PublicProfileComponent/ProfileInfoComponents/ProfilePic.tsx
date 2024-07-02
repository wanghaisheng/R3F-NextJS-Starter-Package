import Image from 'next/image'

export default function ProfilePic({ profilePicUrl, size }) {
  return (
    <div
      className='relative overflow-hidden rounded-full border-2 border-black'
      style={{
        borderRadius: '50%',
        height: size || '100px',
        width: size || '100px',
      }}
    >
      <Image
        src={profilePicUrl}
        alt='profile-pic'
        fill
        unoptimized
        className='rounded-full transition-all duration-[2500ms] ease-in-out hover:scale-125'
      />
    </div>
  )
}
