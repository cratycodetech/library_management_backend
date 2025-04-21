import { Controller, Put, Param, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('fcm-update')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':userId')
  async updateFcmToken(
    @Param('userId') userId: string,
    @Body('fcmToken') fcmToken: string,
  ) {
    if (!fcmToken) {
      throw new BadRequestException('FCM token is required');
    }

    return this.userService.updateFcmToken(userId, fcmToken);
  }
}
