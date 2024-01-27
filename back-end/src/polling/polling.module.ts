import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollingService } from './polling.service';
import { PollingController } from './polling.controller';
import { PollingEntity } from './entities/polling.entity';
import { PollingOptionEntity } from './entities/polling-option.entity';
import { PollingOptionUserEntity } from './entities/polling-option-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PollingEntity,
      PollingOptionEntity,
      PollingOptionUserEntity,
    ]),
  ],
  controllers: [PollingController],
  providers: [PollingService],
})
export class PollingModule {}
