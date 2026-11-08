import { type ProjectItem } from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
export declare class ProjectsService {
    private readonly prisma;
    private memoryStore;
    constructor(prisma: PrismaService);
    findAll(category?: string): Promise<ProjectItem[]>;
    findOne(id: string): Promise<ProjectItem>;
    create(dto: CreateProjectDto): Promise<ProjectItem>;
    update(id: string, dto: UpdateProjectDto): Promise<ProjectItem>;
    remove(id: string): Promise<{
        deleted: true;
        id: string;
    }>;
    resetToDefault(): Promise<ProjectItem[]>;
    private seedDatabaseDefaults;
    private normalize;
}
