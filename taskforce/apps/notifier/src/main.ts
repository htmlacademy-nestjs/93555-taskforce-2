import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Notifier Service')
    .setDescription('API for notifications')
    .setVersion('1.0')
    .build();

  const configService = app.get<ConfigService>(ConfigService);
  // @tutor: подробнее о принципе подключения микросервисов в bootstrap
  app.connectMicroservice(getRabbitMqConfig(configService));

  await app.startAllMicroservices();
  Logger.log(`🚀 Notifier service is running on`);

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3004;
  await app.listen(port);

  Logger.log(
    `🚀 REST is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
