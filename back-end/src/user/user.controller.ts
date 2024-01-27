import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMessage } from 'src/decorators/response.decorator';
import { Public } from 'src/decorators/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage('Create user successful!')
  @Public()
  @Post()
  async createUser(@Body() params: CreateUserDto) {
    return this.userService.create(params);
  }
}
