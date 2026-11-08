import { ExperienceType } from '@prisma/client';
export declare class CreateExperienceDto {
    role: string;
    company: string;
    companyUrl?: string;
    location?: string;
    type?: ExperienceType;
    startDate: string;
    endDate?: string;
    isCurrent?: boolean;
    description?: string[];
    technologies?: string[];
    order?: number;
}
