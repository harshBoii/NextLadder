import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { token, password } = await req.json();

  const tokenEntry = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { student: true },
  });

  if (!tokenEntry || tokenEntry.expiresAt < new Date()) {
    return NextResponse.json({ message: 'Invalid or expired token.' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.student.update({
    where: { id: tokenEntry.userId },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return NextResponse.json({ message: 'Password reset successful.' });
}
