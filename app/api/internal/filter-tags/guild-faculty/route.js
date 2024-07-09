import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const guilds = await prisma.guilds.findMany({
      select: {
        guild_name: true,
        faculty: true,
      },
    })
    const faculties = guilds.flatMap((guild) => ({
      [guild.guild_name]: guild.faculty.map((faculty) => Object.values(faculty)[0]),
    }))
    return NextResponse.json(faculties)
  } catch (error) {
    console.error(error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
