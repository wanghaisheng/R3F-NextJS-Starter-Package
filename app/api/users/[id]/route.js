import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to read a user by ID
export async function GET(request, { params }) {
  try {
    const id = params.id

    // Fetch the user by ID
    const user = await prisma.users.findUnique({
      where: { gg_id: id },
      // manage the access of the relations
      include: {
        cards: true,
        experience: {
          include: {
            skills: {
              select: { skill: true, percentage: true }, // Include only the 'skill' field
            },
          },
        },
        avatar: true,
      },
    })

    if (!user) {
      return NextResponse.error('User not found', 404)
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const { first_name, last_name, email, phone_number, image_url, description, address, dob } = data
    const id = params.id

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id: id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // If the user exists, update their information
    const updatedUser = await prisma.users.update({
      where: { gg_id: id },
      data: { first_name, last_name, email, phone_number, image_url, description, address, dob },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error Updating user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to delete user
export async function DELETE(request, { params }) {
  try {
    const id = params.id
    const deletedUser = await prisma.users.delete({
      where: { gg_id: id },
    })
    return NextResponse.json(deletedUser)
  } catch (error) {
    console.error('Error deleting user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
