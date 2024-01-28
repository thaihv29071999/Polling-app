import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePollingDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsArray()
  options: string[];
}
