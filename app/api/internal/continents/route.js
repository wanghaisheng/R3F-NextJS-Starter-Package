import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request) {
  const continents = await prisma.continents.findMany()
  return NextResponse.json(continents)
}
