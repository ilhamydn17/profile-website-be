var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(dto) {
        const envEmail = this.configService.get('ADMIN_EMAIL') ?? 'admin@ilham.dev';
        const envPassword = this.configService.get('ADMIN_PASSWORD') ?? 'AdminPassword2026!';
        let matchedUser = null;
        if (this.prisma.isConnected) {
            try {
                const dbAdmin = await this.prisma.adminUser.findUnique({
                    where: { email: dto.email },
                });
                if (dbAdmin) {
                    const isValid = await bcrypt.compare(dto.password, dbAdmin.passwordHash);
                    if (!isValid) {
                        throw new UnauthorizedException('Email atau password tidak valid');
                    }
                    matchedUser = {
                        id: dbAdmin.id,
                        email: dbAdmin.email,
                        name: dbAdmin.name,
                    };
                }
            }
            catch (err) {
                if (err instanceof UnauthorizedException) {
                    throw err;
                }
            }
        }
        if (!matchedUser) {
            if (dto.email === envEmail && dto.password === envPassword) {
                matchedUser = {
                    id: 'admin-default',
                    email: envEmail,
                    name: 'Ilham (Admin)',
                };
            }
            else {
                throw new UnauthorizedException('Email atau password tidak valid');
            }
        }
        const payload = {
            sub: matchedUser.id,
            email: matchedUser.email,
            name: matchedUser.name,
            role: 'ADMIN',
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            accessToken,
            user: matchedUser,
        };
    }
    getProfile(user) {
        return {
            id: user.sub,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map