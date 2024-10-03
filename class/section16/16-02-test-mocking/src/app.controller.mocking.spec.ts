import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingModule, Test } from '@nestjs/testing';

class MockAppService {
  getHello(): string {
    return '나는 가짜다!';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // describe('fetchBoards', () => {
  //   const appService = new AppService();
  //   const appController = new AppController(appService);
  // });

  // describe('createBoard', () => {
  //   const appService = new AppService();
  //   const appController = new AppController(appService);
  // });
});
