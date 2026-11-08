import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileService } from './profile.service.js';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(): Promise<import("../common/initial-data.js").ProfileData>;
    updateProfile(dto: UpdateProfileDto): Promise<import("../common/initial-data.js").ProfileData>;
    getSkills(): Promise<import("../common/initial-data.js").SkillCategoryItem[]>;
}
