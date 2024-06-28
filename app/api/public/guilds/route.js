import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const data = await request.json()
    const {
      description,
      guild_name,
      avatar_img,
      soft_skills,
      additional_skills,
      color,
      symbol,
      gg_id,
      alignment,
      element,
    } = data
    const new_guild = await prisma.guilds.create({
      data: {
        description,
        guild_name,
        avatar_img,
        soft_skills,
        additional_skills,
        color,
        symbol,
        gg_id,
        alignment,
        element,
      },
    })
    return NextResponse.json(new_guild)
  } catch (error) {
    console.error('error creating guild', error)
    return NextResponse.error('Internal server error', 500)
  }
}

export async function GET(request) {
  try {
    const guilds = await prisma.guilds.findMany({
      select: {
        id: true,
        description: true,
        guild_name: true,
        avatar_img: true,
        skills: true,
        additionalSkills: true,
        symbol: true,
        color: true,
        alignment: true,
        element: true,
        faculty: true,
        guild_frame: true,
      },
    })
    return NextResponse.json(guilds)
  } catch (error) {
    console.error('error fetching guilds', error)
    return NextResponse.error('Internal server error', 500)
  }
}
