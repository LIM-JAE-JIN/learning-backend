import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { Get, Req, Res } from '@nestjs/common/decorators/http';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IOAuthUser } from './interfaces/auth-service.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.loginOAuth({ req, res });
  }

  @UseGuards(AuthGuard('kakao'))
  @Get('/login/kakao')
  async loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.loginOAuth({ req, res });
  }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/naver')
  async loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.loginOAuth({ req, res });
  }
}
