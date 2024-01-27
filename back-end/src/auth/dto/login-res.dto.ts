import { IsNotEmpty } from 'class-validator';

export class LoginResDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  expireIn: string;
}
