import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

export async function POST(request) {
  try {
    const data = await request.json()
    const { avatar_url, gg_id } = data
    const avatar = await prisma.avatar.create({
      data: {
        avatar_url,
        gg_id,
      },
    })
    return NextResponse.json(avatar)
  } catch (error) {
    console.error('failed to create the avatar', error)
    return NextResponse.error('internal server error', 500)
  }
}


export async function GET() {
  try {
    const avatar = await prisma.avatar.findMany()
    return NextResponse.json(avatar)
  } catch (error) {
    console.error('Error fetching avatars', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
