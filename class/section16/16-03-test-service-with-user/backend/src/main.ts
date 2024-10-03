import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  // NestFactory를 사용하여 애플리케이션을 생성
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(graphqlUploadExpress());
  app.enableCors({
    origin: ['http://127.0.0.1:5500'], // 프론트엔드가 실행되는 정확한 도메인 또는 포트 설정
    credentials: true, // 쿠키나 인증 정보를 전달할 수 있도록 설정
  });

  // 서버가 실행될 포트를 지정 (기본적으로 3000번 포트)
  await app.listen(3000);
}
bootstrap();
