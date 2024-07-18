import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

export async function GET(request, { params }) {
  try {
    const id = params.id
    const avatars = await prisma.avatar.findMany({
      where: {
        gg_id: id,
      },
    })

    if (!avatars) {
      return NextResponse.error('no avatar of this user exits', 400)
    }
    return NextResponse.json(avatars)
  } catch (error) {
    console.error(error)
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const { avatarUrl } = data
    const id = params.id

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id: id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // If the user exists, update their avatar URL
    const updatedUser = await prisma.users.update({
      where: { gg_id: id },
      data: { avatar_url: avatarUrl },
    })
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating user avatar URL', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id
    const avatar = await prisma.avatar.delete({
      where: {
        avatar_id: id,
      },
    })
    return NextResponse.json(avatar)
  } catch (error) {
    console.error('Error deleting the avatar', error)
    return NextResponse.error('Internal server Error', 500)
  }
}
