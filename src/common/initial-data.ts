import { ExperienceType } from '@prisma/client';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string | null;
  location: string;
  type: ExperienceType;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string[];
  technologies: string[];
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProjectCategoryType =
  | 'Fullstack'
  | 'Frontend'
  | 'Backend'
  | 'Mobile';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: ProjectCategoryType;
  tags: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileStat {
  label: string;
  value: string;
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  bio: string;
  location: string;
  status: string;
  availability: boolean;
  avatarUrl?: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  stats: ProfileStat[];
}

export interface SkillCategoryItem {
  id?: string;
  category: string;
  items: {
    name: string;
    level?: string;
    icon?: string;
  }[];
  order?: number;
}

export const INITIAL_PROFILE: ProfileData = {
  name: 'Ilham',
  title: 'Full-Stack Software Engineer',
  headline:
    'Crafting High-Performance Web Applications & Scalable Backend Architectures',
  bio: 'Passionate engineer specialized in Next.js, React, NestJS, and Cloud Architecture. Dedicated to building elegant user interfaces backed by robust, clean-architecture APIs.',
  location: 'Indonesia',
  status: 'Available for new challenges',
  availability: true,
  avatarUrl: '',
  email: 'contact@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  resumeUrl: '#',
  stats: [
    { label: 'Years Experience', value: '3+' },
    { label: 'Completed Projects', value: '15+' },
    { label: 'Tech Stack Mastered', value: '12+' },
    { label: 'Client Satisfaction', value: '99%' },
  ],
};

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Senior Full-Stack Engineer',
    company: 'Tech Horizon Innovations',
    companyUrl: 'https://example.com',
    location: 'Jakarta (Hybrid)',
    type: ExperienceType.FULL_TIME,
    startDate: 'Jan 2024',
    endDate: 'Present',
    isCurrent: true,
    description: [
      'Architected and deployed high-traffic web applications with Next.js App Router and NestJS microservices.',
      'Optimized database queries in PostgreSQL with Prisma ORM, reducing response times by 42%.',
      'Designed and integrated RBAC authentication, JWT session flows, and modular RESTful APIs.',
      'Mentored junior developers and established automated CI/CD deployment pipelines.',
    ],
    technologies: [
      'Next.js',
      'NestJS',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'Tailwind CSS',
    ],
    order: 1,
  },
  {
    id: 'exp-2',
    role: 'Backend Engineer',
    company: 'Digital Core Systems',
    companyUrl: 'https://example.com',
    location: 'Remote',
    type: ExperienceType.FULL_TIME,
    startDate: 'Jun 2022',
    endDate: 'Dec 2023',
    isCurrent: false,
    description: [
      'Engineered reliable backend REST APIs serving 100k+ daily requests using NestJS and Express.',
      'Implemented caching strategies using Redis and organized scalable schema migrations with TypeORM.',
      'Collaborated with frontend teams to deliver seamless user experiences and real-time WebSocket features.',
    ],
    technologies: [
      'NestJS',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'Jest',
      'Swagger',
    ],
    order: 2,
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Consultant',
    company: 'Freelance / Global Clients',
    companyUrl: undefined,
    location: 'Remote',
    type: ExperienceType.FREELANCE,
    startDate: 'Aug 2021',
    endDate: 'Present',
    isCurrent: true,
    description: [
      'Delivered tailored web applications, custom CMS dashboards, and high-converting landing pages.',
      'Integrated third-party payment gateways (Stripe, Midtrans) and headless storage systems.',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Supabase'],
    order: 3,
  },
  {
    id: 'exp-4',
    role: 'Bachelor of Computer Science',
    company: 'University of Technology',
    companyUrl: undefined,
    location: 'Indonesia',
    type: ExperienceType.EDUCATION,
    startDate: '2018',
    endDate: '2022',
    isCurrent: false,
    description: [
      'Graduated with honors. Focused on Software Engineering, Database Systems, and Distributed Computing.',
      'Led university developer student club and published research paper on cloud services.',
    ],
    technologies: [
      'Algorithms',
      'Data Structures',
      'Database Architecture',
      'System Design',
    ],
    order: 4,
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Enterprise Dynamic CMS & Portfolio',
    description:
      'Modern portfolio engine built with Next.js 16, NestJS, and Supabase. Includes complete protected administrative dashboard for managing real-time content.',
    category: 'Fullstack',
    tags: ['Next.js', 'NestJS', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    imageUrl: '',
    featured: true,
    order: 1,
  },
  {
    id: 'proj-2',
    title: 'Scalable SaaS Analytics Dashboard',
    description:
      'High-performance data visualization platform tracking real-time user metrics, retention rates, and conversion pipelines.',
    category: 'Fullstack',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Recharts', 'Redis'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    imageUrl: '',
    featured: true,
    order: 2,
  },
  {
    id: 'proj-3',
    title: 'High-Throughput Order Management API',
    description:
      'Microservice-ready REST API built with NestJS featuring rate-limiting, comprehensive Swagger OpenAPI docs, and automated testing.',
    category: 'Backend',
    tags: ['NestJS', 'PostgreSQL', 'Docker', 'Prisma', 'Jest'],
    demoUrl: undefined,
    githubUrl: 'https://github.com',
    imageUrl: '',
    featured: false,
    order: 3,
  },
];

export const INITIAL_SKILLS: SkillCategoryItem[] = [
  {
    id: 'skill-1',
    category: 'Frontend',
    order: 1,
    items: [
      { name: 'Next.js (App Router)', level: 'Advanced' },
      { name: 'React 19', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'State Management (Zustand/Redux)', level: 'Proficient' },
    ],
  },
  {
    id: 'skill-2',
    category: 'Backend & Architecture',
    order: 2,
    items: [
      { name: 'NestJS', level: 'Advanced' },
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'RESTful APIs & Microservices', level: 'Advanced' },
      { name: 'Authentication (JWT / OAuth)', level: 'Advanced' },
      { name: 'Clean Architecture & DTOs', level: 'Advanced' },
    ],
  },
  {
    id: 'skill-3',
    category: 'Databases & Cloud',
    order: 3,
    items: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'Prisma ORM / TypeORM', level: 'Advanced' },
      { name: 'Supabase', level: 'Advanced' },
      { name: 'Redis Caching', level: 'Proficient' },
      { name: 'Docker & CI/CD', level: 'Proficient' },
    ],
  },
];

