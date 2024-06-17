import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request) {
  try {
    const { username, phone_number, email, password } = await request.json()

    // Find the user by email
    const user = await prisma.users.findUnique({
      where: {
        OR: [{ username: username }, { email: email }, { phone_number: phone_number }],
      },
    })

    // Check if user exists
    if (!user) {
      // If user doesn't exist, return error indicating incorrect email

      return NextResponse.json({ error: 'User does not exist' }, { status: 404 })
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      // If password doesn't match, return error indicating incorrect password

      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.gg_id }, JWT_SECRET, { expiresIn: '1h' })

    // Return token upon sign in
    return NextResponse.json({ token })
  } catch (error) {
    console.error('Error signing in:', error)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
