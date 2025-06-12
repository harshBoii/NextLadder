import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all courses and group them by category
    const categoryStats = await prisma.course.groupBy({
      by: ['category'],
      _count: {
        category: true
      }
    });

    // Transform the data into a more readable format
    const categories = categoryStats.map(stat => ({
      category: stat.category,
      count: stat._count.category
    }));

    return NextResponse.json(categories);

  } catch (error) {
    console.error('Error fetching course categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course categories' },
      { status: 500 }
    );
  }
}
