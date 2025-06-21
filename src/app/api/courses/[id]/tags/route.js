import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request,context) {
  try {
    const params  = await context.params;
    const courseId =  parseInt(params.id);

    if (isNaN(courseId)) {
      return NextResponse.json(
        { error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    // Fetch course tags through the CourseTag relation
    const courseTags = await prisma.courseTag.findMany({
      where: {
        courseId: courseId
      },
      include: {
        tag: true
      }
    });

    // Extract tag data with name and icon
    const tags = courseTags.map(courseTag => ({
      name: courseTag.tag.name,
      icon: courseTag.tag.image || "🏷️" // Default icon if none exists
    }));

    return NextResponse.json(tags);

  } catch (error) {
    console.error('Error fetching course tags:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course tags' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

