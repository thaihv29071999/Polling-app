import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollingService } from './polling.service';
import { PollingController } from './polling.controller';
import { PollingEntity } from './entities/polling.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PollingEntity])],
  controllers: [PollingController],
  providers: [PollingService]
})
export class PollingModule {}
