import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { Get, Req, Res } from '@nestjs/common/decorators/http';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { IContext } from 'src/commons/interfaces/context';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    password: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser,
    @Res() res: Response & IContext,
  ) {
    // 1. 회원조회
    let user = await this.usersService.findOneByEmail({
      email: req.user.email,
    });
    // 2. 회원가입이 안되어 있을 시, 회원가입 진행
    if (!user)
      user = await this.usersService.create({
        ...req.user,
        // name: req.user.name,
        // email: req.user.email,
        // password: req.user.password,
        // age: req.user.age
      });
    // 3. 회원가입이 돼있을 시 (refreshToken, accessToken 브라우저 전송)
    this.authService.setRefreshToken({
      user,
      context: {
        res,
        req: null,
      },
    });
    res.redirect(
      'http://localhost:5500/class/section11/11-06-google-login/frontend/social-login.html',
    );
  }
}
