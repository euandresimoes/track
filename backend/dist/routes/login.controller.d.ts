import { ApiResponse } from 'src/models/api-response.model';
import { LoginService, LoginRequestDto } from 'src/services/login.service';
export declare class LoginController {
    private readonly service;
    constructor(service: LoginService);
    login(dto: LoginRequestDto): Promise<ApiResponse>;
}
