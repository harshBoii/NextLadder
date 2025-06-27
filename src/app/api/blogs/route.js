import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all blogs
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        professor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create a new blog
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, picture, authorId, authorType } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For admin-authored blogs, we don't need authorId
    if (authorType !== 'admin' && !authorId) {
      return NextResponse.json(
        { error: 'Author ID is required for non-admin blogs' },
        { status: 400 }
      );
    }

    const blogData = {
      title,
      content,
      picture: picture || null,
      visitNumbers: 0,
      upvote: 0,
      // Only set authorId if it's not an admin blog
      ...(authorType !== 'admin' && authorId ? {
        ...(authorType === 'student' ? { studentId: parseInt(authorId) } : { professorId: parseInt(authorId) })
      } : {})
    };

    const blog = await prisma.blog.create({
      data: blogData,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        professor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
} 