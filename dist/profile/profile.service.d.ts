import { type ProfileData, type SkillCategoryItem } from '../common/initial-data.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class ProfileService {
    private readonly prisma;
    private memoryProfile;
    private memorySkills;
    constructor(prisma: PrismaService);
    getProfile(): Promise<ProfileData>;
    updateProfile(dto: UpdateProfileDto): Promise<ProfileData>;
    getSkills(): Promise<SkillCategoryItem[]>;
    private normalizeProfile;
}
