import { NextResponse } from 'next/server'
import { encrypt } from '../../../auth'

export async function POST(request) {
  try {
    const { gg_id, email, role } = await request.json()

    if (!gg_id || !email || !role) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    const sessionToken = await encrypt({ gg_id, email, role, expiresAt })

    return NextResponse.json({ sessionToken })
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
