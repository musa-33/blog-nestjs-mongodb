import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const logger = new Logger('main.ts:bootstrap')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');

  await app.listen(port);

  logger.debug(`APP STARTED, port: ${port}, env: ${process.env.ENVIRONMENT}`)
}
bootstrap();
