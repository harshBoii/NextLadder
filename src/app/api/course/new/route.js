import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // 1) Parse the multipart/form-data
    const formData = await request.formData();
    const title = formData.get('title');
    const category = formData.get('category');
    const description = formData.get('description');
    const professorId = formData.get('professorId');
    const professorName = formData.get('professorName');
    const noOfStudents = formData.get('noOfStudents');
    const hours = formData.get('hours');
    const placementRate = formData.get('placementRate');
    const companiesHiring = formData.get('companiesHiring');
    const averageHike = formData.get('averageHike');
    const learner = formData.get('learner');
    const highlightedOn = formData.get('highlightedOn');
    const ExpertFrom = formData.get('ExpertFrom');
    const imageFile = formData.get('image');
    const tags = formData.get('tags'); // Get tags as JSON string
    const projects = formData.get('projects');
    const keySkills = formData.get('courseType');

    console.log("keySkills", keySkills);
    console.log("tags", tags);

    // 2) Basic validation
    if (!title || !category || !professorId) {
      return NextResponse.json(
        { error: 'Title, category & professorId are required.' },
        { status: 400 }
      );
    }

    // 3) Save the uploaded image (if provided)
    let imageUrl = null;
    if (imageFile && imageFile instanceof File) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const timestamp = Date.now();
      const originalName = imageFile.name || `${timestamp}`;
      const ext = path.extname(originalName) || '.jpg';
      const filename = `${timestamp}${ext}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      await fs.mkdir(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    // Parse tags from JSON string
    let parsedTags = [];
    try {
      parsedTags = tags ? JSON.parse(tags) : [];
      console.log("parsedTags", parsedTags);
    } catch (e) {
      console.error('Error parsing tags:', e);
      parsedTags = [];
    }

    let parsedkeySkills = [];
    try {
      parsedkeySkills = keySkills ? JSON.parse(keySkills) : [];
      console.log("parsedkeySkills", keySkills);
    } catch (e) {
      console.error('Error parsing keySkills:', e);
      parsedkeySkills = [];
    }


    // 4) Create the Course in Prisma with tags
    const newCourse = await prisma.course.create({
      data: {
        title: String(title),
        category: String(category),
        description: description ? String(description) : null,
        professor: {
          connectOrCreate: {
            where: { id: Number(professorId) },
            create: { name: String(professorName), email: 'placeholder@example.com' },
          },
        },
        noOfStudents: noOfStudents ? Number(noOfStudents) : 0,
        hours: hours ? Number(hours) : 0,
        placementRate: placementRate ? Number(placementRate) : 0,
        companiesHiring: companiesHiring ? Number(companiesHiring) : 0,
        averageHike: averageHike ? Number(averageHike) : 0,
        learner: learner ? Number(learner) : 0,
        highlightedOn: highlightedOn ? String(highlightedOn) : null,
        ExpertFrom: ExpertFrom ? String(ExpertFrom) : null,
        imageUrl,
        courseTags: {
          create: parsedTags.map(tag => ({
            tag: {
              connect: { id: tag },
            }
          }))
        },
        projects: projects ? String(projects) : null,
        courseKeySkills: {
            create: parsedkeySkills.map(keySkill => ({
            keySkill: {
              connect: { id: keySkill },
            }
          }))
        },
      },
      include: {
        courseTags: {
          include: {
            tag: true
          }
        },
        courseKeySkills: {
          include: {
            keySkill: true
          }
        } 
      }
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (err) {
    console.error('Error creating course:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
