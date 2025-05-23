import { Module } from '@nestjs/common';
import { AgoraService } from './agora.service';
import { AgoraController } from './agora.controller';

@Module({
  controllers: [AgoraController], // Register AgoraController
  providers: [AgoraService], // Register AgoraService
  exports: [AgoraService], // Export to be used in other modules if needed
})
export class AgoraModule {}
