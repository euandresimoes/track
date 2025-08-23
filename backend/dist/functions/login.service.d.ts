import { PrismaService } from 'src/db/prisma.service';
import { JwtService } from 'src/utils/jwt/jwt.service';
import { ApiResponse } from 'src/models/api-response.model';
export declare class LoginRequestDto {
    email: string;
    password: string;
}
export declare class LoginService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    execute(dto: LoginRequestDto): Promise<ApiResponse>;
}
