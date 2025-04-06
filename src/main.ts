import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // ✅ Import AppModule instead

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // ✅ Corrected module
  app.enableCors();
  await app.listen(3000, '0.0.0.0'); // Accept requests from other devices
}
bootstrap();
