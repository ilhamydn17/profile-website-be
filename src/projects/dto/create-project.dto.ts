import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export const PROJECT_CATEGORIES = [
  'Fullstack',
  'Frontend',
  'Backend',
  'Mobile',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export class CreateProjectDto {
  @ApiProperty({ example: 'Enterprise Dynamic CMS & Portfolio' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example:
      'Modern portfolio engine built with Next.js 16, NestJS, and Supabase.',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({
    enum: PROJECT_CATEGORIES,
    default: 'Fullstack',
  })
  @IsOptional()
  @IsString()
  @IsIn(PROJECT_CATEGORIES)
  category?: ProjectCategory;

  @ApiPropertyOptional({
    type: [String],
    example: ['Next.js', 'NestJS', 'TypeScript', 'Supabase'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsOptional()
  @IsString()
  demoUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com' })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-1' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 1, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

