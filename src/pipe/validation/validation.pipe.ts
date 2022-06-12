import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { values } from 'lodash';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    // 유효성 검사 규칙이 전달되지 않으면 유효성 검사가 수행되지 않고 데이터가 직접 반환됩니다
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // 유효성을 검사하기 위해 객체를 클래스로 변환
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    Logger.log(errors, 'validation.pipe처리');
    if (errors.length > 0) {      
      // 모든 오류 메시지를 트래버스하고 프런트 엔드로 돌아갑니다.
      // const errorMessage = errors.map(항목 => {
      // 반품 {
      // currentValue: item.value === undefined ? '' : item.value,
      // [item.property]: _.values(item.constraints)[0],
      // };
      // });
      // 첫 번째 오류를 얻고 반환
      const msg = values(errors[0].constraints)[0];
      // 통합 예외 발생
      throw new HttpException({ message: msg }, HttpStatus.OK);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
