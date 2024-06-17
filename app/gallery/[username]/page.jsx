import GalleryComponent from '@/components/GalleryComponent/GalleryComponent'

export default function gallery({ params }) {
  const username = params.username
  return (
    <div>
      <GalleryComponent username={username} />
    </div>
  )
}
