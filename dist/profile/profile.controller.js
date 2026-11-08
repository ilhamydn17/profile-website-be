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
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileService } from './profile.service.js';
let ProfileController = class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    getProfile() {
        return this.profileService.getProfile();
    }
    updateProfile(dto) {
        return this.profileService.updateProfile(dto);
    }
    getSkills() {
        return this.profileService.getSkills();
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Ambil informasi profil utama & statistik (Publik)' }),
    ApiResponse({ status: 200, description: 'Data profil portofolio' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfile", null);
__decorate([
    Patch(),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiOperation({
        summary: 'Perbarui informasi profil, bio, status ketersediaan, dan avatarUrl (Admin CMS)',
    }),
    ApiResponse({ status: 200, description: 'Profil berhasil diperbarui' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    Get('skills'),
    ApiOperation({ summary: 'Ambil daftar kategori keahlian / tech stack (Publik)' }),
    ApiResponse({ status: 200, description: 'Daftar kategori skill' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getSkills", null);
ProfileController = __decorate([
    ApiTags('Profile'),
    Controller('profile'),
    __metadata("design:paramtypes", [ProfileService])
], ProfileController);
export { ProfileController };
//# sourceMappingURL=profile.controller.js.map