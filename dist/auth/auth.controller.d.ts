import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { type AuthenticatedRequest } from './jwt-auth.guard.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    getMe(req: AuthenticatedRequest): {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}
