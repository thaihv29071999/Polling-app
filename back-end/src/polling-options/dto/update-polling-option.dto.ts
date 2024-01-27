import { PartialType } from '@nestjs/mapped-types';
import { CreatePollingOptionDto } from './create-polling-option.dto';

export class UpdatePollingOptionDto extends PartialType(CreatePollingOptionDto) {}
