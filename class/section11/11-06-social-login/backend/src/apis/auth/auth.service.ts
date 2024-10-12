import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceLoginOAuth,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
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
      { secret: '나의비밀번호', expiresIn: '20s' },
    );
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    // 개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );

    // 배포환경
    // context.res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=none; Secure; httpOnly;`,);
    // context.res.setHeader("Access-Control-Allow-Origin", "https://myfrontsitr.com");
  }

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    // 2. 일치하는 유저가 없으면
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    const isAuth = await bcrypt.compare(password, user.password);

    // 3. 일치하는 유저가 있지만, 비밀번호가 틀림
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');

    // 4. refreshToken(JWT) 브라우저 쿠키에 저장해서 전달
    this.setRefreshToken({ user, context });

    // 5. 일치하는 유저도 있고, 비밀번호도 맞으면
    //    => accessToken(JWT) 브라우저에 전달
    return this.getAccessToken({ user });
  }

  async loginOAuth({ req, res }: IAuthServiceLoginOAuth) {
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
    this.setRefreshToken({
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
