import { Injectable } from '@nestjs/common';
import { CreatePollingOptionDto } from './dto/create-polling-option.dto';
import { UpdatePollingOptionDto } from './dto/update-polling-option.dto';

@Injectable()
export class PollingOptionsService {
  create(createPollingOptionDto: CreatePollingOptionDto) {
    return 'This action adds a new pollingOption';
  }

  findAll() {
    return `This action returns all pollingOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pollingOption`;
  }

  update(id: number, updatePollingOptionDto: UpdatePollingOptionDto) {
    return `This action updates a #${id} pollingOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} pollingOption`;
  }
}
