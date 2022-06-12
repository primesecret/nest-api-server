import * as path from 'path';

import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';


import { LoggingInterceptor } from './interceptors/logging/logging.interceptor';
import { ValidationPipe } from './pipe/validation/validation.pipe';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';


@Module({
  imports: [
    // 구성 로드 구성 파일
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      modifyConfigName: (name: string) => name.replace('.config', ''),
    }),    
    // mysql 연결    
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({        
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        logging: config.get('database.logging'),
        synchronize: true, // 데이터베이스 동기화
        timezone: '+08:00', // 이스트 8 지구
        cache: {
          duration: 60000, // 1분 캐시
        },
        extra: {
          poolMax: 32,
          poolMin: 16,
          queueTimeout: 60000,
          pollPingInterval: 60, // 60초마다 연결
          pollTimeout: 60, // 60초 동안 유효한 연결
        },
      }),
      inject: [ConfigService],
    })
    
    
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // 파이프를 전역적으로 사용(데이터 유효성 검사)
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
