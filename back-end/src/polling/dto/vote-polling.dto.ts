import { IsNotEmpty } from 'class-validator';

export class VotePollingDto {
  @IsNotEmpty()
  pollingId: number;

  @IsNotEmpty()
  optionId: number;
}
