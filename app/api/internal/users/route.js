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

    // guild_name: 'BUDDHA',
    // symbol: '/guild/buddha.png',
    // color: 'white',
    // element: 'Space',
    // description: 'Development, Engineering & ITAI Services',
    // skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
    // alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
    // additionalSkills: ['Innovation', 'data analysis', 'research'],

    // description: 'Development, Engineering & ITAI Services',
    // guild_name: 'BUDDHA',
    // soft_skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
    // color: 'white',
    // additional_skills: ['Innovation', 'data analysis', 'research'],
    // alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
    // symbol: '/guild/buddha.png',
    // gg_id: user.gg_id,

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.users.create({
      data: {
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
      },
    })
    // console.log(newUser.gg_id + '--' + newUser.email)
    await prisma.guilds.create({
      data: {
        description: 'Development, Engineering & ITAI Services',
        guild_name: 'BUDDHA',
        soft_skills: ['Clear vision', 'leadership', 'adaptability', 'communication'],
        color: 'white',
        additional_skills: ['Innovation', 'data analysis', 'research'],
        alignment: ['Strategic', 'planning', 'project management', 'problem-solving'],
        symbol: '/guild/buddha.png',
        gg_id: newUser.gg_id,
        element: 'Space',
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
