import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (data && request.user) {
    return request.user[data];
  } else {
    return request.user;
  }
});

/**
 * 현재 사용자의 데이터 유형을 정의합니다.
 */
export interface ICurrentUserType {
  id: number;
  username: string;
  email: string;
  mobile: string;
  isSuper: number;
  platform: number;
}
