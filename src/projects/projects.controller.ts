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
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import {
  CreateProjectDto,
  PROJECT_CATEGORIES,
} from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { ProjectsService } from './projects.service.js';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil seluruh daftar proyek portofolio (Publik)' })
  @ApiQuery({
    name: 'category',
    enum: PROJECT_CATEGORIES,
    required: false,
    description: 'Filter berdasarkan kategori proyek (opsional)',
  })
  @ApiResponse({ status: 200, description: 'Daftar proyek terurut' })
  findAll(@Query('category') category?: string) {
    return this.projectsService.findAll(category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail satu proyek berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Detail proyek' })
  @ApiResponse({ status: 404, description: 'Proyek tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah proyek baru (Admin CMS)' })
  @ApiResponse({ status: 201, description: 'Proyek berhasil dibuat' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Post('reset')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Reset seluruh data proyek ke data awal default (Admin CMS)',
  })
  resetToDefault() {
    return this.projectsService.resetToDefault();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perbarui data proyek & gambar mockup (Admin CMS)' })
  @ApiResponse({ status: 200, description: 'Proyek berhasil diperbarui' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus proyek (Admin CMS)' })
  @ApiResponse({ status: 200, description: 'Proyek berhasil dihapus' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

