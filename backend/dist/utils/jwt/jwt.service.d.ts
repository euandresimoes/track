import * as jwt from 'jsonwebtoken';
declare class Payload {
    id: number;
}
export declare class JwtService {
    sign(payload: Payload): string;
    verify(token: string): jwt.JwtPayload;
}
export {};
