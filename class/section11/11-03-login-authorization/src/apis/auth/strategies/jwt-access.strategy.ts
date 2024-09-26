import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { KakaoStrategy } from 'passport-kakao'
// import { NaverStrategy } from 'passport-naver'
// import { GoogleStrategy } from 'passport-google'

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.header.Authorization; // Bearer jkhiuskjmnxcvsd...
      //   const accessToken = temp.toLowercase().replace('bearer ', '');
      //   return accessToken;
      // }, // accessToken
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의 비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // {sub: user.id, ...}
    return {
      id: payload.sub,
    };
  }
}
