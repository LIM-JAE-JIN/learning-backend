import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DefaultDeserializer } from 'v8';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const qqq = 3;

    const dd = {
      eee: 123,
      dksajd: 123,
    };

    return this.appService.getHello();
  }
}
