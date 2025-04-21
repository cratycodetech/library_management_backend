import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgoraModule } from './agora/agora.module';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
    AgoraModule,
    NotificationModule,
  ],
})
export class AppModule {}
