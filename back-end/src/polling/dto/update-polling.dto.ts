import { PartialType } from '@nestjs/mapped-types';
import { Paging } from 'src/common/ultis';

export class FilterPollingDto extends PartialType(Paging) {}
