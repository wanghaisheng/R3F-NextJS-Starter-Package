import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

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
      alignment,
      element,
      faculty,
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
        alignment,
        element,
        faculty,
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
    const guilds = await prisma.guilds.findMany()
    return NextResponse.json(guilds)
  } catch (error) {
    console.error('error fetching guilds', error)
    return NextResponse.error('Internal server error', 500)
  }
}
