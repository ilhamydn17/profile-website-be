export declare const PROJECT_CATEGORIES: readonly ["Fullstack", "Frontend", "Backend", "Mobile"];
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export declare class CreateProjectDto {
    title: string;
    description: string;
    category?: ProjectCategory;
    tags?: string[];
    demoUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
    featured?: boolean;
    order?: number;
}
