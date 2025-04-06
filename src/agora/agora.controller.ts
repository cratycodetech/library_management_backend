import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AgoraService } from './agora.service';

@Controller('agora')
export class AgoraController {
  constructor(private readonly agoraService: AgoraService) {}

  @Get('generateToken')
  generateToken(
    @Query('channelName') channelName: string,
    @Query('uid') uid: string,
  ) {
    if (!channelName) {
      throw new BadRequestException('Channel name is required');
    }

    const userId = uid ? parseInt(uid, 10) : 0;
    const token = this.agoraService.generateRtcToken(channelName, userId);
    return { token };
  }
}
