import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollingEntity } from 'src/polling/entities/polling.entity';
import { PollingOptionEntity } from 'src/polling/entities/polling-option.entity';
import { PollingOptionUserEntity } from 'src/polling/entities/polling-option-user.entity';
import { PollingService } from 'src/polling/polling.service';
import { PollingModule } from 'src/polling/polling.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PollingEntity,
      PollingOptionEntity,
      PollingOptionUserEntity,
    ]),
    PollingModule,
  ],
  providers: [SocketGateway],
})
export class SocketModule {}
