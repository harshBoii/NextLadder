// File: src/app/api/upload/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = { runtime: 'nodejs' };

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(request) {
  console.log('Upload endpoint hit:', request.method);
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    // Parse multipart formData from web Request
    const formData = await request.formData();
    const file = formData.get('image');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const filenameOriginal = file.name;
    const timestamp = Date.now();
    const sanitized = filenameOriginal.replace(/[^a-zA-Z0-9.\-]/g, '_');
    const filename = `${timestamp}-${sanitized}`;
    const filePath = path.join(uploadDir, filename);

    // Read file data
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Write to disk
    fs.writeFileSync(filePath, buffer);
    console.log('File saved to disk:', filePath);

    const url = `/uploads/${filename}`;
    console.log('Upload successful, URL:', url);
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
