import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Put,
} from '@nestjs/common';
import { PollingService } from './polling.service';
import { CreatePollingDto } from './dto/create-polling.dto';
import { ResponseMessage } from 'src/decorators/response.decorator';
import { VotePollingDto } from './dto/vote-polling.dto';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @ResponseMessage('Create Polling successful!')
  @Post('new-polly')
  async create(@Body() params: CreatePollingDto, @Request() req: Request) {
    const currentUserId = req['user'].id;
    return this.pollingService.create(params, currentUserId);
  }

  @ResponseMessage('Get list Pollings successful!')
  @Post('list')
  async findAll() {
    return this.pollingService.findAll();
  }

  @ResponseMessage('Get detail Polling successful!')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.pollingService.findOne(id);
  }

  @ResponseMessage('Vote Polling successful!')
  @Put('vote')
  async vote(@Body() params: VotePollingDto, @Request() req: Request) {
    const currentUserId = req['user'].id;
    return this.pollingService.vote(params, currentUserId);
  }
}
