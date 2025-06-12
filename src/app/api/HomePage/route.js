// app/api/HomePage/route.js
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// ───────────────────────────────────────────────────────────────
// GET: return the existing HomePage row (or an empty object if none)
// ───────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const existing = await prisma.homePage.findFirst()
    // If nothing exists yet, return an empty object
    return NextResponse.json(existing || {})
  } catch (error) {
    console.error('Error in GET /api/HomePage:', error)
    return NextResponse.json(
      { error: 'Failed to fetch homepage data' },
      { status: 500 }
    )
  }
}

// ───────────────────────────────────────────────────────────────
// POST: create or update the HomePage row
// ───────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const data = await request.json()

    const existing = await prisma.homePage.findFirst()
    let result

    if (existing) {
      result = await prisma.homePage.update({
        where: { id: existing.id },
        data: data,
      })
    } else {
      result = await prisma.homePage.create({ data })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in POST /api/HomePage:', error)
    return NextResponse.json(
      { error: error.message || 'Unknown server error' },
      { status: 500 }
    )
  }
}
