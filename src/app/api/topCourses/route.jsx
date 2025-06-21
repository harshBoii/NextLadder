import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // 1. Get average rating and count of reviews per course
    const ratingStats = await prisma.review.groupBy({
      by: ['courseId'],
      _avg: {
        noOfStudents: true
      },
      _count: {
        noOfStudents: true
      },
      orderBy: {
        _avg: {
          noOfStudents: 'desc'
        }
      },
      take: 6
    });

    // 2. Fetch the full course details for the top 6 courses
    const topCourses = await Promise.all(
      ratingStats.map(async (stat) => {
        const course = await prisma.course.findUnique({
          where: { id: stat.id },
          include: {
            professor: {
              select: { name: true }
            }
          }
        });

        if (!course) return null;

        return {
          id: course.id,
          title: course.title,
          description: course.description || '',
          image: course.imageUrl || '/default-course-image.jpg',
          hours: course.hours,
          students: course.noOfStudents,
          professor: course.professor.name,
        };
      })
    );

    return NextResponse.json(topCourses.filter(Boolean)); // Filter out nulls just in case

  } catch (error) {
    console.error('Error fetching top courses:', error);
    return NextResponse.json({ error: 'Failed to fetch top courses' }, { status: 500 });
  }
}
