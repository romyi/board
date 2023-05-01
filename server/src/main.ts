import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from '@app/app.module';
import { GameIoAdapter } from '@app/websocket/game-socket-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new GameIoAdapter(app));
  app.enableCors({
    origin: [`http://${process.env.PRIVATE_IP}:5173`, "http://localhost:5173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
