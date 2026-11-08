export declare class ProfileStatDto {
    label: string;
    value: string;
}
export declare class UpdateProfileDto {
    name?: string;
    title?: string;
    headline?: string;
    bio?: string;
    location?: string;
    status?: string;
    availability?: boolean;
    avatarUrl?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    resumeUrl?: string;
    stats?: ProfileStatDto[];
}
