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
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested, } from 'class-validator';
export class ProfileStatDto {
    label;
    value;
}
__decorate([
    ApiProperty({ example: 'Years Experience' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], ProfileStatDto.prototype, "label", void 0);
__decorate([
    ApiProperty({ example: '3+' }),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], ProfileStatDto.prototype, "value", void 0);
export class UpdateProfileDto {
    name;
    title;
    headline;
    bio;
    location;
    status;
    availability;
    avatarUrl;
    email;
    github;
    linkedin;
    resumeUrl;
    stats;
}
__decorate([
    ApiPropertyOptional({ example: 'Ilham' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Full-Stack Software Engineer' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "title", void 0);
__decorate([
    ApiPropertyOptional({
        example: 'Crafting High-Performance Web Applications & Scalable Backend Architectures',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "headline", void 0);
__decorate([
    ApiPropertyOptional({
        example: 'Passionate engineer specialized in Next.js, React, NestJS, and Cloud Architecture.',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Indonesia' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional({ example: 'Available for new challenges' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "status", void 0);
__decorate([
    ApiPropertyOptional({ example: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "availability", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://images.unsplash.com/avatar.jpg' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "avatarUrl", void 0);
__decorate([
    ApiPropertyOptional({ example: 'contact@example.com' }),
    IsOptional(),
    IsEmail(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://github.com' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "github", void 0);
__decorate([
    ApiPropertyOptional({ example: 'https://linkedin.com' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "linkedin", void 0);
__decorate([
    ApiPropertyOptional({ example: '#' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "resumeUrl", void 0);
__decorate([
    ApiPropertyOptional({ type: [ProfileStatDto] }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => ProfileStatDto),
    __metadata("design:type", Array)
], UpdateProfileDto.prototype, "stats", void 0);
//# sourceMappingURL=update-profile.dto.js.map