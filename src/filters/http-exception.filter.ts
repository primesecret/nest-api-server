import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { formatDate } from '@src/utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let resultMessage = exception.message;
    let resultCode = 1;
    let resultParams = {};
    try {
      const { code, message, ...oth } = JSON.parse(exception.message);
      resultMessage = message;
      resultCode = code;
      resultParams = oth;
    } catch (e) {}
    // const message = exception.message;
    Logger.log(exception, '에러 메시지');
    const errorResponse = {
      status,
      message: resultMessage,
      code: resultCode, // 사용자 정의 코드
      params: resultParams,
      path: request.url, // 잘못된 URL 주소
      method: request.method, // 요청 방법
      timestamp: new Date().toLocaleDateString(), // 잘못된 시간
    };
    // 인쇄 로그
    Logger.error(
      `【${formatDate(Date.now())}】${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter',
    );
    // 반환된 상태 코드를 설정하고 헤더를 요청하고 오류 정보를 보냅니다.
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
