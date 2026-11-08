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
import { ExperienceType } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { INITIAL_EXPERIENCES, } from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
let ExperiencesService = class ExperiencesService {
    prisma;
    memoryStore = structuredClone(INITIAL_EXPERIENCES);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(type) {
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
            }
            catch {
            }
        }
        const items = type
            ? this.memoryStore.filter((item) => item.type === type)
            : [...this.memoryStore];
        return items.sort((a, b) => a.order - b.order);
    }
    async findOne(id) {
        if (this.prisma.isConnected) {
            try {
                const exp = await this.prisma.experience.findUnique({ where: { id } });
                if (!exp) {
                    throw new NotFoundException(`Experience dengan ID "${id}" tidak ditemukan`);
                }
                return this.normalize(exp);
            }
            catch (err) {
                if (err instanceof NotFoundException)
                    throw err;
            }
        }
        const found = this.memoryStore.find((item) => item.id === id);
        if (!found) {
            throw new NotFoundException(`Experience dengan ID "${id}" tidak ditemukan`);
        }
        return found;
    }
    async create(dto) {
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
            }
            catch {
            }
        }
        const newItem = {
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
    async update(id, dto) {
        if (this.prisma.isConnected) {
            try {
                const existing = await this.prisma.experience.findUnique({
                    where: { id },
                });
                if (!existing) {
                    throw new NotFoundException(`Experience dengan ID "${id}" tidak ditemukan`);
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
            }
            catch (err) {
                if (err instanceof NotFoundException)
                    throw err;
            }
        }
        const index = this.memoryStore.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Experience dengan ID "${id}" tidak ditemukan`);
        }
        const current = this.memoryStore[index];
        const isCurrent = dto.isCurrent ?? current.isCurrent;
        const updatedItem = {
            id: current.id,
            role: dto.role ?? current.role,
            company: dto.company ?? current.company,
            companyUrl: dto.companyUrl !== undefined ? dto.companyUrl : current.companyUrl,
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
    async remove(id) {
        if (this.prisma.isConnected) {
            try {
                const existing = await this.prisma.experience.findUnique({
                    where: { id },
                });
                if (!existing) {
                    throw new NotFoundException(`Experience dengan ID "${id}" tidak ditemukan`);
                }
                await this.prisma.experience.delete({ where: { id } });
                return { deleted: true, id };
            }
            catch (err) {
                if (err instanceof NotFoundException)
                    throw err;
            }
        }
        const index = this.memoryStore.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Experience dengan ID "${id}" tidak ditemukan`);
        }
        this.memoryStore.splice(index, 1);
        return { deleted: true, id };
    }
    async resetToDefault() {
        this.memoryStore = structuredClone(INITIAL_EXPERIENCES);
        if (this.prisma.isConnected) {
            try {
                await this.prisma.experience.deleteMany();
                await this.seedDatabaseDefaults();
                return this.findAll();
            }
            catch {
            }
        }
        return this.memoryStore;
    }
    async seedDatabaseDefaults() {
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
    normalize(row) {
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
};
ExperiencesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ExperiencesService);
export { ExperiencesService };
//# sourceMappingURL=experiences.service.js.map