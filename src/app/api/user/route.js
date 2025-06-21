import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const { name } = await request.json();
    const createdUser = await prisma.user.create({ data: { name } });
    return NextResponse.json({ createdUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
