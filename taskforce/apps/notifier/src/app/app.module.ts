import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NOTIFIER_SERVICE_ENV_PATH } from './app.constants';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { MongooseModule } from '@nestjs/mongoose';
import { validateEnvironments } from './env.validation';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { mailOptions } from '../config/mail.config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFIER_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions, mailOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    EmailSubscriberModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
