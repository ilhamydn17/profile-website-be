import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import {
  INITIAL_PROFILE,
  INITIAL_SKILLS,
  type ProfileData,
  type ProfileStat,
  type SkillCategoryItem,
} from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

const DEFAULT_PROFILE_ID = 'default-profile';

@Injectable()
export class ProfileService {
  private memoryProfile: ProfileData = structuredClone(INITIAL_PROFILE);
  private memorySkills: SkillCategoryItem[] = structuredClone(INITIAL_SKILLS);

  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<ProfileData> {
    if (this.prisma.isConnected) {
      try {
        let profile = await this.prisma.profile.findUnique({
          where: { id: DEFAULT_PROFILE_ID },
        });
        if (!profile) {
          profile = await this.prisma.profile.create({
            data: {
              id: DEFAULT_PROFILE_ID,
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
        }
        return this.normalizeProfile(profile);
      } catch {
        // Fallback to in-memory profile
      }
    }

    return this.memoryProfile;
  }

  async updateProfile(dto: UpdateProfileDto): Promise<ProfileData> {
    if (this.prisma.isConnected) {
      try {
        const current = await this.getProfile();
        const statsJson = (dto.stats ??
          current.stats) as unknown as Prisma.InputJsonValue;

        const updated = await this.prisma.profile.upsert({
          where: { id: DEFAULT_PROFILE_ID },
          update: {
            name: dto.name,
            title: dto.title,
            headline: dto.headline,
            bio: dto.bio,
            location: dto.location,
            status: dto.status,
            availability: dto.availability,
            avatarUrl: dto.avatarUrl,
            email: dto.email,
            github: dto.github,
            linkedin: dto.linkedin,
            resumeUrl: dto.resumeUrl,
            stats: dto.stats ? statsJson : undefined,
          },
          create: {
            id: DEFAULT_PROFILE_ID,
            name: dto.name ?? current.name,
            title: dto.title ?? current.title,
            headline: dto.headline ?? current.headline,
            bio: dto.bio ?? current.bio,
            location: dto.location ?? current.location,
            status: dto.status ?? current.status,
            availability: dto.availability ?? current.availability,
            avatarUrl: dto.avatarUrl ?? current.avatarUrl ?? null,
            email: dto.email ?? current.email,
            github: dto.github ?? current.github,
            linkedin: dto.linkedin ?? current.linkedin,
            resumeUrl: dto.resumeUrl ?? current.resumeUrl,
            stats: statsJson,
          },
        });
        return this.normalizeProfile(updated);
      } catch {
        // Fallback to in-memory update
      }
    }

    this.memoryProfile = {
      name: dto.name ?? this.memoryProfile.name,
      title: dto.title ?? this.memoryProfile.title,
      headline: dto.headline ?? this.memoryProfile.headline,
      bio: dto.bio ?? this.memoryProfile.bio,
      location: dto.location ?? this.memoryProfile.location,
      status: dto.status ?? this.memoryProfile.status,
      availability: dto.availability ?? this.memoryProfile.availability,
      avatarUrl:
        dto.avatarUrl !== undefined
          ? dto.avatarUrl
          : this.memoryProfile.avatarUrl,
      email: dto.email ?? this.memoryProfile.email,
      github: dto.github ?? this.memoryProfile.github,
      linkedin: dto.linkedin ?? this.memoryProfile.linkedin,
      resumeUrl: dto.resumeUrl ?? this.memoryProfile.resumeUrl,
      stats: dto.stats ?? this.memoryProfile.stats,
    };
    return this.memoryProfile;
  }

  async getSkills(): Promise<SkillCategoryItem[]> {
    if (this.prisma.isConnected) {
      try {
        const count = await this.prisma.skillCategory.count();
        if (count === 0) {
          for (const skill of INITIAL_SKILLS) {
            await this.prisma.skillCategory.upsert({
              where: { category: skill.category },
              update: {},
              create: {
                category: skill.category,
                items: skill.items as unknown as Prisma.InputJsonValue,
                order: skill.order ?? 0,
              },
            });
          }
        }
        const rows = await this.prisma.skillCategory.findMany({
          orderBy: { order: 'asc' },
        });
        return rows.map((row) => ({
          id: row.id,
          category: row.category,
          items: Array.isArray(row.items)
            ? (row.items as SkillCategoryItem['items'])
            : [],
          order: row.order,
        }));
      } catch {
        // Fallback to memorySkills
      }
    }

    return this.memorySkills;
  }

  private normalizeProfile(row: {
    name: string;
    title: string;
    headline: string;
    bio: string;
    location: string;
    status: string;
    availability: boolean;
    avatarUrl: string | null;
    email: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
    stats: Prisma.JsonValue;
  }): ProfileData {
    return {
      name: row.name,
      title: row.title,
      headline: row.headline,
      bio: row.bio,
      location: row.location,
      status: row.status,
      availability: row.availability,
      avatarUrl: row.avatarUrl || undefined,
      email: row.email,
      github: row.github,
      linkedin: row.linkedin,
      resumeUrl: row.resumeUrl,
      stats: Array.isArray(row.stats)
        ? (row.stats as unknown as ProfileStat[])
        : INITIAL_PROFILE.stats,
    };
  }
}

