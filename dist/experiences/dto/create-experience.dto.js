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
import { ExperienceType } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, } from 'class-validator';
export class CreateExperienceDto {
    role;
    company;
    companyUrl;
    location;
    type;
    startDate;
    endDate;
    isCurrent;
    description;
    technologies;
    order;
}
__decorate([
    ApiProperty({ example: 'Senior Full-Stack Engineer' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "role", void 0);
__decorate([
    ApiProperty({ example: 'Tech Horizon Innovations' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "company", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://example.com' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "companyUrl", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Jakarta (Hybrid)', default: 'Remote' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional({
        enum: ExperienceType,
        default: ExperienceType.FULL_TIME,
    }),
    IsOptional(),
    IsEnum(ExperienceType),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "type", void 0);
__decorate([
    ApiProperty({ example: 'Jan 2024' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "startDate", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Present' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateExperienceDto.prototype, "endDate", void 0);
__decorate([
    ApiPropertyOptional({ default: false }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateExperienceDto.prototype, "isCurrent", void 0);
__decorate([
    ApiPropertyOptional({
        type: [String],
        example: [
            'Architected and deployed high-traffic web applications with Next.js and NestJS.',
        ],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateExperienceDto.prototype, "description", void 0);
__decorate([
    ApiPropertyOptional({
        type: [String],
        example: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL'],
    }),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateExperienceDto.prototype, "technologies", void 0);
__decorate([
    ApiPropertyOptional({ example: 1, default: 0 }),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateExperienceDto.prototype, "order", void 0);
//# sourceMappingURL=create-experience.dto.js.map