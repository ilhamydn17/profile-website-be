import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { ProjectsService } from './projects.service.js';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(category?: string): Promise<import("../common/initial-data.js").ProjectItem[]>;
    findOne(id: string): Promise<import("../common/initial-data.js").ProjectItem>;
    create(dto: CreateProjectDto): Promise<import("../common/initial-data.js").ProjectItem>;
    resetToDefault(): Promise<import("../common/initial-data.js").ProjectItem[]>;
    update(id: string, dto: UpdateProjectDto): Promise<import("../common/initial-data.js").ProjectItem>;
    remove(id: string): Promise<{
        deleted: true;
        id: string;
    }>;
}
