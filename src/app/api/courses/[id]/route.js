import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    // Fetch course data by ID
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(id)
      },
      include:{
        professor:true
      }
    });

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(course);

  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}
