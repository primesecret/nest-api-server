import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: ' 한 페이지에 표시되는 항목 수' })
  @IsOptional()
  readonly pageSize?: number;

  @ApiPropertyOptional({ required: false, description: '현재 페이지' })
  @IsOptional()
  readonly pageNumber?: number;
}
