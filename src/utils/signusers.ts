import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export function signUsers() {
  const user1 = {
    sub: '1234567890',
    name: 'Eduardo',
    iat: 1516239022,
  };

  const user2 = {
    sub: '0987654321',
    name: 'Jose',
    iat: 13578966,
  };

  const configService = new ConfigService();
  const secretToken = configService.get<string>('ACCESS_TOKEN_SECRET');
  const accessTokenUser1 = jwt.sign(user1, secretToken);
  const accessTokenUser2 = jwt.sign(user2, secretToken);

  console.log('Key User 1:', accessTokenUser1);
  console.log('Key User 2:', accessTokenUser2);
}
