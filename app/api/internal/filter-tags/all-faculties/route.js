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

async function getGuildId(faculty_name) {
  const guilds = await prisma.guilds.findMany({})
  const guild = guilds.find((guild) => guild.faculty.filter((faculty) => faculty.faculty_name === faculty_name))
  return guild ? guild.guild_id : null
}

async function getUser(guild_id) {
  const users = await prisma.users.findMany({
    where: {
      guild_id: guild_id,
    },
  })
  return users
}

export async function POST(request) {
  try {
    const { inputTags } = await request.json()

    // Ensure all guild IDs are fetched before mapping users
    const filteredGuildIds = await Promise.all(inputTags.map((tag) => getGuildId(tag)))

    // Filter out any null guild IDs
    const validGuildIds = filteredGuildIds.filter((id) => id !== null)

    // Fetch all users based on valid guild IDs
    const filteredUsers = await Promise.all(validGuildIds.map((guild_id) => getUser(guild_id)))

    return NextResponse.json(filteredUsers)
  } catch (error) {
    console.error(error)
    return NextResponse.error('internal server error', 500)
  }
}
