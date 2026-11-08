import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProfileStatDto {
  @ApiProperty({ example: 'Years Experience' })
  @IsString()
  @IsNotEmpty()
  label!: string;

  @ApiProperty({ example: '3+' })
  @IsString()
  @IsNotEmpty()
  value!: string;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Ilham' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Full-Stack Software Engineer' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example:
      'Crafting High-Performance Web Applications & Scalable Backend Architectures',
  })
  @IsOptional()
  @IsString()
  headline?: string;

  @ApiPropertyOptional({
    example:
      'Passionate engineer specialized in Next.js, React, NestJS, and Cloud Architecture.',
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ example: 'Indonesia' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 'Available for new challenges' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  availability?: boolean;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/avatar.jpg' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: 'contact@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'https://github.com' })
  @IsOptional()
  @IsString()
  github?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com' })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({ example: '#' })
  @IsOptional()
  @IsString()
  resumeUrl?: string;

  @ApiPropertyOptional({ type: [ProfileStatDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProfileStatDto)
  stats?: ProfileStatDto[];
}

