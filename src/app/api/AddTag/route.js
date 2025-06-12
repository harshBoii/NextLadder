
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// ───────────────────────────────────────────────────────────────
// POST: create a new tag in the database
// ───────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const data = await request.json()
    const { name, image } = data

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Tag name is required' },
        { status: 400 }
      )
    }

    // Create the tag in the database
    const tag = await prisma.Tag.create({
      data: {
        name,
        image: image
      }
    })

    return NextResponse.json(tag)
  } catch (error) {
    console.error('Error in POST /api/AddTag:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create tag' },
      { status: 500 }
    )
  }
}

// ───────────────────────────────────────────────────────────────
// GET: retrieve all tags from the database
// ───────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error in GET /api/AddTag:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tags' },
      { status: 500 }
    )
  }
}
