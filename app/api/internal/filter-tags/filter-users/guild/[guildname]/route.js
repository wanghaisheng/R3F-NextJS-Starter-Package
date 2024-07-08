import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const guild_name = params.guildname.toUpperCase()
    const guild = await prisma.guilds.findMany({
      where: {
        guild_name: guild_name,
      },
    })

    const users = await prisma.users.findMany({
      where: {
        guild_id: guild.guild_id,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
