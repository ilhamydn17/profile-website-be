import { ExperienceType } from '@prisma/client';
import { type ExperienceItem } from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
export declare class ExperiencesService {
    private readonly prisma;
    private memoryStore;
    constructor(prisma: PrismaService);
    findAll(type?: ExperienceType): Promise<ExperienceItem[]>;
    findOne(id: string): Promise<ExperienceItem>;
    create(dto: CreateExperienceDto): Promise<ExperienceItem>;
    update(id: string, dto: UpdateExperienceDto): Promise<ExperienceItem>;
    remove(id: string): Promise<{
        deleted: true;
        id: string;
    }>;
    resetToDefault(): Promise<ExperienceItem[]>;
    private seedDatabaseDefaults;
    private normalize;
}
