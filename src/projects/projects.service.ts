import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  INITIAL_PROJECTS,
  type ProjectCategoryType,
  type ProjectItem,
} from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  private memoryStore: ProjectItem[] = structuredClone(INITIAL_PROJECTS);

  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: string): Promise<ProjectItem[]> {
    if (this.prisma.isConnected) {
      try {
        const count = await this.prisma.project.count();
        if (count === 0) {
          await this.seedDatabaseDefaults();
        }
        const rows = await this.prisma.project.findMany({
          where:
            category && category !== 'All' ? { category } : undefined,
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        });
        return rows.map((r) => this.normalize(r));
      } catch {
        // Fallback to in-memory store
      }
    }

    const items =
      category && category !== 'All'
        ? this.memoryStore.filter((item) => item.category === category)
        : [...this.memoryStore];
    return items.sort((a, b) => a.order - b.order);
  }

  async findOne(id: string): Promise<ProjectItem> {
    if (this.prisma.isConnected) {
      try {
        const proj = await this.prisma.project.findUnique({ where: { id } });
        if (!proj) {
          throw new NotFoundException(
            `Project dengan ID "${id}" tidak ditemukan`,
          );
        }
        return this.normalize(proj);
      } catch (err) {
        if (err instanceof NotFoundException) throw err;
      }
    }

    const found = this.memoryStore.find((item) => item.id === id);
    if (!found) {
      throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
    }
    return found;
  }

  async create(dto: CreateProjectDto): Promise<ProjectItem> {
    if (this.prisma.isConnected) {
      try {
        const count = await this.prisma.project.count();
        const created = await this.prisma.project.create({
          data: {
            title: dto.title,
            description: dto.description,
            category: dto.category ?? 'Fullstack',
            tags: dto.tags ?? [],
            demoUrl: dto.demoUrl,
            githubUrl: dto.githubUrl,
            imageUrl: dto.imageUrl,
            featured: dto.featured ?? false,
            order: dto.order ?? count + 1,
          },
        });
        return this.normalize(created);
      } catch {
        // Fallback to in-memory store
      }
    }

    const newItem: ProjectItem = {
      id: `proj-${randomUUID().slice(0, 8)}`,
      title: dto.title,
      description: dto.description,
      category: dto.category ?? 'Fullstack',
      tags: dto.tags ?? [],
      demoUrl: dto.demoUrl,
      githubUrl: dto.githubUrl,
      imageUrl: dto.imageUrl,
      featured: dto.featured ?? false,
      order: dto.order ?? this.memoryStore.length + 1,
    };

    this.memoryStore.unshift(newItem);
    return newItem;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<ProjectItem> {
    if (this.prisma.isConnected) {
      try {
        const existing = await this.prisma.project.findUnique({
          where: { id },
        });
        if (!existing) {
          throw new NotFoundException(
            `Project dengan ID "${id}" tidak ditemukan`,
          );
        }

        const updated = await this.prisma.project.update({
          where: { id },
          data: {
            title: dto.title,
            description: dto.description,
            category: dto.category,
            tags: dto.tags,
            demoUrl: dto.demoUrl,
            githubUrl: dto.githubUrl,
            imageUrl: dto.imageUrl,
            featured: dto.featured,
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
      throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
    }

    const current = this.memoryStore[index];
    const updatedItem: ProjectItem = {
      id: current.id,
      title: dto.title ?? current.title,
      description: dto.description ?? current.description,
      category: dto.category ?? current.category,
      tags: dto.tags ?? current.tags,
      demoUrl: dto.demoUrl !== undefined ? dto.demoUrl : current.demoUrl,
      githubUrl:
        dto.githubUrl !== undefined ? dto.githubUrl : current.githubUrl,
      imageUrl: dto.imageUrl !== undefined ? dto.imageUrl : current.imageUrl,
      featured: dto.featured ?? current.featured,
      order: dto.order ?? current.order,
    };
    this.memoryStore[index] = updatedItem;
    return updatedItem;
  }

  async remove(id: string): Promise<{ deleted: true; id: string }> {
    if (this.prisma.isConnected) {
      try {
        const existing = await this.prisma.project.findUnique({
          where: { id },
        });
        if (!existing) {
          throw new NotFoundException(
            `Project dengan ID "${id}" tidak ditemukan`,
          );
        }
        await this.prisma.project.delete({ where: { id } });
        return { deleted: true, id };
      } catch (err) {
        if (err instanceof NotFoundException) throw err;
      }
    }

    const index = this.memoryStore.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
    }
    this.memoryStore.splice(index, 1);
    return { deleted: true, id };
  }

  async resetToDefault(): Promise<ProjectItem[]> {
    this.memoryStore = structuredClone(INITIAL_PROJECTS);

    if (this.prisma.isConnected) {
      try {
        await this.prisma.project.deleteMany();
        await this.seedDatabaseDefaults();
        return this.findAll();
      } catch {
        // Fallback to memoryStore
      }
    }

    return this.memoryStore;
  }

  private async seedDatabaseDefaults() {
    for (const proj of INITIAL_PROJECTS) {
      await this.prisma.project.upsert({
        where: { id: proj.id },
        update: {},
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
  }

  private normalize(row: {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    demoUrl?: string | null;
    githubUrl?: string | null;
    imageUrl?: string | null;
    featured: boolean;
    order: number;
  }): ProjectItem {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category as ProjectCategoryType,
      tags: row.tags,
      demoUrl: row.demoUrl || undefined,
      githubUrl: row.githubUrl || undefined,
      imageUrl: row.imageUrl || undefined,
      featured: row.featured,
      order: row.order,
    };
  }
}

