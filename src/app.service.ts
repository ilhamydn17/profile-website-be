import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getHealth() {
    return {
      status: 'ok',
      service: 'profile-website-be',
      database: this.prisma.isConnected ? 'connected' : 'in-memory-fallback',
      timestamp: new Date().toISOString(),
    };
  }
}
