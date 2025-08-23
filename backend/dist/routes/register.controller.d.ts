import { ApiResponse } from 'src/models/api-response.model';
import { RegisterService, RegisterRequestDto } from 'src/services/register.service';
export declare class RegisterController {
    private readonly service;
    constructor(service: RegisterService);
    register(dto: RegisterRequestDto): Promise<ApiResponse>;
}
