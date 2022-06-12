import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { LoggerService } from '@src/modules/shared/services/logger/logger.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new LoggerService(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    /**현재 요청 방법 */
    const method = request.method;
    /**현재 요청 경로 */
    const url = request.url;
    const now = Date.now();
    /**현재 요청 매개변수 */
    const body = request.body;
    /**현재 매개변수 매개변수 */
    const params = request.params;
    /**현재 쿼리 매개변수 */
    const query = request.query;
    /**현재 사용자 정보 */
    const user = request.user;
    return next.handle().pipe(
      tap(() => {
        Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
      }),
      map((data) => {
        const message = {
          url,
          method,
          user,
          body,
          params,
          query,
          data,
        };
        this.logger.info(message, '미들웨어 로깅');
        return data;
      }),
    );
  }
}
