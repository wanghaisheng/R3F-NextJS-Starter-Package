import DiscoverPage from '@/components/HomePage/DiscoverPage'
import { NextResponse } from 'next/server'

async function getFacultyTags() {
  try {
    const res = await fetch('http://localhost:3000/api/public/filter-tags/all-faculties')
    if (!res.ok) {
      throw new Error('failed to fetch faculty tags')
    }
    return res.json()
  } catch (error) {
    console.error(error)
    return NextResponse.error('internal server error', 500)
  }
}

const Discover = async () => {
  const facultyTags = await getFacultyTags()
  return (
    <div>
      <DiscoverPage facultyTags={facultyTags} />
    </div>
  )
}

export default Discover
