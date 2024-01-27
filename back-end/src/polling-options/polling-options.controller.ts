import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PollingOptionsService } from './polling-options.service';
import { CreatePollingOptionDto } from './dto/create-polling-option.dto';
import { UpdatePollingOptionDto } from './dto/update-polling-option.dto';

@Controller('polling-options')
export class PollingOptionsController {
  constructor(private readonly pollingOptionsService: PollingOptionsService) {}

  @Post()
  create(@Body() createPollingOptionDto: CreatePollingOptionDto) {
    return this.pollingOptionsService.create(createPollingOptionDto);
  }

  @Get()
  findAll() {
    return this.pollingOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollingOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePollingOptionDto: UpdatePollingOptionDto) {
    return this.pollingOptionsService.update(+id, updatePollingOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pollingOptionsService.remove(+id);
  }
}
