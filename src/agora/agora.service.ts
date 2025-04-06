import { Injectable } from '@nestjs/common';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';

@Injectable()
export class AgoraService {
  private readonly APP_ID = '68cc27d382a44628a9454809677e96e6';
  private readonly APP_CERTIFICATE = 'bd41f893f7d546bdbee2c6cb06e2ed16';
  private readonly TOKEN_EXPIRATION_TIME = 3600; 

  generateRtcToken(channelName: string, uid: number): string {
    if (!channelName) {
      throw new Error('Channel name is required');
    }

    const userId = uid || 0; // If UID is not provided, use 0
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + this.TOKEN_EXPIRATION_TIME;

    return RtcTokenBuilder.buildTokenWithUid(
      this.APP_ID,
      this.APP_CERTIFICATE,
      channelName,
      userId,
      RtcRole.PUBLISHER,
      privilegeExpiredTs,
    );
  }
}
