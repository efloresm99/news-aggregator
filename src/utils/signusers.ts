import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export function signUsers() {
  const userEduardo = {
    sub: '1234567890',
    name: 'Eduardo',
    iat: 1516239022,
  };

  const userJose = {
    sub: '0987654321',
    name: 'Jose',
    iat: 13578966,
  };

  const configService = new ConfigService();
  const secretToken = configService.get<string>('ACCESS_TOKEN_SECRET');
  const accessTokenEd = jwt.sign(userEduardo, secretToken);
  const accessTokenJos = jwt.sign(userJose, secretToken);

  console.log('Key Ed:', accessTokenEd);
  console.log('Key Jos:', accessTokenJos);
}
