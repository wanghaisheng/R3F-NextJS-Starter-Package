import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const data = await request.json()
    const { email, password } = data

    // Check if email or password is null
    if (!email || !password) {
      return NextResponse.json(
        {
          message: 'Email and password are required fields.',
        },
        {
          status: 400,
        },
      )
    }

    // Check if the email already exists
    const existingEmail = await prisma.users.findUnique({
      where: { email },
    })

    if (existingEmail) {
      return NextResponse.json(
        {
          users: null,
          message: 'User with this email already exists!!!',
        },
        {
          status: 409,
        },
      )
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Error Creating User', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

//Function to read user data
export async function GET() {
  try {
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

    const users = await prisma.users.findMany({
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
        cards: true,
        experience: true,
        avatar: true,
        skills: true,
        faculty: true,
      },
    })
    const usersResponse = {
      first_name: users.first_name,
      last_name: users.last_name,
      username: users.username,
      email: users.email,
      image_urls: users.image_urls,
      description: users.description,
      guild_id: users.guild_id,
      address: users.address,
      region: users.region,
      age: calculateAge(users.dob),
      cards: users.cards,
      experience: users.experience,
      avatar: users.avatar,
      skills: users.skills,
      faculty: users.faculty,
    }

    return NextResponse.json(usersResponse)
  } catch (error) {
    console.error('Error fetching users', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
