import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  getAccessToken({ user }: IAuthGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의 비밀번호', expiresIn: '1h' },
    );
  }

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀림
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');

    // 4. 일치하는 유저도 있고, 비밀번호도 맞으면
    //    => accessToken(JWT) 브라우저에 전달
    return this.getAccessToken({ user });
  }
}
