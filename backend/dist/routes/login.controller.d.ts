import { LoginRequestDto, LoginService } from 'src/functions/login.service';
import { ApiResponse } from 'src/models/api-response.model';
export declare class LoginController {
    private readonly service;
    constructor(service: LoginService);
    login(dto: LoginRequestDto): Promise<ApiResponse>;
}
