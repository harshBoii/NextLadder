-- PostgreSQL compatible SQL dump
BEGIN;

CREATE TABLE IF NOT EXISTS "Student" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT
);

CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    "token" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Professor" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

INSERT INTO "Professor" VALUES(1,'ArunDip','placeholder@example.com');
INSERT INTO "Professor" VALUES(2,'ArunDip','placeholder@example.com');
INSERT INTO "Professor" VALUES(3,'Amresh Rao','placeholder@example.com');
INSERT INTO "Professor" VALUES(4,'Amresh Rao','placeholder@example.com');

CREATE TABLE IF NOT EXISTS "Course" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "professorId" INTEGER NOT NULL,
    "placementRate" INTEGER NOT NULL,
    "companiesHiring" INTEGER NOT NULL,
    "averageHike" INTEGER NOT NULL,
    "learner" INTEGER NOT NULL,
    "highlightedOn" TEXT,
    "ExpertFrom" TEXT,
    "noOfStudents" INTEGER NOT NULL DEFAULT 0,
    "hours" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT, 
    "projects" TEXT,
    CONSTRAINT "Course_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "Course" VALUES(1,'Web Developer','Dev','Mern Stack',1,95,120,150,3,'HighLighter','Maang',21,4,'/uploads/1749321982527.webp',NULL);
INSERT INTO "Course" VALUES(2,'Mern Stack','For Freshers','Habkjlj',1,89,200,200,567,'HighLighter','Maang',2,2,'/uploads/1749324707300.png',NULL);
INSERT INTO "Course" VALUES(3,'Web Development','For Professionals','Nothing',1,580,560,200,289,'HighLighter','Maang',9,120,'/uploads/1749325090515.png',NULL);
INSERT INTO "Course" VALUES(4,'hhh','For Freshers','hhh',1,1,1,2,1,'HighLighter','Maang',2,2,NULL,NULL);
INSERT INTO "Course" VALUES(5,'Mern Stack Developer','For Freshers','Learn Mern in Easiest Way Possible',2,100,120,789,900,'HighLighter','Maang',56,120,'/uploads/1749327264729.png','9');
INSERT INTO "Course" VALUES(6,'Finale Course','For Professionals','Almost Done I guess',2,3,4,4,4,'HighLighter','Maang',2,3,'/uploads/1749334553488.png','2');
INSERT INTO "Course" VALUES(7,'Mordern Web Application 1','For Freshers','A comprehensive, hands-on course that teaches the essentials of modern web development using the latest tools and technologies. You''ll learn how to build responsive, dynamic, and scalable web applications using HTML5, CSS3, JavaScript (ES6+), React, Next.js, Node.js, Express, and MongoDB. The course covers both frontend and backend development, RESTful APIs, deployment strategies, and version control with Git & GitHub. Ideal for beginners and intermediate developers aiming to become full-stack professionals.',1,95,120,80,95,'HighLighter','Maang',95,27,'/uploads/1750419784375.jpg','120');
INSERT INTO "Course" VALUES(8,'Morden Web Dev 2','For Professionals','A hands‑on journey into today''s web‑development landscape, where you''ll master HTML5, CSS3, and modern JavaScript (ES6+) before diving into React and Next.js for building interactive UIs. On the server side, explore Node.js with Express to create robust APIs, and learn to store and query data using MongoDB. Throughout, you''ll practice version control with Git/GitHub, implement responsive design, and deploy full‑stack applications to the cloud. Perfect for anyone looking to bridge the gap from static pages to dynamic, production‑ready web apps.',2,95,70,85,120,'HighLighter','Maang',80,85,'/uploads/1750422931255.png','100');
INSERT INTO "Course" VALUES(9,'UI/UX','For Professionals','A hands‑on UI/UX design journey where you''ll learn to craft intuitive, user‑centered interfaces and seamless experiences. You''ll start with the fundamentals of user research, information architecture, and wireframing, then level up to high‑fidelity prototyping in Figma (or Sketch/Adobe XD). Along the way, you''ll explore usability testing methods, accessibility best practices, and interaction design principles. By the end, you''ll have a polished design portfolio showcasing responsive mockups, interactive prototypes, and data‑driven design decisions—ready to collaborate with developers and stakeholders on real‑world products.',3,100,10,96,120,'HighLighter','Maang',90,26,NULL,'120');
INSERT INTO "Course" VALUES(10,'UI/UX Beginner','For Freshers','An entry‑level UI/UX bootcamp designed for freshers—no prior design experience needed. You''ll begin by understanding core concepts like user empathy, design thinking, and wireframing, then move into hands‑on lessons in Figma (or Sketch/Adobe XD) to build your first prototypes. Learn best practices for usability testing, accessibility, and responsive layouts, all while developing a guided portfolio project. By course end, you''ll confidently present a complete case study—from user research to high‑fidelity mockups—ready to kickstart your career as a UI/UX designer.',4,100,10,96,120,'HighLighter','Maang',90,26,'/uploads/1750423320208.png','120');

CREATE TABLE IF NOT EXISTS "Enrollment" (
    "studentId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    PRIMARY KEY ("studentId", "courseId"),
    CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Blog" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "studentId" INTEGER,
    "professorId" INTEGER,
    CONSTRAINT "Blog_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Blog_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Company" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "address" TEXT
);

CREATE TABLE IF NOT EXISTS "Review" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "reviewerName" TEXT NOT NULL,
    "reviewerJobTitle" TEXT,
    "reviewerPicture" TEXT,
    "reviewText" TEXT NOT NULL,
    "reviewType" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "Review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Tag" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

INSERT INTO "Tag" VALUES(1,'Jiju Ki Biwi','/uploads/1749323431416-download__1_.webp');
INSERT INTO "Tag" VALUES(2,'Mern','/uploads/1749324157314-Placement_assistance.png');
INSERT INTO "Tag" VALUES(3,'PlaceMent Issues','');
INSERT INTO "Tag" VALUES(4,'Smriti','');
INSERT INTO "Tag" VALUES(5,'AC','');
INSERT INTO "Tag" VALUES(6,'Application Development','');
INSERT INTO "Tag" VALUES(7,'App Dev','/uploads/1750422626584-download__1_.webp');
INSERT INTO "Tag" VALUES(8,'JavaScript','/uploads/1750422659163-Placement_assistance.png');
INSERT INTO "Tag" VALUES(9,'Trending','/uploads/1750422688570-download__1_.webp');
INSERT INTO "Tag" VALUES(10,'UI/UX','/uploads/1750423177768-Placement_assistance.png');

CREATE TABLE IF NOT EXISTS "CourseTag" (
    "courseId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    PRIMARY KEY ("courseId", "tagId"),
    CONSTRAINT "CourseTag_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "CourseTag" VALUES(4,5);
INSERT INTO "CourseTag" VALUES(4,3);
INSERT INTO "CourseTag" VALUES(4,1);
INSERT INTO "CourseTag" VALUES(4,2);
INSERT INTO "CourseTag" VALUES(5,2);
INSERT INTO "CourseTag" VALUES(5,5);
INSERT INTO "CourseTag" VALUES(6,2);
INSERT INTO "CourseTag" VALUES(6,3);
INSERT INTO "CourseTag" VALUES(7,2);
INSERT INTO "CourseTag" VALUES(8,7);
INSERT INTO "CourseTag" VALUES(8,2);
INSERT INTO "CourseTag" VALUES(8,9);
INSERT INTO "CourseTag" VALUES(9,10);
INSERT INTO "CourseTag" VALUES(9,2);
INSERT INTO "CourseTag" VALUES(9,7);
INSERT INTO "CourseTag" VALUES(10,10);
INSERT INTO "CourseTag" VALUES(10,2);
INSERT INTO "CourseTag" VALUES(10,7);

CREATE TABLE IF NOT EXISTS "homePage" (
    "id" SERIAL PRIMARY KEY,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT,
    "heroImageUrl" TEXT,
    "FirstCourseId" TEXT,
    "SecondCourseId" TEXT,
    "ThirdCourseId" TEXT,
    "CategoriesTitle" TEXT,
    "TopCoursesTitle" TEXT,
    "WhyChooseUs" TEXT,
    "AboutUsTitle" TEXT,
    "AboutUsContent" TEXT,
    "AboutUsImageUrl" TEXT,
    "AboutUsImageUrl2" TEXT,
    "AboutUsImageUrl3" TEXT,
    "Personalized" TEXT,
    "ReviewsTitle" TEXT,
    "PopularPost" TEXT,
    "LogoUrl" TEXT,
    "ContactUsPrompt" TEXT,
    "Phone" BIGINT,
    "Email" TEXT,
    "Location" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

INSERT INTO "homePage" VALUES(1,'Build The Skills To Drive Your Career','Unlock your full professional potential by developing the strategic skills and industry know‑how that set top performers apart. From mastering cutting‑edge technologies and communication techniques to honing critical thinking and leadership abilities, this program empowers you to tackle real‑world challenges with confidence. Elevate your career trajectory and make an impact that resonates across teams, organizations, and industries','/uploads/1750430056214-a9a226170787f40c1636db68c677184b2474ba53.png','','','','Explore Top Courses Caterories That Change Yourself','Histudy Course student can join with us.','Creating A Community Of Life Long Learners.','Know About Histudy Learning Platform','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.','',NULL,NULL,'Personalised guidance to prepare you for your interview needs','People like histudy education. No joking - here''s the proof!','Post Popular Post.','/uploads/1749290662104-5cdc7224a7562475e3bffffc076fd62b9bbe265a.png','',NULL,'','',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS "KeySkill" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

INSERT INTO "KeySkill" VALUES(1,'Web Development','');
INSERT INTO "KeySkill" VALUES(2,'Mern','');
INSERT INTO "KeySkill" VALUES(3,'PlaceMent Course','/uploads/1749330372669-download__1_.webp');
INSERT INTO "KeySkill" VALUES(4,'Learn Next','/uploads/1749330473117-Placement_assistance.png');
INSERT INTO "KeySkill" VALUES(5,'Learn FastApi','/uploads/1749330496973-5cdc7224a7562475e3bffffc076fd62b9bbe265a.png');

CREATE TABLE IF NOT EXISTS "CourseKeySkills" (
    "courseId" INTEGER NOT NULL,
    "keyId" INTEGER NOT NULL,
    PRIMARY KEY ("courseId", "keyId"),
    CONSTRAINT "CourseKeySkills_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CourseKeySkills_keyId_fkey" FOREIGN KEY ("keyId") REFERENCES "KeySkill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "CourseKeySkills" VALUES(6,3);
INSERT INTO "CourseKeySkills" VALUES(6,2);
INSERT INTO "CourseKeySkills" VALUES(6,4);
INSERT INTO "CourseKeySkills" VALUES(6,5);
INSERT INTO "CourseKeySkills" VALUES(7,5);
INSERT INTO "CourseKeySkills" VALUES(8,4);
INSERT INTO "CourseKeySkills" VALUES(8,1);
INSERT INTO "CourseKeySkills" VALUES(9,1);
INSERT INTO "CourseKeySkills" VALUES(9,3);
INSERT INTO "CourseKeySkills" VALUES(10,1);
INSERT INTO "CourseKeySkills" VALUES(10,3);

CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
CREATE INDEX "Student_name_idx" ON "Student"("name");
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");
CREATE INDEX "Professor_name_idx" ON "Professor"("name");
CREATE INDEX "Course_title_idx" ON "Course"("title");
CREATE INDEX "Course_professorId_idx" ON "Course"("professorId");
CREATE INDEX "Blog_createdAt_idx" ON "Blog"("createdAt");
CREATE INDEX "Blog_studentId_idx" ON "Blog"("studentId");
CREATE INDEX "Blog_professorId_idx" ON "Blog"("professorId");
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");
CREATE INDEX "Company_name_idx" ON "Company"("name");
CREATE INDEX "Review_studentId_idx" ON "Review"("studentId");
CREATE INDEX "Review_companyId_idx" ON "Review"("companyId");
CREATE INDEX "Review_courseId_idx" ON "Review"("courseId");
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
CREATE INDEX "Tag_name_idx" ON "Tag"("name");
CREATE INDEX "CourseTag_tagId_idx" ON "CourseTag"("tagId");
CREATE INDEX "CourseTag_courseId_idx" ON "CourseTag"("courseId");
CREATE UNIQUE INDEX "KeySkill_name_key" ON "KeySkill"("name");
CREATE INDEX "KeySkill_name_idx" ON "KeySkill"("name");
CREATE INDEX "CourseKeySkills_keyId_idx" ON "CourseKeySkills"("keyId");
CREATE INDEX "CourseKeySkills_courseId_idx" ON "CourseKeySkills"("courseId");

COMMIT;
