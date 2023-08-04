import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) req.body.auth = false;

    const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
    jwt.verify(token, secret, (err) => {
      req.body.auth = err ? false : true;
    });
    next();
  }
}
