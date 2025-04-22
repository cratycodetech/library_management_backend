import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(
    @Body('userIds') userIds: string[] | string,
    @Body('title') title: string,
    @Body('body') body: string,
  ) {
    return this.notificationService.sendPushNotification(userIds, title, body);
  }
}
