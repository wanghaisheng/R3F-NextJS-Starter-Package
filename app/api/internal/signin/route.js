import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request) {
  try {
    const { username, email, password } = await request.json()

    // Build an array of conditions, including only those that are defined
    const conditions = [
      username && { username },
      email && { email },
      // phone_number && { phone_number } // Include phone_number if needed
    ].filter(Boolean) // Filter out any undefined or false values

    // If no valid conditions are provided, throw an error
    if (conditions.length === 0) {
      throw new Error('At least one of username or email must be provided')
    }

    // Query the database with the valid conditions using findFirst
    const user = await prisma.users.findFirst({
      where: {
        OR: conditions,
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
