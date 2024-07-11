import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const guilds = await prisma.guilds.findMany({
      select: {
        faculty: true,
      },
    })
    const faculties = guilds.map((guild) => guild.faculty.map((element) => Object.values(element)[0]))
    return NextResponse.json(faculties.flat())
  } catch (error) {
    console.error(error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
