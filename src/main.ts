import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';


async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app
    .listen(process.env.PORT ?? 3000)
    .then(() => logger.log(`Backend is running on port: ${process.env.PORT}`));
}
bootstrap();
