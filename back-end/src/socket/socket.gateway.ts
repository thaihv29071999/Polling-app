import { InjectRepository } from '@nestjs/typeorm';
import {
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PollingEntity } from 'src/polling/entities/polling.entity';
import { PollingService } from 'src/polling/polling.service';
import { Repository } from 'typeorm';
@WebSocketGateway({
  cors: {
    origin: process.env.HOST_SOCKET_ALLOWED,
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  constructor(private readonly pollingService: PollingService) {}

  @SubscribeMessage('new-polly')
  public async newPolly(@MessageBody() data: { pollId: number }) {
    const { pollId } = data;
    const poll = await this.pollingService.findOne(pollId);
    this.server.emit('new-polly-create', poll);
    return;
  }

  @SubscribeMessage('vote')
  public async votePolly(@MessageBody() data: { pollId: number }) {
    const { pollId } = data;

    const poll = await this.pollingService.findOne(pollId);

    this.server.emit(`voted_${pollId}`, poll);
    this.server.emit('update', poll);
    return;
  }

  public afterInit(): void {
    console.log('server started.........................');
  }
  public handleConnection(client: Socket): void {
    client.emit('user', client.id);
    console.log('client++++++++++++++++++++++++++++++++', client.id);
  }
  public handleDisconnect(client: Socket): void {
    console.log('client===================================', client.id);
  }
}
