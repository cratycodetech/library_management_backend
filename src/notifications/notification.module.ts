import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity'; // Ensure this path is correct

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Inject User repository
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
