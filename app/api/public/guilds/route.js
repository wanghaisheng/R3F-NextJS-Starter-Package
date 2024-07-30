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

    // Find the index of the element with guild_name: 'BUDDHA'
    const buddhaIndex = guilds.findIndex((guild) => guild.guild_name === 'BUDDHA')

    if (buddhaIndex > -1) {
      // Remove the element from its current position
      const [buddhaElement] = guilds.splice(buddhaIndex, 1)
      // Insert the element at the first position
      guilds.unshift(buddhaElement)
    }

    return NextResponse.json(guilds)
  } catch (error) {
    return NextResponse.error('Internal server error', 500)
  }
}
