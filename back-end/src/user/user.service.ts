import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwError } from 'rxjs';
import { ErrorException } from 'src/common/exceptions';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
  async create(params: CreateUserDto) {
    const emailExist = await this.userRepo.findOne({
      where: { email: params.email },
    });
    if (emailExist)
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        `Email ${params.email} already exists!`,
      );
    const passwordHash = await bcrypt.hash(params.password, 12);
    const newUser = this.userRepo.create({ ...params, password: passwordHash });
    this.userRepo.save(newUser);
  }
}
