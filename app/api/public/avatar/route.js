import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const avatar = await prisma.avatar.findMany()
    return NextResponse.json(avatar)
  } catch (error) {
    console.error('Error fetching avatars', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
