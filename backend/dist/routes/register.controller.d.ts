import { RegisterRequestDto } from 'src/functions/register.service';
import { RegisterService } from 'src/functions/register.service';
import { ApiResponse } from 'src/models/api-response.model';
export declare class RegisterController {
    private readonly service;
    constructor(service: RegisterService);
    register(dto: RegisterRequestDto): Promise<ApiResponse>;
}
