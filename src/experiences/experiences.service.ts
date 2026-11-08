import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperienceType } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import {
  type ExperienceItem,
  INITIAL_EXPERIENCES,
} from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';

@Injectable()
export class ExperiencesService {
  private memoryStore: ExperienceItem[] = structuredClone(INITIAL_EXPERIENCES);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(type?: ExperienceType): Promise<ExperienceItem[]> {
    if (this.prisma.isConnected) {
      try {
        const count = await this.prisma.experience.count();
        if (count === 0) {
          await this.seedDatabaseDefaults();
        }
        const rows = await this.prisma.experience.findMany({
          where: type ? { type } : undefined,
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });
        return rows.map((r) => this.normalize(r));
      } catch {
        // Fallback to in-memory store if database table is not migrated yet
      }
    }

    const items = type
      ? this.memoryStore.filter((item) => item.type === type)
      : [...this.memoryStore];
    return items.sort((a, b) => a.order - b.order);
  }

  async findOne(id: string): Promise<ExperienceItem> {
    if (this.prisma.isConnected) {
      try {
        const exp = await this.prisma.experience.findUnique({ where: { id } });
        if (!exp) {
          throw new NotFoundException(
            `Experience dengan ID "${id}" tidak ditemukan`,
          );
        }
        return this.normalize(exp);
      } catch (err) {
        if (err instanceof NotFoundException) throw err;
      }
    }

    const found = this.memoryStore.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException(
        `Experience dengan ID "${id}" tidak ditemukan`,
      );
    }
    return found;
  }

  async create(dto: CreateExperienceDto): Promise<ExperienceItem> {
    const isCurrent = dto.isCurrent ?? false;
    const endDate = isCurrent ? 'Present' : (dto.endDate ?? undefined);

    if (this.prisma.isConnected) {
      try {
        const count = await this.prisma.experience.count();
        const created = await this.prisma.experience.create({
          data: {
            role: dto.role,
            company: dto.company,
            companyUrl: dto.companyUrl,
            location: dto.location ?? 'Remote',
            type: dto.type ?? ExperienceType.FULL_TIME,
            startDate: dto.startDate,
            endDate,
            isCurrent,
            description: dto.description ?? [],
            technologies: dto.technologies ?? [],
            order: dto.order ?? count + 1,
          },
        });
        return this.normalize(created);
      } catch {
        // Fallback to in-memory store
      }
    }

    const newItem: ExperienceItem = {
      id: `exp-${randomUUID().slice(0, 8)}`,
      role: dto.role,
      company: dto.company,
      companyUrl: dto.companyUrl,
      location: dto.location ?? 'Remote',
      type: dto.type ?? ExperienceType.FULL_TIME,
      startDate: dto.startDate,
      endDate,
      isCurrent,
      description: dto.description ?? [],
      technologies: dto.technologies ?? [],
      order: dto.order ?? this.memoryStore.length + 1,
    };

    this.memoryStore.unshift(newItem);
    return newItem;
  }

  async update(id: string, dto: UpdateExperienceDto): Promise<ExperienceItem> {
    if (this.prisma.isConnected) {
      try {
        const existing = await this.prisma.experience.findUnique({
          where: { id },
        });
        if (!existing) {
          throw new NotFoundException(
            `Experience dengan ID "${id}" tidak ditemukan`,
          );
        }

        const isCurrent = dto.isCurrent ?? existing.isCurrent;
        const endDate = isCurrent
          ? 'Present'
          : (dto.endDate ?? existing.endDate);

        const updated = await this.prisma.experience.update({
          where: { id },
          data: {
            role: dto.role,
            company: dto.company,
            companyUrl: dto.companyUrl,
            location: dto.location,
            type: dto.type,
            startDate: dto.startDate,
            endDate,
            isCurrent,
            description: dto.description,
            technologies: dto.technologies,
            order: dto.order,
          },
        });
        return this.normalize(updated);
      } catch (err) {
        if (err instanceof NotFoundException) throw err;
      }
    }

    const index = this.memoryStore.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Experience dengan ID "${id}" tidak ditemukan`,
      );
    }

    const current = this.memoryStore[index];
    const isCurrent = dto.isCurrent ?? current.isCurrent;
    const updatedItem: ExperienceItem = {
      id: current.id,
      role: dto.role ?? current.role,
      company: dto.company ?? current.company,
      companyUrl:
        dto.companyUrl !== undefined ? dto.companyUrl : current.companyUrl,
      location: dto.location ?? current.location,
      type: dto.type ?? current.type,
      startDate: dto.startDate ?? current.startDate,
      endDate: isCurrent ? 'Present' : (dto.endDate ?? current.endDate),
      isCurrent,
      description: dto.description ?? current.description,
      technologies: dto.technologies ?? current.technologies,
      order: dto.order ?? current.order,
    };

    this.memoryStore[index] = updatedItem;
    return updatedItem;
  }

  async remove(id: string): Promise<{ deleted: true; id: string }> {
    if (this.prisma.isConnected) {
      try {
        const existing = await this.prisma.experience.findUnique({
          where: { id },
        });
        if (!existing) {
          throw new NotFoundException(
            `Experience dengan ID "${id}" tidak ditemukan`,
          );
        }
        await this.prisma.experience.delete({ where: { id } });
        return { deleted: true, id };
      } catch (err) {
        if (err instanceof NotFoundException) throw err;
      }
    }

    const index = this.memoryStore.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Experience dengan ID "${id}" tidak ditemukan`,
      );
    }
    this.memoryStore.splice(index, 1);
    return { deleted: true, id };
  }

  async resetToDefault(): Promise<ExperienceItem[]> {
    this.memoryStore = structuredClone(INITIAL_EXPERIENCES);

    if (this.prisma.isConnected) {
      try {
        await this.prisma.experience.deleteMany();
        await this.seedDatabaseDefaults();
        return this.findAll();
      } catch {
        // Fallback to memoryStore
      }
    }

    return this.memoryStore;
  }

  private async seedDatabaseDefaults() {
    for (const exp of INITIAL_EXPERIENCES) {
      await this.prisma.experience.upsert({
        where: { id: exp.id },
        update: {},
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
  }

  private normalize(row: ExperienceItem): ExperienceItem {
    return {
      id: row.id,
      role: row.role,
      company: row.company,
      companyUrl: row.companyUrl ?? undefined,
      location: row.location,
      type: row.type,
      startDate: row.startDate,
      endDate: row.endDate ?? undefined,
      isCurrent: row.isCurrent,
      description: row.description,
      technologies: row.technologies,
      order: row.order,
    };
  }
}

