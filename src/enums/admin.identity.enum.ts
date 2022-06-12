/** 백그라운드 관리 계정 ID 열거 유형  */
export enum AdminIdentityEnum {
  /** 일반 계정 */
  NORMAL = 0,
  /** 최고 관리자 */
  SUPPER = 1,
}

/** 백그라운드 관리 계정 ID 스케치 */
export const AdminIdentityMessage = {
  0: '일반 계정',
  1: '최고 관리자',
};
