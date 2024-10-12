import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// object literal lookup
const SYNAMIC_AUTH_GUARD = {
  google: new (class extends AuthGuard('google') {})(),
  kakao: new (class extends AuthGuard('kakao') {})(),
  naver: new (class extends AuthGuard('naver') {})(),
};

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    return SYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
