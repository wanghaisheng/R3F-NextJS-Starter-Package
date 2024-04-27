import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    const { gg_id, type, name, description, tools } = await request.json()
    const id = params.id

    // Update the experience
    const updatedexperience = await prisma.experience.update({
      where: { experience_id: id },
      data: { gg_id, type, name, description, tools },
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
