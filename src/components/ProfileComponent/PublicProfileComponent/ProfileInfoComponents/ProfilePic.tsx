export default function ProfilePic({ profilePicUrl, size }) {
  return (
    <div
      className='rounded-full'
      style={{
        backgroundImage: `url(${profilePicUrl}/image.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '50%',
        height: size || '100px',
        width: size || '100px',
      }}
    ></div>
  )
}
