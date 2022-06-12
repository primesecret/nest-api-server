import moment from 'moment';

export const formatDate = (dateNum: string | number, isDue = false): string => {
  if (isDue) {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  } else {
    return moment(dateNum).format('YYYY-MM-DD HH:mm:ss');
  }
};

export const getDay = (date: Date = new Date()): string => {
  return moment(date).format('YYYYMMDD');
};

export const getTime = (): number => {
  return new Date().getTime();
};


export const birthdayYear = (date: Date): string | null => {
  try {
    return date ? `${moment().diff(date, 'years')}` : null;
  } catch (e) {
    console.log(e);
    return null;
  }
};


export const dueDateMillisecond = (date: string): number => {
  // 현재 시간
  const currentTime = Number.parseInt(String(new Date().getTime() / 1000));
  // 미래의 시간
  const futureTime = Number.parseInt(String(new Date(date).getTime() / 1000));
  if (futureTime <= currentTime) {
    return 0;
  } else {
    // 여기에서 초를 밀리초로 변환
    return (futureTime - currentTime) * 1000;
  }
};
