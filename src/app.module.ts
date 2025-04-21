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
      host: 'localhost', // Use your PostgreSQL server address
      port: 5432, // Default PostgreSQL port
      username: 'postgres', // Your PostgreSQL username
      password: 'abc456', // Your PostgreSQL password
      database: 'library_app', // Your database name
      entities: [User], // Entities that TypeORM should recognize
      synchronize: true, // Auto-create tables (disable in production)
    }),
    UserModule,AgoraModule,NotificationModule
  ],
})
export class AppModule {}
