/** 오류를 반환하는 코드 정의 */
export enum CodeEnum {
  /** 전달된 토큰 없음  */
  NO_TOKEN = 10042,
  /** 토큰 오류 */
  TOKEN_ERROR = 10043,
}

/** 잘못된 코드 텍스트 그리기 */
export const CodeMessage = {
  10042: '아직 로그인하지 않았습니다. 먼저 로그인하십시오',
  10043: '잘못된 토큰이 전달되었습니다',
};
