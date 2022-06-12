/** 상태 열거형 */
export enum StatusEnum {
  /** 장애를 입히다 */
  FORBIDDEN = 0,
  /** 정상  */
  NORMAL = 1,
}

/** 상태 스케치 */
export const StatusMessage = {
  0: '비활성화',
  1: '정상',
};
