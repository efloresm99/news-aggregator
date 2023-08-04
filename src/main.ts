import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { signUsers } from './utils/signusers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = new ConfigService();
  const port = configService.get<number>('PORT');

  await app.listen(port, () => signUsers());
}
bootstrap();
