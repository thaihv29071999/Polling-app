import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePollingDto } from './dto/create-polling.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PollingEntity } from './entities/polling.entity';
import { Repository } from 'typeorm';
import { ErrorException } from 'src/common/exceptions';
import { PollingOptionEntity } from 'src/polling/entities/polling-option.entity';
import { VotePollingDto } from './dto/vote-polling.dto';
import { PollingOptionUserEntity } from './entities/polling-option-user.entity';

@Injectable()
export class PollingService {
  constructor(
    @InjectRepository(PollingEntity)
    private readonly pollingRepo: Repository<PollingEntity>,
    @InjectRepository(PollingOptionUserEntity)
    private readonly optionUserRepo: Repository<PollingOptionUserEntity>,
  ) {}

  async create(params: CreatePollingDto, currentUserId: number) {
    const isPollingExisted = await this.pollingRepo.findOne({
      where: { title: params.title },
    });
    if (isPollingExisted)
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        `The Polling ${params.title} already exists!`,
      );
    this.validatePollingOptions(params.options);

    const pollingOptions = params.options.map((option) => {
      const pollingOption = new PollingOptionEntity();
      pollingOption.content = option;
      return pollingOption;
    });
    const polling = this.pollingRepo.create({
      pollingOptions,
      title: params.title,
      user: {
        id: currentUserId,
      },
    });
    return this.pollingRepo.save(polling);
  }

  validatePollingOptions(options: string[]) {
    if (!options || (options && options.length === 0))
      throw new ErrorException(HttpStatus.BAD_REQUEST, `There is no option!`);
    if (options && (options.length < 2 || options.length > 5))
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        `The options must be greater equal than or equal 2 and less than or equal 5`,
      );
    if (this.isDuplicateOption(options))
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        `The options cannot be duplicate!`,
      );
  }
  isDuplicateOption(options: string[]) {
    const seen = new Set();
    for (const option of options) {
      const content = option;
      if (seen.has(content)) {
        return true;
      }
      seen.add(content);
    }
    return false;
  }

  async findAll() {
    let [pollings, count] = await this.pollingRepo.findAndCount({
      order: { id: 'DESC', pollingOptions: { id: 'ASC' } },
      relations: ['user', 'pollingOptions.optionUsers.user'],
    });
    pollings = pollings.map((e) => {
      delete e.user.password;
      return e;
    });
    return {
      pollings,
    };
  }

  async findOne(id: number) {
    const polling = await this.pollingRepo.findOne({
      where: { id },
      relations: ['user', 'pollingOptions.optionUsers.user'],
      order: { pollingOptions: { id: 'ASC' } },
    });
    if (!polling)
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        `The Polling doesn't existed!`,
      );
    return polling;
  }

  async vote(params: VotePollingDto, currentUserId: number) {
    const polling = await this.findOne(params.pollingId);
    if (polling.user.id === currentUserId)
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        `Cannot vote your polling!`,
      );

    if (
      !polling.pollingOptions
        .map((option) => option.id)
        .includes(params.optionId)
    )
      throw new ErrorException(
        HttpStatus.BAD_REQUEST,
        `Cannot find this option of the polling!`,
      );
    polling.pollingOptions.forEach((option) => {
      if (
        option.optionUsers
          .map((optionUser) => optionUser.user.id)
          .includes(currentUserId)
      )
        throw new ErrorException(
          HttpStatus.BAD_REQUEST,
          `You voted. Cannot vote again!`,
        );
    });

    const optionUser = this.optionUserRepo.create({
      options: {
        id: params.optionId,
      },
      user: {
        id: currentUserId,
      },
    });
    return this.optionUserRepo.save(optionUser);
  }
}
