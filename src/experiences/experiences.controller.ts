import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExperienceType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { ExperiencesService } from './experiences.service.js';

@ApiTags('Experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  @ApiOperation({
    summary: 'Ambil seluruh daftar pengalaman kerja & pendidikan (Publik)',
  })
  @ApiQuery({
    name: 'type',
    enum: ExperienceType,
    required: false,
    description: 'Filter berdasarkan tipe pengalaman (opsional)',
  })
  @ApiResponse({ status: 200, description: 'Daftar experiences terurut' })
  findAll(@Query('type') type?: ExperienceType) {
    return this.experiencesService.findAll(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail satu experience berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Detail experience' })
  @ApiResponse({ status: 404, description: 'Experience tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah experience baru (Admin CMS)' })
  @ApiResponse({ status: 201, description: 'Experience berhasil dibuat' })
  create(@Body() dto: CreateExperienceDto) {
    return this.experiencesService.create(dto);
  }

  @Post('reset')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Reset seluruh data experience ke data awal default (Admin CMS)',
  })
  resetToDefault() {
    return this.experiencesService.resetToDefault();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perbarui data experience (Admin CMS)' })
  @ApiResponse({ status: 200, description: 'Experience berhasil diperbarui' })
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experiencesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus data experience (Admin CMS)' })
  @ApiResponse({ status: 200, description: 'Experience berhasil dihapus' })
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id);
  }
}

