import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreatePollingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => PollingOptionsDto)
  @IsNotEmpty()
  options: PollingOptionsDto[];
}

export class PollingOptionsDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
