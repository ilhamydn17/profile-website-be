import { ExperienceType } from '@prisma/client';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { ExperiencesService } from './experiences.service.js';
export declare class ExperiencesController {
    private readonly experiencesService;
    constructor(experiencesService: ExperiencesService);
    findAll(type?: ExperienceType): Promise<import("../common/initial-data.js").ExperienceItem[]>;
    findOne(id: string): Promise<import("../common/initial-data.js").ExperienceItem>;
    create(dto: CreateExperienceDto): Promise<import("../common/initial-data.js").ExperienceItem>;
    resetToDefault(): Promise<import("../common/initial-data.js").ExperienceItem[]>;
    update(id: string, dto: UpdateExperienceDto): Promise<import("../common/initial-data.js").ExperienceItem>;
    remove(id: string): Promise<{
        deleted: true;
        id: string;
    }>;
}
