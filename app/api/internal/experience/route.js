import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

// create new card
export async function POST(request) {
  try {
    const data = await request.json()
    const { gg_id, type, name, description, tools, project_skills, project_picture, link } = data

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    const newImageUrls = [project_picture ? project_picture : '']

    const filteredImageUrls = newImageUrls.filter((element) => element !== '')

    // Create new experience with skills
    const newExperience = await prisma.experience.create({
      data: {
        gg_id,
        type,
        name,
        description,
        tools,
        project_skills,
        project_pictures: filteredImageUrls,
        link,
      },
    })

    return NextResponse.json(newExperience)
  } catch (error) {
    console.error('Error Creating Experience', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// read all cards
export async function GET() {
  try {
    const skills = await prisma.experience.findMany()
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
