import { Module } from '@nestjs/common';
import { AgoraModule } from './agora/agora.module'; // ✅ Import AgoraModule

@Module({
  imports: [AgoraModule], // ✅ Include AgoraModule in imports
})
export class AppModule {}
