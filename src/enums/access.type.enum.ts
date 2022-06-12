/** 리소스 유형 열거 유형 */
export enum AccessTypeEnum {
  /** 모듈  */
  MODULE = 1,
  /** 메뉴  */
  MENUS = 2,
  /** 연산(API) */
  OPERATION = 3,
}

/** 리소스 유형 열거 스케치 */
export const AccessTypeMessage = {
  1: '모듈',
  2: '메뉴',
  3: '연산(API)',
};
