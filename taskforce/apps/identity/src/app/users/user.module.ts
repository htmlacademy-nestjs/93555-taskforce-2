import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { UserController } from './user.controller';
import { UserModel, UserSchema } from './user.model';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        inject: [ConfigService],
        useFactory: getRabbitMqConfig,
      }
    ])

  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule { }
