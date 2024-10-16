import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

class GoogleAuthGuard extends AuthGuard('google') {}
class KakaoAuthGuard extends AuthGuard('naver') {}
class NaverAuthGuard extends AuthGuard('kakao') {}

const googleAuthGuard = new GoogleAuthGuard();
const kakaoAuthGuard = new KakaoAuthGuard();
const naverAuthGuard = new NaverAuthGuard();

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    if (social === 'google') return googleAuthGuard.canActivate(context);
    if (social === 'kakao') return kakaoAuthGuard.canActivate(context);
    if (social === 'naver') return naverAuthGuard.canActivate(context);
  }
}
