import { LoginRequestDto, LoginService } from 'src/functions/login.service';
export declare class LoginController {
    private readonly service;
    constructor(service: LoginService);
    login(dto: LoginRequestDto): Promise<{
        access_token: string;
    }>;
}
