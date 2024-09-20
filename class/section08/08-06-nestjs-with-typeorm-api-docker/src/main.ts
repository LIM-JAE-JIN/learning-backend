import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory를 사용하여 애플리케이션을 생성
  const app = await NestFactory.create(AppModule);

  // 서버가 실행될 포트를 지정 (기본적으로 3000번 포트)
  await app.listen(3000);
}
bootstrap();