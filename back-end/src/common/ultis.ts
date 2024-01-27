import { IsNumber, IsOptional } from 'class-validator';

export enum ERROR_CODE {
  INTERNAL_SERVER_ERROR = 500,
  VALIDATION_ERROR = 400,
}
export class Paging {
  @IsNumber()
  page?: number = 1;
  @IsNumber()
  pageSize?: number = 10;

  @IsOptional()
  sortBy: string;

  @IsOptional()
  direction: string;
}
