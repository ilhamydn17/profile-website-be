import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import type { JwtPayload } from './jwt-auth.guard.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const envEmail =
      this.configService.get<string>('ADMIN_EMAIL') ?? 'admin@ilham.dev';
    const envPassword =
      this.configService.get<string>('ADMIN_PASSWORD') ?? 'AdminPassword2026!';

    let matchedUser: { id: string; email: string; name: string } | null = null;

    if (this.prisma.isConnected) {
      try {
        const dbAdmin = await this.prisma.adminUser.findUnique({
          where: { email: dto.email },
        });
        if (dbAdmin) {
          const isValid = await bcrypt.compare(
            dto.password,
            dbAdmin.passwordHash,
          );
          if (!isValid) {
            throw new UnauthorizedException('Email atau password tidak valid');
          }
          matchedUser = {
            id: dbAdmin.id,
            email: dbAdmin.email,
            name: dbAdmin.name,
          };
        }
      } catch (err) {
        if (err instanceof UnauthorizedException) {
          throw err;
        }
        // Fallback to env check if table is not migrated yet
      }
    }

    if (!matchedUser) {
      if (dto.email === envEmail && dto.password === envPassword) {
        matchedUser = {
          id: 'admin-default',
          email: envEmail,
          name: 'Ilham (Admin)',
        };
      } else {
        throw new UnauthorizedException('Email atau password tidak valid');
      }
    }

    const payload: JwtPayload = {
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

  getProfile(user: JwtPayload) {
    return {
      id: user.sub,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}

