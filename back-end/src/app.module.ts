import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PollingModule } from './polling/polling.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: true,
        entities: ['dist/**/**.entity{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    UserModule,
    AuthModule,
    PollingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
