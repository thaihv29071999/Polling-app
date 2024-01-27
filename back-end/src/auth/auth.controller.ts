import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/decorators/auth.decorator';
import { ResponseMessage } from 'src/decorators/response.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage("Login succcessful!")
  @Public()
  @Post('login')
  async login(@Body() params: LoginRequestDto) {
    return this.authService.login(params);
  }

}
