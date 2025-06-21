import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // First fetch the homepage data to get the course IDs
    const homepage = await prisma.homePage.findFirst();
    
    if (!homepage) {
      return NextResponse.json({ error: 'Homepage data not found' }, { status: 404 });
    }

    // Get the course IDs
    const courseIds = [
      homepage.FirstCourseId,
      homepage.SecondCourseId,
      homepage.ThirdCourseId
    ].filter(id => id !== null); // Filter out any null IDs

    // Fetch the corresponding courses
    const courses = await prisma.course.findMany({
      where: {
        id: {
          in: courseIds
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        hours: true,
        noOfStudents: true
      }
    });

    // Transform the data to match the expected format for the cards
    const cards = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description || '',
      image: course.imageUrl || '/default-course-image.jpg',
      hours: course.hours,
      students: course.noOfStudents
    }));

    return NextResponse.json(cards);

  } catch (error) {
    console.error('Error fetching swipeable cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch swipeable cards' },
      { status: 500 }
    );
  }
}
