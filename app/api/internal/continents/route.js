import { NextResponse } from 'next/server'
import prisma from 'prisma/client'

export async function GET(request) {
  const continents = await prisma.continents.findMany()
  return NextResponse.json(continents)
}
