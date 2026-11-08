var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { INITIAL_PROJECTS, } from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
let ProjectsService = class ProjectsService {
    prisma;
    memoryStore = structuredClone(INITIAL_PROJECTS);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category) {
        if (this.prisma.isConnected) {
            try {
                const count = await this.prisma.project.count();
                if (count === 0) {
                    await this.seedDatabaseDefaults();
                }
                const rows = await this.prisma.project.findMany({
                    where: category && category !== 'All' ? { category } : undefined,
                    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
                });
                return rows.map((r) => this.normalize(r));
            }
            catch {
            }
        }
        const items = category && category !== 'All'
            ? this.memoryStore.filter((item) => item.category === category)
            : [...this.memoryStore];
        return items.sort((a, b) => a.order - b.order);
    }
    async findOne(id) {
        if (this.prisma.isConnected) {
            try {
                const proj = await this.prisma.project.findUnique({ where: { id } });
                if (!proj) {
                    throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
                }
                return this.normalize(proj);
            }
            catch (err) {
                if (err instanceof NotFoundException)
                    throw err;
            }
        }
        const found = this.memoryStore.find((item) => item.id === id);
        if (!found) {
            throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
        }
        return found;
    }
    async create(dto) {
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
            }
            catch {
            }
        }
        const newItem = {
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
    async update(id, dto) {
        if (this.prisma.isConnected) {
            try {
                const existing = await this.prisma.project.findUnique({
                    where: { id },
                });
                if (!existing) {
                    throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
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
            }
            catch (err) {
                if (err instanceof NotFoundException)
                    throw err;
            }
        }
        const index = this.memoryStore.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
        }
        const current = this.memoryStore[index];
        const updatedItem = {
            id: current.id,
            title: dto.title ?? current.title,
            description: dto.description ?? current.description,
            category: dto.category ?? current.category,
            tags: dto.tags ?? current.tags,
            demoUrl: dto.demoUrl !== undefined ? dto.demoUrl : current.demoUrl,
            githubUrl: dto.githubUrl !== undefined ? dto.githubUrl : current.githubUrl,
            imageUrl: dto.imageUrl !== undefined ? dto.imageUrl : current.imageUrl,
            featured: dto.featured ?? current.featured,
            order: dto.order ?? current.order,
        };
        this.memoryStore[index] = updatedItem;
        return updatedItem;
    }
    async remove(id) {
        if (this.prisma.isConnected) {
            try {
                const existing = await this.prisma.project.findUnique({
                    where: { id },
                });
                if (!existing) {
                    throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
                }
                await this.prisma.project.delete({ where: { id } });
                return { deleted: true, id };
            }
            catch (err) {
                if (err instanceof NotFoundException)
                    throw err;
            }
        }
        const index = this.memoryStore.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Project dengan ID "${id}" tidak ditemukan`);
        }
        this.memoryStore.splice(index, 1);
        return { deleted: true, id };
    }
    async resetToDefault() {
        this.memoryStore = structuredClone(INITIAL_PROJECTS);
        if (this.prisma.isConnected) {
            try {
                await this.prisma.project.deleteMany();
                await this.seedDatabaseDefaults();
                return this.findAll();
            }
            catch {
            }
        }
        return this.memoryStore;
    }
    async seedDatabaseDefaults() {
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
    normalize(row) {
        return {
            id: row.id,
            title: row.title,
            description: row.description,
            category: row.category,
            tags: row.tags,
            demoUrl: row.demoUrl || undefined,
            githubUrl: row.githubUrl || undefined,
            imageUrl: row.imageUrl || undefined,
            featured: row.featured,
            order: row.order,
        };
    }
};
ProjectsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ProjectsService);
export { ProjectsService };
//# sourceMappingURL=projects.service.js.map