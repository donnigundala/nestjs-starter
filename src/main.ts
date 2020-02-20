import { NestFactory } from '@nestjs/core';
import { ConfigService } from "@nestjs/config";
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appPort: number = configService.get('app.port');
  const appUrl: string = configService.get('app.url');

  await app.listen(appPort);

  Logger.log(`Application running on: ${appUrl}:${appPort}`, 'Bootstrap')
}
bootstrap();
