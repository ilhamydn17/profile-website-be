import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExperienceType } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Senior Full-Stack Engineer' })
  @IsString()
  @IsNotEmpty()
  role!: string;

  @ApiProperty({ example: 'Tech Horizon Innovations' })
  @IsString()
  @IsNotEmpty()
  company!: string;

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsOptional()
  @IsString()
  companyUrl?: string;

  @ApiPropertyOptional({ example: 'Jakarta (Hybrid)', default: 'Remote' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    enum: ExperienceType,
    default: ExperienceType.FULL_TIME,
  })
  @IsOptional()
  @IsEnum(ExperienceType)
  type?: ExperienceType;

  @ApiProperty({ example: 'Jan 2024' })
  @IsString()
  @IsNotEmpty()
  startDate!: string;

  @ApiPropertyOptional({ example: 'Present' })
  @IsOptional()
  @IsString()
  endDate?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isCurrent?: boolean;

  @ApiPropertyOptional({
    type: [String],
    example: [
      'Architected and deployed high-traffic web applications with Next.js and NestJS.',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  description?: string[];

  @ApiPropertyOptional({
    type: [String],
    example: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies?: string[];

  @ApiPropertyOptional({ example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

