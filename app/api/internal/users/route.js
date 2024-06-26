import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const data = await request.json()
    const { username, email, password } = data

    // Check if email or password is null
    if (!username || !email || !password) {
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
      where: { username, email },
    })

    if (existingEmail) {
      return NextResponse.json(
        {
          users: null,
          message: 'User with this email and username already exists!!!',
        },
        {
          status: 409,
        },
      )
    }

    const guild = await prisma.guilds.findUnique({
      where: {
        guild_name: 'BUDDHA',
      },
    })

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        region: {
          ip: '',
          city: '',
          country_name: '',
          continent_code: '',
          latitude: '',
          longitude: '',
        },
        guild_id: guild.id,
        faculty: {
          primary_facluty: '',
          optional_faculty: '',
        },
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
    const users = await prisma.users.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
