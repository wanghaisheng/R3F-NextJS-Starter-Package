import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

export async function GET(request, { params }) {
  try {
    const id = params.id

    // Fetch the experience by ID
    const experience = await prisma.experience.findUnique({
      where: { experience_id: id },
    })

    if (!experience) {
      return NextResponse.error('experience not found', 404)
    }

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error fetching experience', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const { gg_id, type, name, description, tools, project_skills, project_picture, link } = await request.json()
    const id = params.id

    const existingExp = await prisma.experience.findUnique({
      where: { experience_id: id },
    })

    const newImageUrls = [...existingExp.project_pictures, project_picture ? project_picture : '']

    const filteredImageUrls = newImageUrls.filter((element) => element !== '')

    // Update the experience
    const updatedexperience = await prisma.experience.update({
      where: { experience_id: id },
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

    return NextResponse.json(updatedexperience)
  } catch (error) {
    console.error('Error updating experience', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to delete a experience
export async function DELETE(request, { params }) {
  try {
    const id = params.id

    // Delete the experience
    const deletedexperience = await prisma.experience.delete({
      where: { experience_id: id },
    })

    return NextResponse.json(deletedexperience)
  } catch (error) {
    console.error('Error deleting experience', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
