import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from './jwt.secret';

class Payload {
  id: number;
}

@Injectable()
export class JwtService {
  sign(payload: Payload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
  }

  verify(token: string): jwt.JwtPayload {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
  }
}
