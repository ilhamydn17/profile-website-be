import { PrismaService } from './prisma/prisma.service.js';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    getHealth(): {
        status: string;
        service: string;
        database: string;
        timestamp: string;
    };
}
