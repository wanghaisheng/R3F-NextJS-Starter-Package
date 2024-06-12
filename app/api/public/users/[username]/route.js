import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to read a user by ID
export async function GET(request, { params }) {
  try {
    const username = params.username

    // Fetch the user by ID
    const user = await prisma.users.findUnique({
      where: { username: username },
      // manage the access of the relations
      include: {
        cards: true,
        experience: true,
        avatar: true,
        skills: true,
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
