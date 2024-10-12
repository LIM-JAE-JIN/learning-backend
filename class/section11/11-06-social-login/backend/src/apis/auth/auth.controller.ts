import { Controller, UseGuards } from '@nestjs/common/decorators/core';
import { Get, Req, Res } from '@nestjs/common/decorators/http';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IOAuthUser } from './interfaces/auth-service.interface';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard-04';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/:social')
  @UseGuards(DynamicAuthGuard)
  loginOAuth(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    return this.authService.loginOAuth({ req, res });
  }
}
