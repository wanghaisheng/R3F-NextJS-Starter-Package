import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const id = params.id

    // Fetch the cards by ID
    const card = await prisma.cards.findUnique({
      where: { card_id: id },
    })

    if (!card) {
      return NextResponse.error('cards not found', 404)
    }

    return NextResponse.json(card)
  } catch (error) {
    console.error('Error fetching card', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

export async function PUT(request, { params }) {
  try {
    const { gg_id, type, name, description, tools } = await request.json()
    const id = params.id

    // Update the cards
    const updatedcard = await prisma.cards.update({
      where: { card_id: id },
      data: { gg_id, type, name, description, tools },
    })

    return NextResponse.json(updatedcard)
  } catch (error) {
    console.error('Error updating cards', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}

// Function to delete a cards
export async function DELETE(request, { params }) {
  try {
    const id = params.id

    // Delete the cards
    const deletedcard = await prisma.cards.delete({
      where: { card_id: id },
    })

    return NextResponse.json(deletedcard)
  } catch (error) {
    console.error('Error deleting cards', error)
    return NextResponse.error('Internal Server Error', 500)
  }
}
