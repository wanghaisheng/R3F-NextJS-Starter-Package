import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// create new card
export async function POST(request) {
  try {
    const { gg_id, type, name, description, tools, skills } = await request.json()

    // Check if the user exists
    const existingUser = await prisma.users.findUnique({
      where: { gg_id },
    })

    if (!existingUser) {
      return NextResponse.error('User not found', 404)
    }

    // Create skills data
    const skillData = skills.map((skillObj) => ({
      skill: skillObj.skill,
      percentage: skillObj.percentage,
    }))

    // Create new experience with skills
    const newExperience = await prisma.experience.create({
      data: {
        gg_id,
        type,
        name,
        description,
        tools,
        skills: skillData,
      },
    })

    return NextResponse.json(newExperience)
  } catch (error) {
    console.error('Error Creating Card', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// read all cards
export async function GET() {
  try {
    const skills = await prisma.experience.findMany()
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
