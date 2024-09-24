import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  // NestFactory를 사용하여 애플리케이션을 생성
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // 서버가 실행될 포트를 지정 (기본적으로 3000번 포트)
  await app.listen(3000);
}
bootstrap();
