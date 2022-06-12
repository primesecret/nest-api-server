import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
// import { TransformInterceptor } from './interceptors/transform/transform.interceptor';

const PORT = process.env.PORT || 8090;
const PREFIX = process.env.PREFIX || '/';
export const IS_DEV = process.env.NODE_ENV !== 'production';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  console.log(IS_DEV, '개발환경인가');  

  const app = await NestFactory.create(AppModule, {
    // 로그 수준 인쇄 활성화
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });
  // 교차 출처 요청 허용
  app.enableCors();
  
  // 요청에 접두사 추가
  app.setGlobalPrefix(PREFIX);

  // API 문서 정보 구성(프로덕션 환경 구성 문서 아님)
  if (IS_DEV) {
    const options = new DocumentBuilder()
      .setTitle('권한 시스템 관리 API 문서')
      .setDescription('권한 시스템 관리 API 인터페이스 문서')
      .setBasePath(PREFIX)
      .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
      .setVersion('0.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${PREFIX}/docs`, app, document);

    // 브라우저 직접 액세스 http://localhost:5000/api-json
    SwaggerModule.setup('api', app, document);
  }

  // 웹 취약점
  app.use(helmet());

  // 잘못된 필터를 전역적으로 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  // 글로벌 등록 인터셉터(성공적인 반환 형식)
  // app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(PORT, () => {
    logger.log(`서비스가 시작되었습니다. 인터페이스를 방문하십시오.:http://wwww.localhost:${PORT}/${PREFIX}`);
    logger.log(`서비스가 시작되었습니다. 문서를 참조하세요.:http://wwww.localhost:${PORT}/${PREFIX}/docs`);
  });
  
}
bootstrap();
