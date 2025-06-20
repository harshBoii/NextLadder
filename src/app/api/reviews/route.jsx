import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        course: {
          select: {
            imageUrl: true
          }
        },
        user: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedReviews = reviews.map(review => ({
      id: review.id,
      icon: review.company.logoUrl || '/default-course-image.jpg',
      avatar: review.student.image || `https://i.pravatar.cc/150?img=${review.id}`,
      review: review.reviewText,
      name: review.reviewerName
    }));

    return NextResponse.json(formattedReviews);

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
