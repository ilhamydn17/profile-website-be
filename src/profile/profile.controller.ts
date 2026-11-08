import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { ProfileService } from './profile.service.js';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil informasi profil utama & statistik (Publik)' })
  @ApiResponse({ status: 200, description: 'Data profil portofolio' })
  getProfile() {
    return this.profileService.getProfile();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Perbarui informasi profil, bio, status ketersediaan, dan avatarUrl (Admin CMS)',
  })
  @ApiResponse({ status: 200, description: 'Profil berhasil diperbarui' })
  updateProfile(@Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(dto);
  }

  @Get('skills')
  @ApiOperation({ summary: 'Ambil daftar kategori keahlian / tech stack (Publik)' })
  @ApiResponse({ status: 200, description: 'Daftar kategori skill' })
  getSkills() {
    return this.profileService.getSkills();
  }
}

