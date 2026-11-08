var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateProjectDto, PROJECT_CATEGORIES, } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { ProjectsService } from './projects.service.js';
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    findAll(category) {
        return this.projectsService.findAll(category);
    }
    findOne(id) {
        return this.projectsService.findOne(id);
    }
    create(dto) {
        return this.projectsService.create(dto);
    }
    resetToDefault() {
        return this.projectsService.resetToDefault();
    }
    update(id, dto) {
        return this.projectsService.update(id, dto);
    }
    remove(id) {
        return this.projectsService.remove(id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Ambil seluruh daftar proyek portofolio (Publik)' }),
    ApiQuery({
        name: 'category',
        enum: PROJECT_CATEGORIES,
        required: false,
        description: 'Filter berdasarkan kategori proyek (opsional)',
    }),
    ApiResponse({ status: 200, description: 'Daftar proyek terurut' }),
    __param(0, Query('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Ambil detail satu proyek berdasarkan ID' }),
    ApiResponse({ status: 200, description: 'Detail proyek' }),
    ApiResponse({ status: 404, description: 'Proyek tidak ditemukan' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findOne", null);
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Tambah proyek baru (Admin CMS)' }),
    ApiResponse({ status: 201, description: 'Proyek berhasil dibuat' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    Post('reset'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({
        summary: 'Reset seluruh data proyek ke data awal default (Admin CMS)',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "resetToDefault", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Perbarui data proyek & gambar mockup (Admin CMS)' }),
    ApiResponse({ status: 200, description: 'Proyek berhasil diperbarui' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Hapus proyek (Admin CMS)' }),
    ApiResponse({ status: 200, description: 'Proyek berhasil dihapus' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
ProjectsController = __decorate([
    ApiTags('Projects'),
    Controller('projects'),
    __metadata("design:paramtypes", [ProjectsService])
], ProjectsController);
export { ProjectsController };
//# sourceMappingURL=projects.controller.js.map