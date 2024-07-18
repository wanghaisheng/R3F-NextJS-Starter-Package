import DiscoverPage from '@/components/HomePage/DiscoverPage'
import { NextResponse } from 'next/server'

async function getFacultyTags() {
  try {
    const res = await fetch('http://r3-f-next-js-starter-package.vercel.app/api/public/filter-tags/all-faculties')
    if (!res.ok) {
      throw new Error('failed to fetch faculty tags')
    }
    return res.json()
  } catch (error) {
    return NextResponse.error('internal server error', 500)
  }
}

const Discover = async () => {
  const facultyTags = await getFacultyTags()
  if (facultyTags) {
    return (
      <div>
        <DiscoverPage facultyTags={facultyTags} />
      </div>
    )
  } else {
    return <loader></loader>
  }
}

export default Discover
