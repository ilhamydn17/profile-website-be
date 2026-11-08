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
import { ExperienceType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateExperienceDto } from './dto/create-experience.dto.js';
import { UpdateExperienceDto } from './dto/update-experience.dto.js';
import { ExperiencesService } from './experiences.service.js';
let ExperiencesController = class ExperiencesController {
    experiencesService;
    constructor(experiencesService) {
        this.experiencesService = experiencesService;
    }
    findAll(type) {
        return this.experiencesService.findAll(type);
    }
    findOne(id) {
        return this.experiencesService.findOne(id);
    }
    create(dto) {
        return this.experiencesService.create(dto);
    }
    resetToDefault() {
        return this.experiencesService.resetToDefault();
    }
    update(id, dto) {
        return this.experiencesService.update(id, dto);
    }
    remove(id) {
        return this.experiencesService.remove(id);
    }
};
__decorate([
    Get(),
    ApiOperation({
        summary: 'Ambil seluruh daftar pengalaman kerja & pendidikan (Publik)',
    }),
    ApiQuery({
        name: 'type',
        enum: ExperienceType,
        required: false,
        description: 'Filter berdasarkan tipe pengalaman (opsional)',
    }),
    ApiResponse({ status: 200, description: 'Daftar experiences terurut' }),
    __param(0, Query('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    ApiOperation({ summary: 'Ambil detail satu experience berdasarkan ID' }),
    ApiResponse({ status: 200, description: 'Detail experience' }),
    ApiResponse({ status: 404, description: 'Experience tidak ditemukan' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "findOne", null);
__decorate([
    Post(),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Tambah experience baru (Admin CMS)' }),
    ApiResponse({ status: 201, description: 'Experience berhasil dibuat' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateExperienceDto]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "create", null);
__decorate([
    Post('reset'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({
        summary: 'Reset seluruh data experience ke data awal default (Admin CMS)',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "resetToDefault", null);
__decorate([
    Patch(':id'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Perbarui data experience (Admin CMS)' }),
    ApiResponse({ status: 200, description: 'Experience berhasil diperbarui' }),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateExperienceDto]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Hapus data experience (Admin CMS)' }),
    ApiResponse({ status: 200, description: 'Experience berhasil dihapus' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExperiencesController.prototype, "remove", null);
ExperiencesController = __decorate([
    ApiTags('Experiences'),
    Controller('experiences'),
    __metadata("design:paramtypes", [ExperiencesService])
], ExperiencesController);
export { ExperiencesController };
//# sourceMappingURL=experiences.controller.js.map