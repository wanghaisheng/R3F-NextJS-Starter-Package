import GallerySidebar from '@/components/GalleryComponent/GallerySidebar'
import { useUser } from '@/context/UserContext/UserContext'

export default function SideGalleryComponent({ setActiveTab, setShowSignUp }) {
  const { user } = useUser()

  const handleSignUpClick = () => {
    setActiveTab('search')
    setShowSignUp(true)
  }
  return (
    <>
      {user ? (
        <GallerySidebar username={user ? user.username : ''} />
      ) : (
        <>
          <div>You must sign in to view this tab</div>
          <div
            onClick={handleSignUpClick}
            className='mt-2 flex cursor-pointer justify-center rounded border border-purple-700 bg-purple-800/30 p-2 transition-colors hover:bg-purple-800/40 hover:text-purple-200'
          >
            Signup
          </div>
        </>
      )}
    </>
  )
}
