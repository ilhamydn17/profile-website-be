import { type Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  INITIAL_EXPERIENCES,
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
} from '../src/common/initial-data.ts';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed AdminUser
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@ilham.dev';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'AdminPassword2026!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: 'Ilham (Admin)',
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'Ilham (Admin)',
    },
  });
  console.log(`✅ AdminUser seeded: ${adminEmail}`);

  // 2. Seed Profile
  await prisma.profile.upsert({
    where: { id: 'default-profile' },
    update: {
      name: INITIAL_PROFILE.name,
      title: INITIAL_PROFILE.title,
      headline: INITIAL_PROFILE.headline,
      bio: INITIAL_PROFILE.bio,
      location: INITIAL_PROFILE.location,
      status: INITIAL_PROFILE.status,
      availability: INITIAL_PROFILE.availability,
      avatarUrl: INITIAL_PROFILE.avatarUrl ?? null,
      email: INITIAL_PROFILE.email,
      github: INITIAL_PROFILE.github,
      linkedin: INITIAL_PROFILE.linkedin,
      resumeUrl: INITIAL_PROFILE.resumeUrl,
      stats: INITIAL_PROFILE.stats as unknown as Prisma.InputJsonValue,
    },
    create: {
      id: 'default-profile',
      name: INITIAL_PROFILE.name,
      title: INITIAL_PROFILE.title,
      headline: INITIAL_PROFILE.headline,
      bio: INITIAL_PROFILE.bio,
      location: INITIAL_PROFILE.location,
      status: INITIAL_PROFILE.status,
      availability: INITIAL_PROFILE.availability,
      avatarUrl: INITIAL_PROFILE.avatarUrl ?? null,
      email: INITIAL_PROFILE.email,
      github: INITIAL_PROFILE.github,
      linkedin: INITIAL_PROFILE.linkedin,
      resumeUrl: INITIAL_PROFILE.resumeUrl,
      stats: INITIAL_PROFILE.stats as unknown as Prisma.InputJsonValue,
    },
  });
  console.log('✅ Profile seeded');

  // 3. Seed Experiences
  for (const exp of INITIAL_EXPERIENCES) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {
        role: exp.role,
        company: exp.company,
        companyUrl: exp.companyUrl ?? null,
        location: exp.location,
        type: exp.type,
        startDate: exp.startDate,
        endDate: exp.endDate ?? null,
        isCurrent: exp.isCurrent,
        description: exp.description,
        technologies: exp.technologies,
        order: exp.order,
      },
      create: {
        id: exp.id,
        role: exp.role,
        company: exp.company,
        companyUrl: exp.companyUrl ?? null,
        location: exp.location,
        type: exp.type,
        startDate: exp.startDate,
        endDate: exp.endDate ?? null,
        isCurrent: exp.isCurrent,
        description: exp.description,
        technologies: exp.technologies,
        order: exp.order,
      },
    });
  }
  console.log(`✅ Experiences seeded (${INITIAL_EXPERIENCES.length} items)`);

  // 4. Seed Projects
  for (const proj of INITIAL_PROJECTS) {
    await prisma.project.upsert({
      where: { id: proj.id },
      update: {
        title: proj.title,
        description: proj.description,
        category: proj.category,
        tags: proj.tags,
        demoUrl: proj.demoUrl ?? null,
        githubUrl: proj.githubUrl ?? null,
        imageUrl: proj.imageUrl ?? null,
        featured: proj.featured,
        order: proj.order,
      },
      create: {
        id: proj.id,
        title: proj.title,
        description: proj.description,
        category: proj.category,
        tags: proj.tags,
        demoUrl: proj.demoUrl ?? null,
        githubUrl: proj.githubUrl ?? null,
        imageUrl: proj.imageUrl ?? null,
        featured: proj.featured,
        order: proj.order,
      },
    });
  }
  console.log(`✅ Projects seeded (${INITIAL_PROJECTS.length} items)`);

  // 5. Seed SkillCategories
  for (const skill of INITIAL_SKILLS) {
    await prisma.skillCategory.upsert({
      where: { category: skill.category },
      update: {
        items: skill.items as unknown as Prisma.InputJsonValue,
        order: skill.order ?? 0,
      },
      create: {
        id: skill.id,
        category: skill.category,
        items: skill.items as unknown as Prisma.InputJsonValue,
        order: skill.order ?? 0,
      },
    });
  }
  console.log(`✅ SkillCategories seeded (${INITIAL_SKILLS.length} items)`);

  console.log('🎉 Database seeding completed successfully!');
}

try {
  await main();
} catch (error) {
  console.error('❌ Error seeding database:', error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
