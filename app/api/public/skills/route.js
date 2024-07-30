import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

// Function to read all skills
export async function GET() {
  try {
    const skills = await prisma.skills.findMany()
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
