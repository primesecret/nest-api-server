/** 플랫폼 열거형  */
export enum PlatformEnum {
  /** 일반 사람들(권한 없음)  */
  NO_AUTH = 0,
  /** 운영자 플랫폼  */
  ADMIN_PLATFORM = 1,
  /** 체크인 가맹점 플랫폼  */
  MERCHANT_PLATFORM = 2,
}

/** 플랫폼 텍스트 스케치  */
export const PlatformMessage = {
  0: '일반인',
  1: '운영 관리 플랫폼',
  2: '상인 플랫폼에 체크인',
};
