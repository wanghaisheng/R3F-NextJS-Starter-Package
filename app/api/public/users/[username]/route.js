import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to read a user by ID
export async function GET(request, { params }) {
  try {
    const username = params.username

    function calculateAge(dob) {
      // Convert the date of birth from string to Date object
      const birthDate = new Date(dob)
      // Get the current date
      const currentDate = new Date()

      // Calculate the age
      let age = currentDate.getFullYear() - birthDate.getFullYear()
      const monthDiff = currentDate.getMonth() - birthDate.getMonth()

      // If the birth month hasn't occurred yet this year or it's the birth month but the day hasn't occurred yet, subtract 1 from age
      if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    }

    // Fetch the user by ID
    const user = await prisma.users.findUnique({
      where: { username: username },
      // manage the access of the relations
      select: {
        first_name: true,
        last_name: true,
        username: true,
        email: true,
        image_urls: true,
        description: true,
        guild_id: true,
        address: true,
        region: true,
        dob: true,
        cards: true,
        experience: true,
        avatar: true,
        skills: true,
        faculty: true,
      },
    })

    const userResponse = {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      image_urls: user.image_urls,
      description: user.description,
      guild_id: user.guild_id,
      address: user.address,
      region: user.region,
      age: calculateAge(user.dob),
      cards: user.cards,
      experience: user.experience,
      avatar: user.avatar,
      skills: user.skills,
      faculty: user.faculty,
    }

    if (!user) {
      return NextResponse.error('User not found', 404)
    }

    return NextResponse.json(userResponse)
  } catch (error) {
    console.error('Error fetching user', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
