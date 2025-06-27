import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all courses from the database with valid related data
    const courses = await prisma.course.findMany({
      include: {
        professor: true,
        enrollments: true,
        reviews: true,
        courseTags: {
          include: {
            tag: true
          }
        },
        courseKeySkills: {
          include: {
            keySkill: true
          }
        }
      }
    });

    return NextResponse.json(courses);

  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

