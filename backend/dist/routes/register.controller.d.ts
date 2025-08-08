import { RegisterRequestDto } from 'src/functions/register.service';
import { RegisterService } from 'src/functions/register.service';
export declare class RegisterController {
    private readonly service;
    constructor(service: RegisterService);
    register(dto: RegisterRequestDto): Promise<void>;
}
