import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const { image_url, description } = data
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
      data: { image_url, description },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error Updating user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
