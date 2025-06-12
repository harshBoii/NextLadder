import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma'; // Your Prisma instance
import { sendResetEmail } from '@/app/lib/sendEmail'; // Your email utility

export async function POST(req) {
  const { email } = await req.json();
    const student = await prisma.student.findUnique({ where: { email } });

  if (student) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: student.id,
        expiresAt: expires,
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    await sendResetEmail(student.email, resetLink);
  }

  return NextResponse.json({
    message: 'If that email exists, a reset link has been sent.',
  });
}
