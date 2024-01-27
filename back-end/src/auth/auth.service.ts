import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ErrorException } from 'src/common/exceptions';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResDto } from './dto/login-res.dto';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async login(params: LoginRequestDto): Promise<LoginResDto> {
    const userExist = await this.userRepo.findOne({
      where: { email: params.email },
    });
    if (!userExist)
      throw new ErrorException(HttpStatus.BAD_REQUEST, 'User not found!');

    const isMatch = await bcrypt.compare(params.password, userExist.password);
    if (!isMatch) {
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        'Email or password is wrong!',
      );
    }
    delete userExist.password;
    const jwt = await this.generateJwt(userExist);
    const loginResDto = new LoginResDto();
    loginResDto.accessToken = jwt;
    return loginResDto;
  }
  async generateJwt(user) {
    return this.jwtService.signAsync( 
      { user },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      },
    );
  }
}
