import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const appConfigService = app.get(AppConfigService)
  const port = appConfigService.serverPort
  await app.listen(port);
  console.log('Servidor rodando na porta: ' + port)
}
bootstrap();
