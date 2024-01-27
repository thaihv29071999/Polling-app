import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollingOptionsService } from './polling-options.service';
import { PollingOptionsController } from './polling-options.controller';
import { PollingOptionEntity } from './entities/polling-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PollingOptionEntity])],
  controllers: [PollingOptionsController],
  providers: [PollingOptionsService]
})
export class PollingOptionsModule {}
