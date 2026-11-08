var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, } from 'class-validator';
export const PROJECT_CATEGORIES = [
    'Fullstack',
    'Frontend',
    'Backend',
    'Mobile',
];
export class CreateProjectDto {
    title;
    description;
    category;
    tags;
    demoUrl;
    githubUrl;
    imageUrl;
    featured;
    order;
}
__decorate([
    ApiProperty({ example: 'Enterprise Dynamic CMS & Portfolio' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "title", void 0);
__decorate([
    ApiProperty({
        example: 'Modern portfolio engine built with Next.js 16, NestJS, and Supabase.',
    }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({
        enum: PROJECT_CATEGORIES,
        default: 'Fullstack',
    }),
    IsOptional(),
    IsString(),
    IsIn(PROJECT_CATEGORIES),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "category", void 0);
__decorate([
    ApiPropertyOptional({
        type: [String],
        example: ['Next.js', 'NestJS', 'TypeScript', 'Supabase'],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateProjectDto.prototype, "tags", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://example.com' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "demoUrl", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://github.com' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "githubUrl", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-1' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateProjectDto.prototype, "imageUrl", void 0);
__decorate([
    ApiPropertyOptional({ default: false }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateProjectDto.prototype, "featured", void 0);
__decorate([
    ApiPropertyOptional({ example: 1, default: 0 }),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateProjectDto.prototype, "order", void 0);
//# sourceMappingURL=create-project.dto.js.map