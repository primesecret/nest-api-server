import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/** 
 * @Description: 요청 헤더에서 ip 주소를 가져옵니다. ip를 가져오려면 nginx를 구성해야 합니다. 
 */
export const IpAddress = createParamDecorator((_data: string, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  const rawIp: string | undefined =
    req.header('x-forwarded-for') || req.connection.remoteAddress || req.socket.remoteAddress;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ipAddress = rawIp ? rawIp!.split(',')[0] : '';
  return ipAddress;
});
