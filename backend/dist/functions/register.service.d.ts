import { PrismaService } from 'src/db/prisma.service';
export declare class RegisterRequestDto {
    display_name: string;
    email: string;
    password: string;
}
export declare class RegisterService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    execute(dto: RegisterRequestDto): Promise<void>;
}
