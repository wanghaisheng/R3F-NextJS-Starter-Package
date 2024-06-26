import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const id = params.id
    const guild = await prisma.guilds.findUnique({
      where: {
        id: id,
      },
    })

    if (!guild) {
      return NextResponse.error('guild not found', 404)
    }

    return NextResponse.json(guild)
  } catch (error) {
    console.error('failed to fetch guild', error)
    return NextResponse.error('internal server error', 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const id = params.id
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
    const updated_guild = await prisma.guilds.update({
      where: {
        id: id,
      },
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
    return NextResponse.json(updated_guild)
  } catch (error) {
    console.error('failed to update the guild', error)
    return NextResponse.error('internal server error', 500)
  }
}
