import { applyDecorators, SetMetadata } from '@nestjs/common';
import { REDIS_CACHE_KEY, REDIS_CACHE_EX_SECOND_KEY } from '@src/constants';
import redisCacheConfig from '@src/config/redisCache.config';

// 캐시 여부
const isCache = true;

/** 
 * @Description: 경로에 캐시되어야 하는 인터페이스를 장식하는 데 사용되는 사용자 지정 데코레이터
 * @param {number} exSecond Redis 캐시 만료 시간, 시간이 더 좋습니다
 * @return {*}
 */
export function RedisCacheApi(exSecond: number = redisCacheConfig.redisEXSecond): any {
  return applyDecorators(
    SetMetadata(REDIS_CACHE_KEY, isCache),
    SetMetadata(REDIS_CACHE_EX_SECOND_KEY, exSecond),
  );
}
