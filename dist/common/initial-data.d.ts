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
export type ProjectCategoryType = 'Fullstack' | 'Frontend' | 'Backend' | 'Mobile';
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
export declare const INITIAL_PROFILE: ProfileData;
export declare const INITIAL_EXPERIENCES: ExperienceItem[];
export declare const INITIAL_PROJECTS: ProjectItem[];
export declare const INITIAL_SKILLS: SkillCategoryItem[];
