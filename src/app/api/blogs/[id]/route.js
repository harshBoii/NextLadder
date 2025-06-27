import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch a single blog by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // Increment visit count
    await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        visitNumbers: {
          increment: 1
        }
      }
    });

    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
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

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT - Update a blog
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, picture } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: { title, content, picture: picture || null },
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

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// PATCH - Update upvote count
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body; // 'upvote' or 'downvote'

    if (!action || !['upvote', 'downvote'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        upvote: {
          increment: action === 'upvote' ? 1 : -1
        }
      },
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

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error updating upvote:', error);
    return NextResponse.json(
      { error: 'Failed to update upvote' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.blog.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 